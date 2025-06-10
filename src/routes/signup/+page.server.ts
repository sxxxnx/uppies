import { createAdminClient } from '$lib/appwrite';
import { redirect } from '@sveltejs/kit';
import { OAuthProvider } from 'node-appwrite';

export const actions = {
	oauth: async (event) => {
		const { account } = createAdminClient();

		// Get the base URL for redirects
		const baseUrl = event.url.origin;

		console.log('Initiating OAuth with URLs:', {
			success: `${baseUrl}/oauth`,
			failure: `${baseUrl}/signup`,
			origin: baseUrl
		});

		const redirectUrl = await account.createOAuth2Token(
			OAuthProvider.Google,
			`${baseUrl}/oauth`,
			`${baseUrl}/signup`
		);

		redirect(302, redirectUrl);
	}
};
