import { Temporal } from '@js-temporal/polyfill';

import { createTimer } from './timer.svelte';
import { createToggle } from './toggle.svelte';

export function createRoutine() {
	const sets = $state([
		{
			name: 'Work',
			time: Temporal.Duration.from({ hours: 2, minutes: 30, seconds: 17 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ minutes: 15, seconds: 10 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 30 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 10 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 30 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 10 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 30 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 10 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 30 })
		},
		{ name: 'Rest', time: Temporal.Duration.from({ seconds: 10 }) },
		{
			name: 'Work',
			time: Temporal.Duration.from({ seconds: 30 })
		}
	]);

	const firstSetIndex = $state(0);
	const firstSet = $derived(sets[firstSetIndex]);

	const lastSetIndex = $state(sets.length - 1);
	const lastSet = $derived(sets[lastSetIndex]);

	let currentSetIndex = $state(firstSetIndex);
	const currentSet = $derived(sets[currentSetIndex]);

	const timer = createTimer(currentSet.time);

	const isRunning = createToggle(false);

	const totalTime = $derived(
		sets.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
	);

	const totalTimeRemaining = $derived(
		sets
			.slice(currentSetIndex + 1)
			.reduce((acc, set) => acc.add(set.time), Temporal.Duration.from({ seconds: 0 }))
			.add(timer.timeRemaining)
	);

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
			return sets;
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
		initiateSet,
		initiateNextSet,
		initiatePreviousSet
	};
}
