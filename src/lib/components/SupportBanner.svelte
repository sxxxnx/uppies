<script>
	import { onMount } from 'svelte';
	import { Heart, X, Star, Zap } from 'lucide-svelte';

	let { handleBannerVisibility = () => {} } = $props();

	let showBanner = $state(true);
	let isVisible = $state(false);

	// Reactively update parent when visibility changes
	$effect(() => {
		handleBannerVisibility(showBanner && isVisible);
	});

	onMount(() => {
		// Check if user has dismissed the banner (stored in localStorage)
		const dismissed = localStorage.getItem('support-banner-dismissed');
		if (dismissed) {
			showBanner = false;
		} else {
			// Show banner with a slight delay for better UX
			setTimeout(() => {
				isVisible = true;
			}, 1000);
		}
	});

	function dismissBanner() {
		isVisible = false;
		setTimeout(() => {
			showBanner = false;
			// Remember dismissal for 7 days
			const dismissedUntil = new Date();
			dismissedUntil.setDate(dismissedUntil.getDate() + 7);
			localStorage.setItem('support-banner-dismissed', dismissedUntil.toISOString());
		}, 300);
	}

	function openPatreon() {
		window.open('https://www.patreon.com/c/uppies', '_blank', 'noopener,noreferrer');
	}
</script>

{#if showBanner}
	<div
		class="support-banner {isVisible ? 'visible' : ''}"
		role="banner"
		aria-label="Support Uppies banner"
	>
		<div class="banner-content">
			<div class="banner-icon">
				<Heart class="h-5 w-5 animate-pulse text-red-400" />
			</div>

			<div class="banner-text">
				<div class="banner-title">Love Uppies? Help us grow! 💖</div>
				<div class="banner-subtitle">
					Support us on Patreon for extended benefits and help keep Uppies free for everyone.
				</div>
			</div>

			<div class="banner-benefits">
				<div class="benefit-item">
					<Star class="h-4 w-4 text-yellow-400" />
					<span>Increased upload limits</span>
				</div>
				<div class="benefit-item">
					<Zap class="h-4 w-4 text-blue-400" />
					<span>Priority support</span>
				</div>
			</div>

			<div class="banner-actions">
				<button onclick={openPatreon} class="support-button" aria-label="Support us on Patreon">
					<Heart class="h-4 w-4" />
					Support Us
				</button>

				<button onclick={dismissBanner} class="dismiss-button" aria-label="Dismiss banner">
					<X class="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.support-banner {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transform: translateY(-100%);
		transition: transform 0.3s ease-in-out;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.support-banner.visible {
		transform: translateY(0);
	}

	.banner-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 20px;
		max-width: 1200px;
		margin: 0 auto;
		gap: 16px;
		flex-wrap: wrap;
	}

	.banner-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 40px;
	}

	.banner-text {
		flex: 1;
		min-width: 250px;
	}

	.banner-title {
		font-weight: 600;
		color: white;
		font-size: 14px;
		margin-bottom: 2px;
	}

	.banner-subtitle {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.4;
	}

	.banner-benefits {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	.benefit-item {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.9);
		white-space: nowrap;
	}

	.banner-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.support-button {
		display: flex;
		align-items: center;
		gap: 6px;
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: white;
		padding: 8px 16px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.support-button:hover {
		background: rgba(255, 255, 255, 0.25);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.dismiss-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.8);
		width: 32px;
		height: 32px;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.dismiss-button:hover {
		background: rgba(255, 255, 255, 0.2);
		color: white;
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.banner-content {
			flex-direction: column;
			align-items: stretch;
			gap: 12px;
			padding: 16px;
		}

		.banner-benefits {
			justify-content: center;
		}

		.banner-actions {
			justify-content: center;
		}

		.banner-text {
			text-align: center;
			min-width: auto;
		}
	}

	@media (max-width: 480px) {
		.banner-benefits {
			flex-direction: column;
			gap: 8px;
			align-items: center;
		}

		.banner-subtitle {
			font-size: 11px;
		}

		.support-button {
			padding: 10px 20px;
			font-size: 13px;
		}
	}
</style>
