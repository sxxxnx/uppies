<script>
	import ShareFile from '$lib/components/ShareFile.svelte';
	import UnlockSession from '$lib/components/UnlockSession.svelte';
	import { masterKey } from '$lib/stores/masterKeyStore';
	import { Button, Toggle } from 'bits-ui';
	import { Eye, EyeOff } from 'lucide-svelte';

	let { data } = $props();

	let unlocked = $state(false);
	const code = $derived(unlocked ? $masterKey : '•••••••');
</script>

<div class="flex flex-col items-center justify-center">
	<div class="bg-container border-border mt-5 flex flex-col items-center justify-center rounded-xl">
		{#if $masterKey && data.user}
			<ShareFile />
			<div class="border-t-border w-full border-t">
				<div class="flex flex-col gap-2 p-5">
					<div class="flex items-center justify-between">
						<div class="flex flex-col">
							<h3 class="text-sm font-medium text-neutral-300">Master Key</h3>
							<p class="text-xs text-neutral-400/70">Your encryption key for this session</p>
						</div>
						<Toggle.Root
							aria-label="toggle code visibility"
							class="bg-container-secondary hover:bg-accent hover:border-accent/100 border-border flex items-center justify-center rounded-xl border px-3 py-2 transition-all"
							bind:pressed={unlocked}
						>
							{#if unlocked}
								<EyeOff class="mr-2 size-4" />
								Hide
							{:else}
								<Eye class="mr-2 size-4" />
								Show
							{/if}
						</Toggle.Root>
					</div>
					<div
						class="bg-container-secondary border-border flex items-center rounded-xl border px-3 py-2"
					>
						<span
							class="font-mono text-sm tracking-wider text-white {unlocked
								? 'select-text'
								: 'select-none'}"
						>
							{code}
						</span>
					</div>
				</div>
			</div>
		{:else if !$masterKey && data.user}
			<UnlockSession />
		{:else}
			<Button.Root
				href="/signup"
				class="bg-container-secondary border-border hover:bg-accent hover:border-accent/10 rounded-xl border px-5 py-2"
				>Please sign in to continue!</Button.Root
			>
		{/if}
	</div>
</div>
