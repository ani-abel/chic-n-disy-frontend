<script>
	import { page } from '$app/stores';
  import { createEventDispatcher } from 'svelte';
  import { cartCount, cartOpen, auth } from '../../stores/cart.store';

  const dispatch = createEventDispatcher();

  export let hideCart = false;

  let mobileMenuOpen = false;
  let accountMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  function toggleAccountMenu() {
    accountMenuOpen = !accountMenuOpen;
  }

  function closeAccountMenu() {
    accountMenuOpen = false;
  }

  function handleSignOut() {
    auth.logout();
    closeAccountMenu();
		dispatch('openLogin');
  }

  /**
   * @param {KeyboardEvent} event
   */
  function handleKeydown(event) {
    if (event.key === 'Escape' && mobileMenuOpen) {
      closeMobileMenu();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<header id="navbar" class="fixed top-0 inset-x-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-line">
  <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
    <div class="h-[76px] flex items-center justify-between">

      <!-- Mobile menu trigger -->
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={mobileMenuOpen}
        on:click={toggleMobileMenu}
        class="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 -ml-1"
      >
        <span class="block w-6 h-px bg-ink"></span>
        <span class="block w-6 h-px bg-ink"></span>
      </button>

      <!-- Desktop nav (left) -->
      <nav aria-label="Primary" class="hidden lg:flex items-center gap-9 text-[13px] tracking-[0.08em] text-charcoal">
        <a href="/" class={$page.route.id === '/' ? 'relative text-ink underline-active' : 'underline-grow'}>
          Home
        </a>
        <a href="/about" class={$page.route.id === '/about' ? 'relative text-ink underline-active' : 'underline-grow'}>
          About
        </a>
        <a href="/shop" class={$page.route.id === '/shop' ? 'relative text-ink underline-active' : 'underline-grow'}>
          Shop
        </a>
        <a href="/contact-us" 
          aria-current="page" 
          class={$page.route.id === '/contact-us' ? 'relative text-ink underline-active' : 'underline-grow'}>
          Contact Us
        </a>
      </nav>

      <!-- Logo (center) -->
      <a href="/" class="absolute left-1/2 -translate-x-1/2 text-[26px] sm:text-[30px] logo-script tracking-wide" aria-label="Chikndisy, home">
        Chikndisy
      </a>

      <!-- Right icons -->
      <div class="flex items-center gap-5 sm:gap-6">
        <!-- Search -->
        <button
          type="button"
          aria-label="Search"
          on:click={() => dispatch('openSearch')}
          class="hidden sm:inline-flex"
        >
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1.3">
            <circle cx="8.2" cy="8.2" r="6.2"/>
            <line x1="13" y1="13" x2="18" y2="18"/>
          </svg>
        </button>

        <!-- Account -->
        <div class="relative hidden sm:block">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={accountMenuOpen}
            on:click={toggleAccountMenu}
            class="text-[13px] tracking-[0.06em] text-charcoal underline-grow"
          >
            <span>{$auth.isLoggedIn && $auth.user ? $auth.user.name.split(' ')[0] : 'Account'}</span>
          </button>

          {#if accountMenuOpen}
            <!-- Backdrop to close dropdown -->
            <button
              type="button"
              tabindex="-1"
              aria-label="Close menu backdrop"
              class="fixed inset-0 z-10 cursor-default focus:outline-none"
              on:click={closeAccountMenu}
            ></button>

            <div class="absolute right-0 mt-4 w-56 bg-paper border border-line py-4 text-[13px] tracking-[0.02em] z-20 shadow-sm">
              {#if !$auth.isLoggedIn}
                <!-- Signed-out state -->
                <div>
                  <button
                    type="button"
                    on:click={() => { closeAccountMenu(); dispatch('openLogin'); }}
                    class="block w-full text-left px-5 py-2 text-charcoal hover:text-ink"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    on:click={() => { closeAccountMenu(); dispatch('openSignup'); }}
                    class="block w-full text-left px-5 py-2 text-charcoal hover:text-ink"
                  >
                    Sign Up
                  </button>
                </div>
              {:else}
                <!-- Signed-in state -->
                <div>
                  <span class="block px-5 pb-2 text-[11px] uppercase tracking-widest2 text-clay border-b border-line mb-2">
                    Welcome, {$auth.user?.name.split(' ')[0]}
                  </span>
                  <a href="/auth/customer/orders" on:click={closeAccountMenu} class="block px-5 py-2 text-charcoal hover:text-ink">Orders</a>
                  <a href="/auth/customer/recently-viewed" on:click={closeAccountMenu} class="block px-5 py-2 text-charcoal hover:text-ink">Recently Viewed</a>
                  <a href="/auth/customer/saved-products" on:click={closeAccountMenu} class="block px-5 py-2 text-charcoal hover:text-ink">Saved Products</a>
                  <a href="/auth/customer/shipping-address" on:click={closeAccountMenu} class="block px-5 py-2 text-charcoal hover:text-ink">Shipping Address</a>
                  <a href="/auth/customer/update-profile" on:click={closeAccountMenu} class="block px-5 py-2 text-charcoal hover:text-ink">Manage Profile</a>
                  <div class="border-t border-line mt-2 pt-2">
                    <button
                      type="button"
                      on:click={handleSignOut}
                      class="block w-full text-left px-5 py-2 text-charcoal hover:text-ink"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          {/if}
        </div>

        {#if !hideCart}
        <!-- Cart -->
        <button
          type="button"
          aria-label="Open bag"
          on:click={() => cartOpen.set(true)}
          class="flex items-center gap-2 text-[13px] tracking-[0.06em] text-charcoal"
        >
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none" stroke="currentColor" stroke-width="1.3">
            <path d="M4 6.5h10l-.7 9.2a1.5 1.5 0 0 1-1.5 1.4H6.2a1.5 1.5 0 0 1-1.5-1.4L4 6.5Z"/>
            <path d="M6.5 6V4.8a2.5 2.5 0 0 1 5 0V6"/>
          </svg>
          <span class="hidden sm:inline">Bag</span>
          <span>({$cartCount})</span>
        </button>
        {/if}
      </div>
    </div>
  </div>
</header>

<!-- Mobile Navigation Drawer -->
<div class="fixed inset-0 z-50 transition-opacity duration-300 {mobileMenuOpen ? 'block' : 'hidden'}">
  <button
    type="button"
    aria-label="Close mobile menu backdrop"
    class="absolute inset-0 bg-ink/40 w-full h-full border-none cursor-default"
    on:click={closeMobileMenu}
  ></button>

  <div
    class="drawer absolute top-0 left-0 h-full w-[82%] max-w-[360px] bg-paper flex flex-col transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] overflow-y-auto {mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}"
  >
    <div class="flex items-center justify-between h-[76px] px-6 border-b border-line flex-shrink-0">
      <span class="logo-script text-2xl">Chikndisy</span>
      <button
        type="button"
        aria-label="Close menu"
        on:click={closeMobileMenu}
        class="w-8 h-8 flex items-center justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3">
          <line x1="1" y1="1" x2="15" y2="15"/>
          <line x1="15" y1="1" x2="1" y2="15"/>
        </svg>
      </button>
    </div>

    <nav aria-label="Mobile primary" class="flex flex-col px-6 py-8 gap-6 text-[15px] tracking-wide border-b border-line">
      <a href="/" on:click={closeMobileMenu} class="underline-grow w-fit">Home</a>
      <a href="/shop" on:click={closeMobileMenu} class="underline-grow w-fit">Shop</a>
      <a href="/about" on:click={closeMobileMenu} class="underline-grow w-fit">About</a>
      <a href="/contact" on:click={closeMobileMenu} aria-current="page" class="w-fit relative text-ink underline-active">Contact Us</a>
    </nav>

    <div class="mt-auto px-6 py-8 flex flex-col gap-3 text-[13px] tracking-[0.06em] text-charcoal">
      {#if !$auth.isLoggedIn}
        <button
          type="button"
          class="text-left py-1"
          on:click={() => { closeMobileMenu(); dispatch('openLogin'); }}
        >
          Login
        </button>
        <button
          type="button"
          class="text-left py-1"
          on:click={() => { closeMobileMenu(); dispatch('openSignup'); }}
        >
          Sign Up
        </button>
      {:else}
        <span class="block text-[11px] uppercase tracking-widest2 text-clay mb-2">
          Account ({$auth.user?.name})
        </span>
        <a href="/account/profile" on:click={closeMobileMenu} class="py-1">Profile</a>
        <a href="/account/orders" on:click={closeMobileMenu} class="py-1">Orders</a>
        <a href="/account/recently-viewed" on:click={closeMobileMenu} class="py-1">Recently Viewed</a>
        <a href="/account/saved" on:click={closeMobileMenu} class="py-1">Saved Products</a>
        <a href="/account/addresses" on:click={closeMobileMenu} class="py-1">Shipping Address</a>
        <a href="/account/manage" on:click={closeMobileMenu} class="py-1">Manage Profile</a>
        <button 
          type="button" 
          class="text-left py-1 pt-3 border-t border-line mt-2 hover:text-ink" 
          on:click={() => { handleSignOut(); closeMobileMenu(); }}
        >
          Logout
        </button>
      {/if}
    </div>
  </div>
</div>