<script lang="ts">
	import { fit, parent_style } from '@leveluptuts/svelte-fit';

	import { createRoutine } from '$lib/states/routine.svelte';
	import { createToggle } from '$lib/states/toggle.svelte';

	import formatDuration from '$lib/utils/formatDuration';

	import {
		ArrowLeftIcon,
		ArrowRightIcon,
		LockIcon,
		UnlockIcon,
		PlayIcon,
		PauseIcon
	} from 'svelte-feather-icons';

	import Button from '$lib/components/ui/button/button.svelte';

	let lock = createToggle(false);
	let routine = createRoutine();

	const totalTimeRemaining = $derived(formatDuration(routine.totalTimeRemaining));
	const timerTimeRemaining = $derived(formatDuration(routine.timer.timeRemaining));
</script>

<main class="flex h-dvh max-h-full flex-col justify-between">
	<section class="flex items-center justify-between p-4 px-6">
		{#if lock.isEnabled}
			<Button onclick={lock.disable}>
				<UnlockIcon />
			</Button>
		{:else}
			<Button onclick={lock.enable}>
				<LockIcon />
			</Button>
		{/if}

		<span class="text-7xl">
			{totalTimeRemaining}
		</span>

		{#if routine.isRunning.isEnabled}
			<Button onclick={routine.isRunning.disable} disabled={lock.isEnabled}>
				<PauseIcon />
			</Button>
		{:else}
			<Button onclick={routine.isRunning.enable} disabled={lock.isEnabled}>
				<PlayIcon />
			</Button>
		{/if}
	</section>

	<section class="grid w-full place-content-center" style={parent_style}>
		<p class="text-center leading-none" use:fit={{ min_size: 3, max_size: 300 }}>
			{timerTimeRemaining}
		</p>
	</section>

	<section class="mx-auto w-full max-w-2xl flex-auto overflow-auto px-6">
		<ol class="flex flex-col">
			{#each routine.sets as set, i}
				<li>
					<Button
						onclick={() => routine.initiateSet(i)}
						class="h-full w-full rounded  p-4 text-center text-2xl">{i + 1}. {set.name}</Button
					>
				</li>
			{/each}
		</ol>
	</section>

	<section class="flex items-center justify-between p-4 px-4">
		<Button
			onclick={routine.initiatePreviousSet}
			aria-label="Previous Set"
			disabled={lock.isEnabled}><ArrowLeftIcon /></Button
		>
		<span class="text-6xl">{routine.currentSetIndex + 1}/{routine.sets.length}</span>
		<Button onclick={routine.initiateNextSet} aria-label="Next Set" disabled={lock.isEnabled}
			><ArrowRightIcon /></Button
		>
	</section>
</main>
