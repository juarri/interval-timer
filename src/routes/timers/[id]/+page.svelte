<script lang="ts">
	import { browser } from '$app/environment';

	import { createToggle } from '$lib/states/local/toggle.svelte';
	import { createIntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';

	import { fit, parent_style } from '@leveluptuts/svelte-fit';

	import {
		Icon,
		ArrowLeft,
		ArrowRight,
		LockClosed,
		LockOpen,
		Play,
		Pause
	} from 'svelte-hero-icons';

	import Button from '$lib/components/ui/button/button.svelte';

	import type { PageData } from './$types';
	import { cn } from '$lib/utils';
	export let data: PageData;
	// let { intervalTimer }: PageData = $props();

	let lock = createToggle(false);
	let sequence = createIntervalTimerSequence(data.intervalTimer);

	$: {
		if (browser) {
			const set = document.getElementById(`set-${sequence.currentSetIndex}`);
			if (set) {
				set.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}
	}

	// const totalTimeRemaining = $derived(timerDuration(sequence.totalTimeRemaining));
	// const timerTimeRemaining = $derived(timerDuration(sequence.timer.timeRemaining));
</script>

<main class="flex flex-col justify-between" style="height:  calc(100dvh - 56px);">
	<section>
		<div class="container flex max-w-screen-2xl items-center justify-between">
			{#if lock.isEnabled}
				<Button onclick={lock.disable} variant="outline">
					<Icon src={LockOpen} class="pointer-events-none" />
				</Button>
			{:else}
				<Button onclick={lock.enable} variant="outline">
					<Icon src={LockClosed} class="pointer-events-none" />
				</Button>
			{/if}

			<div style={parent_style}>
				<span
					class="mx-auto block text-center leading-none"
					use:fit={{ min_size: 64, max_size: 1200 }}
				>
					{sequence.displayTotalTimeRemaining}
				</span>
			</div>

			{#if sequence.isRunning.isEnabled}
				<Button onclick={sequence.isRunning.disable} variant="outline" disabled={lock.isEnabled}>
					<Icon src={Pause} class="pointer-events-none" />
				</Button>
			{:else}
				<Button onclick={sequence.isRunning.enable} variant="outline" disabled={lock.isEnabled}>
					<Icon src={Play} class="pointer-events-none" />
				</Button>
			{/if}
		</div>
	</section>

	<section class="w-full">
		<div class="mx-auto h-full max-w-2xl place-content-center">
			<div style={parent_style}>
				<p class="text-center leading-none" use:fit={{ min_size: 64, max_size: 1200 }}>
					{sequence.displayTimerTimeRemaining}
				</p>
			</div>
		</div>
	</section>

	<section class="w-full">
		<div class="container flex max-w-screen-2xl items-center justify-between">
			<ol class="flex w-full flex-col py-2">
				{#each sequence.sets as set, i}
					<li>
						<Button
							id={`set-${i}`}
							onclick={() => sequence.initiateSet(i)}
							variant="outline"
							class={cn([
								'relative h-full w-full rounded p-4 text-center text-2xl focus:z-10',
								sequence.currentSetIndex === i && 'bg-neutral-300 dark:bg-neutral-700'
							])}
							disabled={lock.isEnabled}>{i + 1}. {set.name}</Button
						>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section>
		<div class="container flex max-w-screen-2xl items-center justify-between py-4">
			<Button
				onclick={sequence.initiatePreviousSet}
				aria-label="Previous Set"
				disabled={lock.isEnabled}
				variant="outline"
			>
				<Icon src={ArrowLeft} class="pointer-events-none" />
			</Button>
			<span class="text-6xl">{sequence.currentSetIndex + 1}/{sequence.sets.length}</span>
			<Button
				onclick={sequence.initiateNextSet}
				aria-label="Next Set"
				disabled={lock.isEnabled}
				variant="outline"
			>
				<Icon src={ArrowRight} class="pointer-events-none" />
			</Button>
		</div>
	</section>
</main>
