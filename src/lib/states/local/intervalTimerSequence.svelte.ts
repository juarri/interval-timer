import { Temporal } from '@js-temporal/polyfill';
import { createTimer } from '$lib/states/local/timer.svelte';
import type { IntervalTimer } from '$lib/server/db/schema';

// const ZERO_SECONDS = Temporal.Duration.from({ seconds: 0 });

const SET_NAMES = {
	PREP: 'Prep',
	STOP: 'Stop',
	GO: 'Go',
	COOLDOWN: 'Cooldown'
};

function createSet(name: string, time: number) {
	return {
		name,
		time: Temporal.Duration.from({ seconds: time })
	};
}

function createSequence(intervalTimer: IntervalTimer) {
	const intervalSets = Array.from({ length: intervalTimer.intervals }, () => [
		createSet(SET_NAMES.GO, intervalTimer.goTime),
		createSet(SET_NAMES.STOP, intervalTimer.stopTime)
	])
		.flat()
		.slice(0, -1);

	return [
		createSet(SET_NAMES.PREP, intervalTimer.preparationTime),
		...intervalSets,
		createSet(SET_NAMES.COOLDOWN, intervalTimer.cooldownTime)
	];
}

export function createIntervalTimerSequence(intervalTimer: IntervalTimer) {
	const sequence = createSequence(intervalTimer);

	let currentSetIndex = $state(0);
	const timer = createTimer(sequence[currentSetIndex].time);

	const totalTime = $derived(
		sequence.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
	);

	const totalTimeRemaining = $derived(
		sequence
			.slice(currentSetIndex + 1)
			.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
			.add(timer.remainingTime)
	);

	function startSetAtIndex(newIndex: number) {
		if (newIndex < 0 || newIndex >= sequence.length) {
			throw new Error(`Invalid set index: ${newIndex}`);
		}

		currentSetIndex = newIndex;
		timer.setTotalTime(sequence[currentSetIndex].time);
	}

	function startPreviousSet() {
		if (currentSetIndex === 0) {
			timer.reset();
			return;
		}

		if (timer.totalTime !== timer.remainingTime) {
			timer.reset();
			return;
		}

		startSetAtIndex(currentSetIndex - 1);
	}

	function startNextSet() {
		if (currentSetIndex === sequence.length - 1 && timer.isCompleted) {
			timer.isRunning.disable();
			return;
		}

		startSetAtIndex(currentSetIndex + 1);
	}

	timer.onComplete(() => {
		startNextSet();
	});

	return {
		get sets() {
			return sequence;
		},
		get currentSetIndex() {
			return currentSetIndex;
		},
		get currentSet() {
			return sequence[currentSetIndex];
		},
		get timer() {
			return timer;
		},
		get totalTime() {
			return totalTime;
		},
		get totalTimeRemaining() {
			return totalTimeRemaining;
		},
		startSetAtIndex,
		startPreviousSet,
		startNextSet
	};
}

export type IntervalTimerSequence = ReturnType<typeof createIntervalTimerSequence>;
