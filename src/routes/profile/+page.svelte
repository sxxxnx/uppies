<script lang="ts">
	import { getInitials } from '$lib/util/appwrite.js';
	import { base64ToArrayBuffer, decryptBlob } from '$lib/util/encryption.js';
	import { Avatar, Button, Dialog } from 'bits-ui';
	import { Copy, RefreshCw, X } from 'lucide-svelte';

	let { data } = $props();
	// Modal state
	let showRegenerateModal = $state(false);
	// Define the type for media items
	type MediaItem = {
		$id: string;
		Title?: string;
		$createdAt: string;
		contentType?: string;
		fileExtention?: string;
		encPassword?: string;
		LinkEncPasswordSalt?: string;
		LinkEncPasswordIv?: string;
		[key: string]: any;
	};

	let selectedMedia = $state<MediaItem | null>(null);
	let masterKeyInput = $state('');
	let regenerateError = $state('');
	let isRegenerating = $state(false);
	let regeneratedLink = $state('');
	let isLinkCopied = $state(false);

	// Function to format date
	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	// Function to get file extension from filename
	function getFileExtension(filename: string) {
		return filename.split('.').pop()?.toUpperCase() || 'Unknown';
	}

	// Function to open regenerate modal
	function openRegenerateModal(media: any) {
		selectedMedia = media;
		showRegenerateModal = true;
		masterKeyInput = '';
		regenerateError = '';
	}
	// Function to close modal
	function closeModal() {
		showRegenerateModal = false;
		selectedMedia = null;
		masterKeyInput = '';
		regenerateError = '';
		regeneratedLink = '';
		isRegenerating = false;
		isLinkCopied = false;
	}

	// Function to copy regenerated link
	async function copyRegeneratedLink() {
		try {
			await navigator.clipboard.writeText(regeneratedLink);
			isLinkCopied = true;
			setTimeout(() => {
				isLinkCopied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy link:', error);
		}
	}
	// Placeholder function for regenerate link logic
	async function handleRegenerateLink() {
		if (!masterKeyInput.trim()) {
			regenerateError = 'Please enter your master key';
			return;
		}

		if (!selectedMedia) {
			regenerateError = 'No file selected for regeneration.';
			return;
		}

		isRegenerating = true;
		regenerateError = '';

		try {   
			const [result] = await Promise.all([
				(async () => {
					const encryptedLinkPaswordBase64 = selectedMedia.encPassword;
					const saltBase64 = selectedMedia.LinkEncPasswordSalt;
					const ivBase64 = selectedMedia.LinkEncPasswordIv;

					if (!encryptedLinkPaswordBase64 || !saltBase64 || !ivBase64) {
						regenerateError = 'No Salt, Iv, or Encrypted Password found.';
						return;
					}

					const encryptedBlob = new Blob([base64ToArrayBuffer(encryptedLinkPaswordBase64)]);
					const salt = base64ToArrayBuffer(saltBase64);
					const iv = base64ToArrayBuffer(ivBase64);

					const decryptedBlob = await decryptBlob(encryptedBlob, masterKeyInput, salt, iv);

					const linkPassword = await decryptedBlob.text();

					const baseUrl = window.location.origin;
					const fileID = selectedMedia.$id;
					const regeneratedLink = `${baseUrl}/share/${fileID}#${linkPassword}`;

					return regeneratedLink;
				})(),
				new Promise((resolve) => setTimeout(resolve, 800))
			]);
			if (!result) return (regenerateError = 'Result was not found.');
			regeneratedLink = result;

			console.log('Link regenerated successfully:', result);
		} catch (error) {
			regenerateError = 'Failed to decrypt key. Is your master key correct?';
			console.error('Regeneration Failed.', error);
		} finally {
			isRegenerating = false;
		}
	}

	console.log(data);
</script>

<div class="flex flex-col">
	<!-- Profile Header -->
	<div class="bg-container border-b-border flex flex-row items-center gap-3 border-b px-8 py-12">
		<Avatar.Root class="h-20 w-20">
			<Avatar.Image
				src={data.user?.prefs?.profilePicture}
				alt={data.user?.name}
				class="rounded-full"
			/>
			<Avatar.Fallback
				class="bg-accent flex items-center justify-center rounded-full text-2xl font-medium text-white"
			>
				{getInitials(data.user?.name || '')}
			</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col">
			<h1 class="text-4xl font-medium text-white">{data.user?.name}</h1>
			<p class="text-neutral-400">{data.user?.email}</p>
		</div>
	</div>

	<!-- Media Files Section -->
	<div class="p-8">
		<div class="mb-6">
			<h2 class="mb-2 text-2xl font-medium text-white">Your Files</h2>
			<p class="text-neutral-400">Manage your uploaded and encrypted files</p>
		</div>

		{#if data.media && data.media.length > 0}
			<div class="bg-container border-border overflow-hidden rounded-xl border">
				<!-- Table Header -->
				<div class="bg-container-secondary border-b-border border-b px-6 py-4">
					<div class="grid grid-cols-6 gap-4 text-sm font-medium text-neutral-300">
						<div>Title</div>
						<div>Created At</div>
						<div>Content Type</div>
						<div>File Extension</div>
						<div>Encrypted Password</div>
						<div class="text-center">Actions</div>
					</div>
				</div>

				<!-- Table Body -->
				<div class="divide-border divide-y">
					{#each data.media as media, index}
						<div class="hover:bg-container-secondary/50 px-6 py-4 transition-colors">
							<div class="grid grid-cols-6 items-center gap-4 text-sm">
								<div class="truncate font-medium text-white" title={media.Title}>
									{media.Title || 'Untitled'}
								</div>

								<div class="text-neutral-400">
									{formatDate(media.$createdAt)}
								</div>

								<div class="text-neutral-400">
									{media.contentType || 'Unknown'}
								</div>

								<div class="text-neutral-400">
									<span class="bg-accent/20 text-accent rounded-md px-2 py-1 text-xs font-medium">
										.{media.fileExtention}
									</span>
								</div>

								<div class="truncate font-mono text-xs text-neutral-500">
									{media.encPassword ? '••••••••••••••••' : 'Not set'}
								</div>

								<div class="flex justify-center">
									<Button.Root
										onclick={() => openRegenerateModal(media)}
										class="bg-container-secondary hover:bg-accent hover:border-accent/100 border-border flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all"
									>
										<RefreshCw class="size-4" />
										Regenerate Link
									</Button.Root>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="bg-container border-border rounded-xl border p-12 text-center">
				<div class="mb-4 text-neutral-400">
					<svg class="mx-auto mb-4 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>
					<p class="mb-2 text-lg font-medium text-neutral-300">No files uploaded yet</p>
					<p class="text-sm">Upload your first file to get started with secure sharing</p>
				</div>
				<Button.Root
					href="/share"
					class="bg-accent hover:bg-accent/90 rounded-xl px-6 py-3 font-medium text-white transition-all"
				>
					Upload First File
				</Button.Root>
			</div>
		{/if}
	</div>
</div>

<!-- Regenerate Link Modal -->
<Dialog.Root bind:open={showRegenerateModal} onOpenChange={(open) => !open && closeModal()}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
		<Dialog.Content
			class="bg-container border-border fixed top-[50%] left-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl border p-6 shadow-lg"
		>
			<div class="mb-4 flex items-center justify-between">
				<Dialog.Title class="text-lg font-medium text-white">Regenerate Share Link</Dialog.Title>
				<Button.Root
					onclick={closeModal}
					class="hover:bg-container-secondary rounded-lg p-2 transition-colors"
				>
					<X class="size-4 text-neutral-400" />
				</Button.Root>
			</div>

			{#if regeneratedLink}
				<div class="space-y-4">
					<Dialog.Description class="text-sm text-neutral-300">
						Your link has been successfully regenerated. Copy the link below and share it.
					</Dialog.Description>
					<div class="flex items-center gap-2">
						<input
							type="text"
							readonly
							value={regeneratedLink}
							class="bg-container-secondary border-border w-full flex-1 rounded-xl border px-3 py-2 font-mono text-xs text-neutral-300"
						/>
						<Button.Root
							onclick={copyRegeneratedLink}
							class="bg-accent hover:bg-accent/90 flex items-center gap-2 rounded-xl px-4 py-2 text-white transition-all"
						>
							{#if isLinkCopied}
								<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Copied!
							{:else}
								<Copy class="size-4" />
								Copy
							{/if}
						</Button.Root>
					</div>
					<Button.Root
						onclick={closeModal}
						class="bg-container-secondary hover:bg-container border-border w-full rounded-xl border px-4 py-2 text-neutral-300 transition-all"
					>
						Done
					</Button.Root>
				</div>
			{:else}
				<div class="space-y-4">
					<Dialog.Description class="text-sm text-neutral-400">
						Enter your master key to regenerate the share link for "{selectedMedia?.Title ||
							'this file'}".
					</Dialog.Description>
					<div>
						<label for="masterKey" class="mb-2 block text-sm font-medium text-neutral-300">
							Master Key
						</label>
						<input
							id="masterKey"
							type="password"
							bind:value={masterKeyInput}
							placeholder="Enter your master key"
							class="bg-container-secondary border-border focus:border-accent w-full rounded-xl border px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none"
						/>
					</div>

					{#if regenerateError}
						<div class="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
							{regenerateError}
						</div>
					{/if}

					<div class="flex gap-3 pt-2">
						<Button.Root
							onclick={closeModal}
							class="bg-container-secondary hover:bg-container border-border flex-1 rounded-xl border px-4 py-2 text-neutral-300 transition-all"
						>
							Cancel
						</Button.Root>
						<Button.Root
							onclick={handleRegenerateLink}
							disabled={isRegenerating}
							class="bg-accent hover:bg-accent/90 disabled:bg-accent/50 flex flex-1 items-center justify-center rounded-xl px-4 py-2 text-white transition-all disabled:cursor-not-allowed"
						>
							{#if isRegenerating}
								<RefreshCw class="mr-2 size-4 animate-spin" />
								Regenerating...
							{:else}
								Regenerate Link
							{/if}
						</Button.Root>
					</div>
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
