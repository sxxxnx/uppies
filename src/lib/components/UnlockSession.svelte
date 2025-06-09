<script lang="ts">
	import { masterKey } from '$lib/stores/masterKeyStore';
	let passwordInput = $state('');

	function unlock() {
		if (passwordInput) {
			masterKey.set(passwordInput);
			passwordInput = '';
		}
	}
</script>

<div class="card">
	<h2>Unlock Session</h2>
	<p>Enter your master password to share and manage files for this session.</p>
	<input type="password" bind:value={passwordInput} placeholder="Enter master password" />
	<button onclick={unlock}>Unlock</button>
</div>
