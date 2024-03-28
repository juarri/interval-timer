<script lang="ts">
	import type { IntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';

	import { fit, parent_style } from '@leveluptuts/svelte-fit';

	type Props = {
		intervalTimerSequence: IntervalTimerSequence;
	};

	let { intervalTimerSequence }: Props = $props();
</script>

<div class="flex h-full flex-col">
	<div class="h-32">
		{#key intervalTimerSequence.displayTotalTimeRemaining}
			<div style={parent_style} class="grid place-content-center">
				<p class="text-center leading-none" use:fit={{ min_size: 32, max_size: 1200 }}>
					{intervalTimerSequence.displayTotalTimeRemaining}
				</p>
			</div>
		{/key}
	</div>

	{#key intervalTimerSequence.displayTimerTimeRemaining}
		<div style={parent_style} class="grid place-content-center">
			<p class="text-center leading-none" use:fit={{ min_size: 72, max_size: 1200 }}>
				{intervalTimerSequence.displayTimerTimeRemaining}
			</p>
		</div>
	{/key}
</div>
