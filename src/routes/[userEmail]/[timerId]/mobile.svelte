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

<section
	class="sticky top-14 z-50 w-full border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<Timers {intervalTimerSequence} />
</section>

<section class="container">
	<Sequence {intervalTimerSequence} {lock} />
</section>

<section
	class="sticky bottom-0 z-50 w-full border-t border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container max-w-screen-2xl">
		<Buttons {intervalTimer} {intervalTimerSequence} {intervalTimerFormSchema} {lock} />
	</div>
</section>
