<script lang="ts">
	import { createRoutine } from '$lib/states/routine.svelte';

	import {
		ArrowLeftIcon,
		ArrowRightIcon,
		LockIcon,
		UnlockIcon,
		PlayIcon,
		PauseIcon
	} from 'svelte-feather-icons';

	import Button from '$lib/components/ui/button/button.svelte';

	let routine = createRoutine();

	const roundedTime = $derived(
		routine.totalTimeRemaining.round({
			largestUnit: 'hours',
			smallestUnit: 'seconds'
		})
	);

	let isLocked = $state(false);

	function lock() {
		isLocked = true;
	}

	function unlock() {
		isLocked = false;
	}
</script>

<main class="flex h-dvh max-h-lvh flex-col justify-between">
	<section class="flex items-center justify-between p-6 pb-0">
		{#if isLocked}
			<Button onclick={unlock}>
				<UnlockIcon />
			</Button>
		{:else}
			<Button onclick={lock}>
				<LockIcon />
			</Button>
		{/if}

		<span class="text-6xl">
			{roundedTime.hours}:{roundedTime.minutes}:{roundedTime.seconds.toString().padStart(2, '0')}
		</span>

		{#if routine.isRunning}
			<Button onclick={routine.stop} disabled={isLocked}>
				<PauseIcon />
			</Button>
		{:else}
			<Button onclick={routine.start} disabled={isLocked}>
				<PlayIcon />
			</Button>
		{/if}
	</section>

	<section class="flex justify-center">
		<span class="text-[35vh] leading-none">{routine.timer.amountOfTimeRemaining.seconds}</span>
	</section>

	<section class="mx-auto w-full max-w-screen-md flex-auto overflow-auto px-6">
		<ol class="flex list-decimal flex-col overflow-scroll">
			{#each routine.sets as set, i}
				<li>
					<Button class="h-full w-full rounded  p-4 text-center text-2xl"
						>{i + 1}. {set.name}</Button
					>
				</li>
			{/each}
		</ol>
	</section>

	<section class="flex items-center justify-between p-6">
		<Button onclick={routine.initiatePreviousSet} aria-label="Previous Set" disabled={isLocked}
			><ArrowLeftIcon /></Button
		>
		<span class="text-4xl">{routine.currentSetIndex + 1}/{routine.totalAmountOfSets}</span>
		<Button onclick={routine.initiateNextSet} aria-label="Next Set" disabled={isLocked}
			><ArrowRightIcon /></Button
		>
	</section>
</main>
