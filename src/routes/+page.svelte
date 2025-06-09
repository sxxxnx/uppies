<script lang="ts">
	import { masterKey } from '$lib/stores/masterKeyStore';
	import UnlockSession from '$lib/components/UnlockSession.svelte';
	import ShareFile from '$lib/components/ShareFile.svelte';

	let { data } = $props();
</script>

<main>
	<h1>UPPIES!</h1>

	{#if $masterKey && data.user}
		<p>Session is unlocked!</p>
		<ShareFile />
	{:else if !$masterKey && data.user}
		<UnlockSession />
	{:else}
		<a href="/signup">Please Login to continue!</a>
	{/if}
</main>
