export const load = async ({ locals }) => {
	return {
		user: locals.user,
		userRecord: locals.userRecord
	};
};
