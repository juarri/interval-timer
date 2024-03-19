<script lang="ts">
	import { setMode, resetMode } from 'mode-watcher';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	import { Icon, Sun, Moon } from 'svelte-hero-icons';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon" class="size-8 rounded-full">
			<Icon
				src={Sun}
				size="20"
				class="dark:-roate-90 rotate-0 scale-100 transition-all dark:scale-0"
				solid
			/>

			<Icon
				src={Moon}
				size="20"
				class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				solid
			/>

			<span class="sr-only">Change theme</span>
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
