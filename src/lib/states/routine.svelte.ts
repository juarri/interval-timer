import { createTimer } from './timer.svelte';

export function createRoutine() {
	const sets = $state([
		{
			name: 'Work',
			timer: createTimer(5)
		},
		{ name: 'Rest', timer: createTimer(3) },
		{
			name: 'Work',
			timer: createTimer(5)
		},
		{ name: 'Rest', timer: createTimer(3) },
		{
			name: 'Work',
			timer: createTimer(5)
		},
		{ name: 'Rest', timer: createTimer(3) }
	]);

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

	let previousSetIndex = $state(0);
	const previousSet = $derived(sets[previousSetIndex]);

	function decrementCurrentSetIndex() {
		if (currentSetIndex === firstSetIndex) return;

		previousSetIndex = currentSetIndex;
		currentSetIndex--;
	}

	function incrementCurrentSetIndex() {
		if (currentSetIndex === lastSetIndex) return;

		previousSetIndex = currentSetIndex;
		currentSetIndex++;
	}

	function initiatePreviousSet() {
		if (currentSet.timer.initialAmountOfSeconds !== currentSet.timer.timeInSeconds) {
			currentSet.timer.reset();
			return;
		}

		if (currentSetIndex === firstSetIndex) {
			currentSet.timer.reset();
			return;
		}

		decrementCurrentSetIndex();

		previousSet.timer.reset();
		currentSet.timer.reset();
	}

	function initiateNextSet() {
		if (currentSetIndex === lastSetIndex) {
			currentSet.timer.complete();
			return;
		}

		incrementCurrentSetIndex();

		previousSet.timer.complete();
		currentSet.timer.reset();
	}

	const totalTimeInSeconds = $derived(sets.reduce((acc, set) => acc + set.timer.timeInSeconds, 0));
	const currentTotalTimeInSeconds = $derived(
		sets.slice(currentSetIndex, sets.length).reduce((acc, set) => acc + set.timer.timeInSeconds, 0)
	);

	$effect(() => {
		if (isRunning) {
			currentSet.timer.start();
		} else {
			currentSet.timer.stop();
		}
	});

	$effect(() => {
		if (currentSet.timer.isCompleted) {
			incrementCurrentSetIndex();
		}
	});

	$effect(() => {
		if (currentSetIndex === lastSetIndex && currentSet.timer.isCompleted) {
			isRunning = false;
		}
	});

	return {
		get sets() {
			return sets;
		},
		get totalAmountOfSets() {
			return totalAmountOfSets;
		},
		get currentSetIndex() {
			return currentSetIndex;
		},
		get currentSet() {
			return currentSet;
		},
		get previousSet() {
			return previousSet;
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
		get totalTimeInSeconds() {
			return totalTimeInSeconds;
		},
		get currentTotalTimeInSeconds() {
			return currentTotalTimeInSeconds;
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
