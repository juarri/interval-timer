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
				label: 'Total',
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
			class="relative flex size-full flex-col justify-between transition-all hover:border-black dark:bg-neutral-950 dark:hover:border-white md:flex-row"
		>
			<a
				href="/timers/{intervalTimer.id}"
				aria-label="Open {intervalTimer.title}"
				class="absolute inset-0 z-10 rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			>
			</a>
			<Card.Header>
				<div class="flex items-center justify-between">
					<Card.Title tag="h3">
						{intervalTimer.title}
					</Card.Title>

					<UpdateIntervalTimerButton {intervalTimer} {intervalTimerFormSchema} />
				</div>

				<Card.Description>{intervalTimer.description}</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="grid grid-cols-2 gap-y-2">
					{#each labels as label}
						<li>
							<p>
								<span class="text-sm font-medium leading-none">{label.label}: </span>
								<span class="text-sm text-muted-foreground">{label.value}</span>
							</p>
						</li>
					{/each}
				</ul>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
