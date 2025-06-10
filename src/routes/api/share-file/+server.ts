import { createAdminClient } from '$lib/appwrite.js';
import { error, json } from '@sveltejs/kit';
import { ID } from 'appwrite';
import { Permission, Role } from 'node-appwrite';

export async function POST({ request, locals }) {
	const formData = await request.formData();

	if (!locals.user) throw error(403, 'Unauthorized');

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
		Permission.write(Role.user(locals.user?.$id)),
		Permission.update(Role.user(locals.user?.$id)),
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
		userId: locals.user.$id
	});

	return json({ fileID: media.$id }, { status: 201 });
}
