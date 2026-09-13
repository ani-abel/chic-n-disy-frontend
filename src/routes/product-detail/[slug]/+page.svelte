<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
	import Navbar from '../../../components/v2/Navbar.svelte';
	import Footer from '../../../components/v2/Footer.svelte';
	import LoginModal from '../../../components/v2/Login.svelte';
	import SignupModal from '../../../components/v2/Sign-up.svelte';
	import Cart from '../../../components/v2/Cart.svelte';
	import { auth, cart, cartOpen, formatNaira } from '../../../stores/cart.store';

	const dispatch = createEventDispatcher();

	// Props (Can be passed from +page.js/+page.server.js or default used below)
	export let data;

	const { product: pageData, relatedProducts } = data

	console.log({pageData, data});

	// Logged in state (can come from store or auth context)
	export let isLoggedIn = false;
	export let user = null;

	onMount(() => {
		user = $auth.user;
		isLoggedIn = $auth.isLoggedIn;
	});

// Primary Product State
let product = {
  id: 'perfume-oud-noir',
  name: 'Oud Noir',
  price: 95000,
  stock: 14,
  category: 'Woody Oriental',
  description: 'A deep and captivating composition of warm woods, amber, and subtle spice — built to linger long after the room has emptied.',
  rating: 4.8,
  reviewCount: 24,
  size: '50ml',
  concentration: 'Eau de Parfum',
  gender: 'Unisex',
  longevity: '8–10 hours',
  notes: {
	top: ['Bergamot', 'Pink Pepper', 'Cardamom'],
	heart: ['Rose', 'Saffron', 'Leather'],
	base: ['Oud', 'Amber', 'Musk']
  },
  media: [
	{ type: 'image', src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80', alt: 'Oud Noir perfume bottle, front view' },
	{ type: 'image', src: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80', alt: 'Oud Noir perfume bottle in warm light' },
	{ type: 'image', src: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80', alt: 'Oud Noir perfume bottle standing alone' },
	{ type: 'image', src: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=80', alt: 'Oud Noir perfume bottle close-up detail' },
	{
	  type: 'video',
	  src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
	  poster: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
	},
  ],
};


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
			: []),
	];

  // Gallery Active Index
  let activeMediaIndex = 0;

  // Quantity State
  let selectedQty = 1;

  // Reviews State
  let initialReviews = [
    { name: 'Ada O.', rating: 5, comment: 'The scent is absolutely beautiful and lasts all day. One of my favourite fragrances.', date: '2 weeks ago', verified: true },
    { name: 'Tolu A.', rating: 5, comment: 'Compliments every time I wear this. The dry-down is unbelievably rich.', date: '3 weeks ago', verified: true },
    { name: 'Ifeoma K.', rating: 4, comment: 'Beautiful bottle and beautiful scent. Wish it lasted a little longer on my skin type.', date: '1 month ago', verified: false },
  ];

  let extraReviews = [
    { name: 'David E.', rating: 5, comment: 'Deep, warm, and genuinely unique. Not like anything else in my collection.', date: '1 month ago', verified: true },
    { name: 'Grace N.', rating: 5, comment: 'Bought this for my husband and now I steal it constantly. Worth every naira.', date: '6 weeks ago', verified: true },
  ];

  let reviews = [...initialReviews];
  let hasMoreReviews = true;

  // Review Submission Form
  let selectedRating = 0;
  let reviewComment = '';
  let isSubmittingReview = false;
  let reviewFormError = '';
  let reviewFormSuccess = false;

  // Stock Status Calculation
  $: stockStatus = (() => {
    if (product.stock === 0) return { label: 'Out of Stock', color: 'bg-rust', text: 'text-rust', disabled: true };
    if (product.stock <= 5) return { label: 'Limited Availability', color: 'bg-clay', text: 'text-clay', disabled: false };
    if (product.stock < 20) return { label: 'In Stock', color: 'bg-sage', text: 'text-sage', disabled: false };
    return { label: 'Well Stocked', color: 'bg-sage', text: 'text-sage', disabled: false };
  })();

  let quantity = 0;


  const handleAddToCart = (
	/** @type {any} */ product, 
	/** @type {Number} */ qty = 1
  ) => {
	// Call addItem(product, price, quantity)
	cart.addItem(product, product.unitPrice, qty);

	// Optional: open the cart drawer overlay
	cartOpen.set(true);
  }

  function handleDecreaseQty(/** @type {any} */  product) {
    if (selectedQty > 1) selectedQty -= 1;
	cart.updateQty(product.id, selectedQty);
  }

  function handleIncreaseQty(/** @type {any} */  product) {
    selectedQty += 1;
	cart.updateQty(product.id, selectedQty)
  }

  function loadMoreReviews() {
    reviews = [...reviews, ...extraReviews];
    hasMoreReviews = false;
  }

  function handleSubmitReview() {
    reviewFormError = '';
    reviewFormSuccess = false;

    if (selectedRating === 0 || !reviewComment.trim()) {
      reviewFormError = 'Please add a rating and a short comment before submitting.';
      return;
    }

    isSubmittingReview = true;

    setTimeout(() => {
      isSubmittingReview = false;
      const newReview = {
        name: user?.name || 'You',
        rating: selectedRating,
        comment: reviewComment.trim(),
        date: 'Just now',
        verified: true,
      };

      reviews = [newReview, ...reviews];
      reviewFormSuccess = true;
      reviewComment = '';
      selectedRating = 0;
    }, 900);
  }

  // Mock ends here //
  
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
	 * @param {string} e
	 * @returns {boolean}
	 */
	function validateEmail(e) {
	  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
	}
  
	function handleContactSubmit() {
	  formSuccess = false;
	  formError = false;
  
	  errors = {
		fullName: fullName.trim().length === 0,
		email: !validateEmail(email),
		subject: subject.trim().length === 0,
		message: message.trim().length === 0
	  };
  
	  const hasError = Object.values(errors).some(Boolean);
	  if (hasError) return;
  
	  isSubmitting = true;
  
	  // Mock Form Submission
	  setTimeout(() => {
		isSubmitting = false;
		formSuccess = true;
		fullName = '';
		email = '';
		phone = '';
		subject = '';
		message = '';
	  }, 1000);
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
				  on:click={() => {
					const i = (activeMediaIndex = idx)
					console.log({tt: i})

					return (activeMediaIndex = idx)
				  }}
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
			  {pageData.product.description}
			</p>
  
			<div class="flex items-center gap-3 mb-1">
				<span class="text-[24px]">
					{formatNaira(pageData.product.unitPrice)}
				</span>
			</div>
  
			<!-- Rating summary (compact, links down to full reviews) -->
			<a href="#reviews" class="inline-flex items-center gap-2 mb-8 text-[13px] text-charcoal underline-grow">
			  <span class="flex items-center gap-0.5 text-ink" aria-hidden="true">★★★★★</span>
			  <span>{product.rating} · {product.reviewCount} reviews</span>
			</a>
  
			<!-- ================= STOCK STATUS ================= -->
			<div id="stockStatus" class="flex items-center gap-2 mb-8 text-[13px]">
			  <span class="w-1.5 h-1.5 rounded-full {stockStatus.color}"></span>
			  <span class={stockStatus.text}>{stockStatus.label}</span>
			</div>
  
			<!-- Product metadata -->
			<dl class="grid grid-cols-2 gap-y-3 gap-x-6 mb-8 pb-8 border-b border-line text-[13px] max-w-[420px]">
			  <div>
				<dt class="text-charcoal/60">Size</dt>
				<dd class="mt-0.5">{product.size}</dd>
			  </div>
			  <div>
				<dt class="text-charcoal/60">Concentration</dt>
				<dd class="mt-0.5">{product.concentration}</dd>
			  </div>
			  <div>
				<dt class="text-charcoal/60">For</dt>
				<dd class="mt-0.5">{product.gender}</dd>
			  </div>
			  <div>
				<dt class="text-charcoal/60">Longevity</dt>
				<dd class="mt-0.5">{product.longevity}</dd>
			  </div>
			</dl>
  
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
			  disabled={stockStatus.disabled}
			  on:click={() => handleAddToCart(data.product, selectedQty)}
			  class="w-full sm:w-auto sm:min-w-[280px] bg-ink text-paper px-9 py-4 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors disabled:opacity-40 disabled:pointer-events-none"
			>
			  {stockStatus.disabled ? 'Out of Stock' : 'Add to Bag'}
			</button>
  
			<!-- ================= FRAGRANCE NOTES ================= -->
			<div class="mt-14 pt-10 border-t border-line">
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
			</div>
  
		  </div>
		</div>
	  </div>
	</section>
  
	<!-- ================= PRODUCT DESCRIPTION ================= -->
	<section class="border-t border-line">
	  <div class="max-w-[720px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
		<p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">The Fragrance</p>
		<h2 class="font-serif text-[26px] sm:text-[30px] leading-tight mb-8">A quiet kind of presence.</h2>
  
		<p class="text-[15px] text-charcoal leading-relaxed mb-6">
		  Oud Noir opens with a burst of bergamot and pink pepper, sharp and bright, before quickly giving way to something warmer. Cardamom lingers just beneath the surface, adding a faint spice that never quite disappears.
		</p>
		<p class="text-[15px] text-charcoal leading-relaxed mb-6">
		  As it settles, rose and saffron take the lead — rich without being sweet, softened by a thread of leather that gives the whole composition its structure. This is the heart of the fragrance, and where it spends most of its life on skin.
		</p>
		<p class="text-[15px] text-charcoal leading-relaxed">
		  By the base, oud, amber, and musk take over entirely. Dark, resinous, and slow to fade, this is a fragrance built for evenings — for rooms you want to be remembered in, long after you've left them.
		</p>
	  </div>
	</section>
  
	<!-- ================= REVIEWS ================= -->
	<section id="reviews" class="border-t border-line">
	  <div class="max-w-[900px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
		<p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">Customer Reviews</p>
		<h2 class="font-serif text-[26px] sm:text-[30px] leading-tight mb-12">What people are saying.</h2>
  
		<!-- ================= REVIEWS SUMMARY + RATING BREAKDOWN ================= -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 mb-16 pb-16 border-b border-line">
		  <div>
			<div class="flex items-end gap-3 mb-2">
			  <span class="font-serif text-[48px] leading-none">4.8</span>
			  <span class="text-[15px] text-charcoal pb-1.5">/ 5</span>
			</div>
			<div class="text-ink text-[16px] mb-2" aria-hidden="true">★★★★★</div>
			<p class="text-[13px] text-charcoal">Based on 24 reviews</p>
		  </div>
  
		  <div class="space-y-2.5">
			<div class="flex items-center gap-3 text-[12px] text-charcoal">
			  <span class="w-12 flex-shrink-0">5 Stars</span>
			  <div class="flex-1 h-1 bg-line"><div class="rating-bar-fill h-1 bg-ink w-[83%]"></div></div>
			  <span class="w-4 flex-shrink-0 text-right">20</span>
			</div>
			<div class="flex items-center gap-3 text-[12px] text-charcoal">
			  <span class="w-12 flex-shrink-0">4 Stars</span>
			  <div class="flex-1 h-1 bg-line"><div class="rating-bar-fill h-1 bg-ink w-[12%]"></div></div>
			  <span class="w-4 flex-shrink-0 text-right">3</span>
			</div>
			<div class="flex items-center gap-3 text-[12px] text-charcoal">
			  <span class="w-12 flex-shrink-0">3 Stars</span>
			  <div class="flex-1 h-1 bg-line"><div class="rating-bar-fill h-1 bg-ink w-[4%]"></div></div>
			  <span class="w-4 flex-shrink-0 text-right">1</span>
			</div>
			<div class="flex items-center gap-3 text-[12px] text-charcoal">
			  <span class="w-12 flex-shrink-0">2 Stars</span>
			  <div class="flex-1 h-1 bg-line"><div class="rating-bar-fill h-1 bg-ink w-[0%]"></div></div>
			  <span class="w-4 flex-shrink-0 text-right">0</span>
			</div>
			<div class="flex items-center gap-3 text-[12px] text-charcoal">
			  <span class="w-12 flex-shrink-0">1 Star</span>
			  <div class="flex-1 h-1 bg-line"><div class="rating-bar-fill h-1 bg-ink w-[0%]"></div></div>
			  <span class="w-4 flex-shrink-0 text-right">0</span>
			</div>
		  </div>
		</div>
  
		<!-- ================= REVIEW LIST ================= -->
		<div id="reviewList" class="space-y-10 mb-4">
		  {#each reviews as review}
			<div class="pb-8 border-b border-line last:border-b-0">
			  <div class="flex items-center justify-between mb-2">
				<span class="text-[14px]">
				  {review.name}
				  {#if review.verified}
					<span class="text-[11px] text-clay align-middle">· Verified Purchase</span>
				  {/if}
				</span>
				<span class="text-[13px] text-charcoal">{review.date}</span>
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
  
		  {#if !isLoggedIn}
			<!-- Logged-out prompt -->
			<div id="reviewAuthPrompt" class="bg-sand/60 border border-line px-6 py-8 sm:px-8 sm:py-10">
			  <p class="text-[15px] mb-2">Want to share your experience with this fragrance?</p>
			  <p class="text-[14px] text-charcoal mb-6">Please log in or create an account to leave a review.</p>
			  <div class="flex flex-wrap gap-4">
				<button on:click={() => loginModalOpen = true} class="border border-ink px-6 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors">Login</button>
				<button on:click={() => signupModalOpen = true} class="text-[13px] tracking-[0.06em] underline-grow">Sign Up</button>
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
				bind:value={reviewComment}
				rows="4"
				placeholder="Share your experience with this fragrance…"
				class="w-full bg-paper border border-line px-4 py-3 text-[14px] leading-relaxed placeholder:text-charcoal/40 focus:outline-none mb-2"
			  ></textarea>
  
			  {#if reviewFormError}
				<p class="text-[13px] text-rust mb-4">{reviewFormError}</p>
			  {/if}
  
			  {#if reviewFormSuccess}
				<p class="text-[13px] text-sage mb-4">Thank you for sharing your experience.</p>
			  {/if}
  
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
				<a href={`/products/${p.slug}`} class="text-[12px] tracking-[0.04em] underline-grow">View Details →</a>
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