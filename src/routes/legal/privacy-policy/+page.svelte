<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Privacy Policy - Uppies</title>
	<meta name="description" content="Privacy Policy for Uppies - Secure File Sharing Platform" />
</svelte:head>

<div class="min-h-screen bg-background text-white">
	<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="bg-container border-border rounded-xl border p-8">
			<h1 class="mb-8 text-3xl font-bold text-white">Privacy Policy</h1>
			<p class="mb-6 text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>

			<div class="space-y-8 text-neutral-300">
				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">1. Introduction</h2>
					<p class="mb-4">
						Welcome to Uppies ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our secure file sharing platform and services.
					</p>
					<p>
						We are committed to protecting your privacy and ensuring the security of your personal information. This policy describes our practices regarding data collection and use.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">2. Information We Collect</h2>

					<h3 class="mb-3 text-lg font-medium text-white">2.1 Personal Information</h3>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Email address (for account creation and authentication)</li>
						<li>Display name (optional)</li>
						<li>Profile picture (optional, via Gravatar)</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">2.2 File Data</h3>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Encrypted files you upload to our platform</li>
						<li>File metadata (name, size, type, upload date)</li>
						<li>File descriptions and titles you provide</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">2.3 Usage Information</h3>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Upload history and file access logs</li>
						<li>Session information and authentication tokens</li>
						<li>Browser type, device information, and IP address</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">3. How We Use Your Information</h2>
					<p class="mb-4">We use the collected information for the following purposes:</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Providing and maintaining our file sharing services</li>
						<li>User authentication and account management</li>
						<li>Processing file uploads and downloads</li>
						<li>Improving our platform and user experience</li>
						<li>Communicating with you about service updates</li>
						<li>Ensuring platform security and preventing abuse</li>
						<li>Complying with legal obligations</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">4. Data Security and Encryption</h2>

					<h3 class="mb-3 text-lg font-medium text-white">4.1 Client-Side Encryption</h3>
					<p class="mb-4">
						We implement client-side encryption to protect your files. This means your files are encrypted on your device before being uploaded to our servers, ensuring that we cannot access the contents of your files.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">4.2 Master Key Security</h3>
					<p class="mb-4">
						Your master key is stored securely and is never transmitted to our servers in plaintext. You are responsible for maintaining the security of your master key.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">4.3 Additional Security Measures</h3>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>HTTPS encryption for all data transmission</li>
						<li>Secure storage infrastructure</li>
						<li>Regular security audits and updates</li>
						<li>Access controls and monitoring</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">5. Data Sharing and Disclosure</h2>

					<h3 class="mb-3 text-lg font-medium text-white">5.1 No Sale of Personal Data</h3>
					<p class="mb-4">
						We do not sell, trade, or otherwise transfer your personal information to third parties for commercial purposes.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">5.2 Limited Sharing</h3>
					<p class="mb-4">We may share your information only in the following circumstances:</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>With your explicit consent</li>
						<li>To comply with legal obligations or court orders</li>
						<li>To protect our rights, property, or safety</li>
						<li>With trusted service providers who assist in our operations</li>
						<li>In connection with a business transfer or acquisition</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">6. Data Retention</h2>
					<p class="mb-4">
						We retain your personal information and files for as long as necessary to provide our services and comply with legal obligations:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Account data: Until account deletion or extended inactivity</li>
						<li>File data: According to your retention preferences and our storage policies</li>
						<li>Usage logs: For a reasonable period to ensure security and improve services</li>
						<li>Legal compliance data: As required by applicable laws</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">7. Your Rights and Choices</h2>

					<h3 class="mb-3 text-lg font-medium text-white">7.1 Account Management</h3>
					<p class="mb-4">You have the right to:</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Access and update your account information</li>
						<li>Delete your account and associated data</li>
						<li>Download your uploaded files</li>
						<li>Modify your privacy preferences</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">7.2 Data Portability</h3>
					<p class="mb-4">
						You can request a copy of your data in a structured, machine-readable format to facilitate transfer to another service.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">7.3 Communication Preferences</h3>
					<p class="mb-4">
						You can opt out of non-essential communications while still receiving important service-related messages.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">8. Cookies and Tracking</h2>
					<p class="mb-4">
						We use cookies and similar technologies to enhance your experience. For detailed information about our use of cookies, please refer to our <a href="/legal/cookie-policy" class="text-accent underline">Cookie Policy</a>.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">9. Third-Party Services</h2>
					<p class="mb-4">
						We may use third-party services that have their own privacy policies:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li><strong>Appwrite:</strong> Backend services and authentication</li>
						<li><strong>Gravatar:</strong> Profile picture services</li>
						<li><strong>CDN providers:</strong> Content delivery and performance</li>
					</ul>
					<p class="mb-4">
						We encourage you to review the privacy policies of these third-party services.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">10. International Data Transfers</h2>
					<p class="mb-4">
						Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during such transfers.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">11. Children's Privacy</h2>
					<p class="mb-4">
						Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">12. Changes to This Policy</h2>
					<p class="mb-4">
						We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Posting the updated policy on our website</li>
						<li>Updating the "Last updated" date</li>
						<li>Sending email notifications for significant changes</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">13. Contact Us</h2>
					<p class="mb-4">
						If you have any questions about this Privacy Policy or our data practices, please contact us:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Through our website contact form</li>
						<li>By email (if contact information is available)</li>
						<li>Through our support channels</li>
					</ul>
				</section>

				<section class="border-t border-neutral-700 pt-6">
					<p class="text-sm text-neutral-400">
						By using Uppies, you acknowledge that you have read and understood this Privacy Policy and agree to our data practices as described herein.
					</p>
				</section>
			</div>
		</div>
	</div>
</div>
