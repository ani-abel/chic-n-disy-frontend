<script>
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import { goto } from '$app/navigation';
    import Cart from '../../components/v2/Cart.svelte';
	import Navbar from '../../components/v2/Navbar.svelte';
	import Footer from '../../components/v2/Footer.svelte';
	import LoginModal from '../../components/v2/Login.svelte';
	import SignupModal from '../../components/v2/Sign-up.svelte';
	import Pagination from '../../components/v2/Pagination.svelte';
    import { displayMessage, getItemFromLocalStorage } from '../../utils';
	import { cartOpen, cart, formatNaira, auth } from '../../stores/cart.store';
	import { getProducts, removeSavedProduct, saveProduct } from '../../api-requests/request';
    
	export let data;

  $: pageData = data.products.data;
  $: paginationControl = data.products.paginationControl;

  // Pagination State & Logic
  $: PAGE_SIZE = paginationControl.pageSize ?? 12;
  $: currentPage = paginationControl.currentPage ?? 1;

  $: total = paginationControl?.totalCount;
  $: totalPages = paginationControl?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Ensure page stays within bounds if products change
  $: if (currentPage > totalPages) currentPage = totalPages;

  $: start = (currentPage - 1) * PAGE_SIZE;
  $: pageItems = pageData;

  let user = getItemFromLocalStorage('ecommerce-user', true);

  onMount(() => {
	// check if window
	if(typeof window !== 'undefined') {
		user = getItemFromLocalStorage('ecommerce-user', true);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
  });

  // Create a fast O(1) Lookup Set for favorited product IDs
	$: favoriteProductIds = new Set(
	$auth.user
		? pageItems
			.filter((product) =>
			product.savedProducts?.some((saved) => saved.userId === $auth.user?.userId)
			)
			.map((product) => product.id)
		: []
	);

	/**
 * @param {string} productId
 */
async function toggleFavorite(productId) {
  if (!$auth.isLoggedIn) {
    // Prompt login alert/modal
    return;
  }

  const isFav = favoriteProductIds.has(productId);

  // Optimistic UI update
  if (isFav) {
    favoriteProductIds.delete(productId);
  } else {
    favoriteProductIds.add(productId);
  }
  favoriteProductIds = new Set(favoriteProductIds); // Trigger Svelte reactivity

  try {
    await handleProductFavourite(productId, isFav);
  } catch (err) {
    // Rollback state on API failure
    if (isFav) {
      favoriteProductIds.add(productId);
    } else {
      favoriteProductIds.delete(productId);
    }
    favoriteProductIds = new Set(favoriteProductIds);
  }
}

  	/**
	 * Toggles a product's favorited state with optimistic UI updates and state rollback on error.
	 * @param {string} productId - The unique identifier of the product.
	 * @param {boolean} currentFavStatus - Current favorited status of the product.
	 * @returns {Promise<boolean>} The updated favorite status.
 	*/
	const handleProductFavourite = async (productId, currentFavStatus) => {
	if (!user?.token) {
		displayMessage({
			message: 'Please sign in to save items to your favorites.',
			header: 'Authentication Required',
			type: 'info',
		});
		return currentFavStatus;
	}

	// 1. Optimistic Update
	const newFavStatus = !currentFavStatus;
	const headers = { Authorization: `Bearer ${user.token}` };

	try {
		// 2. Perform API Action
		if (currentFavStatus) {
		await removeSavedProduct(productId, headers);
		} else {
		await saveProduct({ productId, userId: user.userId }, headers);
		}

		return newFavStatus;
	} catch (ex) {
		if (ex instanceof AxiosError) {
			const axiosErrorObject = ex.response?.data;
			displayMessage({
				message: axiosErrorObject?.message,
				header: 'Error',
				type: 'danger'
			});
		}
		// throw ex;
		return currentFavStatus; // Reverts to previous state
	}
	};

  /** 
   * @param {CustomEvent<number>} p 
  */
  const handlePageChange = async (p) => {
	const page = p.detail;
	const result = await getProducts({
		outOfStock: false,
		pageNumber: page,
		pageSize: PAGE_SIZE
	});

	if (result.success) {
		currentPage = p.detail;
		pageItems = result.data;
		paginationControl = result.paginationControl;

		if (typeof window !== 'undefined') {
      		window.scrollTo({ top: 0, behavior: 'smooth' });
    	}
	}	
  }

  const handleAddToCart = (
	/** @type {any} */ product, 
	/** @type {Number} */ qty = 1
  ) => {
	// Call addItem(product, price, quantity)
	cart.addItem(product, product.unitPrice, qty);

	// Optional: open the cart drawer overlay
	cartOpen.set(true);
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
	<title>Shop — Chikndisy</title>
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
	<!-- ================= CATEGORY HEADER ================= -->
	<section class="pt-[76px]">
	  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-16 pb-10 sm:pb-12">
		<p class="text-[12px] tracking-widest2 uppercase text-clay mb-4">All</p>
		<h1 class="font-serif text-[32px] sm:text-[42px] leading-[1.1] mb-4">
			Shop
		</h1>
		<p class="text-[15px] text-charcoal leading-relaxed max-w-[520px]">
			Explore our full selection of luxury fragrances.
		</p>
		{#if total > 0}
		  <p id="resultsContext" class="mt-6 text-[13px] text-charcoal/70">
			Showing {start + 1}–{Math.min(start + PAGE_SIZE, total)} of {total} fragrances
		  </p>
		{/if}
	  </div>
	</section>
  
	<!-- ================= PRODUCTS GRID & EMPTY STATE ================= -->
	{#if total > 0}
	  <section class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
		<div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
		  {#each pageItems as product (product.id)}
		  {@const imageUrl = product.imagesForThisProduct[0].url}
		  <article class="product-card group relative">
			<div class="hover-zoom relative aspect-[4/5] overflow-hidden bg-line/40 mb-5">
			  <img 
				src={imageUrl} 
				alt={`${product.name} perfume bottle`} 
				class="w-full h-full object-cover" 
				loading="lazy" 
			  />
		  
			  {#if $auth.isLoggedIn}
			  {@const isFav = favoriteProductIds.has(product.id)}
			  <!-- Favourite Toggle Button -->
			  <button
				type="button"
				on:click|preventDefault={() => toggleFavorite(product.id)}
				aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
				class="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-paper/80 backdrop-blur-sm text-ink hover:scale-110 transition-all cursor-pointer"
			  >
				<svg 
				  width="18" 
				  height="18" 
				  viewBox="0 0 24 24" 
				  fill={isFav ? "currentColor" : "none"} 
				  stroke="currentColor" 
				  stroke-width="1.5"
				  class={!isFav ? "text-ink" : "text-charcoal hover:text-ink"}
				>
				  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
				</svg>
			  </button>
			  {/if}
			</div>
		  
			<h3 class="font-serif text-[19px] mb-1">{product.name}</h3>
			<p class="text-[13px] text-charcoal leading-relaxed mb-3">
			  {product.description}
			</p>
			<div class="flex items-center justify-between">
			  <span class="text-[15px]">{formatNaira(product.unitPrice)}</span>
			  <a href={`/product-detail/${product.slug}`} class="text-[12px] tracking-[0.04em] underline-grow">View More →</a>
			</div>
			<button 
			  on:click={() => handleAddToCart(product, 1)}
			  class="add-to-cart-btn mt-4 w-full border border-ink py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors"
			>
			  Add to Cart
			</button>
		  </article>
		  {/each}
		</div>
	  </section>
		{#if paginationControl}
		<!-- ================= PAGINATION ================= -->
		<Pagination meta={paginationControl} on:change={handlePageChange} />
		{/if}
	{:else}
	  <!-- ================= EMPTY STATE ================= -->
	  <section id="emptyState" class="max-w-[640px] mx-auto px-5 sm:px-8 pb-28 sm:pb-36 text-center">
		<svg class="mx-auto mb-8" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5">
		  <rect x="4" y="7" width="16" height="13" rx="1"/>
		  <path d="M8 7V5a4 4 0 0 1 8 0v2"/>
		</svg>
		<h2 class="font-serif text-[24px] sm:text-[28px] mb-4">No Fragrances Found in This Category</h2>
		<p class="text-[15px] text-charcoal leading-relaxed mb-8">
		  We're currently updating this collection. Please explore our other fragrances in the meantime.
		</p>
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
		  <a href="/shop" class="border border-ink px-7 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors">
			View All Perfumes
		  </a>
		  <a href="/" class="text-[13px] tracking-[0.06em] underline-grow">
			Return Home
		  </a>
		</div>
	  </section>
	{/if}
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


