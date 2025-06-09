import { writable } from 'svelte/store';

export const masterKey = writable<string | null>(null);
