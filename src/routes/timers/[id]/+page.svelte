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
</script>

<main class="flex h-dvh max-h-lvh flex-col justify-between">
	<section class="flex items-center justify-between p-6 pb-0">
		{#if routine.isLocked}
			<Button onclick={routine.unlock}>
				<UnlockIcon />
			</Button>
		{:else}
			<Button onclick={routine.lock}>
				<LockIcon />
			</Button>
		{/if}

		<span class="text-6xl">{routine.currentTotalTimeInSeconds}</span>

		{#if routine.isRunning}
			<Button onclick={routine.stop} disabled={routine.isLocked}>
				<PauseIcon />
			</Button>
		{:else}
			<Button onclick={routine.start} disabled={routine.isLocked}>
				<PlayIcon />
			</Button>
		{/if}
	</section>

	<section class="flex justify-center">
		<span class="text-[35vh] leading-none">{routine.currentSet.timer.timeInSeconds}</span>
	</section>

	<section class="mx-auto w-full max-w-screen-md flex-auto overflow-auto px-6">
		<ol class="flex list-decimal flex-col overflow-scroll">
			{#each routine.sets as set}
				<li class="rounded bg-gray-200 p-4 text-center text-2xl">{set.name}</li>
			{/each}
		</ol>
	</section>

	<section class="flex items-center justify-between p-6">
		<Button onclick={routine.previousSet} aria-label="Previous Set" disabled={routine.isLocked}
			><ArrowLeftIcon /></Button
		>
		<span class="text-4xl">{routine.currentSetIndex + 1}/{routine.totalSets}</span>
		<Button onclick={routine.nextSet} aria-label="Next Set" disabled={routine.isLocked}
			><ArrowRightIcon /></Button
		>
	</section>
</main>
