import { Temporal } from '@js-temporal/polyfill';

import { createToggle } from './toggle.svelte';

export function createTimer(initialAmountOfTime: Temporal.Duration) {
	let time = $state(initialAmountOfTime);
	let timeRemaining = $state(time);
	let previousTimeRemaining = $state(timeRemaining);

	const isRunning = createToggle(false);
	const isCompleted = $derived(timeRemaining.blank);

	let hasReset = $state(false);
	const hasStarted = $state(false);
	const hasStopped = $state(false);

	function setAmountOfTime(newAmountOfTime: Temporal.Duration) {
		time = newAmountOfTime;
		timeRemaining = time;
	}

	function decrementTimerBySecond() {
		previousTimeRemaining = timeRemaining;
		timeRemaining = timeRemaining.subtract({ seconds: 1 });
	}

	function reset() {
		timeRemaining = time;
		previousTimeRemaining = timeRemaining;

		hasReset = true;
	}

	function complete() {
		timeRemaining = Temporal.Duration.from({ seconds: 0 });
	}

	function onStart(callback: () => void) {
		$effect(() => {
			if (isRunning.isEnabled && hasStarted) {
				callback();
			}
		});
	}

	function onStop(callback: () => void) {
		$effect(() => {
			if (!isRunning.isEnabled && hasStopped) {
				callback();
			}
		});
	}

	function onComplete(callback: () => void) {
		$effect(() => {
			if (isCompleted) {
				callback();
			}
		});
	}

	function onReset(callback: () => void) {
		$effect(() => {
			if (timeRemaining === time && hasReset) {
				callback();
			}
		});
	}

	function onSecondPassed(
		callback: (
			secondsRemaining: Temporal.Duration,
			previousSecondsRemaining: Temporal.Duration
		) => void
	) {
		$effect(() => {
			if (timeRemaining !== previousTimeRemaining) {
				callback(timeRemaining, previousTimeRemaining);
			}
		});
	}

	$effect(() => {
		if (isRunning.isEnabled && !timeRemaining.blank) {
			const interval = setInterval(decrementTimerBySecond, 1000);

			return () => clearInterval(interval);
		}
	});

	return {
		get time() {
			return time;
		},
		get timeRemaining() {
			return timeRemaining;
		},
		get isRunning() {
			return isRunning;
		},
		get isCompleted() {
			return isCompleted;
		},
		setAmountOfTime,
		reset,
		complete,
		onSecondPassed,
		onStart,
		onStop,
		onComplete,
		onReset
	};
}
