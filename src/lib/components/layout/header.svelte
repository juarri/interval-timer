<script lang="ts">
	import Logo from '$lib/components/logo.svelte';

	import * as Sheet from '$lib/components/ui/sheet';

	import ThemePicker from '$lib/components/theme-picker.svelte';
	import UserNav from '$lib/components/user-nav.svelte';

	import { Icon, Bars3 } from 'svelte-hero-icons';

	import type { User } from '$lib/server/db/schema';

	export let user: User | null;

	const navItems = [
		{
			name: 'Create',
			href: '/timers/create'
		}
	];
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center justify-between">
		<div class="mr-4 hidden md:flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<div class="hidden sm:block"><Logo /></div>
			</a>

			<nav class="flex items-center gap-6 text-sm">
				{#each navItems as navItem}
					<a
						href={navItem.href}
						class="text-foreground/60 transition-colors hover:text-foreground/80">{navItem.name}</a
					>
				{/each}
			</nav>
		</div>

		<Sheet.Root>
			<Sheet.Trigger class="md:hidden">
				<Icon src={Bars3} size="24" />
				<p class="sr-only">Toggle Menu</p>
			</Sheet.Trigger>

			<Sheet.Content side="left">
				<Sheet.Header>
					<Sheet.Title class="text-left">
						<Sheet.Close>
							<a href="/">
								<Logo />
							</a>
						</Sheet.Close>
					</Sheet.Title>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>

		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<div></div>

			<nav class="flex items-center gap-6">
				<ThemePicker />
				<UserNav {user} />
			</nav>
		</div>
	</div>
</header>
