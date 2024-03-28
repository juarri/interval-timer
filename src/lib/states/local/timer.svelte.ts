import { Temporal } from '@js-temporal/polyfill';

import { createToggle } from './toggle.svelte';

const ONE_SECOND_IN_MILLISECONDS = 1000;

export function createTimer(initialAmountOfTime: Temporal.Duration) {
	let totalTime = $state(initialAmountOfTime);
	let remainingTime = $state(totalTime);
	const isCompleted = $derived(remainingTime.blank);
	const hasStarted = $derived(Temporal.Duration.compare(remainingTime, totalTime));

	const isRunning = createToggle(false);

	function setTotalTime(newAmountOfTime: Temporal.Duration) {
		if (isRunning.isEnabled) {
			isRunning.disable();
			totalTime = newAmountOfTime;
			reset();
			isRunning.enable();
		}

		totalTime = newAmountOfTime;
		reset();
	}

	function reset() {
		remainingTime = totalTime;
	}

	function complete() {
		remainingTime = Temporal.Duration.from({ seconds: 0 });
	}

	function decrementTimerBySecond() {
		if (isCompleted) {
			return;
		}

		remainingTime = remainingTime.subtract({ seconds: 1 });
	}

	$effect(() => {
		if (isRunning.isEnabled) {
			const interval = setInterval(decrementTimerBySecond, ONE_SECOND_IN_MILLISECONDS);
			return () => clearInterval(interval);
		}
	});

	return {
		get totalTime() {
			return totalTime;
		},
		get remainingTime() {
			return remainingTime;
		},
		get isRunning() {
			return isRunning;
		},
		get hasStarted() {
			return hasStarted;
		},
		get isCompleted() {
			return isCompleted;
		},
		setTotalTime,
		reset,
		complete
	};
}
