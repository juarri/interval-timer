<script lang="ts">
	import { CreateIntervalTimerForm } from '$lib/components/form/intervalTimer';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<CreateIntervalTimerForm schema={data.form} />
