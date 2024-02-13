export function createTimer(initialAmountOfSeconds: number) {
	let secondsRemaining = $state(initialAmountOfSeconds);
	let previousSecondsRemaining = $state(secondsRemaining);

	let isRunning = $state(false);
	const isCompleted = $derived(secondsRemaining === 0);

	let hasReset = $state(false);
	let hasStarted = $state(false);
	let hasStopped = $state(false);

	function decrementTimerBySecond() {
		previousSecondsRemaining = secondsRemaining;
		secondsRemaining--;
	}

	function reset() {
		secondsRemaining = initialAmountOfSeconds;
		previousSecondsRemaining = secondsRemaining;

		hasReset = true;
	}

	function complete() {
		secondsRemaining = 0;
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
			if (secondsRemaining === initialAmountOfSeconds && hasReset) {
				callback();
			}
		});
	}

	function onSecondPassed(
		callback: (secondsRemaining: number, previousSecondsRemaining: number) => void
	) {
		$effect(() => {
			if (secondsRemaining !== previousSecondsRemaining) {
				callback(secondsRemaining, previousSecondsRemaining);
			}
		});
	}

	$effect(() => {
		if (isRunning && secondsRemaining > 0) {
			const interval = setInterval(decrementTimerBySecond, 1000);

			return () => clearInterval(interval);
		}
	});

	$effect(() => {
		if (secondsRemaining === 0) {
			stop();
		}
	});

	$effect(() => {
		if (isRunning && secondsRemaining === 0) {
			reset();
		}
	});

	return {
		get initialAmountOfSeconds() {
			return initialAmountOfSeconds;
		},
		get timeInSeconds() {
			return secondsRemaining;
		},
		get isRunning() {
			return isRunning;
		},
		get isCompleted() {
			return isCompleted;
		},
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
