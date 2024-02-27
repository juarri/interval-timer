import { Temporal } from '@js-temporal/polyfill';

export function createTimer(initialAmountOfTime: Temporal.Duration) {
	let amountOfTime = $state(initialAmountOfTime);
	let amountOfTimeRemaining = $state(amountOfTime);
	let previousSecondsRemaining = $state(amountOfTimeRemaining);

	let isRunning = $state(false);
	const isCompleted = $derived(amountOfTimeRemaining.blank);

	let hasReset = $state(false);
	let hasStarted = $state(false);
	let hasStopped = $state(false);

	function setAmountOfTime(newAmountOfTime: Temporal.Duration) {
		amountOfTime = newAmountOfTime;
		amountOfTimeRemaining = amountOfTime;
	}

	function decrementTimerBySecond() {
		previousSecondsRemaining = amountOfTimeRemaining;
		amountOfTimeRemaining = amountOfTimeRemaining.subtract({ seconds: 1 });
	}

	function reset() {
		amountOfTimeRemaining = amountOfTime;
		previousSecondsRemaining = amountOfTimeRemaining;

		hasReset = true;
	}

	function complete() {
		amountOfTimeRemaining = Temporal.Duration.from({ seconds: 0 });
	}

	function start() {
		isRunning = true;
		hasStarted = true;
	}

	function stop() {
		isRunning = false;
		hasStopped = true;
	}

	function toggle() {
		isRunning = !isRunning;

		if (isRunning) {
			hasStarted = true;
		} else {
			hasStopped = true;
		}
	}

	function onStart(callback: () => void) {
		$effect(() => {
			if (isRunning && hasStarted) {
				callback();
			}
		});
	}

	function onStop(callback: () => void) {
		$effect(() => {
			if (!isRunning && hasStopped) {
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
			if (amountOfTimeRemaining === amountOfTime && hasReset) {
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
			if (amountOfTimeRemaining !== previousSecondsRemaining) {
				callback(amountOfTimeRemaining, previousSecondsRemaining);
			}
		});
	}

	$effect(() => {
		if (isRunning && !amountOfTimeRemaining.blank) {
			const interval = setInterval(decrementTimerBySecond, 1000);

			return () => clearInterval(interval);
		}
	});

	return {
		get amountOfTime() {
			return amountOfTime;
		},
		get amountOfTimeRemaining() {
			return amountOfTimeRemaining;
		},
		get timeInSeconds() {
			return amountOfTimeRemaining;
		},
		get isRunning() {
			return isRunning;
		},
		get isCompleted() {
			return isCompleted;
		},
		setAmountOfTime,
		start,
		stop,
		toggle,
		reset,
		complete,
		onSecondPassed,
		onStart,
		onStop,
		onComplete,
		onReset
	};
}
