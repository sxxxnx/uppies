<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import SupportBanner from '$lib/components/SupportBanner.svelte';
	import '../app.css';

	let { children, data } = $props();
	let bannerVisible = $state(false);

	// Function to handle banner visibility changes
	function handleBannerVisibility(visible: boolean) {
		bannerVisible = visible;
	}
</script>

<head>
	<title>UPPIES!</title>
</head>

<div class="flex min-h-screen flex-col">
	<SupportBanner {handleBannerVisibility} />
	<div class="navbar-container" class:banner-visible={bannerVisible}>
		<NavBar {data} />
	</div>

	<main class="flex-1 main-content" class:banner-visible={bannerVisible}>
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

<style>
	/* Navbar positioning to account for banner */
	.navbar-container {
		position: relative;
		z-index: 998;
		transition: margin-top 0.3s ease-in-out;
	}

	.navbar-container.banner-visible {
		margin-top: 70px; /* Adjust based on banner height */
	}

	/* Main content positioning */
	.main-content {
		transition: margin-top 0.3s ease-in-out;
	}

	.main-content.banner-visible {
		/* Additional spacing if needed */
	}

	/* Ensure smooth transitions */
	:global(body) {
		transition: padding-top 0.3s ease-in-out;
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.navbar-container.banner-visible {
			margin-top: 120px; /* More space on mobile due to banner height */
		}
	}
</style>
