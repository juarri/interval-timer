<script lang="ts">
	import { CreateIntervalTimerForm } from '$lib/components/form/intervalTimer';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Kappa</h1>

<CreateIntervalTimerForm schema={data.form} />
