import { createTimer } from './timer.svelte';

export function createRoutine() {
	const sets = $state([
		{ name: 'Work', timer: createTimer(5) },
		{ name: 'Rest', timer: createTimer(3) },
		{ name: 'Work', timer: createTimer(5) },
		{ name: 'Rest', timer: createTimer(3) },
		{ name: 'Work', timer: createTimer(5) },
		{ name: 'Rest', timer: createTimer(3) },
		{ name: 'Work', timer: createTimer(5) }
	]);
	const totalSets = $derived(sets.length);

	let isRunning = $state(false);

	function start() {
		isRunning = true;
	}

	function stop() {
		isRunning = false;
	}

	let isLocked = $state(false);

	function lock() {
		isLocked = true;
	}

	function unlock() {
		isLocked = false;
	}

	let currentSetIndex = $state(0);
	const currentSet = $derived(sets[currentSetIndex]);
	const firstSet = $derived(sets[0]);
	const lastSet = $derived(sets[sets.length - 1]);

	const totalTimeInSeconds = $derived(sets.reduce((acc, set) => acc + set.timer.timeInSeconds, 0));
	const currentTotalTimeInSeconds = $derived(
		sets.slice(currentSetIndex, sets.length).reduce((acc, set) => acc + set.timer.timeInSeconds, 0)
	);

	function nextSet() {
		if (currentSetIndex >= sets.length - 1) return;

		currentSet.timer.complete();

		currentSetIndex++;
	}

	function previousSet() {
		if (currentSet === firstSet) {
			currentSet.timer.reset();

			return;
		}

		currentSet.timer.reset();

		currentSetIndex--;

		currentSet.timer.reset();
	}

	$effect(() => {
		if (isRunning) {
			sets[currentSetIndex].timer.start();
		} else {
			sets[currentSetIndex].timer.stop();
		}
	});

	$effect(() => {
		if (sets[currentSetIndex].timer.isCompleted) {
			nextSet();
		}
	});

	$effect(() => {
		if (currentSetIndex === sets.length - 1 && sets[currentSetIndex].timer.isCompleted) {
			isRunning = false;
		}
	});

	return {
		get sets() {
			return sets;
		},
		get totalSets() {
			return totalSets;
		},
		get currentSetIndex() {
			return currentSetIndex;
		},
		get currentSet() {
			return currentSet;
		},
		get firstSet() {
			return firstSet;
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
		get isLocked() {
			return isLocked;
		},
		start,
		stop,
		lock,
		unlock,
		nextSet,
		previousSet
	};
}
