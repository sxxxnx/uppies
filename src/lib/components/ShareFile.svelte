<script lang="ts">
	import { enhance } from '$app/forms';
	import { masterKey } from '$lib/stores/masterKeyStore';
	import { arrayBufferToBase64, encryptBlob } from '$lib/util/encryption';
	import { get } from 'svelte/store';

	import { Progress, useId, Button } from 'bits-ui';
	import { Copy, Check } from 'lucide-svelte';
	import { onMount } from 'svelte';
	let fileInput: HTMLInputElement;
	let description = $state('');
	let title = $state('');
	let isLoading = $state(false);
	let shareableLink = $state('');
	let statusMessage = $state('');
	let isCopied = $state(false);

	let progress = $state(1);
	let labelid = useId();

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

	function handleCopy() {
		navigator.clipboard.writeText(shareableLink);
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}

	const handleSubmit: import('@sveltejs/kit').SubmitFunction = ({ formElement, cancel }) => {
		cancel();

		isLoading = true;
		statusMessage = 'Starting encryption...';
		shareableLink = '';

		const processAndUpload = async () => {
			const file = fileInput.files?.[0];
			const currentMasterKey = get(masterKey);

			progress = 5;

			if (!file || !currentMasterKey) {
				alert('Please select a file and ensure your session is unlocked!');
				return;
			}

			const linkPassword = generateLinkPassword();
			const linkPasswordBlob = new Blob([new TextEncoder().encode(linkPassword)]);

			progress = 20;

			statusMessage = 'Encrypting File... (This may take a moment)';

			const {
				encryptBlob: encryptedFile,
				salt: fileSalt,
				iv: fileIv
			} = await encryptBlob(file, linkPassword);

			statusMessage = 'Encrypting Key...';

			progress = 30;

			const {
				encryptBlob: encryptedLinkPassword,
				salt: linkPasswordSalt,
				iv: linkPasswordIv
			} = await encryptBlob(linkPasswordBlob, currentMasterKey);

			progress = 50;

			const formData = new FormData();
			formData.append('encryptedFile', encryptedFile, file.name);
			formData.append('fileSalt', arrayBufferToBase64(fileSalt));
			formData.append('fileIv', arrayBufferToBase64(fileIv));
			formData.append('encryptedLinkPassword', encryptedLinkPassword);
			formData.append('linkPasswordSalt', arrayBufferToBase64(linkPasswordSalt));
			formData.append('linkPasswordIv', arrayBufferToBase64(linkPasswordIv));
			formData.append('title', title);
			formData.append('description', description);
			formData.append('contentType', file.type);

			const fileExtenion = file.name.split('.').pop() ?? '';

			formData.append('fileExtention', fileExtenion);

			statusMessage = 'Uploading encrypted data...';
			const response = await fetch(formElement.action, {
				method: 'POST',
				body: formData
			});

			progress = 70;

			if (!response.ok) {
				throw new Error(`Upload failed with status: ${response.status}`);
			}

			const { fileID } = await response.json();

			shareableLink = `${window.location.origin}/share/${fileID}#${linkPassword}`;
			statusMessage = 'Link generated Successfully!';

			progress = 90;
		};

		processAndUpload()
			.catch((err) => {
				console.error(err);
				statusMessage = `Error: ${err.message}`;
			})
			.finally(() => {
				isLoading = false;
			});

		progress = 100;
	};
</script>

<div class="flex flex-col gap-3">
	<div class="border-b-border border-b px-5 py-2">
		<h2 class="text-accent text-2xl">Share a New File</h2>
		<p class="text-neutral-400/70">Upload and encrypt a file to create a secure shareable link.</p>
	</div>

	<form
		method="POST"
		action="/api/share-file"
		enctype="multipart/form-data"
		use:enhance={handleSubmit}
		class="flex flex-col gap-4 p-5 pt-0"
	>
		<div class="flex flex-col gap-2">
			<label for="title" class="text-sm font-medium text-neutral-300">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				bind:value={title}
				class="bg-container-secondary border-border w-full rounded-xl border px-3 py-2 text-white placeholder:text-neutral-500"
				placeholder="Enter file title"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="description" class="text-sm font-medium text-neutral-300">Description</label>
			<textarea
				name="description"
				id="description"
				bind:value={description}
				class="bg-container-secondary border-border w-full resize-none rounded-xl border px-3 py-2 text-white placeholder:text-neutral-500"
				placeholder="Enter file description (optional)"
				rows="3"
			></textarea>
		</div>

		<div class="flex flex-col gap-2">
			<label for="file" class="text-sm font-medium text-neutral-300">File to upload</label>
			<input
				type="file"
				bind:this={fileInput}
				required
				class="bg-container-secondary border-border file:bg-accent w-full rounded-xl border px-3 py-2 text-white file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1 file:text-sm file:text-white"
			/>
		</div>

		<Button.Root
			type="submit"
			disabled={isLoading}
			class="bg-container-secondary hover:bg-accent hover:border-accent/100 border-border disabled:hover:bg-container-secondary disabled:hover:border-border mt-2 w-full rounded-xl border px-4 py-3 transition disabled:opacity-50"
		>
			{#if isLoading}
				{statusMessage}
			{:else}
				Create Secure Link
			{/if}
		</Button.Root>
	</form>

	{#if !isLoading && shareableLink}
		<div class="flex flex-col gap-3 p-5 pt-0">
			<p class="text-accent font-medium">{statusMessage}</p>
			<div class="flex gap-2">
				<input
					type="text"
					readonly
					value={shareableLink}
					class="bg-container-secondary border-border flex-1 rounded-xl border px-3 py-2 text-white"
				/>
				<Button.Root
					onclick={handleCopy}
					class="bg-container-secondary hover:bg-accent hover:border-accent/100 border-border flex items-center gap-2 rounded-xl border px-4 py-2 transition"
				>
					{#if isCopied}
						<Check class="h-4 w-4" />
						Copied!
					{:else}
						<Copy class="h-4 w-4" />
						Copy
					{/if}
				</Button.Root>
			</div>
		</div>
	{:else if !isLoading && statusMessage && !shareableLink}
		<div class="p-5 pt-0">
			<p class="text-red-400">{statusMessage}</p>
		</div>
	{/if}

	{#if isLoading}
		<div class="flex flex-col gap-3 p-5 pt-0">
			<div class="flex items-center justify-between text-sm font-medium">
				<span id={labelid} class="text-neutral-300"> Uploading file... </span>
				<span class="text-accent">{progress}%</span>
			</div>
			<Progress.Root
				aria-labelledby={labelid}
				value={progress}
				max={100}
				class="bg-container-secondary shadow-mini-inset border-border relative h-3 w-full overflow-hidden rounded-full border"
			>
				<div
					class="shadow-mini-inset bg-accent h-full w-full flex-1 rounded-full transition-all duration-1000 ease-in-out"
					style={`transform: translateX(-${100 - (100 * (progress ?? 0)) / 100}%)`}
				></div>
			</Progress.Root>
		</div>
	{/if}
</div>
