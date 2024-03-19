<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import { readableDuration } from '$lib/utils/duration';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section class="relative mt-8 h-full">
	<div class="mx-auto px-8">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#if data.intervalTimers}
				{#each data.intervalTimers as intervalTimer}
					{@const totalTime =
						intervalTimer.preparationTime +
						(intervalTimer.goTime + intervalTimer.stopTime) * 2 +
						intervalTimer.cooldownTime}

					{@const labels = [
						{
							label: 'Total Time',
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
							label: 'Work',
							value: readableDuration(intervalTimer.goTime)
						},
						{
							label: 'Rest',
							value: readableDuration(intervalTimer.stopTime)
						},
						{
							label: 'Cooldown',
							value: readableDuration(intervalTimer.cooldownTime)
						}
					]}

					<a href={`/timers/${intervalTimer.id}`}>
						<Card.Root>
							<Card.Header>
								<Card.Title tag="h3">
									{intervalTimer.title}
								</Card.Title>
							</Card.Header>
							<Card.Content>
								<ul class="space-y-2">
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
					</a>
				{/each}
			{/if}
		</div>
	</div>
</section>
