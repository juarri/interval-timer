<script lang="ts">
	import type { PageData } from './$types';

	import { createIntervalTimerSequence } from '$lib/states/local/intervalTimerSequence.svelte';
	import { createToggle } from '$lib/states/local/toggle.svelte';

	import Desktop from './desktop.svelte';
	import Mobile from './mobile.svelte';

	import timerDuration from '$lib/utils/duration/timerDuration';

	import { Howl } from 'howler';

	export let data: PageData;

	let intervalTimerFormSchema = data.intervalTimerFormSchema;
	let intervalTimer = data.intervalTimer;

	let lock = createToggle(false);
	let intervalTimerSequence = createIntervalTimerSequence(intervalTimer);

	$: displayTimerTimeRemaining = timerDuration(intervalTimerSequence.timer.remainingTime);

	const sound = new Howl({
		src: ['/sounds/boop.wav']
	});

	intervalTimerSequence.timer.onSecondPassed(() => {
		const isAboutToEnd = intervalTimerSequence.timer.remainingTime.seconds <= 3;

		if (isAboutToEnd) {
			sound.play();
		}
	});

	intervalTimerSequence.timer.onComplete(() => {
		const isEvenSet = intervalTimerSequence.sets.length % 2 === 0;

		if (isEvenSet) {
			sound.play();
		} else {
			sound.play();
		}
	});
</script>

<svelte:head>
	<title
		>{displayTimerTimeRemaining} - {intervalTimerSequence.currentSet.name} - {intervalTimer?.title}
		- Interval Timers</title
	>
</svelte:head>

<main>
	<div class="relative h-full lg:hidden">
		<Mobile {intervalTimerFormSchema} {intervalTimer} {intervalTimerSequence} {lock} />
	</div>

	<div class="relative hidden h-full lg:block" style="height: calc(100dvh - 56px);">
		<Desktop {intervalTimerFormSchema} {intervalTimer} {intervalTimerSequence} {lock} />
	</div>
</main>
