<script lang="ts">
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<ModeWatcher />

<Header user={data.user} />

<div class="flex-1">
	<slot />
</div>

<Footer />
