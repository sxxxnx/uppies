// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Models } from "node-appwrite";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            user: Models.User<Models.Preferences> | undefined;
            userRecord: Models.Document | undefined;
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
