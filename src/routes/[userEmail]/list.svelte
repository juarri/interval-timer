<script lang="ts">
	import type { IntervalTimer } from '$lib/server/db/schema';
	import { readableDuration } from '$lib/utils/duration';
	import { calculateTotalRoutineTime } from '$lib/utils/intervalTimer';

	import * as Card from '$lib/components/ui/card';
	import {
		UpdateIntervalTimerButton,
		type IntervalTimerFormSchema
	} from '$lib/components/form/intervalTimer';
	import type { SuperValidated } from 'sveltekit-superforms';

	type Props = {
		intervalTimers: IntervalTimer[];
		intervalTimerFormSchema: SuperValidated<IntervalTimerFormSchema>;
	};

	let { intervalTimers, intervalTimerFormSchema }: Props = $props();
</script>

<div class="flex flex-col gap-8">
	{#each intervalTimers as intervalTimer}
		{@const totalTime = calculateTotalRoutineTime(intervalTimer)}

		{@const labels = [
			{
				label: 'Time',
				value: readableDuration(totalTime)
			},
			{
				label: 'Intervals',
				value: intervalTimer.intervals
			},
			{
				label: 'Preparation',
				value: readableDuration(intervalTimer.preparationTime)
			},
			{
				label: 'Recovery',
				value: readableDuration(intervalTimer.cooldownTime)
			},
			{
				label: 'Work',
				value: readableDuration(intervalTimer.goTime)
			},
			{
				label: 'Rest',
				value: readableDuration(intervalTimer.stopTime)
			}
		]}

		<Card.Root
			class="relative p-6 transition-all  hover:border-black dark:bg-neutral-950 dark:hover:border-white md:flex-row md:py-4 "
		>
			<a
				href="/timers/{intervalTimer.id}"
				aria-label="Open {intervalTimer.title}"
				class="absolute inset-0 z-10 rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			>
			</a>

			<div
				class="flex flex-col flex-wrap items-center justify-between gap-6 md:grid md:grid-cols-4 md:flex-row md:place-content-center"
			>
				<div class="flex w-full items-center justify-between md:w-fit">
					<Card.Title tag="h3">
						{intervalTimer.title}
					</Card.Title>

					<div class="md:hidden">
						<UpdateIntervalTimerButton {intervalTimer} {intervalTimerFormSchema} />
					</div>
				</div>

				<Card.Description class="w-full text-left">{intervalTimer.description}</Card.Description>

				<ul class="grid w-full grid-cols-2 gap-2">
					{#each labels as label}
						<li>
							<p>
								<span class="text-sm font-medium leading-none">{label.label}: </span>
								<span class="text-sm text-muted-foreground">{label.value}</span>
							</p>
						</li>
					{/each}
				</ul>

				<div class="hidden place-content-center md:grid">
					<UpdateIntervalTimerButton {intervalTimer} {intervalTimerFormSchema} />
				</div>
			</div>
		</Card.Root>
	{/each}
</div>
