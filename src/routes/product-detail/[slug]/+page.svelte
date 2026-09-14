<script>
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import { goto } from '$app/navigation';
	import Cart from '../../../components/v2/Cart.svelte';
	import Navbar from '../../../components/v2/Navbar.svelte';
	import Footer from '../../../components/v2/Footer.svelte';
	import { displayMessage, getJwtToken } from '../../../utils';
	import LoginModal from '../../../components/v2/Login.svelte';
	import SignupModal from '../../../components/v2/Sign-up.svelte';
	import { auth, cart, cartOpen, formatNaira } from '../../../stores/cart.store';
	import { makeProductReview, sendContactMessage } from '../../../api-requests/request';

	// Props (Can be passed from +page.js/+page.server.js or default used below)
	export let data;

	const { product: pageData, relatedProducts, reviewSummary } = data;

	// Logged in state (can come from store or auth context)
	export let isLoggedIn = false;
	/** @type {any} */
	export let user = null;

	$: userCanReview = isLoggedIn && !pageData.userHasBoughtProduct && !pageData.userHasReviewedProduct;

	const notificationFormData = {
		email: null,
		firstName: '[Unknown]',
		lastName: '[Unknown]',
		phoneNumber: '[Unknown]',
		subject: "Product question",
		message: `Notify me when this product is available [Code: ${pageData.product.code}, Name:${pageData.product.name}]`,
	};

	/**
	 * @param {Event} e
	 */
	const handleProductNotificationSubmit = async (e) => {
		e.preventDefault();

		if (isLoggedIn) {
			notificationFormData.firstName = user.firstName;
			notificationFormData.lastName = user.lastName;
			// notificationFormData.phoneNumber = user.phoneNumber;
		}

		try {
			const result = await sendContactMessage(notificationFormData);
			if (result?.success) { 
				const message = result.message ?? 'We will get back to you soon';
				displayMessage({
					message,
					header: message,
					type: 'success'
				});

				setTimeout(() => location.reload(), 700);
			}
			return;
		} catch (ex) {
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

	onMount(() => {
		user = $auth.user;
		isLoggedIn = $auth.isLoggedIn;
	});

	function splitDescription(description = '') {
		return description.split('.').map((w) => w.trim());
	}

	$: descriptionSentences = splitDescription(pageData.product.description);

	// Function to extract gender from description text
	function getGender(description = '') {
		const text = description.toLowerCase();

		if (/\b(unisex)\b/.test(text)) return 'Unisex';
		if (/\b(women|woman|female)\b/.test(text)) return 'Female';
		if (/\b(men|man|male)\b/.test(text)) return 'Male';

		return 'Unisex'; // Default fallback if unspecified
	}

  	$: detectedGender = getGender(pageData?.product?.description);

	const gallery = [
		...pageData.product.imagesForThisProduct.map(({ url }) => ({ 
			url, 
			type: 'image',
			alt: pageData.name
		})),
		...(pageData.product.productVideo 
			? [{ 
				url: pageData.product.productVideo, 
				type: 'video', 
				alt: pageData.product.name 
			}] 
			: 
		[]),
	];

  // Gallery Active Index
  let activeMediaIndex = 0;

  // Quantity State
  let selectedQty = 1;

  let reviews = [...data.product.reviews];
  let hasMoreReviews = false;

  // Review Submission Form
  let selectedRating = 0;
  let isSubmittingReview = false;


  const handleAddToCart = (
	/** @type {any} */ product, 
	/** @type {Number} */ qty = 1
  ) => {
	// Call addItem(product, price, quantity)
	cart.addItem(product, product.unitPrice, qty);

	// Optional: open the cart drawer overlay
	cartOpen.set(true);
  }

  const handleDecreaseQty = (/** @type {any} */  product) => {
    if (selectedQty > 1) selectedQty -= 1;
	cart.updateQty(product.id, selectedQty);
  }

  const handleIncreaseQty = (/** @type {any} */  product) => {
    selectedQty += 1;
	cart.updateQty(product.id, selectedQty)
  }

  function loadMoreReviews() {
	reviews = [...reviews];
    // reviews = [...reviews, ...extraReviews];
    hasMoreReviews = false;
  }

  const formData = {
	comment: null
  };

  function resetForm() { 
	formData.comment = null;
  }

  async function handleSubmitReview(/** @type {Event} */ e) {
	e.preventDefault();

	isSubmittingReview = true;

	const payload = { 
		...formData,
		title: 'User review',
		rating: selectedRating, 
		productId: pageData.product.id,
	};

	try {
		const token = getJwtToken();
		const result = await makeProductReview(
			payload,
			{ Authorization: `Bearer ${token}` }
		);
		if (result?.success) {
			isSubmittingReview = false;

			const message = result.message ?? 'Submitted successfully';
			displayMessage({
				message,
				header: message,
				type: 'success'
			});
			resetForm();

			setTimeout(() => location.reload(), 700);
		}
	} catch (ex) {
		isSubmittingReview = false;

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

  function fmtDate(d) { return d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }); }
  
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
  
  <svelte:head>
	<title>{pageData.product.name} — Chikndisy</title>
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

<main class="pt-[76px]">
	<!-- ================= PRODUCT DETAIL ================= -->
	<section class="border-b border-line">
	  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
  
		  <!-- ================= PRODUCT GALLERY ================= -->
		  <div>
			<div id="mainMediaContainer" class="relative aspect-[4/5] bg-sand overflow-hidden mb-4">
			  {#if gallery[activeMediaIndex].type === 'image'}
				<img 
				  src={gallery[activeMediaIndex].url} 
				  alt={gallery[activeMediaIndex].alt} 
				  class="w-full h-full object-cover" 
				  loading="eager"
				/>
			  {:else if gallery[activeMediaIndex].type === 'video'}
				<video 
				  src={gallery[activeMediaIndex].url} 
				  controls={false}
				  preload="metadata"
				  autoplay
				  class="w-full h-full object-cover"
				  aria-label="{pageData.product.name} product video"
				>
					<track kind="captions" />
			    </video>
			  {/if}
			</div>
  
			<div id="thumbnailRow" class="flex gap-3 overflow-x-auto no-scrollbar" role="tablist" aria-label="Product media">
			  {#each gallery as media, idx}
				<button
				  type="button"
				  role="tab"
				  aria-selected={idx === activeMediaIndex}
				  aria-label={media.type === 'video' ? 'Play product video' : `View image ${idx + 1}`}
				  on:click={() => (activeMediaIndex = idx)}
				  class="relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border transition-colors {idx === activeMediaIndex ? 'border-ink' : 'border-line'}"
				>
				{#if media.type === 'image'}
				  <img src={media.url} 
				  	alt={media.alt} 
					class="w-full h-full object-cover" 
					loading="lazy" 
				   />
				{:else}
					<video src={media.url} class="w-full h-full object-cover" controls={false}>
						<track kind="captions" />
					</video>
				{/if}
				</button>
			  {/each}
			</div>
		  </div>
  
		  <!-- ================= PRODUCT INFORMATION ================= -->
		  <div class="lg:pt-2">
			<p class="text-[12px] tracking-widest2 uppercase text-clay mb-4">
				{pageData.product.productCategory?.name}
			</p>
			<h1 class="font-serif text-[32px] sm:text-[40px] leading-tight mb-3">
				{pageData.product.name}
			</h1>
			<p class="text-[15px] text-charcoal leading-relaxed mb-6 max-w-[440px]">
			  {descriptionSentences[0]}
			</p>
  
			<div class="flex items-center gap-3 mb-1">
				<span class="text-[24px]">
					{formatNaira(pageData.product.unitPrice)}
				</span>
			</div>
  
			{#if reviewSummary}
			{@const review = reviewSummary.data}
			{@const totalReviews = review.totalReviews ?? 0}
			{@const filledStars = Math.round(review?.averageRating ?? 0)}
			<!-- Rating summary (compact, links down to full reviews) -->
			<a href="#reviews" class="inline-flex items-center gap-2 mb-8 text-[13px] text-charcoal underline-grow">
			  <span class="flex items-center gap-0.5 text-ink" aria-hidden="true">
				{'★'.repeat(filledStars)}{'☆'.repeat(5 - filledStars)}
			  </span>
			  <span>
				{Number(filledStars).toFixed(1)} · { totalReviews} review{totalReviews=== 1 ? '' : 's'}
			 </span>
			</a>
			{/if}
  
			<!-- ================= STOCK STATUS ================= -->
			<div id="stockStatus" class="flex items-center gap-2 mb-8 text-[13px]">
			  <span class="w-1.5 h-1.5 rounded-full {pageData.product.outOfStock ? 'bg-rust' : 'bg-sage'}"></span>
				{#if pageData.product.outOfStock}
				<span class="text-rust">Out of Stock</span>
				{:else}
				<span class="text-sage">In Stock</span>
				{/if}
			</div>
  
			<!-- Product metadata -->
			<dl class="grid grid-cols-2 gap-y-3 gap-x-6 mb-8 pb-8 border-b border-line text-[13px] max-w-[420px]">
			  <div>
				<dt class="text-charcoal/60">Size</dt>
				<dd class="mt-0.5">
					{pageData.product.description.match(/\(([^)]+)\)/)?.[1] ?? 'Standard'}
				</dd>
			  </div>
			  <div>
				<dt class="text-charcoal/60">Category</dt>
				<dd class="mt-0.5 capitalize">
					{pageData.product.productCategory?.name ?? 'General'}
				</dd>
			  </div>
			  <div>
				<dt class="text-charcoal/60">For</dt>
				<dd class="mt-0.5">{detectedGender}</dd>
			  </div>
			  <div>
				<dt class="text-charcoal/60">Code</dt>
				<dd class="mt-0.5">{pageData.product.code}</dd>
			  </div>
			</dl>
  
			{#if !pageData.product.outOfStock}
			<!-- ================= QUANTITY SELECTOR ================= -->
			<div class="flex items-center gap-6 mb-6">
			  <span class="text-[13px] tracking-[0.04em] text-charcoal">Quantity</span>
			  <div class="flex items-center border border-line">
				<button type="button" 
					on:click={() => handleDecreaseQty(data.product)} 
					aria-label="Decrease quantity" 
					class="w-10 h-10 flex items-center justify-center text-[15px] hover:bg-sand">
					−
				</button>
				<span class="w-10 text-center text-[14px]" aria-live="polite">{selectedQty}</span>
				<button type="button" 
					on:click={() => handleIncreaseQty(data.product)} 
					aria-label="Increase quantity" 
					class="w-10 h-10 flex items-center justify-center text-[15px] hover:bg-sand">
					+
				</button>
			  </div>
			</div>
  
			<!-- ================= ADD TO CART ================= -->
			<button 
			  disabled={pageData.product.outOfStock}
			  on:click={() => handleAddToCart(pageData.product, selectedQty)}
			  class="w-full sm:w-auto sm:min-w-[280px] bg-ink text-paper px-9 py-4 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors disabled:opacity-40 disabled:pointer-events-none"
			>
			  {pageData.product.outOfStock ? 'Out of Stock' : 'Add to Bag'}
			</button>
			{:else}
			<!-- ========================================== -->
			<!-- 2. NOTIFY ME WHEN AVAILABLE SECTION        -->
			<!-- (Replaces main Add to Bag CTA when stock = 0) -->
			<!-- ========================================== -->
			<div class="w-full space-y-3 p-5 bg-terracotta/5 border border-terracotta/20 rounded-none">
				<div class="flex items-start gap-3">
					<svg class="w-5 h-5 text-terracotta mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
					</svg>
					<div>
						<h4 class="font-serif text-sm font-semibold text-charcoal">Currently Out of Stock</h4>
						<p class="text-xs text-charcoal/70 mt-0.5 font-sans leading-relaxed">
							Enter your email address below and we'll send you an instant notification as soon as this piece is back in stock.
						</p>
					</div>
				</div>

				<form on:submit|preventDefault={handleProductNotificationSubmit} class="mt-3 space-y-2">
					<div class="flex flex-col sm:flex-row gap-2">
						<input 
							type="email" 
							required 
							bind:value={notificationFormData.email}
							placeholder="Enter your email" 
							class="flex-1 bg-[#FAF8F3] border border-clay/30 px-3 py-2.5 text-xs text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-clay transition-colors font-sans"
						/>
						<button 
							type="submit" 
							class="bg-clay text-[#FAF8F3] hover:bg-charcoal transition-colors duration-300 px-5 py-2.5 text-xs tracking-widest uppercase font-semibold whitespace-nowrap"
						>
							Notify Me
						</button>
					</div>
					<p class="text-[10px] text-charcoal/50 italic font-sans">We respect your privacy and will only email you regarding this item's availability.</p>
				</form>
			</div>
			{/if}
			
			<!-- ================= FRAGRANCE NOTES ================= -->
			<!-- <div class="mt-14 pt-10 border-t border-line">
			  <h2 class="font-serif text-[20px] mb-6">Fragrance Notes</h2>
			  <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
				{#if product.notes?.top}
				  <div>
					<p class="text-[11px] tracking-widest2 uppercase text-clay mb-3">Top</p>
					<ul class="text-[14px] text-charcoal space-y-1.5">
					  {#each product.notes.top as note}
						<li>{note}</li>
					  {/each}
					</ul>
				  </div>
				{/if}
				{#if product.notes?.heart}
				  <div>
					<p class="text-[11px] tracking-widest2 uppercase text-clay mb-3">Heart</p>
					<ul class="text-[14px] text-charcoal space-y-1.5">
					  {#each product.notes.heart as note}
						<li>{note}</li>
					  {/each}
					</ul>
				  </div>
				{/if}
				{#if product.notes?.base}
				  <div>
					<p class="text-[11px] tracking-widest2 uppercase text-clay mb-3">Base</p>
					<ul class="text-[14px] text-charcoal space-y-1.5">
					  {#each product.notes.base as note}
						<li>{note}</li>
					  {/each}
					</ul>
				  </div>
				{/if}
			  </div>
			</div> -->
  
		  </div>
		</div>
	  </div>
	</section>
  
	<!-- ================= PRODUCT DESCRIPTION / FRAGRANCE STORY ================= -->
	<section class="border-t border-line">
		<div class="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-28">
	
		<!-- Intro -->
		<div class="max-w-[780px] mb-14 sm:mb-16">
			<p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">
			The Art of Scent
			</p>
	
			<h2 class="font-serif text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] mb-8">
			Some fragrances are worn.<br class="hidden sm:block" />
			Others become<br class="hidden sm:block" />
			<em class="font-serif">part of who you are.</em>
			</h2>
	
			<p class="text-[15px] sm:text-[16px] text-charcoal leading-[1.9] max-w-[700px]">
			A beautiful fragrance does more than smell good.
			It becomes part of the way you enter a room,
			the way you carry yourself, and the memories
			people quietly associate with you.
			</p>
		</div>
	
		<!-- Fragrance Benefits -->
		<div class="grid grid-cols-1 sm:grid-cols-3 border-t border-line">
	
			<div class="py-7 sm:py-8 sm:pr-8 sm:border-r border-line">
			<p class="text-[11px] tracking-widest2 uppercase text-clay mb-2">
				Sets the
			</p>
			<p class="font-serif text-[20px] sm:text-[22px]">
				Mood
			</p>
			</div>
	
			<div class="py-7 sm:py-8 sm:px-8 sm:border-r border-line">
			<p class="text-[11px] tracking-widest2 uppercase text-clay mb-2">
				Expresses your
			</p>
			<p class="font-serif text-[20px] sm:text-[22px]">
				Personality
			</p>
			</div>
	
			<div class="py-7 sm:py-8 sm:pl-8">
			<p class="text-[11px] tracking-widest2 uppercase text-clay mb-2">
				Stays in their
			</p>
			<p class="font-serif text-[20px] sm:text-[22px]">
				Memory
			</p>
			</div>
	
		</div>
	
		<!-- Closing Statement -->
		<div class="mt-12 sm:mt-14 pt-8 border-t border-line">
			<p class="text-[11px] sm:text-[12px] tracking-widest2 uppercase text-clay">
			Wear your story.
			</p>
			<p class="font-serif italic text-[24px] sm:text-[28px] mt-2">
			Leave your trace.
			</p>
		</div>
		</div>
	</section>
  
	<!-- ================= REVIEWS ================= -->
	<section id="reviews" class="border-t border-line">
	  <div class="max-w-[900px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
		<p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">Customer Reviews</p>
		<h2 class="font-serif text-[26px] sm:text-[30px] leading-tight mb-12">What people are saying.</h2>
  
		{#if reviewSummary}
		{@const review = reviewSummary.data}
		{@const totalReviews = review.totalReviews ?? 0}
		{@const filledStars = Math.round(review?.averageRating ?? 0)}
		<!-- ================= REVIEWS SUMMARY + RATING BREAKDOWN ================= -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 mb-16 pb-16 border-b border-line">
		  <div>
			<div class="flex items-end gap-3 mb-2">
			  <span class="font-serif text-[48px] leading-none">
				{Number(filledStars).toFixed(1)}
			  </span>
			  <span class="text-[15px] text-charcoal pb-1.5">/ 5</span>
			</div>
			<div class="text-ink text-[16px] mb-2" aria-hidden="true">
				{'★'.repeat(filledStars)}{'☆'.repeat(5 - filledStars)}
			  </div>
			<p class="text-[13px] text-charcoal">
				Based on {totalReviews} review{totalReviews === 1 ? '' : 's'}
			</p>
		  </div>
  
		  <div class="space-y-2.5">
			{#if review?.breakdown}
			  {#each review.breakdown as item (item.stars)}
				{@const percentage = review.totalReviews > 0 
				  ? Math.round((item.count / review.totalReviews) * 100) 
				  : 0}
				
				<div class="flex items-center gap-3 text-[12px] text-charcoal">
				  <!-- Star Label -->
				  <span class="w-12 flex-shrink-0">
					{item.stars} {item.stars === 1 ? 'Star' : 'Stars'}
				  </span>
				  
				  <!-- Progress Bar Container -->
				  <div class="flex-1 h-1 bg-line">
					<div 
					  class="rating-bar-fill h-1 bg-ink transition-all duration-300"
					  style="width: {percentage}%;"
					></div>
				  </div>
		  
				  <!-- Count Label -->
				  <span class="w-4 flex-shrink-0 text-right">
					{item.count}
				  </span>
				</div>
			  {/each}
			{/if}
		  </div>
		</div>
		{/if}
  
		<!-- ================= REVIEW LIST ================= -->
		<div id="reviewList" class="space-y-10 mb-4">
		  {#each reviews as review}
			<div class="pb-8 border-b border-line last:border-b-0">
			  <div class="flex items-center justify-between mb-2">
				<span class="text-[14px]">
				  <span class="capitalize">
					{review.user.firstName} {review.user.lastName}
				  </span>
				  {#if review.verified}
					<span class="text-[11px] text-clay align-middle">· Verified Purchase</span>
				  {/if}
				</span>
				<span class="text-[13px] text-charcoal">
					{fmtDate(new Date(review.dateCreated))}
				</span>
			  </div>
			  <div class="text-ink text-[14px] mb-3" aria-label="{review.rating} out of 5 stars">
				{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
			  </div>
			  <p class="text-[14px] text-charcoal leading-relaxed">{review.comment}</p>
			</div>
		  {/each}
		</div>
  
		{#if hasMoreReviews}
		  <div class="text-center mb-16 pt-6">
			<button on:click={loadMoreReviews} class="text-[13px] tracking-[0.06em] underline-grow">Load More Reviews</button>
		  </div>
		{/if}
  
		<!-- ================= WRITE REVIEW ================= -->
		<div class="pt-16 border-t border-line">
		  <h3 class="font-serif text-[20px] mb-6">Write a Review</h3>
  
		  {#if !userCanReview}
			<!-- Logged-out prompt -->
			<div id="reviewAuthPrompt" class="bg-sand/60 border border-line px-6 py-8 sm:px-8 sm:py-10">
			  <p class="text-[15px] mb-2">Want to share your experience with this fragrance?</p>
			  <p class="text-[14px] text-charcoal mb-6">Please log in or create an account to leave a review.</p>
			  <div class="flex flex-wrap gap-4">
				<button on:click={() => loginModalOpen = true} 
					class="border border-ink px-6 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors">
					Login
				</button>
				<button on:click={() => signupModalOpen = true} 
					class="text-[13px] tracking-[0.06em] underline-grow">
					Sign Up
				</button>
			  </div>
			</div>
		  {:else}
			<!-- Logged-in review form -->
			<form on:submit|preventDefault={handleSubmitReview} id="reviewForm">
			  <fieldset class="mb-6">
				<legend class="text-[13px] tracking-[0.04em] text-charcoal mb-3">Your Rating</legend>
				<div id="starRatingInput" class="flex items-center gap-1" role="radiogroup" aria-label="Select a star rating">
				  {#each Array(5) as _, i}
					{@const starVal = i + 1}
					<button
					  type="button"
					  role="radio"
					  aria-checked={starVal === selectedRating}
					  aria-label="{starVal} star{starVal > 1 ? 's' : ''}"
					  on:click={() => (selectedRating = starVal)}
					  class="text-[26px] leading-none px-0.5 {starVal <= selectedRating ? 'text-ink' : 'text-line'}"
					>
					  ★
					</button>
				  {/each}
				</div>
			  </fieldset>
  
			  <label for="reviewComment" class="block text-[13px] tracking-[0.04em] text-charcoal mb-3">Your Review</label>
			  <textarea
				id="reviewComment"
				bind:value={formData.comment}
				rows="4"
				placeholder="Share your experience with this fragrance…"
				class="w-full bg-paper border border-line px-4 py-3 text-[14px] leading-relaxed placeholder:text-charcoal/40 focus:outline-none mb-2"
			  ></textarea>
  
			  <button
				type="submit"
				disabled={isSubmittingReview}
				class="mt-4 bg-ink text-paper px-8 py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors disabled:opacity-50"
			  >
				{isSubmittingReview ? 'Submitting…' : 'Submit Review'}
			  </button>
			</form>
		  {/if}
		</div>
	  </div>
	</section>
  
	<!-- ================= RELATED PRODUCTS ================= -->
	<section class="border-t border-line">
	  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
		<p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">You May Also Like</p>
		<h2 class="font-serif text-[26px] sm:text-[30px] leading-tight mb-12">Related Fragrances</h2>
  
		<div id="relatedGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
		  {#each relatedProducts.data as p (p.id || p.name)}
		  {@const imageUrl = p.imagesForThisProduct[0].url}
			<article class="product-card group">
			  <div class="hover-zoom relative aspect-[4/5] overflow-hidden bg-line/40 mb-5">
				<img src={imageUrl} 
					alt="{p.name} perfume bottle" 
					class="w-full h-full object-cover" 
				/>
			  </div>
			  <h3 class="font-serif text-[19px] mb-1">{p.name}</h3>
			  <p class="text-[13px] text-charcoal leading-relaxed mb-3">{p.description}</p>
			  <div class="flex items-center justify-between">
				<span class="text-[15px]">{formatNaira(p.unitPrice)}</span>
				<a href={`/product-detail/${p.slug}`} class="text-[12px] tracking-[0.04em] underline-grow">View Details →</a>
			  </div>
			  <button
				on:click={() => handleAddToCart(p, 1)}
				class="related-add-btn mt-4 w-full border border-ink py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors"
			  >
				Add to Bag
			  </button>
			</article>
		  {/each}
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

<style>
.capitalize { text-transform: capitalize !important; }

#mainMediaContainer {
	height: 600px !important;
	width: 100%;
}

@media screen and (max-width: 600px) { 
	#mainMediaContainer {
	height: 300px !important;
}

}
</style>
