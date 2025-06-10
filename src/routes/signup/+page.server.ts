import { createAdminClient } from '$lib/appwrite';
import { redirect } from '@sveltejs/kit';
import { OAuthProvider } from 'node-appwrite';
import { dev } from '$app/environment';

export const actions = {
	oauth: async (event) => {
		const { account } = createAdminClient();

		// Get the base URL for redirects
		const baseUrl = event.url.origin;
		
		console.log('OAuth redirect URLs:', {
			success: `${baseUrl}/oauth`,
			failure: `${baseUrl}/signup`,
			origin: baseUrl
		});

		try {
			const redirectUrl = await account.createOAuth2Token(
				OAuthProvider.Google,
				`${baseUrl}/oauth`,
				`${baseUrl}/signup`
			);
			redirect(302, redirectUrl);
		} catch (error) {
			console.error('OAuth token creation failed:', error);
			
			// If OAuth fails, redirect back to signup with error
			const errorMessage = error instanceof Error ? error.message : 'OAuth configuration error';
			redirect(302, `/signup?error=${encodeURIComponent(errorMessage)}`);
		}
	}
};
