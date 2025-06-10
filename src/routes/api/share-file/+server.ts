import { createAdminClient, createSessionClient } from '$lib/appwrite.js';
import { error, json } from '@sveltejs/kit';
import { ID } from 'appwrite';
import { Permission, Role } from 'node-appwrite';

export async function POST(event) {
	const formData = await event.request.formData();
	if (!event.locals.user) throw error(403, 'Unauthorized');
	if (event.locals.user.prefs.uploadCap >= 100)
		return error(500, 'You have reached your BETA Upload cap.');

	const userSession = createSessionClient(event);
	const session = createAdminClient();

	const encryptedFile = formData.get('encryptedFile') as File;
	const fileSalt = formData.get('fileSalt') as string;
	const fileIv = formData.get('fileIv') as string;
	const encryptedLinkPasswordFile = formData.get('encryptedLinkPassword') as File;
	const linkPasswordSalt = formData.get('linkPasswordSalt') as string;
	const linkPasswordIv = formData.get('linkPasswordIv') as string;
	const title = formData.get('title') as string;
	const description = formData.get('description') as string;
	const contentType = formData.get('contentType') as string;
	const fileExtention = formData.get('fileExtention') as string;

	const uploadedFile = await session.storage.createFile('public', ID.unique(), encryptedFile, [
		Permission.write(Role.user(event.locals.user?.$id)),
		Permission.update(Role.user(event.locals.user?.$id)),
		Permission.read(Role.any())
	]);

	const encPasswordBuffer = await encryptedLinkPasswordFile.arrayBuffer();
	const encPasswordBase64 = Buffer.from(encPasswordBuffer).toString('base64');

	const media = await session.database.createDocument('uppies', 'posts', ID.unique(), {
		Title: title,
		Description: description,
		encSalt: fileSalt,
		encIv: fileIv,
		encPassword: encPasswordBase64,
		LinkEncPasswordSalt: linkPasswordSalt,
		LinkEncPasswordIv: linkPasswordIv,
		fileId: uploadedFile.$id,
		contentType,
		fileExtention: fileExtention ?? '',
		userId: event.locals.user.$id
	}); // Only increment upload cap after successful upload and database creation
	const currentUploadCap = event.locals.user.prefs.uploadCap || 0;
	const newUploadCap = currentUploadCap + 1;

	try {
		await userSession.account.updatePrefs({
			...event.locals.user.prefs,
			uploadCap: newUploadCap
		});
	} catch (prefError) {
		console.error('Error updating upload cap:', prefError);
		// Don't fail the upload if prefs update fails, but log it
	}

	return json({ fileID: media.$id }, { status: 201 });
}
