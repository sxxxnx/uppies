<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getInitials } from '$lib/util/appwrite';
	import { Button, DropdownMenu, Avatar } from 'bits-ui';
	import { LogOut, User } from 'lucide-svelte';

	let { data } = $props();
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
						>							<Avatar.Root class="h-8 w-8">
								<Avatar.Image
									src={data.userRecord?.profilePicture || data.user.prefs?.profilePicture}
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
							<div class="flex items-center gap-2 px-3 py-2">								<Avatar.Root class="h-8 w-8">
									<Avatar.Image
										src={data.userRecord?.profilePicture || data.user.prefs?.profilePicture}
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
								<button
									type="button"
									class="flex w-full items-center gap-2 text-left"
									on:click={() => goto('/profile')}
									tabindex="-1"
									style="background: none; border: none; padding: 0; margin: 0;"
								>
									<User class="h-4 w-4 text-neutral-400" />
									<span class="text-neutral-200">Profile</span>
								</button>
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
