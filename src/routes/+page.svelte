<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import { UpdateIntervalTimerForm } from '$lib/components/form/intervalTimer';

	import { Icon, Cog6Tooth, XMark } from 'svelte-hero-icons';

	import { readableDuration } from '$lib/utils/duration';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section class="relative mt-8 h-full">
	<div class="mx-auto px-8">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#if data.intervalTimers}
				{#each data.intervalTimers as intervalTimer}
					{@const totalTime =
						intervalTimer.preparationTime +
						(intervalTimer.goTime + intervalTimer.stopTime) * 2 +
						intervalTimer.cooldownTime}

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

					<Card.Root>
						<Card.Header>
							<Card.Title tag="h3">
								{intervalTimer.title}
							</Card.Title>
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
						<Card.Footer class="flex justify-between">
							<Button href="/timers/{intervalTimer.id}" aria-label="Use {intervalTimer.title} Timer"
								>Use Timer</Button
							>
							<AlertDialog.Root closeOnOutsideClick={true}>
								<AlertDialog.Trigger asChild let:builder>
									<Button aria-label="Timer Settings" builders={[builder]} variant="outline"
										><Icon src={Cog6Tooth} /></Button
									>
								</AlertDialog.Trigger>
								<AlertDialog.Content>
									<AlertDialog.Header>
										<div class="flex items-center justify-between">
											<AlertDialog.Title>Update Timer</AlertDialog.Title>
											<AlertDialog.Cancel aria-label="Close Dialog"
												><Icon src={XMark} /></AlertDialog.Cancel
											>
										</div>
									</AlertDialog.Header>
									<UpdateIntervalTimerForm schema={data.form} initialData={intervalTimer} />
								</AlertDialog.Content>
							</AlertDialog.Root>
						</Card.Footer>
					</Card.Root>
				{/each}
			{/if}
		</div>
	</div>
</section>
