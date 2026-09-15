<script>
	import { AxiosError } from 'axios';
	import Cart from '../components/v2/Cart.svelte';
	import Navbar from '../components/v2/Navbar.svelte';
	import Footer from '../components/v2/Footer.svelte';
	import LoginModal from '../components/v2/Login.svelte';
	import { joinNewsletter } from '../api-requests/request';
	import SignupModal from '../components/v2/Sign-up.svelte';
	import { cart, cartOpen, formatNaira } from '../stores/cart.store';
	import { displayMessage, getItemFromLocalStorage } from '../utils';
	
	export let data;

	// pick categories
	const categories = data.groupings.map((g) => g.category).slice(0, 3);

	// Modal & Overlay States
	let loginModalOpen = false;
	let signupModalOpen = false;
	let searchOverlayOpen = false;
  
	// Search input element reference
	/** @type {HTMLInputElement | undefined} */
	let searchInputEl;
  
	const formData = { email: null };

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
	  if (e.key === 'Escape' && searchOverlayOpen) {
		closeSearch();
	  }
	}

	const handleAddToCart = (
		/** @type {any} */ product, 
		/** @type {Number} */ qty  = 1
	) => {
		// Call addItem(product, price, quantity)
		cart.addItem(product, product.unitPrice, qty);

		// Optional: open the cart drawer overlay
		cartOpen.set(true);
  	}

	  const onSubmit = (/** @type {Event} */ e) => {
		const user = getItemFromLocalStorage('ecommerce-user', true);
		const /** @type {any} */ payload = { 
			email: formData.email,
			...(user?.userId && { userId: user.userId })
		};
		(async () => {
			try {
				const result = await joinNewsletter(payload);
				if (result?.success) {
					const message = result.message ?? 'Joined successfully';
					displayMessage({
						message,
						header: message,
						type: 'success'
					});
					// Reset form
					formData.email = null;
				}
			} catch (ex) {
				if (ex instanceof AxiosError) {
					const message = ex.response?.data.message ?? 'Something went wrong';
					displayMessage({
						message,
						header: 'Error',
						type: 'danger'
					});
				}
			}
		})();
	};
</script>

