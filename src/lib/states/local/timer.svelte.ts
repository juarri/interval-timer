import { Temporal } from '@js-temporal/polyfill';
import { createToggle } from './toggle.svelte';

type Callback = () => void;

const ZERO_SECONDS = Temporal.Duration.from({ seconds: 0 });
const ONE_SECOND = Temporal.Duration.from({ seconds: 1 });
const ONE_SECOND_IN_MILLISECONDS = ONE_SECOND.total({ unit: 'milliseconds' });

export function createTimer(initialAmountOfTime: Temporal.Duration) {
	let totalTime = $state(initialAmountOfTime);
	let remainingTime = $state(totalTime);
	const isCompleted = $derived(remainingTime.blank);
	const hasStarted = $derived(Temporal.Duration.compare(remainingTime, totalTime));

	const isRunning = createToggle(false);

	let intervalId: NodeJS.Timeout | null = $state(null);

	const onCompleteCallbacks: Callback[] = [];
	const onSecondPassedCallbacks: Callback[] = [];
	const onStartCallbacks: Callback[] = [];
	const onStopCallbacks: Callback[] = [];

	function clearTimerInterval() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function reset() {
		remainingTime = totalTime;
	}

	function setTotalTime(newAmountOfTime: Temporal.Duration) {
		if (Temporal.Duration.compare(newAmountOfTime, ONE_SECOND) <= 0) {
			throw new Error('Total time must be greater than 1 second');
		}

		totalTime = newAmountOfTime;
		reset();
	}

	function setRemainingTime(newAmountOfTime: Temporal.Duration) {
		if (Temporal.Duration.compare(newAmountOfTime, totalTime) > 0) {
			throw new Error('Remaining time cannot be greater than total time');
		}

		if (Temporal.Duration.compare(newAmountOfTime, ZERO_SECONDS) < 0) {
			throw new Error('Remaining time cannot be negative');
		}

		remainingTime = newAmountOfTime;
	}

	function decrementTimerBySecond() {
		setRemainingTime(remainingTime.subtract(ONE_SECOND));

		onSecondPassedCallbacks.forEach((callback: Callback) => callback());

		if (isCompleted) {
			onCompleteCallbacks.forEach((callback: Callback) => callback());
		}
	}

	function onStart(callback: () => void) {
		onStartCallbacks.push(callback);
	}

	function onStop(callback: () => void) {
		onStopCallbacks.push(callback);
	}

	function onSecondPassed(callback: () => void) {
		onSecondPassedCallbacks.push(callback);
	}

	function onComplete(callback: () => void) {
		onCompleteCallbacks.push(callback);
	}

	$effect(() => {
		if (isRunning.isActive) {
			intervalId = setInterval(decrementTimerBySecond, ONE_SECOND_IN_MILLISECONDS);
			onStartCallbacks.forEach((callback: Callback) => callback());

			return () => {
				clearTimerInterval();
				onStopCallbacks.forEach((callback: Callback) => callback());
			};
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
		setRemainingTime,
		reset,
		onComplete,
		onSecondPassed,
		onStart,
		onStop
	};
}
