<script lang="ts">
	import {
		type IntervalTimerFormSchema,
		UpdateIntervalTimerButton
	} from '$lib/components/form/intervalTimer';

	import { Button } from '$lib/components/ui/button';
	import type { IntervalTimer } from '$lib/server/db/schema';
	import type { IntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';
	import type { Toggle } from '$lib/states/local/toggle.svelte';
	import {
		ArrowLeft,
		ArrowRight,
		Icon,
		LockClosed,
		LockOpen,
		Pause,
		Play
	} from 'svelte-hero-icons';
	import type { SuperValidated } from 'sveltekit-superforms';

	type Props = {
		intervalTimerFormSchema: SuperValidated<IntervalTimerFormSchema>;
		intervalTimer: IntervalTimer;
		intervalTimerSequence: IntervalTimerSequence;
		lock: Toggle;
	};

	let { intervalTimerFormSchema, intervalTimer, intervalTimerSequence, lock }: Props = $props();
</script>

<div class="flex w-full items-center justify-center gap-4">
	<div class="flex w-full max-w-screen-sm flex-col gap-4">
		<div class="flex items-center justify-between">
			<Button
				onclick={intervalTimerSequence.startPreviousSet}
				aria-label="Previous Set"
				disabled={lock.isActive}
				variant="outline"
			>
				<Icon src={ArrowLeft} class="pointer-events-none" />
			</Button>
			<span class="text-4xl"
				>{intervalTimerSequence.currentSetIndex + 1}/{intervalTimerSequence.sets.length}</span
			>
			<Button
				onclick={intervalTimerSequence.startNextSet}
				aria-label="Next Set"
				disabled={lock.isActive}
				variant="outline"
			>
				<Icon src={ArrowRight} class="pointer-events-none" />
			</Button>
		</div>

		<div class=" flex items-center justify-between gap-4">
			{#if lock.isActive}
				<Button aria-label="Lock" onclick={lock.disable} variant="outline">
					<Icon src={LockOpen} class="pointer-events-none" />
				</Button>
			{:else}
				<Button aria-label="Unlock" onclick={lock.enable} variant="outline">
					<Icon src={LockClosed} class="pointer-events-none" />
				</Button>
			{/if}

			{#if intervalTimerSequence.timer.isRunning.isActive}
				<Button
					aria-label="Play"
					onclick={intervalTimerSequence.timer.isRunning.disable}
					variant="outline"
					class="w-full"
					disabled={lock.isActive}
				>
					<Icon src={Pause} class="pointer-events-none" />
				</Button>
			{:else}
				<Button
					aria-label="Pause"
					onclick={intervalTimerSequence.timer.isRunning.enable}
					variant="outline"
					disabled={lock.isActive}
					class="w-full"
				>
					<Icon src={Play} class="pointer-events-none" />
				</Button>
			{/if}

			<UpdateIntervalTimerButton {intervalTimer} {intervalTimerFormSchema} />
		</div>
	</div>
</div>
