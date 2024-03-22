<script lang="ts">
	import type { IntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';

	import { Button } from '$lib/components/ui/button';
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

	import { fit, parent_style } from '@leveluptuts/svelte-fit';
	import { cn } from '$lib/utils';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { IntervalTimer } from '$lib/server/db/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import {
		UpdateIntervalTimerForm,
		type IntervalTimerFormSchema
	} from '$lib/components/form/intervalTimer';

	export let intervalTimerFormSchema: SuperValidated<IntervalTimerFormSchema>;
	export let intervalTimer: IntervalTimer;
	export let intervalTimerSequence: IntervalTimerSequence;
	export let lock: Toggle;
</script>

<div class="grid h-full grid-cols-2">
	<div class="flex h-full flex-col justify-between">
		<section>
			<div class="container flex max-w-screen-2xl items-center justify-between py-4">
				{#key intervalTimerSequence.displayTotalTimeRemaining}
					<div style={parent_style} class="grid place-content-center">
						<p class="text-center leading-none" use:fit={{ min_size: 64, max_size: 1200 }}>
							{intervalTimerSequence.displayTotalTimeRemaining}
						</p>
					</div>
				{/key}
			</div>
		</section>

		<section class="h-full">
			<div class="container h-full w-full max-w-screen-2xl items-center justify-between py-4">
				{#key intervalTimerSequence.displayTimerTimeRemaining}
					<div style={parent_style} class="grid place-content-center">
						<p class="text-center leading-none" use:fit={{ min_size: 64, max_size: 1200 }}>
							{intervalTimerSequence.displayTimerTimeRemaining}
						</p>
					</div>
				{/key}
			</div>
		</section>

		<section
			class="sticky bottom-0 z-50 w-full border-t border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
		>
			<div class="container flex max-w-screen-2xl items-center justify-between">
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

			<div class="pt-4" />

			<div class="container flex max-w-screen-2xl items-center justify-between gap-4">
				{#if lock.isEnabled}
					<Button aria-label="Lock" onclick={lock.disable} variant="outline">
						<Icon src={LockOpen} class="pointer-events-none" />
					</Button>
				{:else}
					<Button aria-label="Unlock" onclick={lock.enable} variant="outline">
						<Icon src={LockClosed} class="pointer-events-none" />
					</Button>
				{/if}

				{#if intervalTimerSequence.isRunning.isEnabled}
					<Button
						aria-label="Play"
						onclick={intervalTimerSequence.isRunning.disable}
						variant="outline"
						class="w-full"
						disabled={lock.isEnabled}
					>
						<Icon src={Pause} class="pointer-events-none" />
					</Button>
				{:else}
					<Button
						aria-label="Pause"
						onclick={intervalTimerSequence.isRunning.enable}
						variant="outline"
						disabled={lock.isEnabled}
						class="w-full"
					>
						<Icon src={Play} class="pointer-events-none" />
					</Button>
				{/if}

				<AlertDialog.Root closeOnOutsideClick={true}>
					<AlertDialog.Trigger asChild let:builder>
						<Button aria-label="Timer Settings" builders={[builder]} variant="outline"
							><Icon src={Cog6Tooth} /></Button
						>
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<div class="flex items-center justify-between">
								<AlertDialog.Title>Update Timer</AlertDialog.Title>
								<AlertDialog.Cancel aria-label="Close Dialog"
									><Icon src={XMark} /></AlertDialog.Cancel
								>
							</div>
						</AlertDialog.Header>
						<UpdateIntervalTimerForm schema={intervalTimerFormSchema} initialData={intervalTimer} />
					</AlertDialog.Content>
				</AlertDialog.Root>
			</div>
		</section>
	</div>

	<div class="overflow-scroll">
		<section class="py-6">
			<div class="container flex max-w-screen-2xl items-center justify-between">
				<ol class="grid w-full grid-cols-2">
					{#each intervalTimerSequence.sets as set, i}
						<li class="last:col-span-2">
							<Button
								id={`set-${i + 1}`}
								aria-label={`Set ${i + 1}`}
								onclick={() => intervalTimerSequence.initiateSet(i)}
								variant="outline"
								class={cn([
									'relative h-full w-full rounded p-4 text-center text-xl focus:z-10',
									intervalTimerSequence.currentSetIndex === i &&
										'border-neutral-700 bg-neutral-200 dark:border-neutral-300 dark:bg-neutral-800'
								])}
								disabled={lock.isEnabled}>{i + 1}. {set.name}</Button
							>
						</li>
					{/each}
				</ol>
			</div>
		</section>
	</div>
</div>
