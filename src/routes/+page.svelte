<script lang="ts">
	import { Lock, Shield, Link, Users, Eye, UserPlus } from 'lucide-svelte';
	import { Button } from 'bits-ui';
	let { data } = $props();
</script>

<main>
	<div
		class="bg-container border-b-border flex flex-col items-center justify-center gap-3 border-b py-20"
	>
		<h1 class="text-7xl font-semibold">Uppies!</h1>
		<p class="text-xl">The safest media sharing platofrm.</p>

		<div class="flex flex-row items-center gap-3">
			{#if data.user}
				<Button.Root href="/share" class="bg-accent border-border rounded-xl px-5 py-2"
					>Share a file!</Button.Root
				>
			{:else}
				<Button.Root href="/signup" class="bg-accent border-border rounded-xl px-5 py-2"
					>Sign Up To Start Uploading!</Button.Root
				>
			{/if}
		</div>
	</div>
	<ul class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
		<li
			class="bg-surface border-border group flex flex-col gap-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
		>
			<div class="text-primary flex flex-row items-center gap-2">
				<Lock class="h-5 w-5" />
				<strong class="text-lg font-semibold">Zero-Knowledge Model</strong>
			</div>
			<span class="text-muted-foreground leading-relaxed">
				We can't see your files, and we never store your master password. Your privacy is absolute.
			</span>
		</li>
		<li
			class="bg-surface border-border group flex flex-col gap-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
		>
			<div class="text-primary flex flex-row items-center gap-2">
				<Shield class="h-5 w-5" />
				<strong class="text-lg font-semibold">End-to-End Encryption</strong>
			</div>
			<span class="text-muted-foreground leading-relaxed"
				>Your files are encrypted on your device before being uploaded and only decrypted on the
				recipient's machine.</span
			>
		</li>
		<li
			class="bg-surface border-border group flex flex-col gap-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
		>
			<div class="text-primary flex flex-row items-center gap-2">
				<Link class="h-5 w-5" />
				<strong class="text-lg font-semibold">Secure Sharable Links</strong>
			</div>
			<span class="text-muted-foreground leading-relaxed"
				>Every shared file is protected by a unique, randomly generated password that's embedded
				directly in the link.</span
			>
		</li>
		<li
			class="bg-surface border-border group flex flex-col gap-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
		>
			<div class="text-primary flex flex-row items-center gap-2">
				<Users class="h-5 w-5" />
				<strong class="text-lg font-semibold">Private by Design</strong>
			</div>
			<span class="text-muted-foreground leading-relaxed"
				>The link's password is never sent to our servers, so only people you share the exact link
				with can open your files.</span
			>
		</li>
		<li
			class="bg-surface border-border group flex flex-col gap-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
		>
			<div class="text-primary flex flex-row items-center gap-2">
				<Eye class="h-5 w-5" />
				<strong class="text-lg font-semibold">Instant & Secure Previews</strong>
			</div>
			<span class="text-muted-foreground leading-relaxed">
				Securely preview images directly in the browser, as all decryption happens on your own
				device.
			</span>
		</li>
		<li
			class="bg-surface border-border group flex flex-col gap-3 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
		>
			<div class="text-primary flex flex-row items-center gap-2">
				<UserPlus class="h-5 w-5" />
				<strong class="text-lg font-semibold">No Account Needed for Recipients</strong>
			</div>
			<span class="text-muted-foreground leading-relaxed">
				Anyone can securely receive and decrypt a file you send them without needing to sign up or
				log in.
			</span>
		</li>
	</ul>
</main>
