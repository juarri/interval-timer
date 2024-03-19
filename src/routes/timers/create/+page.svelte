<script lang="ts">
	import type { PageData } from './$types';

	import Form from './form.svelte';

	export let data: PageData;

	// let { form } = $props<PageData>();
</script>

<Form schema={data.form} />
