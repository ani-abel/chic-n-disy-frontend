<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getItemFromLocalStorage } from '../../../utils';
	import Navbar from '../.././../components/v2/Navbar.svelte';
	import Footer from '../../../components/v2/Footer.svelte';
	import LoginModal from '../../../components/v2/Login.svelte';
	import SignupModal from '../../../components/v2/Sign-up.svelte';

	/** @type {string} */ let pageTitle = 'Orders';

	// window.location.reload();
	onMount(() => {
		const user = getItemFromLocalStorage('ecommerce-user', true);
		if (!user) {
			goto('/auth');
		}
		// if (user.role !== AppRole.ADMIN) {
		// 	// logout();
		// }
		// Set title bar
		const urlSections = String($page.route.id)?.split('/');
		if (urlSections?.length > 0) {
			const lastElement = urlSections[urlSections.length - 1];
			if (lastElement?.includes('[')) {
				pageTitle = urlSections[urlSections.length - 2];
			} else {
				pageTitle = lastElement;
			}
			pageTitle = pageTitle?.replace('-', ' ');
		}
	});

	// Modal & Overlay States
	let loginModalOpen = false;
	let signupModalOpen = false;
	let searchOverlayOpen = false;
  
	// Search input element reference
	/** @type {HTMLInputElement | undefined} */
	let searchInputEl;

	/** @type {String} */
	let searchTerm;
  
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

<svelte:window on:keydown={handleKeydown} />

<section class="w-full">
	<Navbar
		hideCart={true}
		on:openLogin={() => (loginModalOpen = true)}
		on:openSignup={() => (signupModalOpen = true)}
		on:openSearch={openSearch}
   	/>
	<section class="mt-100 mb-150 w-full">
		<p class="text-4xl text-black my-12 text-center playfair text-capitalize">
			{pageTitle}
		</p>
		<div class="w-full flex flex-col xl:flex-row items-start gap-4 xl:gap-12 px-12">
			<div class="w-full lg:w-[20%]">
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/orders')}
					href="/auth/customer/orders"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Orders</p>
					</div>
				</a>
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/saved-products')}
					href="/auth/customer/saved-products"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Saved Products</p>
					</div>
				</a>
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/recently-viewed')}
					href="/auth/customer/recently-viewed"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Recently Viewed</p>
					</div>
				</a>
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/shipping-address')}
					href="/auth/customer/shipping-address"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Shipping Address</p>
					</div>
				</a>
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/update-profile')}
					href="/auth/customer/update-profile"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Profile</p>
					</div>
				</a>
			</div>
			<slot></slot>
		</div>
	</section>
	<Footer />
</section>

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

<style>
	.nav-active {
		text-decoration: underline;
		background-color: #cfd8de !important;
		/* color: #FFD700 !important; */
	}

	.mt-100 { margin-top: 100px !important; }

	.mb-150 { margin-bottom: 150px !important; }
</style>
