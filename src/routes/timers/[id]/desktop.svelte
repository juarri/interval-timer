<script lang="ts">
	import type { IntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';
	import type { Toggle } from '$lib/states/local/toggle.svelte';
	import type { IntervalTimer } from '$lib/server/db/schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { type IntervalTimerFormSchema } from '$lib/components/form/intervalTimer';
	import Sequence from './sequence.svelte';
	import Buttons from './buttons.svelte';
	import Timers from './timers.svelte';

	type Props = {
		intervalTimerFormSchema: SuperValidated<IntervalTimerFormSchema>;
		intervalTimer: IntervalTimer;
		intervalTimerSequence: IntervalTimerSequence;
		lock: Toggle;
	};

	let { intervalTimerFormSchema, intervalTimer, intervalTimerSequence, lock }: Props = $props();
</script>

<div class="grid h-full grid-cols-2 gap-4">
	<section class="px-8 py-8">
		<Timers {intervalTimerSequence} />
	</section>

	<section class="overflow-scroll px-8 py-8">
		<Sequence {intervalTimerSequence} {lock} />
	</section>

	<section class="sticky top-0 z-50 col-span-2 w-full border-b border-t bg-background py-6">
		<div class="container flex max-w-screen-2xl items-center justify-between">
			<Buttons {intervalTimer} {intervalTimerSequence} {intervalTimerFormSchema} {lock} />
		</div>
	</section>
</div>
