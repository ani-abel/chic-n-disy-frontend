<script>
  import { goto } from '$app/navigation';
	import Navbar from "../../components/v2/Navbar.svelte";
  import Footer from '../../components/v2/Footer.svelte';
	import LoginModal from '../../components/v2/Login.svelte';
	import SignupModal from '../../components/v2/Sign-up.svelte';
	import Cart from '../../components/v2/Cart.svelte';

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
    <!-- ================= ABOUT HERO ================= -->
    <section class="pt-[76px]">
        <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div class="lg:col-span-5">
            <p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">Our Story</p>
            <h1 class="font-serif italic text-[36px] sm:text-[48px] leading-[1.1] mb-6">
                More than a fragrance.
            </h1>
            <p class="text-[15px] sm:text-[16px] text-charcoal leading-relaxed max-w-[440px]">
                We believe scent has a quiet kind of power — the ability to become part of who you are, and to stay behind in a room long after you've left it. Chikndisy exists to help you find that scent.
            </p>
            </div>
            <div class="lg:col-span-7 relative h-[340px] sm:h-[460px] lg:h-[520px] overflow-hidden">
            <img
                src="https://images.pexels.com/photos/15096784/pexels-photo-15096784.jpeg"
                alt="A minimal editorial arrangement of Chikndisy fragrance bottles on a light surface"
                class="w-full h-full object-cover"
            />
            </div>
        </div>
        </div>
    </section>

    <!-- ================= BRAND STORY ================= -->
    <section class="border-t border-line">
        <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
    
        <!-- Story intro -->
        <div class="max-w-[640px] mb-20 sm:mb-28">
            <h2 class="font-serif text-[28px] sm:text-[36px] leading-tight mb-6">The Beginning</h2>
            <p class="text-[15px] sm:text-[16px] text-charcoal leading-relaxed mb-5">
            Chikndisy started with a smaller question than most fragrance houses ask. Not "what can we sell," but "what would we want to wear." A single shelf, a handful of scents, and a conviction that most people don't need more choices — they need better ones.
            </p>
            <p class="text-[15px] sm:text-[16px] text-charcoal leading-relaxed">
            What began as a personal search for the right bottle slowly became a small collection, then a boutique, then a house. The scale changed. The instinct never did.
            </p>
        </div>
    
        <!-- ================= EDITORIAL STORY SECTION A ================= -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32">
            <div class="lg:col-span-6 relative h-[340px] sm:h-[460px] overflow-hidden order-1">
            <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80"
                alt="Amber perfume bottle in warm afternoon light"
                class="w-full h-full object-cover"
            />
            </div>
            <div class="lg:col-span-6 order-2 lg:pl-4">
            <p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">A Love For Fragrance</p>
            <h3 class="font-serif text-[26px] sm:text-[30px] leading-tight mb-6">Scent remembers what we forget.</h3>
            <p class="text-[15px] text-charcoal leading-relaxed mb-4">
                A song can be skipped. A photograph fades into the background of a phone you rarely scroll through. But a fragrance, caught unexpectedly in a stairwell or on a stranger's coat, can return you instantly to a year, a person, a version of yourself you thought you'd lost.
            </p>
            <p class="text-[15px] text-charcoal leading-relaxed">
                That's the effect we chase with every bottle we choose to carry — not just something pleasant to wear, but something worth being remembered by.
            </p>
            </div>
        </div>
    
        <!-- ================= EDITORIAL STORY SECTION B ================= -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div class="lg:col-span-6 order-2 lg:order-1 lg:pr-4">
            <p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">Curated With Intention</p>
            <h3 class="font-serif text-[26px] sm:text-[30px] leading-tight mb-6">We keep the collection small on purpose.</h3>
            <p class="text-[15px] text-charcoal leading-relaxed mb-4">
                Every fragrance that carries the Chikndisy name is chosen slowly. We're less interested in trend cycles than in composition — how a scent opens, how it settles, how it feels three hours in, when the top notes have gone quiet and what's left is simply you.
            </p>
            <p class="text-[15px] text-charcoal leading-relaxed">
                If a bottle doesn't earn its place on the shelf, it doesn't make the collection. That discipline is slower. We think it's also the only way to do this honestly.
            </p>
            </div>
            <div class="lg:col-span-6 order-1 lg:order-2 relative h-[340px] sm:h-[460px] overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1608528577891-eb055944f2e7?auto=format&fit=crop&w=1200&q=80"
                alt="A pale glass perfume bottle photographed in soft daylight"
                class="w-full h-full object-cover"
            />
            </div>
        </div>
    
        </div>
    </section>
  
    <!-- ================= BRAND PHILOSOPHY ================= -->
    <section class="bg-sand/60 border-y border-line">
        <div class="max-w-[900px] mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
        <p class="text-[12px] tracking-widest2 uppercase text-clay mb-6">What We Believe</p>
        <h2 class="font-serif text-[28px] sm:text-[36px] leading-tight mb-10">A fragrance should feel personal.</h2>
        <blockquote class="font-serif italic text-[24px] sm:text-[32px] leading-[1.35] text-ink mb-10 max-w-[720px] mx-auto">
            "The right fragrance doesn't simply enter a room. It becomes part of the memory."
        </blockquote>
        <p class="text-[15px] text-charcoal leading-relaxed max-w-[560px] mx-auto">
            We don't believe in a single signature scent for everyone, or a fragrance for every occasion on the calendar. We believe in finding the one that feels less like something you put on, and more like something you already were.
        </p>
        </div>
    </section>
  
    <!-- ================= FRAGRANCE EXPERIENCE ================= -->
    <section class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div class="max-w-[560px] mb-16 sm:mb-20">
        <p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">Discover</p>
        <h2 class="font-serif text-[28px] sm:text-[36px] leading-tight">Finding your fragrance, without the noise.</h2>
        </div>
    
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-10">
        <div>
            <span class="block font-serif italic text-[15px] text-clay mb-5">01</span>
            <h3 class="font-serif text-[20px] mb-3">Explore</h3>
            <p class="text-[14px] text-charcoal leading-relaxed">Move through a small collection built across distinct scent profiles, from warm and resinous to clean and quiet.</p>
        </div>
        <div>
            <span class="block font-serif italic text-[15px] text-clay mb-5">02</span>
            <h3 class="font-serif text-[20px] mb-3">Connect</h3>
            <p class="text-[14px] text-charcoal leading-relaxed">Notice which notes you return to. A fragrance that resonates rarely needs convincing — you'll simply keep wearing it.</p>
        </div>
        <div>
            <span class="block font-serif italic text-[15px] text-clay mb-5">03</span>
            <h3 class="font-serif text-[20px] mb-3">Make It Yours</h3>
            <p class="text-[14px] text-charcoal leading-relaxed">Choose the bottle that feels less like a purchase and more like something you were already carrying.</p>
        </div>
        </div>
    </section>
  
    <!-- ================= WHY CHIKNDISY ================= -->
    <section class="border-t border-line">
        <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div class="max-w-[560px] mb-16 sm:mb-20">
            <p class="text-[12px] tracking-widest2 uppercase text-clay mb-5">Why Chikndisy</p>
            <h2 class="font-serif text-[28px] sm:text-[36px] leading-tight">What you can expect from us.</h2>
        </div>
    
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14">
            <div class="border-t border-line pt-6">
            <h3 class="font-serif text-[19px] mb-3">Curated With Intention</h3>
            <p class="text-[14px] text-charcoal leading-relaxed">Every fragrance is chosen to offer something memorable — nothing added simply to fill a shelf.</p>
            </div>
            <div class="border-t border-line pt-6">
            <h3 class="font-serif text-[19px] mb-3">A Scent for Every Presence</h3>
            <p class="text-[14px] text-charcoal leading-relaxed">A collection built across moods and moments, not one signature scent asked to do everything.</p>
            </div>
            <div class="border-t border-line pt-6">
            <h3 class="font-serif text-[19px] mb-3">Made for Discovery</h3>
            <p class="text-[14px] text-charcoal leading-relaxed">Explore fragrances at your own pace, without the pressure of an overwhelming catalogue.</p>
            </div>
            <div class="border-t border-line pt-6">
            <h3 class="font-serif text-[19px] mb-3">An Experience That Feels Personal</h3>
            <p class="text-[14px] text-charcoal leading-relaxed">From browsing to your door, finding a fragrance should feel enjoyable — never transactional.</p>
            </div>
        </div>
        </div>
    </section>
  
    <!-- ================= BRAND VISUAL MOMENT ================= -->
    <section class="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <img
        src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1800&q=80"
        alt="A single amber perfume bottle standing alone, catching evening light"
        class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent"></div>
        <div class="relative h-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex items-end pb-16 sm:pb-20">
        <div class="max-w-[540px] text-paper">
            <h2 class="font-serif italic text-[32px] sm:text-[44px] leading-[1.12] mb-5">Leave something behind.</h2>
            <p class="text-[15px] sm:text-[16px] text-paper/85 leading-relaxed max-w-[440px]">
            A fragrance can disappear from the air, but it remains in someone's memory — long after the room has emptied.
            </p>
        </div>
        </div>
    </section>
    
    <!-- ================= CLOSING STATEMENT ================= -->
    <section class="border-t border-line">
        <div class="max-w-[720px] mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
        <h2 class="font-serif italic text-[30px] sm:text-[40px] leading-[1.15] mb-6">
            Find the fragrance that feels like you.
        </h2>
        <p class="text-[15px] text-charcoal leading-relaxed max-w-[520px] mx-auto mb-10">
            Every bottle in our collection was chosen the same way we hope you'll choose yours — slowly, honestly, and for no reason other than how it makes you feel.
        </p>
    
        <!-- ================= CALL TO ACTION ================= -->
        <a href="/shop" class="inline-block bg-ink text-paper px-9 py-4 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors">
            Explore Our Collection
        </a>
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