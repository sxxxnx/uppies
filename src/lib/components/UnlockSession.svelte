<script lang="ts">
	import { masterKey } from '$lib/stores/masterKeyStore';
	import { Button } from 'bits-ui';
	let passwordInput = $state('');

	function unlock() {
		if (passwordInput) {
			masterKey.set(passwordInput);
			passwordInput = '';
		}
	}
</script>

<div class="flex flex-col gap-3">
	<div class="border-b border-b-border px-5 py-2">
		<h2 class=" text-accent text-2xl">Unlock Session</h2>
		<p class="text-neutral-400/70">
			Enter your master password to share and manage files for this session.
		</p>
	</div>

	<div class="flex w-full flex-row gap-2 p-5 pt-0">
		<input
			type="password"
			bind:value={passwordInput}
			placeholder="Enter master password"
			class="bg-container-secondary border-border w-full rounded-xl text-white"
		/>
		<Button.Root
			onclick={unlock}
			class="bg-container-secondary hover:bg-accent hover:border-accent/100 border-border rounded-xl border px-4 py-1 transition"
			>Unlock</Button.Root
		>
	</div>
</div>
