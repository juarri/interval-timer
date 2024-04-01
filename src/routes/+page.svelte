<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>Interval Timers</title>
</svelte:head>

<div class="relative grid place-content-center">
	<Card.Root class="mt-40 w-80">
		<Card.Header>
			<Card.Title>Sign up / Log in</Card.Title>
			<!-- <Card.Description>Kappa</Card.Description> -->
		</Card.Header>
		<Card.Content>
			<Button href="/auth/login/google" class="w-full">
				<img src="/google-icon.svg" alt="Google Logo" class="mr-2 size-4" /> Continue with Google</Button
			>
		</Card.Content>
	</Card.Root>
</div>
