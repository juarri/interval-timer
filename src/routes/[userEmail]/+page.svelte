<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';

	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';

	import { debounce } from '$lib/utils/debounce';

	import Grid from './grid.svelte';
	import List from './list.svelte';

	import { CreateIntervalTimerForm } from '$lib/components/form/intervalTimer';

	import {
		AdjustmentsHorizontal,
		Clock,
		Icon,
		ListBullet,
		Pencil,
		Plus,
		Squares2x2,
		Tag,
		XMark
	} from 'svelte-hero-icons';

	export let data: PageData;

	function setQueryParameter(paramName: string, paramValue: string) {
		if (browser) {
			const url = new URL(window.location.href);

			url.searchParams.set(paramName, paramValue);

			goto(url.toString());
		}
	}

	const sortByOptions = [
		{ parameter: { name: 'sortBy', value: 'title' }, icon: Tag },
		{ parameter: { name: 'sortBy', value: 'accessed' }, icon: Clock },
		{ parameter: { name: 'sortBy', value: 'updated' }, icon: Pencil }
	];

	const viewOptions = [
		{ parameter: { name: 'view', value: 'list' }, icon: ListBullet },
		{ parameter: { name: 'view', value: 'grid' }, icon: Squares2x2 }
	];

	const debouncedInputChange = debounce((value) => {
		let url = new URL(window.location.href);
		url.searchParams.set('query', value);
		goto(url.toString());
	}, 1000);

	let timeoutId: ReturnType<typeof setTimeout>;

	onMount(() => {
		return () => clearTimeout(timeoutId);
	});
</script>

<svelte:head>
	<title>{data.user?.email} - Interval Timers</title>
</svelte:head>

<section>
	<div class="container mt-8">
		<form class="flex gap-4">
			<Input
				placeholder="Search timers..."
				oninput={(e) => debouncedInputChange((e.target as HTMLInputElement).value)}
			/>

			<Select.Root>
				<Select.Trigger class="hidden w-72 lg:flex">
					<Select.Value placeholder="Sort by {data.dashboard?.sortBy}" />
				</Select.Trigger>
				<Select.Content class="mt-4">
					<Select.Group>
						{#each sortByOptions as sortByOption}
							<Select.Item
								value={sortByOption.parameter.value}
								label="Sort by {sortByOption.parameter.value}"
								class="p-2"
								onclick={() => {
									setQueryParameter(sortByOption.parameter.name, sortByOption.parameter.value);
								}}>Sort by {sortByOption.parameter.value}</Select.Item
							>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>

			<div class="hidden gap-4 lg:flex">
				{#each viewOptions as viewOption}
					<Button
						aria-label={viewOption.parameter.value}
						variant="outline"
						class="p-2"
						onclick={() => {
							setQueryParameter(viewOption.parameter.name, viewOption.parameter.value);
						}}><Icon src={viewOption.icon} class="pointer-events-none size-4" /></Button
					>
				{/each}
			</div>

			<Drawer.Root>
				<Drawer.Trigger asChild let:builder>
					<Button
						aria-label="Dashboard Settings"
						builders={[builder]}
						variant="outline"
						class="lg:hidden"><Icon src={AdjustmentsHorizontal} class="size-5" /></Button
					>
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Dashboard Options</Drawer.Title>
					</Drawer.Header>
					<div class="flex flex-col gap-4">
						{#each sortByOptions as sortByOption}
							<Button
								class="flex"
								variant="link"
								onclick={() => {
									setQueryParameter(sortByOption.parameter.name, sortByOption.parameter.value);
								}}
								><Icon src={sortByOption.icon} class="mr-2 w-fit" />
								<span class="flex-1">{sortByOption.parameter.value}</span>
							</Button>
						{/each}

						<Separator />

						{#each viewOptions as viewOption}
							<Button
								variant="link"
								onclick={() => {
									setQueryParameter(viewOption.parameter.name, viewOption.parameter.value);
								}}
								><Icon src={viewOption.icon} class="pointer-events-none mr-2 w-fit" /><span
									class="flex-1">{viewOption.parameter.value}</span
								>
							</Button>
						{/each}
					</div>

					<Drawer.Footer>
						<Button>Submit</Button>
						<Drawer.Close>Cancel</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>

			<AlertDialog.Root closeOnOutsideClick={true}>
				<AlertDialog.Trigger asChild let:builder>
					<Button aria-label="Create Timer" builders={[builder]}
						><span class="hidden lg:inline">Create Timer</span>
						<Icon src={Plus} /></Button
					>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<div class="flex items-center justify-between">
							<AlertDialog.Title>Update Timer</AlertDialog.Title>
							<AlertDialog.Cancel aria-label="Close Dialog"><Icon src={XMark} /></AlertDialog.Cancel
							>
						</div>
					</AlertDialog.Header>
					{#if data.intervalTimerFormSchema}
						<CreateIntervalTimerForm intervalTimerFormSchema={data.intervalTimerFormSchema} />
					{/if}
				</AlertDialog.Content>
			</AlertDialog.Root>
		</form>
	</div>
</section>

{#if data.intervalTimers && data.dashboard}
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
								<AlertDialog.Cancel aria-label="Close Dialog"
									><Icon src={XMark} /></AlertDialog.Cancel
								>
							</div>
						</AlertDialog.Header>
						<CreateIntervalTimerForm intervalTimerFormSchema={data.intervalTimerFormSchema} />
					</AlertDialog.Content>
				</AlertDialog.Root>
			</div>
		</section>
	{/if}

	{#if data.intervalTimers.length > 0}
		<section>
			<div class="container py-8">
				{#if data.dashboard.view === 'grid'}
					<Grid
						intervalTimers={data.intervalTimers}
						intervalTimerFormSchema={data.intervalTimerFormSchema}
					/>
				{:else if data.dashboard.view === 'list'}
					<List
						intervalTimers={data.intervalTimers}
						intervalTimerFormSchema={data.intervalTimerFormSchema}
					/>
				{:else}
					<Grid
						intervalTimers={data.intervalTimers}
						intervalTimerFormSchema={data.intervalTimerFormSchema}
					/>
				{/if}
			</div>
		</section>
	{/if}
{/if}
