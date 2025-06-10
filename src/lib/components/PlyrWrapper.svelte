<script lang="ts">
	import { onMount } from 'svelte';
	import 'plyr/dist/plyr.css';

	let { type, source }: { type: 'video' | 'audio'; source: { src: string; type: string } } =
		$props();

	let element: HTMLVideoElement | HTMLAudioElement | undefined = $state();
	let player: Plyr;
	onMount(() => {
		(async () => {
			const Plyr = (await import('plyr')).default;
			if (element) {
				player = new Plyr(element, {
					controls: [
						'play-large',
						'play',
						'progress',
						'current-time',
						'mute',
						'volume',
						'fullscreen'
					],
				});

				// Set the source after player is initialized
				player.source = {
					type,
					title: 'Shared Media',
					sources: [
						{
							src: source.src,
							type: source.type
						}
					]
				};
			}
		})();

		return () => {
			if (player) {
				player.destroy();
			}
		};
	});
</script>

{#if type === 'video'}
	<video bind:this={element} controls playsinline>
		<track kind="captions" />
	</video>
{:else if type === 'audio'}
	<audio bind:this={element}></audio>
{/if}
