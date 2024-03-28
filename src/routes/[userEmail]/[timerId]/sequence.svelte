<script lang="ts">
	import { cn } from '$lib/utils';

	import type { IntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';
	import type { Toggle } from '$lib/states/local/toggle.svelte';

	import { Button } from '$lib/components/ui/button';

	type Props = {
		intervalTimerSequence: IntervalTimerSequence;
		lock: Toggle;
	};

	let { intervalTimerSequence, lock }: Props = $props();
</script>

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
