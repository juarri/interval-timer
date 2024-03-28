<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import {
		UpdateIntervalTimerForm,
		CreateIntervalTimerForm
	} from '$lib/components/form/intervalTimer';

	import { Icon, Cog6Tooth, XMark, Plus } from 'svelte-hero-icons';

	import { readableDuration } from '$lib/utils/duration';
	import { calculateTotalRoutineTime } from '$lib/utils/intervalTimer';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.user?.email} - Interval Timers</title>
</svelte:head>

{#if data.intervalTimers.length === 0}
	<section>
		<div class="container mt-24 h-3/4">
			<h1 class="text-balance text-center text-3xl">You don't have any timers yet...</h1>

			<AlertDialog.Root closeOnOutsideClick={true}>
				<AlertDialog.Trigger asChild let:builder>
					<Button builders={[builder]} class="mx-auto mt-52 flex"
						>Create Timer <Icon src={Plus} class="ml-2 h-4 w-4" /></Button
					>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<div class="flex items-center justify-between">
							<AlertDialog.Title>Create Timer</AlertDialog.Title>
							<AlertDialog.Cancel aria-label="Close Dialog"><Icon src={XMark} /></AlertDialog.Cancel
							>
						</div>
					</AlertDialog.Header>
					<CreateIntervalTimerForm schema={data.form} />
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	</section>
{/if}

{#if data.intervalTimers.length > 0}
	<section>
		<div class="container py-8">
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<AlertDialog.Root closeOnOutsideClick={true}>
					<AlertDialog.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							class="relative size-full text-lg transition-all hover:border-black dark:bg-neutral-950 dark:hover:border-white"
							variant="outline">Create Timer <Icon src={Plus} class="ml-2 size-5" /></Button
						>
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<div class="flex items-center justify-between">
								<AlertDialog.Title>Create Timer</AlertDialog.Title>
								<AlertDialog.Cancel aria-label="Close Dialog"
									><Icon src={XMark} /></AlertDialog.Cancel
								>
							</div>
						</AlertDialog.Header>
						<CreateIntervalTimerForm schema={data.form} />
					</AlertDialog.Content>
				</AlertDialog.Root>

				{#each data.intervalTimers as intervalTimer}
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
						class="relative size-full transition-all hover:border-black dark:bg-neutral-950 dark:hover:border-white"
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

								<AlertDialog.Root closeOnOutsideClick={true}>
									<AlertDialog.Trigger asChild let:builder>
										<Button
											aria-label="Timer Settings"
											builders={[builder]}
											variant="outline"
											class="relative z-20"><Icon src={Cog6Tooth} class="size-4" /></Button
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
		</div>
	</section>
{/if}
