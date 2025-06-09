<script lang="ts">
	import { enhance } from '$app/forms';
	import { masterKey } from '$lib/stores/masterKeyStore';
	import { arrayBufferToBase64, encryptBlob } from '$lib/util/encryption';
	import { get } from 'svelte/store';

	let fileInput: HTMLInputElement;
	let isLoading = $state(false);
	let shareableLink = $state('');
	let statusMessage = $state('');

	function generateLinkPassword(length = 24) {
		const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+_=';
		let password = '';
		const randomValues = new Uint32Array(length);
		crypto.getRandomValues(randomValues);
		for (let i = 0; i < length; i++) {
			password += charset[randomValues[i] % charset.length];
		}

		return password;
	}

	const handleSubmit: import('@sveltejs/kit').SubmitFunction = ({ formElement, cancel }) => {
		cancel();

		isLoading = true;
		statusMessage = 'Starting encryption...';
		shareableLink = '';

		const processAndUpload = async () => {
			const file = fileInput.files?.[0];
			const currentMasterKey = get(masterKey);

			if (!file || !currentMasterKey) {
				alert('Please select a file and ensure your session is unlocked!');
				return;
			}

			const linkPassword = generateLinkPassword();
			const linkPasswordBlob = new Blob([new TextEncoder().encode(linkPassword)]);

			statusMessage = 'Encrypting File... (This may take a moment)';

			const {
				encryptBlob: encryptedFile,
				salt: fileSalt,
				iv: fileIv
			} = await encryptBlob(file, linkPassword);

			statusMessage = 'Encrypting Key...';

			const {
				encryptBlob: encryptedLinkPassword,
				salt: linkPasswordSalt,
				iv: linkPasswordIv
			} = await encryptBlob(linkPasswordBlob, currentMasterKey);

			const formData = new FormData();
			formData.append('encryptedFile', encryptedFile, file.name);
			formData.append('fileSalt', arrayBufferToBase64(fileSalt));
			formData.append('fileIv', arrayBufferToBase64(fileIv));
			formData.append('encryptedLinkPassword', encryptedLinkPassword);
			formData.append('linkPasswordSalt', arrayBufferToBase64(linkPasswordSalt));
			formData.append('linkPasswordIv', arrayBufferToBase64(linkPasswordIv));

			statusMessage = 'Uploading encrypted data...';
			const response = await fetch(formElement.action, {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error(`Upload failed with status: ${response.status}`);
			}

			const { fileID } = await response.json();

			shareableLink = `${window.location.origin}/share/${fileID}#${linkPassword}`;
			statusMessage = 'Link generated Successfully!';
		};

		processAndUpload()
			.catch((err) => {
				console.error(err);
				statusMessage = `Error: ${err.message}`;
			})
			.finally(() => {
				isLoading = false;
			});
	};
</script>

<div class="card">
	<h2>Share a New File</h2>

	<form
		method="POST"
		action="/api/share-file"
		enctype="multipart/form-data"
		use:enhance={handleSubmit}
	>
		<input type="file" bind:this={fileInput} required />

		<button type="submit" disabled={isLoading}>
			{#if isLoading}
				{statusMessage}
			{:else}
				Create Secure Link
			{/if}
		</button>
	</form>

	{#if !isLoading && shareableLink}
		<div class="link-container">
			<p>{statusMessage}</p>
			<input type="text" readonly value={shareableLink} />
			<button onclick={() => navigator.clipboard.writeText(shareableLink)}>Copy</button>
		</div>
	{:else if !isLoading && statusMessage && !shareableLink}
		<p class="error">{statusMessage}</p>
	{/if}
</div>
