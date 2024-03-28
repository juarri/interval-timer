<script lang="ts">
	import {
		UpdateIntervalTimerForm,
		type IntervalTimerFormSchema
	} from '$lib/components/form/intervalTimer';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import type { IntervalTimer } from '$lib/server/db/schema';
	import type { IntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';
	import type { Toggle } from '$lib/states/local/toggle.svelte';
	import {
		ArrowLeft,
		ArrowRight,
		Cog6Tooth,
		Icon,
		LockClosed,
		LockOpen,
		Pause,
		Play,
		XMark
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
				onclick={intervalTimerSequence.initiatePreviousSet}
				aria-label="Previous Set"
				disabled={lock.isEnabled}
				variant="outline"
			>
				<Icon src={ArrowLeft} class="pointer-events-none" />
			</Button>
			<span class="text-4xl"
				>{intervalTimerSequence.currentSetIndex + 1}/{intervalTimerSequence.sets.length}</span
			>
			<Button
				onclick={intervalTimerSequence.initiateNextSet}
				aria-label="Next Set"
				disabled={lock.isEnabled}
				variant="outline"
			>
				<Icon src={ArrowRight} class="pointer-events-none" />
			</Button>
		</div>

		<div class=" flex items-center justify-between gap-4">
			{#if lock.isEnabled}
				<Button aria-label="Lock" onclick={lock.disable} variant="outline">
					<Icon src={LockOpen} class="pointer-events-none" />
				</Button>
			{:else}
				<Button aria-label="Unlock" onclick={lock.enable} variant="outline">
					<Icon src={LockClosed} class="pointer-events-none" />
				</Button>
			{/if}

			{#if intervalTimerSequence.timer.isRunning.isEnabled}
				<Button
					aria-label="Play"
					onclick={intervalTimerSequence.timer.isRunning.disable}
					variant="outline"
					class="w-full"
					disabled={lock.isEnabled}
				>
					<Icon src={Pause} class="pointer-events-none" />
				</Button>
			{:else}
				<Button
					aria-label="Pause"
					onclick={intervalTimerSequence.timer.isRunning.enable}
					variant="outline"
					disabled={lock.isEnabled}
					class="w-full"
				>
					<Icon src={Play} class="pointer-events-none" />
				</Button>
			{/if}

			<AlertDialog.Root closeOnOutsideClick={true}>
				<AlertDialog.Trigger asChild let:builder>
					<Button
						aria-label="Timer Settings"
						builders={[builder]}
						variant="outline"
						disabled={lock.isEnabled}><Icon src={Cog6Tooth} /></Button
					>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<div class="flex items-center justify-between">
							<AlertDialog.Title>Update Timer</AlertDialog.Title>
							<AlertDialog.Cancel aria-label="Close Dialog"><Icon src={XMark} /></AlertDialog.Cancel
							>
						</div>
					</AlertDialog.Header>
					<UpdateIntervalTimerForm schema={intervalTimerFormSchema} initialData={intervalTimer} />
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	</div>
</div>
