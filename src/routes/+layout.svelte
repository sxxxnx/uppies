<script lang="ts">
	import '../app.css';

	let { children, data } = $props();
</script>

<div>
	<nav class="flex flex-row items-center justify-between px-5 py-3">
		<a href="/" class="text-2xl font-medium">UPPIES</a>

		<div>
			<a href="https://github.com/sxxxnx/uppies/">Github Repo</a>
			<a href="https://discord.gg/phqrCEHMTq">Discord Server</a>
		</div>

		<div>
			{#if data.user}
				<p>Welcome, {data.user.name}!</p>
				<form method="post" action="/api/logout">
					<button type="submit">Log out</button>
				</form>
			{:else}
				<a href="/signup">Signup/Login</a>
			{/if}
		</div>
	</nav>
	<main>
		{@render children()}
	</main>
</div>
