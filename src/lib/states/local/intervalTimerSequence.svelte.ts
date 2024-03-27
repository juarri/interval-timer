import { Temporal } from '@js-temporal/polyfill';

import { createTimer } from '$lib/states/local/timer.svelte';
import { timerDuration } from '$lib/utils/duration';

import type { IntervalTimer } from '$lib/server/db/schema';

export function createIntervalTimerSequence(intervalTimer: IntervalTimer) {
	const sequence = $state([
		{
			name: 'Prep',
			time: Temporal.Duration.from({ seconds: intervalTimer.preparationTime })
		},
		...Array.from({ length: intervalTimer.intervals * 2 - 1 }, (_, i) =>
			i % 2
				? { name: 'Stop', time: Temporal.Duration.from({ seconds: intervalTimer.stopTime }) }
				: { name: 'Go', time: Temporal.Duration.from({ seconds: intervalTimer.goTime }) }
		),
		{
			name: 'Cooldown',
			time: Temporal.Duration.from({ seconds: intervalTimer.cooldownTime })
		}
	]);

	const firstSetIndex = $state(0);
	const firstSet = $derived(sequence[firstSetIndex]);

	const lastSetIndex = $state(sequence.length - 1);
	const lastSet = $derived(sequence[lastSetIndex]);

	let currentSetIndex = $state(firstSetIndex);
	const currentSet = $derived(sequence[currentSetIndex]);

	const timer = createTimer(currentSet.time);

	const totalTime = $derived(
		sequence.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
	);

	const totalTimeRemaining = $derived(
		sequence
			.slice(currentSetIndex + 1)
			.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
			.add(timer.remainingTime)
	);

	const displayTotalTimeRemaining = $derived(timerDuration(totalTimeRemaining));
	const displayTimerTimeRemaining = $derived(timerDuration(timer.remainingTime));

	function initiateSet(newIndex: number) {
		if (newIndex < firstSetIndex) {
			return;
		}

		if (newIndex > lastSetIndex) {
			return;
		}

		if (newIndex === currentSetIndex) {
			timer.reset();
			return;
		}

		currentSetIndex = newIndex;
		timer.setTotalTime(currentSet.time);
	}

	function initiatePreviousSet() {
		if (timer.hasStarted) {
			timer.reset();
			return;
		}

		if (currentSetIndex === firstSetIndex) {
			timer.reset();
			return;
		}

		initiateSet(currentSetIndex - 1);
	}

	function initiateNextSet() {
		if (currentSetIndex === lastSetIndex) {
			timer.isRunning.disable();
			timer.complete();
			return;
		}

		initiateSet(currentSetIndex + 1);
	}

	$effect(() => {
		if (timer.isCompleted) {
			initiateSet(currentSetIndex + 1);
		}
	});

	$effect(() => {
		if (currentSetIndex === lastSetIndex && timer.isCompleted && timer.isRunning.isEnabled) {
			timer.reset();
		}
	});

	return {
		get sets() {
			return sequence;
		},
		get currentSetIndex() {
			return currentSetIndex;
		},
		get currentSet() {
			return currentSet;
		},
		get firstSetIndex() {
			return firstSetIndex;
		},
		get firstSet() {
			return firstSet;
		},
		get lastSetIndex() {
			return lastSetIndex;
		},
		get lastSet() {
			return lastSet;
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
		get displayTotalTimeRemaining() {
			return displayTotalTimeRemaining;
		},
		get displayTimerTimeRemaining() {
			return displayTimerTimeRemaining;
		},
		initiateSet,
		initiatePreviousSet,
		initiateNextSet
	};
}

export type IntervalTimerSequence = ReturnType<typeof createIntervalTimerSequence>;
