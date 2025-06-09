function arrayBufferToBase64(buffer: ArrayBuffer) {
	let binary = '';

	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;

	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}

	return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binary_string = window.atob(base64);
	const len = binary_string.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}

	return bytes.buffer;
}

async function getDerivedKey(password: string, salt: ArrayBuffer) {
	const passwordKey = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits', 'deriveKey']
	);

	return await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations: 100000,
			hash: 'SHA-256'
		},
		passwordKey,
		{ name: 'AES-GCM', length: 256 },
		true,
		['encrypt', 'decrypt']
	);
}

async function encryptBlob(blob: Blob, password: string) {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(12));

	const derivedKey = await getDerivedKey(password, salt.buffer);
	const fileBuffer = await blob.arrayBuffer();

	const encryptedContent = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv },
		derivedKey,
		fileBuffer
	);

	return {
		encryptBlob: new Blob([encryptedContent]),
		salt: salt.buffer,
		iv: iv.buffer
	};
}

async function decryptBlob(
	encryptedBlob: Blob,
	password: string,
	salt: ArrayBuffer,
	iv: ArrayBuffer
) {
	const derivedKey = await getDerivedKey(password, salt);
	const encryptedBuffer = await encryptedBlob.arrayBuffer();

	const decryptedContent = await crypto.subtle.decrypt(
		{ name: 'AES-GCM', iv },
		derivedKey,
		encryptedBuffer
	);

	return new Blob([decryptedContent]);
}

export { encryptBlob, decryptBlob, arrayBufferToBase64, base64ToArrayBuffer };
