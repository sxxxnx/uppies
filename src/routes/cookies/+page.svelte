<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Cookie Policy - Uppies</title>
	<meta name="description" content="Cookie Policy for Uppies - Learn about our use of cookies and similar technologies" />
</svelte:head>

<div class="min-h-screen bg-background text-white">
	<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="bg-container border-border rounded-xl border p-8">
			<h1 class="mb-8 text-3xl font-bold text-white">Cookie Policy</h1>
			<p class="mb-6 text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>

			<div class="space-y-8 text-neutral-300">
				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">1. What Are Cookies</h2>
					<p class="mb-4">
						Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and keeping you logged in.
					</p>
					<p>
						This Cookie Policy explains what cookies are, how we use them on Uppies, and how you can manage your cookie preferences.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">2. How We Use Cookies</h2>

					<h3 class="mb-3 text-lg font-medium text-white">2.1 Essential Cookies</h3>
					<p class="mb-4">
						These cookies are necessary for our website to function properly and cannot be disabled:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li><strong>Authentication cookies:</strong> Keep you logged in to your account</li>
						<li><strong>Security cookies:</strong> Protect against cross-site request forgery (CSRF) attacks</li>
						<li><strong>Session cookies:</strong> Maintain your session state across page loads</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">2.2 Functional Cookies</h3>
					<p class="mb-4">
						These cookies enhance your experience by remembering your preferences:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li><strong>Theme preferences:</strong> Remember your preferred dark/light mode settings</li>
						<li><strong>Language settings:</strong> Store your preferred language choice</li>
						<li><strong>Upload preferences:</strong> Remember your file upload settings</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">2.3 Performance Cookies</h3>
					<p class="mb-4">
						These cookies help us understand how you use our website to improve performance:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li><strong>Analytics cookies:</strong> Collect anonymous usage statistics</li>
						<li><strong>Error tracking:</strong> Help us identify and fix technical issues</li>
						<li><strong>Performance monitoring:</strong> Monitor website speed and functionality</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">3. Third-Party Cookies</h2>
					<p class="mb-4">
						We may use third-party services that set their own cookies:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li><strong>Appwrite:</strong> Our backend service provider for authentication and data storage</li>
						<li><strong>Gravatar:</strong> For profile picture services (if you choose to use them)</li>
						<li><strong>CDN providers:</strong> For faster content delivery</li>
					</ul>
					<p>
						These third parties have their own cookie policies, which we encourage you to review.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">4. Cookie Storage and Duration</h2>

					<h3 class="mb-3 text-lg font-medium text-white">4.1 Session Cookies</h3>
					<p class="mb-4">
						These cookies are temporary and are deleted when you close your browser.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">4.2 Persistent Cookies</h3>
					<p class="mb-4">
						These cookies remain on your device for a specified period or until you delete them:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li><strong>Authentication cookies:</strong> Up to 30 days</li>
						<li><strong>Preference cookies:</strong> Up to 1 year</li>
						<li><strong>Analytics cookies:</strong> Up to 2 years</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">5. Managing Your Cookie Preferences</h2>

					<h3 class="mb-3 text-lg font-medium text-white">5.1 Browser Settings</h3>
					<p class="mb-4">
						You can control cookies through your browser settings:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Block all cookies</li>
						<li>Accept only first-party cookies</li>
						<li>Delete existing cookies</li>
						<li>Receive notifications when cookies are set</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">5.2 Browser-Specific Instructions</h3>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
						<li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
						<li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
						<li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">5.3 Important Note</h3>
					<p class="mb-4">
						Please note that disabling essential cookies may affect the functionality of our website and prevent you from using certain features, such as staying logged in.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">6. Do Not Track</h2>
					<p class="mb-4">
						Some browsers include a "Do Not Track" (DNT) feature that lets you tell websites you don't want to have your online activities tracked. We respect DNT signals and will not track users who have enabled this feature.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">7. Updates to This Policy</h2>
					<p class="mb-4">
						We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">8. Contact Us</h2>
					<p class="mb-4">
						If you have any questions about this Cookie Policy or our use of cookies, please contact us:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Through our website contact form</li>
						<li>By email (if contact information is available)</li>
					</ul>
				</section>

				<section class="border-t border-neutral-700 pt-6">
					<p class="text-sm text-neutral-400">
						By continuing to use Uppies, you acknowledge that you have read and understood this Cookie Policy and agree to our use of cookies as described herein.
					</p>
				</section>
			</div>
		</div>
	</div>
</div>
