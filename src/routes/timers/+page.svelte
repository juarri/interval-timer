<script>
	// import { Button } from '$lib/components/ui/button';

	let timers = $state([
		{ id: 1, name: 'Timer 1' },
		{ id: 2, name: 'Timer 2' },
		{ id: 3, name: 'Timer 3' },
		{ id: 4, name: 'Timer 4' },
		{ id: 5, name: 'Timer 5' }
	]);
</script>

<section>
	<div class="container mx-auto">
		<h1>Timers</h1>

		<ul class="flex flex-col gap-8">
			{#each timers as timer}
				<a href="/timers/{timer.id}" aria-label={timer.name}
					><li class="rounded bg-slate-300 px-6 py-9">
						<h2 class="text-xl font-bold">{timer.name}</h2>
						<div class="mb-6" />
						<ul class="text-slate-700">
							<li>Prepare: 15 sec</li>
							<li>Work: 30 sec</li>
							<li>Rest 10 sec</li>
							<li>Cycles: 45</li>
							<li>Total: 30:05 - 90 intervals</li>
						</ul>
					</li></a
				>
			{/each}
		</ul>
	</div>
</section>
