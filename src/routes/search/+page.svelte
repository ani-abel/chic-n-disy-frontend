<script>
	import { goto } from '$app/navigation';
	import Cart from '../../components/v2/Cart.svelte';
	import Navbar from '../../components/v2/Navbar.svelte';
	import Footer from '../../components/v2/Footer.svelte';
	import LoginModal from '../../components/v2/Login.svelte';
	import SignupModal from '../../components/v2/Sign-up.svelte';
	import Pagination from '../../components/v2/Pagination.svelte';
	import { globalSearchForProducts } from '../../api-requests/request';
	import { cart, cartOpen, formatNaira } from '../../stores/cart.store';

  export let data;
  const query = data.searchQuery ?? '';

  let searchQuery = query;
  let activeQuery = query;

  // Pagination State
  $: paginationControl = data.products?.paginationControl;

  $: PAGE_SIZE = paginationControl?.pageSize ?? 12;
  $: currentPage = paginationControl?.currentPage ?? 1;

  $: total = paginationControl?.totalCount ?? 0;
  $: totalPages = paginationControl?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Maintain current page limits when query changes
  $: if (currentPage > totalPages) currentPage = totalPages;

  $: start = (currentPage - 1) * PAGE_SIZE;
  $: pageItems = data.products?.data;

  /** 
   * @param {CustomEvent<number>} p 
  */
  const handlePageChange = async (p) => {
	const page = +p.detail;
	activeQuery = searchQuery;

	const result = await globalSearchForProducts(searchQuery, {
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

  /** 
   * @param {Event} e 
  */
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    activeQuery = searchQuery;
    currentPage = 1;

	const result = await globalSearchForProducts(searchQuery, {
		pageNumber: currentPage,
		pageSize: PAGE_SIZE
	});

	if (result.success) {
		pageItems = result.data;
		paginationControl = result.paginationControl;

		if (typeof window !== 'undefined') {
      		window.scrollTo({ top: 0, behavior: 'smooth' });
    	}
	}	
  }

  function clearSearch() {
    searchQuery = '';
    activeQuery = '';
    currentPage = 1;
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
	<title>{searchQuery ?? 'Search'} — Chikndisy</title>
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
	<!-- ================= SEARCH HEADER ================= -->
	<section id="searchHeader" class="pt-[76px]">
	  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-10 sm:pb-12">
		<div class="max-w-[560px]">
		  <p class="text-[12px] tracking-widest2 uppercase text-clay mb-4">Search</p>
		  <h1 class="font-serif text-[32px] sm:text-[42px] leading-[1.1] mb-4">Find Your Fragrance</h1>
		  <p class="text-[15px] text-charcoal leading-relaxed">
			Explore our collection and discover a scent that feels uniquely yours.
		  </p>
		</div>
  
		<!-- ================= SEARCH BAR ================= -->
		<form on:submit={handleSearchSubmit} role="search" class="mt-10 sm:mt-12 max-w-[720px]">
		  <label for="pageSearchInput" class="sr-only">Search fragrances</label>
		  <div class="flex items-stretch gap-4 sm:gap-5">
			<div class="relative flex-1 flex items-center border-b border-ink">
			  <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1.3">
				<circle cx="8.2" cy="8.2" r="6.2"/>
				<line x1="13" y1="13" x2="18" y2="18"/>
			  </svg>
			  <input
				id="pageSearchInput"
				type="text"
				bind:value={searchQuery}
				placeholder="Search fragrances, notes, collections…"
				class="w-full bg-transparent pl-4 pr-9 py-3 sm:py-3.5 font-serif italic text-[19px] sm:text-[24px] placeholder:text-ink/40 focus:outline-none"
				autocomplete="off"
			  />
			  {#if searchQuery.length > 0}
				<button
				  type="button"
				  on:click={clearSearch}
				  aria-label="Clear search"
				  class="absolute right-0 w-8 h-8 flex items-center justify-center text-charcoal hover:text-ink"
				>
				  <svg width="14" height="14" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3"><line x1="1" y1="1" x2="15" y2="15"/><line x1="15" y1="1" x2="1" y2="15"/></svg>
				</button>
			  {/if}
			</div>
			<button type="submit" class="flex-shrink-0 bg-ink text-paper px-6 sm:px-8 py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors">
			  Search
			</button>
		  </div>
		</form>
  
		<!-- ================= RESULTS SUMMARY ================= -->
		<div id="resultsSummary" class="mt-8 sm:mt-10 pt-6 border-t border-line">
		  <h2 class="font-serif text-[20px] sm:text-[23px] mb-1.5">
			{activeQuery.trim() ? `Results for “${activeQuery.trim()}”` : 'All Fragrances'}
		  </h2>
		  <p class="text-[13px] text-charcoal tracking-[0.02em]">
			{#if total === 0}
			  No fragrances found.
			{:else}
			  {total === 1 ? '1 fragrance found' : `${total} fragrances found`} · Showing {start + 1}–{Math.min(start + PAGE_SIZE, total)} of {total} fragrances
			{/if}
		  </p>
		</div>
	  </div>
	</section>

{#if searchQuery !== undefined && searchQuery !== null && searchQuery.trim().length === 0}
  <!-- 1. EMPTY SEARCH TERM STATE (User hasn't typed anything or search is blank) -->
  <section class="max-w-[640px] mx-auto px-5 sm:px-8 pb-28 sm:pb-36 text-center">
    <svg class="mx-auto mb-8" width="40" height="40" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5">
      <circle cx="8.2" cy="8.2" r="6.2"/>
      <line x1="13" y1="13" x2="18" y2="18"/>
    </svg>
    <h2 class="font-serif text-[24px] sm:text-[28px] mb-4">Please Enter a Search Keyword</h2>
    <p class="text-[15px] text-charcoal leading-relaxed mb-8">
      Type a product name, note, or collection above to discover our fragrances.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      <button on:click={clearSearch} class="border border-ink px-7 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors">
        View All Fragrances
      </button>
    </div>
  </section>
{:else if total > 0}
  <!-- 2. PRODUCT RESULTS & PAGINATION (Search produced items) -->
  <section class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
    <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
      {#each pageItems as product (product.id || product.name)}
        {@const imageUrl = product.imagesForThisProduct?.[0]?.url}
        <article class="product-card group">
          <div class="hover-zoom relative aspect-[4/5] overflow-hidden bg-line/40 mb-5">
            <img 
              src={imageUrl} 
              alt={`${product.name} perfume bottle`} 
              class="w-full h-full object-cover" 
              loading="lazy" 
            />
          </div>
          <h3 class="font-serif text-[19px] mb-1">{product.name}</h3>
          <p class="text-[13px] text-charcoal leading-relaxed mb-3">{product.description}</p>
          <div class="flex items-center justify-between">
            <span class="text-[15px]">
              {formatNaira(product.unitPrice)}
            </span>
            <a href={`/product-detail/${product.slug}`} class="text-[12px] tracking-[0.04em] underline-grow">
              View Details →
            </a>
          </div>
          <button 
            on:click={() => handleAddToCart(product, 1)}
            class="add-to-cart-btn mt-4 w-full border border-ink py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors"
          >
            Add to Bag
          </button>
        </article>
      {/each}
    </div>
  </section>

  {#if paginationControl}
  <!-- PAGINATION -->
    <Pagination meta={paginationControl} on:change={handlePageChange} />
  {/if}

{:else}
  <!-- 3. NO RESULTS STATE (Search was performed, but returned 0 items) -->
  <section class="max-w-[640px] mx-auto px-5 sm:px-8 pb-28 sm:pb-36 text-center">
    <svg class="mx-auto mb-8" width="40" height="40" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5">
      <circle cx="8.2" cy="8.2" r="6.2"/>
      <line x1="13" y1="13" x2="18" y2="18"/>
    </svg>
    <h2 class="font-serif text-[24px] sm:text-[28px] mb-4">No Fragrances Found</h2>
    <p class="text-[15px] text-charcoal leading-relaxed mb-1">We couldn't find any fragrances matching</p>
    <p class="font-serif italic text-[18px] mb-8">&ldquo;{(activeQuery || '').trim()}&rdquo;</p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      <button on:click={clearSearch} class="text-[13px] tracking-[0.06em] underline-grow">Clear Search</button>
      <button on:click={clearSearch} class="border border-ink px-7 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors">
        Explore Collection
      </button>
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