<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from './formSchema';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	let { schema }: { schema: SuperValidated<FormSchema> } = $props();

	const form = superForm(schema, {
		dataType: 'json'
	});

	const { form: formData, constraints, enhance } = form;
</script>

<div class="px-4 py-8">
	<form method="POST" use:enhance class="mx-auto max-w-2xl">
		<!-- Title -->
		<Form.Field {form} name="title">
			<Form.Control let:attrs>
				<Form.Label>Title</Form.Label>
				<Input bind:value={$formData.title} {...$constraints.title} {...attrs} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Preperation Time -->
		<Form.Fieldset {form} name="preparationTime" class="flex gap-4">
			<Form.Legend class="mb-2 text-lg">Preparation</Form.Legend>

			<Form.Field {form} name="preparationTime.hours" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Hours</Form.Label>
					<Input
						type="number"
						bind:value={$formData.preparationTime.hours}
						{...attrs}
						{...$constraints.preparationTime?.hours}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="preparationTime.minutes" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Minutes</Form.Label>
					<Input
						type="number"
						bind:value={$formData.preparationTime.minutes}
						{...attrs}
						{...$constraints.preparationTime?.minutes}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="preparationTime.seconds" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Seconds</Form.Label>
					<Input
						type="number"
						bind:value={$formData.preparationTime.seconds}
						{...attrs}
						{...$constraints.preparationTime?.seconds}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Form.Fieldset>

		<!-- Work Time -->
		<Form.Fieldset {form} name="goTime" class="flex gap-4">
			<Form.Legend class="mb-2 text-lg">Work</Form.Legend>

			<Form.Field {form} name="goTime.hours" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Hours</Form.Label>
					<Input
						type="number"
						bind:value={$formData.goTime.hours}
						{...attrs}
						{...$constraints.goTime?.hours}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="goTime.minutes" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Minutes</Form.Label>
					<Input
						type="number"
						bind:value={$formData.goTime.minutes}
						{...attrs}
						{...$constraints.goTime?.minutes}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="goTime.seconds" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Seconds</Form.Label>
					<Input
						type="number"
						bind:value={$formData.goTime.seconds}
						{...attrs}
						{...$constraints.goTime?.seconds}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Form.Fieldset>

		<!-- Rest Time -->
		<Form.Fieldset {form} name="stopTime" class="flex gap-4">
			<Form.Legend class="mb-2 text-lg">Rest</Form.Legend>

			<Form.Field {form} name="stopTime.hours" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Hours</Form.Label>
					<Input
						type="number"
						bind:value={$formData.stopTime.hours}
						{...attrs}
						{...$constraints.stopTime?.hours}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="stopTime" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Minutes</Form.Label>
					<Input
						type="number"
						bind:value={$formData.stopTime.minutes}
						{...attrs}
						{...$constraints.stopTime?.minutes}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="stopTime.seconds" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Seconds</Form.Label>
					<Input
						type="number"
						bind:value={$formData.stopTime.seconds}
						{...attrs}
						{...$constraints.stopTime?.seconds}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Form.Fieldset>

		<!-- Cooldown Time -->
		<Form.Fieldset {form} name="cooldownTime" class="flex gap-4">
			<Form.Legend class="mb-2 text-lg">Cooldown</Form.Legend>

			<Form.Field {form} name="cooldownTime.hours" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Hours</Form.Label>
					<Input
						type="number"
						bind:value={$formData.cooldownTime.hours}
						{...attrs}
						{...$constraints.cooldownTime?.seconds}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="cooldownTime.minutes" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Minutes</Form.Label>
					<Input
						type="number"
						bind:value={$formData.cooldownTime.minutes}
						{...attrs}
						{...$constraints.cooldownTime?.minutes}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="cooldownTime.seconds" class="!mt-0">
				<Form.Control let:attrs>
					<Form.Label>Seconds</Form.Label>
					<Input
						type="number"
						bind:value={$formData.cooldownTime.seconds}
						{...attrs}
						{...$constraints.cooldownTime?.seconds}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Form.Fieldset>

		<!-- Intervals -->
		<Form.Field {form} name="intervals">
			<Form.Control let:attrs>
				<Form.Label>intervals</Form.Label>
				<Input
					type="number"
					bind:value={$formData.intervals}
					{...attrs}
					{...$constraints.intervals}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button>Create</Form.Button>
	</form>
</div>
