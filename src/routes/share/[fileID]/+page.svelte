<script lang="ts">
	import { page } from '$app/state';
	import PlyrWrapper from '$lib/components/PlyrWrapper.svelte';
	import { base64ToArrayBuffer, decryptBlob } from '$lib/util/encryption';
	import { Button } from 'bits-ui';
	import { Download, Loader2, AlertCircle, FileText, Image, Video, Music } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let status: 'loading' | 'decrypting' | 'finished' | 'error' = $state('loading');
	let decryptedUrl = $state('');
	let errorMessage = $state('');
	let fileType = $state('');
	let fileExtention = $state('');

	let isImage = $state(false);
	let isVideo = $state(false);
	let isAudio = $state(false);

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
			isVideo = fileType.startsWith('video/');
			isAudio = fileType.startsWith('audio/');

			fileExtention = res.headers.get('X-File-Extention') || '';

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

<head>
	<title>File Share - UPPIES!</title>
</head>

<main class="container mx-auto max-w-4xl p-6">
	<div class="flex flex-col gap-6">
		<!-- Header Section -->
		<div class="border-b-border border-b px-5 py-4">
			<h1 class="text-accent text-3xl font-semibold">Secure File Download</h1>
			<p class="mt-2 text-neutral-400/70">
				Your file is being securely decrypted in your browser for maximum privacy.
			</p>
		</div>

		<!-- Content Section -->
		{#if status === 'decrypting' || status === 'loading'}
			<div class="flex flex-col items-center gap-4 p-8">
				<Loader2 class="text-accent h-12 w-12 animate-spin" />
				<div class="text-center">
					<h2 class="text-xl font-medium text-neutral-200">Securely preparing your file...</h2>
					<p class="mt-1 text-neutral-400">All decryption happens locally in your browser</p>
				</div>
			</div>
		{:else if status === 'finished'}
			<div class="bg-surface border-border flex flex-col gap-6 rounded-lg border p-6">
				<div class="flex items-center gap-3">
					{#if isImage}
						<Image class="text-accent h-6 w-6" />
					{:else if isVideo}
						<Video class="text-accent h-6 w-6" />
					{:else if isAudio}
						<Music class="text-accent h-6 w-6" />
					{:else}
						<FileText class="text-accent h-6 w-6" />
					{/if}
					<div>
						<h2 class="text-xl font-semibold text-neutral-200">Your file is ready!</h2>
						<p class="text-sm text-neutral-400">File decrypted successfully in your browser</p>
					</div>
				</div>

				{#if decryptedUrl}
					{#if isImage}
						<div class="bg-container-secondary border-border overflow-hidden rounded-lg border">
							<img
								src={decryptedUrl}
								alt="Decrypted file preview"
								class="max-h-96 w-full object-contain"
							/>
						</div>
					{:else if isVideo}
						<div class="bg-container-secondary border-border overflow-hidden rounded-lg border">
							<PlyrWrapper type="video" source={{ src: decryptedUrl, type: fileType }} />
						</div>
					{:else if isAudio}
						<div class="bg-container-secondary border-border overflow-hidden rounded-lg border p-4">
							<PlyrWrapper type="audio" source={{ src: decryptedUrl, type: fileType }} />
						</div>
					{:else}
						<div
							class="bg-container-secondary border-border flex items-center justify-center rounded-lg border p-8"
						>
							<div class="text-center">
								<FileText class="mx-auto h-16 w-16 text-neutral-400" />
								<p class="mt-2 text-neutral-400">File type has no preview available</p>
							</div>
						</div>
					{/if}
				{/if}

				<Button.Root
					onclick={() => {
						const link = document.createElement('a');
						link.href = `${decryptedUrl}`;
						link.download = `shared-file.${fileExtention}`;
						link.click();
					}}
					class="bg-accent hover:bg-accent/90 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition"
				>
					<Download class="h-5 w-5" />
					Download File
				</Button.Root>
			</div>
		{:else if status === 'error'}
			<div class="flex flex-col gap-4 rounded-lg border border-red-500/20 bg-red-500/10 p-6">
				<div class="flex items-center gap-3">
					<AlertCircle class="h-6 w-6 text-red-400" />
					<div>
						<h2 class="text-xl font-semibold text-red-400">An Error Occurred</h2>
						<p class="text-sm text-neutral-400">Unable to decrypt or access the file</p>
					</div>
				</div>
				<p class="text-red-300">{errorMessage}</p>
				<Button.Root
					onclick={() => window.location.reload()}
					class="bg-container-secondary hover:bg-accent hover:border-accent/100 border-border w-fit rounded-xl border px-4 py-2 transition"
				>
					Try Again
				</Button.Root>
			</div>
		{/if}
	</div>
</main>
