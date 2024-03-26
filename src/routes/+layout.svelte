<script lang="ts">
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	import { Toaster } from '$lib/components/ui/sonner';

	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Interval Timers</title>
</svelte:head>

<ModeWatcher />

<Toaster />

<div class="flex min-h-screen flex-col">
	<Header user={data.user} />

	<div class="flex-1">
		<slot />
	</div>

	<Footer />
</div>
