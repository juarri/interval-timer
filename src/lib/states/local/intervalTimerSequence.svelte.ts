import { Temporal } from '@js-temporal/polyfill';

import { createTimer } from '$lib/states/local/timer.svelte';
import { createToggle } from '$lib/states/local/toggle.svelte';
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

	const isRunning = createToggle(false);

	const totalTime = $derived(
		sequence.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
	);

	const totalTimeRemaining = $derived(
		sequence
			.slice(currentSetIndex + 1)
			.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
			.add(timer.timeRemaining)
	);

	const displayTotalTimeRemaining = $derived(timerDuration(totalTimeRemaining));
	const displayTimerTimeRemaining = $derived(timerDuration(timer.timeRemaining));

	function decrementCurrentSetIndex() {
		if (currentSetIndex === firstSetIndex) return;

		currentSetIndex--;
	}

	function incrementCurrentSetIndex() {
		if (currentSetIndex === lastSetIndex) return;

		currentSetIndex++;
	}

	function initiatePreviousSet() {
		if (currentSetIndex === firstSetIndex) {
			timer.reset();
			return;
		}

		if (timer.timeRemaining === timer.time) {
			decrementCurrentSetIndex();
			timer.setAmountOfTime(currentSet.time);

			return;
		}

		timer.reset();
	}

	function initiateNextSet() {
		if (currentSetIndex === lastSetIndex) {
			timer.complete();
			return;
		}

		incrementCurrentSetIndex();
		timer.setAmountOfTime(currentSet.time);
	}

	function initiateSet(index: number) {
		if (index < firstSetIndex || index > lastSetIndex) return;

		currentSetIndex = index;
		timer.setAmountOfTime(currentSet.time);
	}

	$effect(() => {
		if (isRunning.isEnabled) {
			timer.isRunning.enable();
		} else {
			timer.isRunning.disable();
		}
	});

	$effect(() => {
		if (timer.isCompleted) {
			initiateNextSet();
		}
	});

	$effect(() => {
		if (currentSet === lastSet && timer.isCompleted) {
			isRunning.disable();
		}
	});

	$effect(() => {
		if (currentSet === lastSet && timer.isCompleted && isRunning.isEnabled) {
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
		get isRunning() {
			return isRunning;
		},
		get displayTotalTimeRemaining() {
			return displayTotalTimeRemaining;
		},
		get displayTimerTimeRemaining() {
			return displayTimerTimeRemaining;
		},
		initiateSet,
		initiateNextSet,
		initiatePreviousSet
	};
}

export type IntervalTimerSequence = ReturnType<typeof createIntervalTimerSequence>;
