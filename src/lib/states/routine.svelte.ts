import { Temporal } from '@js-temporal/polyfill';

import { createTimer } from './timer.svelte';

export function createRoutine() {
	const sets = $state([
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 10 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 3 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 10 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 3 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 10 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 3 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 10 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 3 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 10 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 3 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 10 })
		}
	]);

	const timer = createTimer(Temporal.Duration.from({ seconds: sets[0].time.seconds }));

	const firstSetIndex = $state(0);
	const firstSet = $derived(sets[firstSetIndex]);

	const lastSetIndex = $state(sets.length - 1);
	const lastSet = $derived(sets[lastSetIndex]);

	const totalAmountOfSets = $derived(sets.length);

	let isRunning = $state(false);

	function start() {
		isRunning = true;
	}

	function stop() {
		isRunning = false;
	}

	let currentSetIndex = $state(0);
	const currentSet = $derived(sets[currentSetIndex]);

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

		if (timer.amountOfTimeRemaining.seconds === timer.amountOfTime.seconds) {
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

	const totalTime = $derived(
		sets.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
	);

	const totalTimeRemaining = $derived(
		sets
			.slice(currentSetIndex + 1)
			.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
			.add(timer.amountOfTimeRemaining)
	);

	$effect(() => {
		if (isRunning) {
			timer.start();
		} else {
			timer.stop();
		}
	});

	$effect(() => {
		if (timer.isCompleted) {
			initiateNextSet();
		}
	});

	$effect(() => {
		if (currentSet === lastSet && timer.isCompleted) {
			isRunning = false;
		}
	});

	$effect(() => {
		if (currentSet === lastSet && timer.isCompleted && isRunning) {
			timer.reset();
		}
	});

	return {
		get sets() {
			return sets;
		},
		get totalAmountOfSets() {
			return totalAmountOfSets;
		},
		get timer() {
			return timer;
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
		get totalTime() {
			return totalTime;
		},
		get totalTimeRemaining() {
			return totalTimeRemaining;
		},
		get isRunning() {
			return isRunning;
		},
		start,
		stop,
		initiateNextSet,
		initiatePreviousSet
	};
}