<svelte:head>
	<title>Home — Chikndisy</title>
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
<!-- ================= HERO ================= -->
<section class="relative pt-[76px]">
	<div class="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
	  <img
		src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1800&q=80"
		alt="A single perfume bottle resting on a stone surface, softly lit"
		class="absolute inset-0 w-full h-full object-cover object-center"
	  />
	  <div class="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"></div>
  
	  <div class="relative h-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex items-end pb-16 sm:pb-20">
		<div class="max-w-[560px] text-paper">
		  <p class="text-[12px] tracking-widest2 uppercase text-paper/70 mb-5">Chikndisy — Est. Boutique Fragrance House</p>
		  <h1 class="font-serif italic text-[38px] sm:text-[54px] leading-[1.08] mb-6">
			Find a fragrance that becomes part of your presence.
		  </h1>
		  <p class="text-[15px] sm:text-[16px] text-paper/85 leading-relaxed max-w-[440px] mb-9">
			A small collection of scents, chosen one bottle at a time, for the moments you want to be remembered in.
		  </p>
		  <div class="flex items-center gap-8">
			<a href="#categories" class="inline-block bg-paper text-ink px-8 py-3.5 text-[13px] tracking-[0.08em] hover:bg-sand transition-colors">
			  Explore Fragrances
			</a>
			<a href="#best-sellers" class="text-[13px] tracking-[0.06em] text-paper underline-grow">
			  Shop Best Sellers
			</a>
		  </div>
		</div>
	  </div>
	</div>
  </section>
  
  <!-- ================= CATEGORIES ================= -->
  <section id="categories" class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
	<div class="mb-14 sm:mb-16 max-w-[520px]">
	  <h2 class="font-serif text-[30px] sm:text-[38px] leading-tight">A collection built around you</h2>
	  <p class="mt-4 text-[15px] text-charcoal leading-relaxed">
		Three ways into the house of Chikndisy — each shaped by a different mood, worn differently by the light.
	  </p>
	</div>
  
	{#if categories.length > 0}
	<div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
		<!-- First Category Card -->
		{#if categories[0]}
		{@const item = categories[0]}
		<a 
			href="/product/{item.id}" 
			class="hover-zoom group relative overflow-hidden block 
				{categories.length === 1 ? 'md:col-span-12 h-[500px] sm:h-[600px]' : ''}
				{categories.length === 2 ? 'md:col-span-8 h-[440px] sm:h-[560px]' : ''}
				{categories.length >= 3 ? 'md:col-span-7 h-[440px] sm:h-[560px]' : ''}"
		>
			<img 
				src={item.image ?? "https://images.pexels.com/photos/31141638/pexels-photo-31141638.jpeg?auto=format&fit=crop&w=1400&q=80"} 
				alt={item.description ?? item.name}
				class="w-full h-full object-cover" 
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"></div>
			<div class="absolute bottom-0 left-0 p-8 sm:p-10 text-paper">
			<h3 class="font-serif italic text-[26px] sm:text-[30px] mb-2 capitalize">{item.name}</h3>
			{#if item.description}
				<p class="text-[13px] text-paper/80 mb-4 max-w-[280px]">
				{item.description}
				</p>
			{/if}
			<span class="text-[13px] tracking-[0.05em] underline-grow">
				View Collection →
			</span>
			</div>
		</a>
		{/if}

		<!-- 2 Categories State: Second Item takes 30% right side -->
		{#if categories.length === 2 && categories[1]}
		{@const item = categories[1]}
		<a href="/product/{item.id}" 
			class="hover-zoom group relative md:col-span-4 h-[440px] sm:h-[560px] overflow-hidden block"
		>
			<img 
			src={item.image ?? "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80"} 
			alt={item.description ?? item.name}
			class="w-full h-full object-cover" 
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"></div>
			<div class="absolute bottom-0 left-0 p-8 text-paper">
			<h3 class="font-serif italic text-[24px] mb-2 capitalize">{item.name}</h3>
			{#if item.description}
				<p class="text-[13px] text-paper/80 mb-4 line-clamp-2">
				{item.description}
				</p>
			{/if}
			<span class="text-[12px] tracking-[0.05em] underline-grow">View Collection →</span>
			</div>
		</a>
		{/if}

		<!-- 3+ Categories State: Stacked right column -->
		{#if categories.length >= 3}
		<div class="md:col-span-5 grid grid-rows-2 gap-6 md:gap-8">
			{#if categories[1]}
			{@const item = categories[1]}
			<a href="/product/{item.id}" class="hover-zoom group relative h-[260px] sm:h-[264px] overflow-hidden block">
				<img src={item.image ?? "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80"} alt={item.name} class="w-full h-full object-cover" />
				<div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"></div>
				<div class="absolute bottom-0 left-0 p-7 text-paper">
				<h3 class="font-serif italic text-[22px] mb-1 capitalize">{item.name}</h3>
				<span class="text-[12px] tracking-[0.05em] underline-grow">View Collection →</span>
				</div>
			</a>
			{/if}

			{#if categories[2]}
			{@const item = categories[2]}
			<a href="/product/{item.id}" class="hover-zoom group relative h-[260px] sm:h-[264px] overflow-hidden block">
				<img src={item.image ?? "https://images.pexels.com/photos/15096784/pexels-photo-15096784.jpeg?auto=format&fit=crop&w=1000&q=80"} alt={item.name} class="w-full h-full object-cover" />
				<div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"></div>
				<div class="absolute bottom-0 left-0 p-7 text-paper">
				<h3 class="font-serif italic text-[22px] mb-1 capitalize">{item.name}</h3>
				<span class="text-[12px] tracking-[0.05em] underline-grow">View Collection →</span>
				</div>
			</a>
			{/if}
		</div>
		{/if}
	</div>
	{/if}
  </section>

  <!-- ================= BEST SELLERS ================= -->
<section id="best-sellers" class="bg-sand/60 border-y border-line">
	<div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
  
	  <div class="flex items-end justify-between mb-14 sm:mb-16 gap-6">
		<div class="max-w-[540px]">
		  <p class="text-[12px] tracking-widest2 uppercase text-clay mb-4">Most Loved</p>
		  <h2 class="font-serif text-[30px] sm:text-[38px] leading-tight">Fragrances worth remembering</h2>
		  <p class="mt-4 text-[15px] text-charcoal leading-relaxed">
			The bottles our customers return for, season after season.
		  </p>
		</div>
	  </div>
  
	  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8">
  
		{#each data.topProducts.data as product}
		{@const imageUrl = product.imagesForThisProduct[0].url}
		<!-- Product 1 -->
		<article class="product-card group" data-name="Velours Noir" data-price="68,000">
		  <div class="hover-zoom relative aspect-[4/5] overflow-hidden bg-line/40 mb-5">
			<img src={imageUrl}
				alt={product.name} 
				class="w-full h-full object-cover" 
			/>
			<span class="absolute top-4 left-4 bg-paper/95 text-ink text-[11px] tracking-[0.08em] uppercase px-3 py-1.5">Best Seller</span>
		  </div>
		  <h3 class="font-serif text-[19px] mb-1">{product.name}</h3>
		  <p class="text-[13px] text-charcoal leading-relaxed mb-3">{product.description}</p>
		  <div class="flex items-center justify-between">
			<span class="text-[15px]">
				{formatNaira(product.unitPrice)}
			</span>
			<a href={`/product-detail/${product.slug}`} 
				class="text-[12px] tracking-[0.04em] underline-grow">
				View Details →
			</a>
		  </div>
		  <button type="button"
		  	on:click={() => handleAddToCart(product, 1)}
			class="add-to-cart-btn mt-4 w-full border border-ink py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors">
			Add to Bag
		  </button>
		</article>
		{/each}
  
	  </div>
	</div>
  </section>
  
	<!-- ================= FEATURED FRAGRANCE ================= -->
	{#if data.topProducts.data}
	{@const item = data.topProducts.data[0]}
	{@const imageUrl = item.imagesForThisProduct[0].url}
	<section class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-36">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
		<div class="lg:col-span-7 lg:order-2 relative h-[420px] sm:h-[560px] overflow-hidden">
			<img src={imageUrl} 
				alt={item.name}
				class="w-full h-full object-cover" 
			/>
		</div>
		<div class="lg:col-span-5 lg:order-1 lg:pr-6">
			<p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">Featured</p>
			<h2 class="font-serif italic text-[32px] sm:text-[40px] leading-[1.12] mb-6">
			A scent designed to linger long after you've left the room.
			</h2>
			<p class="text-[15px] text-charcoal leading-relaxed mb-8 max-w-[420px]">
			<span class="bold">{item.name}</span> {item.description}
			</p>
			<div class="flex items-center gap-8">
				<span class="text-[16px]">
					{formatNaira(item.unitPrice)}
				</span>
				<a href="/product-detail/{item.slug}" 
					class="inline-block border border-ink px-7 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors">
					Discover <span class="bold">{item.name}</span>
				</a>
			</div>
		</div>
		</div>
	</section>
	{/if}
	
	<!-- ================= BRAND STORY ================= -->
	<section id="brand-story" class="border-t border-line">
		<div class="max-w-[720px] mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
		<p class="text-[12px] tracking-widest2 uppercase text-clay mb-6">Our Philosophy</p>
		<h2 class="font-serif italic text-[26px] sm:text-[32px] leading-[1.3] mb-6">
			We believe a fragrance should feel like a memory you haven't made yet.
		</h2>
		<p class="text-[15px] text-charcoal leading-relaxed">
			Chikndisy began as a small selection of scents chosen for people, not trends — fragrances that sit quietly on a shelf until the right day calls for them. We keep the collection small on purpose, so that every bottle earns its place.
		</p>
		</div>
	</section>

  	<!-- ================= WHY CHIKNDISY ================= -->
	<section class="bg-sand/60 border-y border-line">
		<div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10">
			<div class="text-center sm:text-left">
			<div class="w-8 h-px bg-ink mb-6 mx-auto sm:mx-0"></div>
			<h3 class="font-serif text-[19px] mb-3">Curated Selection</h3>
			<p class="text-[14px] text-charcoal leading-relaxed">Every fragrance is chosen with intention — nothing added simply to fill a shelf.</p>
			</div>
			<div class="text-center sm:text-left">
			<div class="w-8 h-px bg-ink mb-6 mx-auto sm:mx-0"></div>
			<h3 class="font-serif text-[19px] mb-3">Long-Lasting Presence</h3>
			<p class="text-[14px] text-charcoal leading-relaxed">Scents built to carry through a full day, not fade by lunch.</p>
			</div>
			<div class="text-center sm:text-left">
			<div class="w-8 h-px bg-ink mb-6 mx-auto sm:mx-0"></div>
			<h3 class="font-serif text-[19px] mb-3">Effortless Ordering</h3>
			<p class="text-[14px] text-charcoal leading-relaxed">Discover a scent and have it at your door with no unnecessary steps.</p>
			</div>
		</div>
		</div>
	</section>
  
  <!-- ================= NEWSLETTER ================= -->
  <section class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-28">
	<div class="max-w-[480px] mx-auto text-center">
	  <h2 class="font-serif italic text-[26px] sm:text-[30px] mb-4">Stay Close</h2>
	  <p class="text-[14px] text-charcoal leading-relaxed mb-8">
		Be the first to know about new fragrances, small-batch releases, and the occasional invitation.
	  </p>
	  <form on:submit|preventDefault={onSubmit} 
	  	id="newsletterForm" 
		class="flex items-stretch border-b border-ink pb-1">
		<label for="newsletterEmail" class="sr-only">Email address</label>
		<input id="newsletterEmail" 
			type="email" 
			required 
			bind:value={formData.email}
			placeholder="Your email address"
		  	class="flex-1 bg-transparent py-2 text-[14px] placeholder:text-charcoal/60 focus:outline-none" 
		/>
		<button type="submit" 
			class="text-[13px] tracking-[0.06em] px-2 whitespace-nowrap">
			Subscribe
		</button>
	  </form>
	  <p id="newsletterConfirm" class="hidden mt-4 text-[13px] text-charcoal">Thank you — you're on the list.</p>
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
		  bind:this={searchInputEl}
		  placeholder="Search fragrances, notes, collections…"
		  class="w-full bg-transparent border-b border-ink pb-3 font-serif italic text-[24px] sm:text-[30px] placeholder:text-ink/40 focus:outline-none"
		/>
	  </div>
	</div>
  </div>
{/if}