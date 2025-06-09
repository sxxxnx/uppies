import { createAdminClient } from '$lib/appwrite';
import { redirect } from '@sveltejs/kit';
import { OAuthProvider } from 'node-appwrite';

export const actions = {
	oauth: async (event) => {
		const { account } = createAdminClient();

		const redirectUrl = await account.createOAuth2Token(
			OAuthProvider.Google,
			`${event.url.origin}/oauth`,
			`${event.url.origin}/signup`
		);

		console.log('OAuth redirect URL:', redirectUrl);

		redirect(302, redirectUrl);
	}
};
