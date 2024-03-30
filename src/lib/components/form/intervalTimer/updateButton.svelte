<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Cog6Tooth, Icon, XMark } from 'svelte-hero-icons';
	import { UpdateIntervalTimerForm, type IntervalTimerFormSchema } from '.';
	import type { IntervalTimer } from '$lib/server/db/schema';
	import type { SuperValidated } from 'sveltekit-superforms';

	type Props = {
		intervalTimer: IntervalTimer;
		intervalTimerFormSchema: SuperValidated<IntervalTimerFormSchema>;
	};

	let { intervalTimer, intervalTimerFormSchema }: Props = $props();
</script>

<AlertDialog.Root closeOnOutsideClick={true}>
	<AlertDialog.Trigger asChild let:builder>
		<Button aria-label="Timer Settings" builders={[builder]} variant="outline" class="relative z-20"
			><Icon src={Cog6Tooth} class="size-4" /></Button
		>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<div class="flex items-center justify-between">
				<AlertDialog.Title>Update Timer</AlertDialog.Title>
				<AlertDialog.Cancel aria-label="Close Dialog"><Icon src={XMark} /></AlertDialog.Cancel>
			</div>
		</AlertDialog.Header>
		<UpdateIntervalTimerForm schema={intervalTimerFormSchema} initialData={intervalTimer} />
	</AlertDialog.Content>
</AlertDialog.Root>
