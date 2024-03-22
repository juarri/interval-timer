<script lang="ts">
	// import { browser } from '$app/environment';

	import { createIntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';
	import { createToggle } from '$lib/states/local/toggle.svelte';

	import Desktop from './desktop.svelte';
	import Mobile from './mobile.svelte';

	import type { IntervalTimer } from '$lib/server/db/schema';

	import type { PageData } from './$types';
	import type { IntervalTimerFormSchema } from '$lib/components/form/intervalTimer';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let data: PageData;

	let intervalTimerFormSchema =
		data.intervalTimerFormSchema as SuperValidated<IntervalTimerFormSchema>;
	let intervalTimer = data.intervalTimer as IntervalTimer;

	let lock = createToggle(false);
	let intervalTimerSequence = createIntervalTimerSequence(data.intervalTimer as IntervalTimer);
</script>

<svelte:head>
	<title
		>{intervalTimerSequence.displayTimerTimeRemaining} - {intervalTimerSequence.currentSet.name} - {data
			.intervalTimer?.title}</title
	>
</svelte:head>

<main>
	<div class="h-full lg:hidden">
		<Mobile {intervalTimerFormSchema} {intervalTimer} {intervalTimerSequence} {lock} />
	</div>

	<div class="hidden h-full lg:block" style="height: calc(100dvh - 56px);">
		<Desktop {intervalTimerFormSchema} {intervalTimer} {intervalTimerSequence} {lock} />
	</div>
</main>
