<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<head>
	<title>UPPIES!</title>
</head>

<div class="flex min-h-screen flex-col">
	<NavBar {data} />

	<main class="flex-1">
		{@render children()}
	</main>

	<footer
		class="bg-container mt-auto flex flex-col items-center justify-center gap-3 py-3 font-mono"
	>
		<p>Made with 💖 by <a href="github.com/sxxxnx" class="text-accent underline">Sxnister</a>!</p>
		<ul class="flex flex-row gap-x-4 text-sm text-gray-400">
			<li>
				<a href="/legal/privacy-policy" class="transition-colors hover:text-white hover:underline">
					Privacy Policy
				</a>
			</li>
			<li>
				<a href="/legal/tos" class="transition-colors hover:text-white hover:underline">
					Terms of Service
				</a>
			</li>
			<li>
				<a href="/legal/cookie-policy" class="transition-colors hover:text-white hover:underline">
					Cookie Policy
				</a>
			</li>
		</ul>
	</footer>
</div>
