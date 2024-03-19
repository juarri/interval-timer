<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="sr-only">Timers</h1>

<main>
	<section class="container flex h-14 max-w-screen-2xl items-center">
		{#if data.intervalTimers}
			<ul class="flex flex-col gap-2">
				{#each data.intervalTimers as timer}
					<li class="rounded bg-slate-200">
						<a
							href="/timers/{timer.id}"
							aria-label={timer.title}
							class="block h-full w-full px-4 py-4"
						>
							<h2 class="mb-4 text-lg font-bold">{timer.title}</h2>
							<ul class="text-slate-700">
								<li>Prepare: {timer.preparationTime}s</li>
								<li>Go: {timer.goTime}s</li>
								<li>Stop {timer.stopTime}s</li>
								<li>Cooldown {timer.cooldownTime}s</li>
								<li>Intervals: {timer.intervals}</li>
								<li>Total: 30:05 - 90 intervals</li>
							</ul>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</main>
