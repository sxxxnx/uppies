import { createAdminClient, SESSION_COOKIE } from '$lib/appwrite';
import { error, redirect } from '@sveltejs/kit';
import { ID, OAuthProvider } from 'node-appwrite';

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
