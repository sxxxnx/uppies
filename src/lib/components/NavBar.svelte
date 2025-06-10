<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button, DropdownMenu, Avatar } from 'bits-ui';
	import { LogOut, User } from 'lucide-svelte';

	let { data } = $props();
	function getInitials(name: string) {
		if (!name) return 'U';

		const words = name
			.trim()
			.split(' ')
			.filter((word) => word.length > 0);

		if (words.length === 0) return 'U';
		if (words.length === 1) return words[0].charAt(0).toUpperCase();

		return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
	}
</script>

<nav class="border-b-border flex flex-row items-center justify-between border-b px-5 py-3">
	<a href="/" class="text-2xl font-medium">UPPIES</a>

	<div class="flex flex-row items-center gap-5">
		<a href="https://github.com/sxxxnx/uppies/">Github Repo</a>
		<a href="https://discord.gg/phqrCEHMTq">Discord Server</a>
	</div>
	<div>
		{#if data.user}
			<div class="flex items-center gap-3">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button.Root
							class="hover:bg-container-secondary flex items-center gap-2 rounded-full p-1 transition"
						>
							<Avatar.Root class="h-8 w-8">
								<Avatar.Image
									src={data.user.prefs?.profilePicture}
									alt={data.user.name}
									class="rounded-full"
								/>
								<Avatar.Fallback
									class="bg-accent flex items-center justify-center rounded-full text-sm font-medium text-white"
								>
									{getInitials(data.user.name)}
								</Avatar.Fallback>
							</Avatar.Root>
						</Button.Root>
					</DropdownMenu.Trigger>

					<DropdownMenu.Portal>
						<DropdownMenu.Content
							class="bg-container border-border animate-in fade-in-0 zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 w-56 rounded-lg border p-1 shadow-lg"
							sideOffset={5}
						>
							<div class="flex items-center gap-2 px-3 py-2">
								<Avatar.Root class="h-8 w-8">
									<Avatar.Image
										src={data.user.prefs?.profilePicture}
										alt={data.user.name}
										class="rounded-full"
									/>
									<Avatar.Fallback
										class="bg-accent flex items-center justify-center rounded-full text-xs font-medium text-white"
									>
										{getInitials(data.user.name)}
									</Avatar.Fallback>
								</Avatar.Root>
								<div class="flex flex-col">
									<p class="text-sm font-medium text-neutral-200">{data.user.name}</p>
									<p class="text-xs text-neutral-400">{data.user.email}</p>
								</div>
							</div>

							<DropdownMenu.Separator class="bg-border my-1 h-px" />

							<DropdownMenu.Item
								class="hover:bg-container-secondary focus:bg-container-secondary flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none"
							>
								<User class="h-4 w-4 text-neutral-400" />
								<span class="text-neutral-200">Profile</span>
							</DropdownMenu.Item>

							<DropdownMenu.Separator class="bg-border my-1 h-px" />
							<form
								method="POST"
								action="/api/logout"
								class="w-full"
								id="logout-form"
								use:enhance={() => {
									return async ({ result }) => {
										// Handle both success and redirect responses
										if (result.type === 'success' || result.status === 200) {
											if ($page.url.pathname === '/') {
												window.location.reload();
											} else {
												await goto('/');
											}
										} else {
											if ($page.url.pathname === '/') {
												window.location.reload();
											} else {
												await goto('/');
											}
										}
									};
								}}
							>
								<DropdownMenu.Item
									class="w-full cursor-pointer rounded-md p-0 text-left text-sm text-red-400 transition outline-none focus:bg-red-500/10 focus:text-red-300"
								>
									<!-- svelte-ignore event_directive_deprecated -->
									<button
										type="submit"
										tabindex="-1"
										class="flex w-full items-center gap-2 px-3 py-2"
										on:click={(e) => {
											e.preventDefault();
											(document.getElementById('logout-form') as HTMLFormElement)?.requestSubmit();
										}}
									>
										<LogOut class="h-4 w-4" />
										Log out
									</button>
								</DropdownMenu.Item>
							</form>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</div>
		{:else}
			<Button.Root
				class="bg-accent/10 border-accent/30 hover:bg-accent text-accent rounded-xl border px-5 py-2 hover:text-white"
				href="/signup">Sign Up</Button.Root
			>
		{/if}
	</div>
</nav>
