<script lang="ts">
	import { Button } from 'bits-ui';
	import { LogIn, AlertCircle } from 'lucide-svelte';
	import { page } from '$app/state';
	$: authError = page.url.searchParams.get('error') === 'auth_failed';
	$: Unauthorized = page.url.searchParams.get('error') === 'unauthorized';
	$: oauthError = page.url.searchParams.get('error') && !authError && !Unauthorized;
	$: errorMessage = page.url.searchParams.get('error');
	$: sourcePage = page.url.searchParams.get('source');
</script>

<svelte:head>
	<title>SignUp - UPPIES!</title>
</svelte:head>

<main class="container mx-auto max-w-md p-6">
	<div class="flex flex-col gap-6">
		<!-- Header Section -->
		<div class="border-b-border border-b px-5 py-4 text-center">
			<h1 class="text-accent text-3xl font-semibold">Welcome to UPPIES!</h1>
			<p class="mt-2 text-neutral-400/70">
				Sign in to start sharing files securely with end-to-end encryption.
			</p>
		</div>
		<!-- Sign-in Section -->
		<div class="bg-surface border-border flex flex-col gap-4 rounded-lg border p-6">
			<div class="text-center">
				<h2 class="text-xl font-medium text-neutral-200">Get Started</h2>
				<p class="mt-1 text-sm text-neutral-400">
					Your privacy is our priority - we use zero-knowledge encryption
				</p>
			</div>			{#if authError}
				<div class="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
					<AlertCircle class="h-5 w-5 text-red-400" />
					<p class="text-sm text-red-300">Authentication failed. Please try signing in again.</p>
				</div>
			{:else if Unauthorized}
				<div class="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
					<AlertCircle class="h-5 w-5 text-red-400" />
					<p class="text-sm text-red-300">
						You need to signed in to preform that action.
						<span>Source: {sourcePage ?? 'Unkown'}</span>
					</p>
				</div>
			{:else if oauthError}
				<div class="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
					<AlertCircle class="h-5 w-5 text-red-400" />
					<p class="text-sm text-red-300">
						OAuth Error: {decodeURIComponent(errorMessage || 'Unknown error')}
					</p>
				</div>
			{/if}

			<form action="?/oauth" method="post" class="w-full">
				<Button.Root
					type="submit"
					class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-white/80"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24">
						<path
							fill="#4285F4"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="#34A853"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="#FBBC05"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="#EA4335"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Sign in with Google
				</Button.Root>
			</form>

			<div class="text-center">
				<p class="text-xs text-neutral-500">
					By signing in, you agree to our
					<a href="/legal/tos" class="text-accent hover:underline">Terms of Service</a> and
					<a href="/legal/privacy-policy" class="text-accent hover:underline">Privacy Policy</a>
				</p>
			</div>
		</div>

		<!-- Features Section -->
		<div class="bg-surface border-border rounded-lg border p-6">
			<h3 class="mb-4 text-lg font-medium text-neutral-200">Why choose UPPIES?</h3>
			<div class="space-y-3">
				<div class="flex items-start gap-3">
					<div class="bg-accent/20 text-accent rounded-full p-1">
						<LogIn class="h-4 w-4" />
					</div>
					<div>
						<p class="text-sm font-medium text-neutral-300">Zero-Knowledge Security</p>
						<p class="text-xs text-neutral-500">We never see your files or passwords</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<div class="bg-accent/20 text-accent rounded-full p-1">
						<LogIn class="h-4 w-4" />
					</div>
					<div>
						<p class="text-sm font-medium text-neutral-300">End-to-End Encryption</p>
						<p class="text-xs text-neutral-500">Files encrypted on your device before upload</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<div class="bg-accent/20 text-accent rounded-full p-1">
						<LogIn class="h-4 w-4" />
					</div>
					<div>
						<p class="text-sm font-medium text-neutral-300">Secure Sharing</p>
						<p class="text-xs text-neutral-500">Password-protected links that only you control</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
