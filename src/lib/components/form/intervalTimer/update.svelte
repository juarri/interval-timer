<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { SuperValidated } from 'sveltekit-superforms';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';

	import { durationFieldSets } from '$lib/components/form/intervalTimer/';
	import type { IntervalTimerFormSchema } from '$lib/components/form/intervalTimer/';
	import type { IntervalTimer } from '$lib/server/db/schema';

	import { secondsToDuration } from '$lib/utils/duration';
	import { Icon, Trash } from 'svelte-hero-icons';

	import { currentTime } from '$lib/utils/time';

	type Props = {
		schema: SuperValidated<IntervalTimerFormSchema>;
		initialData: IntervalTimer;
	};

	let { schema, initialData }: Props = $props();

	const form = superForm(schema, {
		dataType: 'json',
		onUpdated({ form }) {
			if (form.valid) {
				formData.set(form.data);

				toast.success('Timer has been updated.', {
					description: currentTime(),
					dismissable: true
				});
			}
		}
	});

	const { form: formData, constraints, enhance } = form;

	formData.set({
		title: initialData.title,
		description: initialData.description,
		preparationTime: {
			hours: secondsToDuration(initialData.preparationTime).hours,
			minutes: secondsToDuration(initialData.preparationTime).minutes,
			seconds: secondsToDuration(initialData.preparationTime).seconds
		},
		goTime: {
			hours: secondsToDuration(initialData.goTime).hours,
			minutes: secondsToDuration(initialData.goTime).minutes,
			seconds: secondsToDuration(initialData.goTime).seconds
		},
		stopTime: {
			hours: secondsToDuration(initialData.stopTime).hours,
			minutes: secondsToDuration(initialData.stopTime).minutes,
			seconds: secondsToDuration(initialData.stopTime).seconds
		},
		cooldownTime: {
			hours: secondsToDuration(initialData.cooldownTime).hours,
			minutes: secondsToDuration(initialData.cooldownTime).minutes,
			seconds: secondsToDuration(initialData.cooldownTime).seconds
		},
		intervals: initialData.intervals
	});
</script>

<form
	method="POST"
	id="update-interval-timer-form"
	action="/interval-timer/{initialData.id}?/update"
	use:enhance
>
	<!-- Title -->
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input
				placeholder={initialData.title}
				bind:value={$formData.title}
				{...$constraints.title}
				{...attrs}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Description -->
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Input
				placeholder={initialData.description}
				bind:value={$formData['description']}
				{...$constraints.description}
				{...attrs}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Duration Fieldsets -->
	{#each durationFieldSets as durationFieldSet}
		<Form.Fieldset {form} name={durationFieldSet.value} class="flex gap-4">
			<Form.Legend>{durationFieldSet.label}</Form.Legend>

			<div class="flex w-full justify-between">
				<Form.Field {form} name="{durationFieldSet.value}.hours" class="!mt-0">
					<Form.Control let:attrs>
						<div class="flex items-center gap-4">
							<Form.Label>H:</Form.Label>
							<Input
								class="w-20 border-x-0 border-b border-t-0"
								type="number"
								placeholder={secondsToDuration(
									initialData?.[durationFieldSet.value]
								).hours.toString()}
								bind:value={$formData[durationFieldSet.value].hours}
								{...attrs}
								{...$constraints?.[durationFieldSet.value]?.hours}
							/>
						</div>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="{durationFieldSet.value}.minutes" class="!mt-0">
					<Form.Control let:attrs>
						<div class="flex items-center gap-4">
							<Form.Label>M:</Form.Label>
							<Input
								class="w-20 border-x-0 border-b border-t-0"
								type="number"
								placeholder={secondsToDuration(
									initialData?.[durationFieldSet.value]
								).minutes.toString()}
								bind:value={$formData[durationFieldSet.value].minutes}
								{...attrs}
								{...$constraints?.[durationFieldSet.value]?.minutes}
							/>
						</div>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="{durationFieldSet.value}.seconds" class="!mt-0">
					<Form.Control let:attrs>
						<div class="flex items-center gap-4">
							<Form.Label>S:</Form.Label>
							<Input
								class="w-20 border-x-0 border-b border-t-0"
								type="number"
								placeholder={secondsToDuration(
									initialData?.[durationFieldSet.value]
								).seconds.toString()}
								bind:value={$formData[durationFieldSet.value].seconds}
								{...attrs}
								{...$constraints?.[durationFieldSet.value]?.seconds}
							/>
						</div>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
		</Form.Fieldset>
	{/each}

	<!-- Intervals -->
	<Form.Field {form} name="intervals">
		<Form.Control let:attrs>
			<Form.Label>Intervals</Form.Label>
			<Input
				type="number"
				placeholder={initialData.intervals.toString()}
				bind:value={$formData.intervals}
				{...attrs}
				{...$constraints.intervals}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="mt-4 flex justify-between">
		<Form.Button type="submit">Update</Form.Button>
		<Form.Button
			aria-label="Delete Timer"
			formaction="/interval-timer/{initialData.id}?/delete"
			variant="destructive"><Icon src={Trash} /></Form.Button
		>
	</div>
</form>
