<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { SuperValidated } from 'sveltekit-superforms';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';

	import type { IntervalTimerFormSchema } from '$lib/components/form/intervalTimer/';

	type Props = {
		schema: SuperValidated<IntervalTimerFormSchema>;
	};

	let { schema }: Props = $props();

	function currentTime() {
		const now = Date.now();
		const formatter = new Intl.DateTimeFormat('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		});
		return formatter.format(now);
	}

	const form = superForm(schema, {
		dataType: 'json',
		onUpdated({ form }) {
			if (form.valid) {
				formData.set(form.data);

				toast.success('Timer has been updated.', {
					description: currentTime(),
					action: {
						label: 'Undo',
						onClick: () => {}
					}
				});
			}
		}
	});

	const { form: formData, constraints, enhance } = form;

	type formFields = 'preparationTime' | 'goTime' | 'stopTime' | 'cooldownTime';
	type formFieldSet = { label: string; value: formFields };

	const durationFieldSets: formFieldSet[] = [
		{ label: 'Preparation', value: 'preparationTime' },
		{ label: 'Work', value: 'goTime' },
		{ label: 'Rest', value: 'stopTime' },
		{ label: 'Cooldown', value: 'cooldownTime' }
	];
</script>

<form
	method="POST"
	id="create-interval-timer-form"
	action={'/timers?/createIntervalTimer'}
	use:enhance
>
	<!-- Title -->
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input bind:value={$formData.title} {...$constraints.title} {...attrs} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Description -->
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Input bind:value={$formData['description']} {...$constraints.description} {...attrs} />
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
							<Form.Label>Hours:</Form.Label>
							<Input
								class="w-20 border-x-0 border-b border-t-0"
								type="number"
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
							<Form.Label>Minutes:</Form.Label>
							<Input
								class="w-20 border-x-0 border-b border-t-0"
								type="number"
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
							<Form.Label>Seconds:</Form.Label>
							<Input
								class="w-20 border-x-0 border-b border-t-0"
								type="number"
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
				bind:value={$formData.intervals}
				{...attrs}
				{...$constraints.intervals}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="mt-4 flex justify-between">
		<Form.Button type="submit">Create</Form.Button>
	</div>
</form>
