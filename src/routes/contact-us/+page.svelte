<script>
	import { goto } from '$app/navigation';
	import Cart from '../../components/v2/Cart.svelte';
	import Navbar from '../../components/v2/Navbar.svelte';
	import Footer from '../../components/v2/Footer.svelte';
	import LoginModal from '../../components/v2/Login.svelte';
	import SignupModal from '../../components/v2/Sign-up.svelte';
	import { sendContactMessage } from '../../api-requests/request';
	import { displayMessage, getItemFromLocalStorage } from '../../utils';
	import { AxiosError } from 'axios';

	const formData = {
		subject: null,
		email: null,
		fullName: null,
		phoneNumber: null,
		message: null,
	};

	const resetForm = () => {
		formData.subject = null;
		formData.email = null;
		formData.fullName = null;
		formData.phoneNumber = null;
		formData.message = null;
	}
  
	// Modal & Overlay States
	let loginModalOpen = false;
	let signupModalOpen = false;
	let searchOverlayOpen = false;
  
	// Search input element reference
	/** @type {HTMLInputElement | undefined} */
	let searchInputEl;

	/** @type {String} */
	let searchTerm;
  
	// Contact Form State
	let fullName = '';
	let email = '';
	let phone = '';
	let subject = '';
	let message = '';
  
	// Form Validation & Status State
	let errors = {
	  fullName: false,
	  email: false,
	  subject: false,
	  message: false
	};
  
	let isSubmitting = false;
	let formSuccess = false;
	let formError = false;

	/**
	 * @param {Event} e
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.fullName) {
			return;
		}
		const user = getItemFromLocalStorage('ecommerce-user', true);

		try {
			const { fullName, ...data } = formData;
			const names = String(formData.fullName).trim().split(' ');
			const payload = {
				...data,
				firstName: names[0],
				...(names.length > 1 && { lastName: names.slice(1).join(' ') }),
				...(user?.userId && { userId: user.userId })
			}
			console.log({payload});

			isSubmitting = true;
			formSuccess = false;

			const result = await sendContactMessage(payload);
			if (result?.success) {
				isSubmitting = false;
				formSuccess = true;

				const message = result.message ?? 'Message sent successfully';
				displayMessage({
					message,
					header: message,
					type: 'success'
				});

				resetForm();
			}

		} catch (ex) {
			isSubmitting = false;
			formSuccess = false;

			if (ex instanceof AxiosError) {
				const axiosErrorObject = ex.response?.data;
				displayMessage({
					message: axiosErrorObject?.message,
					header: 'Error',
					type: 'danger'
				});
			}
			throw ex;
		}
	}
  
	function openSearch() {
	  searchOverlayOpen = true;
	  document.body.style.overflow = 'hidden';
	  setTimeout(() => {
		if (searchInputEl) searchInputEl.focus();
	  }, 50);
	}
  
	function closeSearch() {
	  searchOverlayOpen = false;
	  document.body.style.overflow = '';
	}
  
	/**
	 * @param {KeyboardEvent} e
	 */
	 function handleKeydown(e) {
		if (searchOverlayOpen) {
			if (e.key === 'Escape') closeSearch();

			if (e.key === 'Enter') {
				closeSearch();

				// navigate
				goto('/search?query=' + encodeURIComponent(searchTerm));
				return;
				
			}
		}
	}
  </script>
  
  <svelte:head>
	<title>Contact Us — Chikndisy</title>
	<meta
	  name="description"
	  content="Get in touch with Chikndisy — questions about an order, a fragrance, or anything else. We'd love to hear from you."
	/>
  </svelte:head>
  
  <svelte:window on:keydown={handleKeydown} />
  
  <!-- Shared Navigation Bar -->
  <Navbar
	on:openLogin={() => (loginModalOpen = true)}
	on:openSignup={() => (signupModalOpen = true)}
	on:openSearch={openSearch}
  />
  
  <main>
	<!-- 1. HERO SECTION -->
	<section class="pt-[76px]">
	  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-12 sm:pb-14">
		<div class="max-w-[560px]">
		  <p class="text-[12px] tracking-widest2 uppercase text-clay mb-4">Get In Touch</p>
		  <h1 class="font-serif text-[32px] sm:text-[42px] leading-[1.1] mb-4">
			We'd Love to Hear From You
		  </h1>
		  <p class="text-[15px] text-charcoal leading-relaxed">
			Questions about a fragrance, an order, or something else entirely — reach out and a real
			person from Chikndisy will get back to you. We welcome feedback and collaboration
			enquiries too.
		  </p>
		</div>
	  </div>
	</section>
  
	<!-- 2. FORM & DIRECT CONTACT CHANNELS -->
	<section class="border-t border-line">
	  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
  
		  <!-- Left Column: Contact Form -->
		  <div class="lg:col-span-7">
			<h2 class="font-serif text-[22px] sm:text-[24px] mb-8">Send Us a Message</h2>
  
			<form on:submit|preventDefault={handleSubmit} novalidate>
			  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
				<div>
				  <label for="contactName" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
					Full Name <span class="text-clay">*</span>
				  </label>
				  <input
					id="contactName"
					name="full_name"
					type="text"
					required
					bind:value={formData.fullName}
					placeholder="Jane Adejumo"
					class="w-full bg-transparent border {errors.fullName ? 'border-rust' : 'border-line'} px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
				  />
				</div>
  
				<div>
				  <label for="contactEmail" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
					Email Address <span class="text-clay">*</span>
				  </label>
				  <input
					id="contactEmail"
					name="email"
					type="email"
					required
					bind:value={formData.email}
					placeholder="you@gmail.com"
					class="w-full bg-transparent border {errors.email ? 'border-rust' : 'border-line'} px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
				  />
				</div>
			  </div>
  
			  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
				<div>
				  <label for="contactPhone" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
					Phone Number <span class="text-charcoal/40">(optional)</span>
				  </label>
				  <input
				  	required
					id="contactPhone"
					name="phone_number"
					type="tel"
					bind:value={formData.phoneNumber}
					placeholder="+234 800 000 0000"
					class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
				  />
				</div>
  
				<div>
				  <label for="contactSubject" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
					Subject <span class="text-clay">*</span>
				  </label>
				  <select
					id="contactSubject"
					name="subject"
					required
					bind:value={formData.subject}
					class="w-full bg-transparent border {errors.subject ? 'border-rust' : 'border-line'} px-4 py-3 text-[14px] focus:outline-none"
				  >
					<option value="" disabled selected>Select a reason</option>
					<option value="General Enquiry">General Enquiry</option>
					<option value="Product Question">Product Question</option>
					<option value="Order Support">Order Support</option>
					<option value="Feedback">Feedback</option>
					<option value="Collaboration">Collaboration</option>
					<option value="Wholesale Enquiry">Wholesale Enquiry</option>
					<option value="Other">Other</option>
				  </select>
				</div>
			  </div>
  
			  <div class="mb-2">
				<label for="contactMessage" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
				  Message <span class="text-clay">*</span>
				</label>
				<textarea
				  id="contactMessage"
				  name="message"
				  rows="6"
				  required
				  bind:value={formData.message}
				  placeholder="Tell us how we can help…"
				  class="w-full bg-transparent border {errors.message ? 'border-rust' : 'border-line'} px-4 py-3 text-[14px] leading-relaxed placeholder:text-charcoal/40 focus:outline-none"
				></textarea>
			  </div>
  
			  {#if formSuccess}
				<p class="text-[14px] text-sage mt-5 mb-2 leading-relaxed">
				  Thank you for reaching out. We've received your message and will get back to you shortly.
				</p>
			  {/if}
			  {#if formError}
				<p class="text-[14px] text-rust mt-5 mb-2 leading-relaxed">
				  Something went wrong while sending your message. Please try again.
				</p>
			  {/if}
  
			  <button
				type="submit"
				disabled={isSubmitting}
				class="mt-4 bg-ink text-paper px-9 py-4 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors disabled:opacity-60"
			  >
				{isSubmitting ? 'Sending…' : 'Send Message'}
			  </button>
			</form>
		  </div>
  
		  <!-- Right Column: Direct Contact & Social Links -->
		  <div class="lg:col-span-5 lg:pl-4">
			<h2 class="font-serif text-[22px] sm:text-[24px] mb-8">Other Ways to Reach Us</h2>
  
			<ul class="divide-y divide-line border-t border-b border-line">
			  <li>
				<a href="https://instagram.com" target="_blank" rel="noreferrer" class="flex items-start gap-4 py-6 group">
				  <svg class="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
					<rect x="3" y="3" width="18" height="18" rx="5"/>
					<circle cx="12" cy="12" r="4"/>
					<circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/>
				  </svg>
				  <span class="flex-1">
					<span class="block text-[14px] mb-1 underline-grow w-fit">Instagram</span>
					<span class="block text-[13px] text-charcoal">Follow our latest fragrances and behind-the-scenes moments.</span>
					<span class="block text-[13px] text-clay mt-1">@chikndisy</span>
				  </span>
				</a>
			  </li>
  
			  <li>
				<a href="https://tiktok.com" target="_blank" rel="noreferrer" class="flex items-start gap-4 py-6 group">
				  <svg class="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
					<path d="M16 3c.4 2.4 1.9 3.9 4 4v3c-1.5 0-2.9-.4-4-1.3V15a5 5 0 1 1-5-5c.3 0 .7 0 1 .1V13a2 2 0 1 0 1.4 1.9V3h2.6Z"/>
				  </svg>
				  <span class="flex-1">
					<span class="block text-[14px] mb-1 underline-grow w-fit">TikTok</span>
					<span class="block text-[13px] text-charcoal">Fragrance reviews, restocks, and a closer look at the process.</span>
					<span class="block text-[13px] text-clay mt-1">@chikndisy</span>
				  </span>
				</a>
			  </li>
  
			  <li>
				<a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer" class="flex items-start gap-4 py-6 group">
				  <svg class="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
					<path d="M20.5 12a8.5 8.5 0 1 1-3.9-7.2"/>
					<path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5H12v-3.5Z"/>
				  </svg>
				  <span class="flex-1">
					<span class="block text-[14px] mb-1 underline-grow w-fit">WhatsApp</span>
					<span class="block text-[13px] text-charcoal">For quick questions about an order or a fragrance.</span>
					<span class="block text-[13px] text-clay mt-1">+234 800 000 0000</span>
				  </span>
				</a>
			  </li>
  
			  <li>
				<a href="mailto:hello@chikndisy.com" class="flex items-start gap-4 py-6 group">
				  <svg class="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
					<rect x="3" y="5" width="18" height="14" rx="2"/>
					<path d="m4 6.5 8 6 8-6"/>
				  </svg>
				  <span class="flex-1">
					<span class="block text-[14px] mb-1 underline-grow w-fit">Email</span>
					<span class="block text-[13px] text-charcoal">Prefer email? Write to us directly, any time.</span>
					<span class="block text-[13px] text-clay mt-1">hello@chikndisy.com</span>
				  </span>
				</a>
			  </li>
			</ul>
  
			<div class="mt-10 bg-sand/60 border border-line px-6 py-6">
			  <p class="text-[11px] tracking-widest2 uppercase text-clay mb-3">A Quick Note</p>
			  <p class="text-[13px] text-charcoal leading-relaxed">
				We aim to respond to enquiries as soon as possible. For order-related questions, it helps to include your order reference where available.
			  </p>
			</div>
		  </div>
  
		</div>
	  </div>
	</section>
  </main>
  
  <Footer />
  <Cart />
  
  <LoginModal
	open={loginModalOpen}
	on:close={() => (loginModalOpen = false)}
	on:switchToSignup={() => {
	  loginModalOpen = false;
	  signupModalOpen = true;
	}}
  />
  
  <SignupModal
	open={signupModalOpen}
	on:close={() => (signupModalOpen = false)}
	on:switchToLogin={() => {
	  signupModalOpen = false;
	  loginModalOpen = true;
	}}
  />
  
  {#if searchOverlayOpen}
	<div class="fixed inset-0 z-50">
	  <button
		type="button"
		aria-label="Close search overlay background"
		class="absolute inset-0 bg-ink/40 w-full h-full border-none cursor-default"
		on:click={closeSearch}
	  ></button>
  
	  <div class="relative bg-paper border-b border-line">
		<div class="max-w-[900px] mx-auto px-6 py-10 sm:py-14">
		  <div class="flex items-center justify-between mb-6">
			<span class="text-[12px] tracking-widest2 uppercase text-clay">Search</span>
			<button
			  type="button"
			  aria-label="Close search"
			  on:click={closeSearch}
			  class="w-8 h-8 flex items-center justify-center"
			>
			  <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3">
				<line x1="1" y1="1" x2="15" y2="15"/>
				<line x1="15" y1="1" x2="1" y2="15"/>
			  </svg>
			</button>
		  </div>
		  <label for="searchInput" class="sr-only">Search fragrances</label>
		  <input
			id="searchInput"
			type="text"
			bind:value={searchTerm}
			bind:this={searchInputEl}
			placeholder="Search fragrances, notes, collections…"
			class="w-full bg-transparent border-b border-ink pb-3 font-serif italic text-[24px] sm:text-[30px] placeholder:text-ink/40 focus:outline-none"
		  />
		</div>
	  </div>
	</div>
  {/if}