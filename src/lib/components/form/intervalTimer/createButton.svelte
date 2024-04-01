<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Icon, Plus, XMark } from 'svelte-hero-icons';
	import { type IntervalTimerFormSchema, CreateIntervalTimerForm } from '.';
	import type { SuperValidated } from 'sveltekit-superforms';

	type Props = {
		intervalTimerFormSchema: SuperValidated<IntervalTimerFormSchema>;
	};

	let { intervalTimerFormSchema }: Props = $props();
</script>

<AlertDialog.Root closeOnOutsideClick={true}>
	<AlertDialog.Trigger asChild let:builder>
		<Button builders={[builder]} class="mx-auto flex"
			>Create Timer <Icon src={Plus} class="ml-2 h-4 w-4" /></Button
		>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<div class="flex items-center justify-between">
				<AlertDialog.Title>Create Timer</AlertDialog.Title>
				<AlertDialog.Cancel aria-label="Close Dialog"><Icon src={XMark} /></AlertDialog.Cancel>
			</div>
		</AlertDialog.Header>
		<CreateIntervalTimerForm {intervalTimerFormSchema} />
	</AlertDialog.Content>
</AlertDialog.Root>
