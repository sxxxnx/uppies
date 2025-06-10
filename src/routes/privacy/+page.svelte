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
					<ul class="ml-6 list-disc space-y-2">
						<li>To provide and maintain our file sharing services</li>
						<li>To authenticate users and maintain account security</li>
						<li>To enable file encryption, storage, and sharing functionality</li>
						<li>To monitor and prevent abuse of our services</li>
						<li>To improve our platform and user experience</li>
						<li>To communicate with you about service updates or issues</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">4. Data Security and Encryption</h2>
					<p class="mb-4">
						We implement industry-standard security measures to protect your data:
					</p>
					<ul class="ml-6 list-disc space-y-2">
						<li><strong>Client-side encryption:</strong> Files are encrypted on your device before upload</li>
						<li><strong>Zero-knowledge architecture:</strong> We cannot access your encrypted files</li>
						<li><strong>Secure transmission:</strong> All data is transmitted using HTTPS encryption</li>
						<li><strong>Access controls:</strong> Strict authentication and authorization mechanisms</li>
						<li><strong>Regular security audits:</strong> Ongoing monitoring and security assessments</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">5. Data Sharing and Disclosure</h2>
					<p class="mb-4">We do not sell, trade, or rent your personal information. We may share information only in these limited circumstances:</p>
					<ul class="ml-6 list-disc space-y-2">
						<li><strong>With your consent:</strong> When you explicitly authorize us to share information</li>
						<li><strong>Service providers:</strong> Trusted third parties who assist in operating our platform</li>
						<li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
						<li><strong>Business transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">6. Data Retention</h2>
					<p class="mb-4">
						We retain your information for as long as necessary to provide our services and comply with legal obligations:
					</p>
					<ul class="ml-6 list-disc space-y-2">
						<li><strong>Account data:</strong> Retained while your account is active</li>
						<li><strong>File data:</strong> Stored according to your account settings and usage</li>
						<li><strong>Usage logs:</strong> Typically retained for 12 months for security purposes</li>
						<li><strong>Deleted data:</strong> Permanently removed within 30 days of deletion</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">7. Your Rights and Choices</h2>
					<p class="mb-4">You have the following rights regarding your personal information:</p>
					<ul class="ml-6 list-disc space-y-2">
						<li><strong>Access:</strong> Request a copy of your personal data</li>
						<li><strong>Correction:</strong> Update or correct inaccurate information</li>
						<li><strong>Deletion:</strong> Request deletion of your account and data</li>
						<li><strong>Portability:</strong> Export your data in a portable format</li>
						<li><strong>Restriction:</strong> Limit how we process your information</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">8. Cookies and Tracking</h2>
					<p class="mb-4">
						We use cookies and similar technologies to enhance your experience. See our
						<a href="/cookies" class="text-accent hover:underline">Cookie Policy</a> for detailed information.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">9. International Data Transfers</h2>
					<p>
						Your information may be transferred to and processed in countries other than your country of residence.
						We ensure appropriate safeguards are in place to protect your data during international transfers.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">10. Changes to This Policy</h2>
					<p>
						We may update this Privacy Policy from time to time. We will notify you of any material changes
						by posting the new policy on this page and updating the "Last updated" date.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">11. Contact Us</h2>
					<p class="mb-4">
						If you have any questions about this Privacy Policy or our privacy practices, please contact us:
					</p>
					<div class="bg-container-secondary rounded-lg border border-border p-4">
						<p><strong>Email:</strong> privacy@uppies.app</p>
						<p><strong>Address:</strong> [Your Business Address]</p>
					</div>
				</section>
			</div>
		</div>
	</div>
</div>
