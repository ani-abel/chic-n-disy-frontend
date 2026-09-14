<script>
    import { cartOpen, auth } from '../../stores/cart.store';

    function openCart(/** @type {MouseEvent} */  e) {
      e.preventDefault();
      cartOpen.set(true);
    }

</script>
  
<footer class="border-t border-line bg-ink text-paper/90">
    <div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
        <div class="col-span-2 lg:col-span-1">
          <span class="logo-script text-2xl text-paper">Chikndisy</span>
          <p class="mt-4 text-[13px] text-paper/60 leading-relaxed max-w-[220px]">
            A boutique fragrance house — small collection, carefully chosen.
          </p>
          <p class="mt-4 text-[13px] text-paper/60">hello@chikndisy.com</p>
        </div>
        <div>
          <h4 class="text-[12px] tracking-widest2 uppercase text-paper/50 mb-5">Explore</h4>
          <ul class="space-y-3 text-[13px] text-paper/80">
            <li><a href="/" class="underline-grow">Home</a></li>
            <li><a href="/shop" class="underline-grow">Shop</a></li>
            <li><a href="/about" class="underline-grow">About</a></li>
            <li><a href="/contact" class="underline-grow">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-[12px] tracking-widest2 uppercase text-paper/50 mb-5">Customer</h4>
          <ul class="space-y-3 text-[13px] text-paper/80">
            <li><a href="/account" class="underline-grow">My Account</a></li>
            <li>
              <a href="/cart" class="underline-grow" on:click|preventDefault={openCart}>Cart</a>
            </li>
            <li><a href="/orders" class="underline-grow">Orders</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-[12px] tracking-widest2 uppercase text-paper/50 mb-5">Follow</h4>
          <div class="flex items-center gap-4">
            <a href="https://instagram.com" aria-label="Chikndisy on Instagram" class="text-paper/80 hover:text-paper">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://pinterest.com" aria-label="Chikndisy on Pinterest" class="text-paper/80 hover:text-paper">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M9 17c1-4 1.2-6.5 1.2-8a1.8 1.8 0 0 1 3.6 0c0 1.1-.7 3.5-1 4.6a1.8 1.8 0 0 0 3.4 1.2c.8-1.4 1-2.6 1-3.8 0-2.5-2-4.5-5-4.5-3.4 0-5.4 2.3-5.4 5 0 1 .3 1.8.8 2.4"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="mt-14 pt-6 border-t border-paper/15 text-[12px] text-paper/45">
        © 2026 Chikndisy. All rights reserved.
      </div>
    </div>
  </footer>
  
  <style>
    .logo-script {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 500;
    }
    .underline-grow {
      position: relative;
    }
    .underline-grow::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s ease;
    }
    .underline-grow:hover::after {
      transform: scaleX(1);
    }
  </style>