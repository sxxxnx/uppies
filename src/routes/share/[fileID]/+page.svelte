<script lang="ts">
	import { page } from '$app/state';
	import { base64ToArrayBuffer, decryptBlob } from '$lib/util/encryption';
	import { onMount } from 'svelte';

	let status: 'loading' | 'decrypting' | 'finished' | 'error' = $state('loading');
	let decryptedUrl = $state('');
	let errorMessage = $state('');
	let fileType = $state('');
	let isImage = $state(false);

	async function startDecryption() {
		status = 'decrypting';
		const fileID = page.params.fileID;
		const linkPassword = window.location.hash.substring(1);

		if (!linkPassword) {
			status = 'error';
			errorMessage = 'Link is invalid or is missing the password.';
			return;
		}
		try {
			const res = await fetch(`/api/get-encrypted-file/${fileID}`);
			if (!res.ok) throw new Error(`File not found or server error.`);

			const saltBase64 = res.headers.get('X-File-Salt');
			const ivBase64 = res.headers.get('X-File-Iv');
			fileType = res.headers.get('X-File-Content-Type') || 'application/octet-stream';

			if (!saltBase64 || !ivBase64) {
				throw new Error('Missing encryption metadata from server.');
			}

			const encryptedArrayBuffer = await res.arrayBuffer();
			const encryptedBlob = new Blob([encryptedArrayBuffer]);

			const salt = base64ToArrayBuffer(saltBase64);
			const iv = base64ToArrayBuffer(ivBase64);
			const decryptedBlob = await decryptBlob(encryptedBlob, linkPassword, salt, iv);

			decryptedUrl = URL.createObjectURL(decryptedBlob);

			isImage = fileType.startsWith('image/');
			status = 'finished';
		} catch (err: any) {
			status = 'error';
			errorMessage = err.message || 'Decryption failed. The link may be invalid.';
			console.error(err);
		}
	}

	onMount(() => {
		startDecryption();
	});
</script>

<main>
	<h1>Secure File Download</h1>

	{#if status === 'decrypting' || status === 'loading'}
		<p>Securely preparing your file...</p>
	{:else if status === 'finished'}
		<div class="card">
			<h2>Your file is ready!</h2>
			<p>This file was decrypted entirely in your browser.</p>

			{#if isImage}
				<div class="image-preview">
					<img src={decryptedUrl} alt="Decrypted file preview" />
				</div>
			{/if}

			<a class="button" href={decryptedUrl} download="shared-file">Download File</a>
		</div>
	{:else if status === 'error'}
		<div class="card error">
			<h2>An Error Occurred</h2>
			<p>{errorMessage}</p>
		</div>
	{/if}
</main>

<style>
	.image-preview {
		max-width: 100%;
		margin-top: 1rem;
		border: 1px solid #444;
		border-radius: 4px;
	}
	.image-preview img {
		max-width: 100%;
		display: block;
		border-radius: 4px;
	}
</style>
