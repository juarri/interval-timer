<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import { Icon, UserPlus } from 'svelte-hero-icons';

	import type { User } from '$lib/server/db/schema';
	export let user: User | null;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative size-8 rounded-full">
			<Avatar.Root class="size-8">
				<Avatar.Image src={user?.picture} alt={`${user?.firstName}'s Profile Picture'`} />
				<Avatar.Fallback><Icon src={UserPlus} size="16" /></Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-56" align="end">
		{#if user}
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
					<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
				</div>
			</DropdownMenu.Label>

			<DropdownMenu.Separator />

			<DropdownMenu.Item href="/auth/logout" class="hover:cursor-pointer">Log out</DropdownMenu.Item
			>
		{:else}
			<DropdownMenu.Item href="/auth/login" itemtype="">
				Log in
				<!-- <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut> -->
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
