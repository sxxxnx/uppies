<script lang="ts">
	import { masterKey } from '$lib/stores/masterKeyStore';
	import UnlockSession from '$lib/components/UnlockSession.svelte';
	import ShareFile from '$lib/components/ShareFile.svelte';

	let { data } = $props();
</script>

<main>
	<h1>UPPIES!</h1>
	<p>Why choose us?</p>
	<ul>
		<li>
			<strong>Zero-Knowledge Model:</strong> We can't see your files, and we never store your master
			password. Your privacy is absolute.
		</li>
		<li>
			<strong>End-to-End Encryption:</strong> Your files are encrypted on your device before being uploaded
			and only decrypted on the recipient's machine.
		</li>
		<li>
			<strong>Secure Sharable Links:</strong> Every shared file is protected by a unique, randomly generated
			password that's embedded directly in the link.
		</li>
		<li>
			<strong>Private by Design:</strong> The link's password is never sent to our servers, so only people
			you share the exact link with can open your files.
		</li>
		<li>
			<strong>Instant & Secure Previews:</strong> Securely preview images directly in the browser, as
			all decryption happens on your own device.
		</li>
		<li>
			<strong>No Account Needed for Recipients:</strong> Anyone can securely receive and decrypt a file
			you send them without needing to sign up or log in.
		</li>
	</ul>

    <br>
    <hr>

	{#if $masterKey && data.user}
		<p>Session is unlocked!</p>
		<ShareFile />
	{:else if !$masterKey && data.user}
		<UnlockSession />
	{:else}
		<a href="/signup">Please Login to continue!</a>
	{/if}
</main>
