<script lang="ts">
	import type { IntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';

	import { fit, parent_style } from '@leveluptuts/svelte-fit';

	import { timerDuration } from '$lib/utils/duration';

	type Props = {
		intervalTimerSequence: IntervalTimerSequence;
	};

	let { intervalTimerSequence }: Props = $props();

	const displayTotalTimeRemaining = $derived(
		timerDuration(intervalTimerSequence.totalTimeRemaining)
	);
	const displayTimerTimeRemaining = $derived(
		timerDuration(intervalTimerSequence.timer.remainingTime)
	);
</script>

<div class="flex h-full flex-col">
	<div class="h-32">
		{#key displayTotalTimeRemaining}
			<div style={parent_style} class="grid place-content-center">
				<p class="text-center leading-none" use:fit={{ min_size: 32, max_size: 1200 }}>
					{displayTotalTimeRemaining}
				</p>
			</div>
		{/key}
	</div>

	{#key displayTimerTimeRemaining}
		<div style={parent_style} class="grid place-content-center">
			<p class="text-center leading-none" use:fit={{ min_size: 72, max_size: 1200 }}>
				{displayTimerTimeRemaining}
			</p>
		</div>
	{/key}
</div>
