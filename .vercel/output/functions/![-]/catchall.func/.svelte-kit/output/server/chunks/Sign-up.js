import { s as subscribe } from "./utils.js";
import { c as create_ssr_component, d as createEventDispatcher, a as add_attribute, e as escape } from "./ssr.js";
import { p as page } from "./stores.js";
import "./client.js";
import { d as derived, w as writable } from "./index.js";
import "./SvelteToast.svelte_svelte_type_style_lang.js";
const initialItems = [];
function createCartStore() {
  const { subscribe: subscribe2, update, set } = writable(initialItems);
  return {
    subscribe: subscribe2,
    /**
     * Add a product item to the cart or update quantity if it already exists.
     * @param product Product object (must contain an `id` or `_id`)
     * @param price Price of the item
     * @param quantity Quantity to add (default: 1)
     */
    addItem: (product, price, quantity = 1) => {
      update((items) => {
        const productId = product.id;
        const existingIndex = items.findIndex((i) => {
          const itemProdId = i.product?.id;
          return itemProdId === productId;
        });
        if (existingIndex > -1) {
          items[existingIndex].quantity += quantity;
          return [...items];
        }
        return [...items, { product, price, quantity }];
      });
    },
    /**
     * Change the quantity of an item by a delta amount (+1, -1, etc.).
     * Automatically removes the item if quantity drops to 0 or less.
     * @param index Array index of the item in the cart
     * @param delta Change in quantity (e.g., +1 or -1)
     */
    updateQty: (productId, newQuantity) => {
      update((items) => {
        const index = items.findIndex((i) => i.product?.id === productId);
        if (index === -1)
          return items;
        const updatedItems = [...items];
        if (newQuantity <= 0) {
          updatedItems.splice(index, 1);
        } else {
          updatedItems[index] = {
            ...updatedItems[index],
            quantity: newQuantity
          };
        }
        return updatedItems;
      });
    },
    /**
     * Remove a specific item from the cart by array index or product ID.
     * @param target Index (number) or Product ID (string/number)
     */
    removeItem: (target) => {
      update((items) => {
        if (typeof target === "number") {
          items.splice(target, 1);
        } else {
          return items.filter((i) => {
            const prodId = i.product?.id || i.product?._id || i.product;
            return prodId !== target;
          });
        }
        return [...items];
      });
    },
    /**
     * Clear all items from the cart.
     */
    clear: () => set([])
  };
}
const cart = createCartStore();
const cartCount = derived(
  cart,
  ($cart) => $cart.reduce((sum, item) => sum + item.quantity, 0)
);
const cartSubtotal = derived(
  cart,
  ($cart) => $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const cartOpen = writable(false);
function formatNaira(amount) {
  return "₦" + amount?.toLocaleString("en-NG");
}
const initialAuthState = {
  isLoggedIn: false,
  user: null
};
function getStoredAuth() {
  return initialAuthState;
}
function createAuthStore() {
  const { subscribe: subscribe2, set, update } = writable(getStoredAuth());
  return {
    subscribe: subscribe2,
    /**
     * Call on successful login
     * @param {User} user
     */
    login: (user) => {
      set({ isLoggedIn: true, user });
    },
    /**
     * Call on logout
     */
    logout: () => {
      set({ isLoggedIn: false, user: null });
    },
    /**
     * Re-check localStorage manually if needed
     */
    refresh: () => {
      set(getStoredAuth());
    }
  };
}
const auth = createAuthStore();
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $auth, $$unsubscribe_auth;
  let $cartCount, $$unsubscribe_cartCount;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_auth = subscribe(auth, (value) => $auth = value);
  $$unsubscribe_cartCount = subscribe(cartCount, (value) => $cartCount = value);
  createEventDispatcher();
  let { hideCart = false } = $$props;
  let mobileMenuOpen = false;
  let accountMenuOpen = false;
  if ($$props.hideCart === void 0 && $$bindings.hideCart && hideCart !== void 0)
    $$bindings.hideCart(hideCart);
  $$unsubscribe_page();
  $$unsubscribe_auth();
  $$unsubscribe_cartCount();
  return ` <header id="navbar" class="fixed top-0 inset-x-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-line"><div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12"><div class="h-[76px] flex items-center justify-between"> <button type="button" aria-label="Open menu"${add_attribute("aria-expanded", mobileMenuOpen, 0)} class="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 -ml-1"><span class="block w-6 h-px bg-ink"></span> <span class="block w-6 h-px bg-ink"></span></button>  <nav aria-label="Primary" class="hidden lg:flex items-center gap-9 text-[13px] tracking-[0.08em] text-charcoal"><a href="/"${add_attribute(
    "class",
    $page.route.id === "/" ? "relative text-ink underline-active" : "underline-grow",
    0
  )}>Home</a> <a href="/about"${add_attribute(
    "class",
    $page.route.id === "/about" ? "relative text-ink underline-active" : "underline-grow",
    0
  )}>About</a> <a href="/shop"${add_attribute(
    "class",
    $page.route.id === "/shop" ? "relative text-ink underline-active" : "underline-grow",
    0
  )}>Shop</a> <a href="/contact-us" aria-current="page"${add_attribute(
    "class",
    $page.route.id === "/contact-us" ? "relative text-ink underline-active" : "underline-grow",
    0
  )}>Contact Us</a></nav>  <a href="/" class="absolute left-1/2 -translate-x-1/2 text-[26px] sm:text-[30px] logo-script tracking-wide" aria-label="Chikndisy, home" data-svelte-h="svelte-28fwzl">Chikndisy</a>  <div class="flex items-center gap-5 sm:gap-6"> <button type="button" aria-label="Search" class="hidden sm:inline-flex" data-svelte-h="svelte-9gcjzd"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="8.2" cy="8.2" r="6.2"></circle><line x1="13" y1="13" x2="18" y2="18"></line></svg></button>  <div class="relative hidden sm:block"><button type="button" aria-haspopup="true"${add_attribute("aria-expanded", accountMenuOpen, 0)} class="text-[13px] tracking-[0.06em] text-charcoal underline-grow"><span>${escape($auth.isLoggedIn && $auth.user ? $auth.user.name.split(" ")[0] : "Account")}</span></button> ${``}</div> ${!hideCart ? ` <button type="button" aria-label="Open bag" class="flex items-center gap-2 text-[13px] tracking-[0.06em] text-charcoal"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 6.5h10l-.7 9.2a1.5 1.5 0 0 1-1.5 1.4H6.2a1.5 1.5 0 0 1-1.5-1.4L4 6.5Z"></path><path d="M6.5 6V4.8a2.5 2.5 0 0 1 5 0V6"></path></svg> <span class="hidden sm:inline" data-svelte-h="svelte-16iuxqy">Bag</span> <span>(${escape($cartCount)})</span></button>` : ``}</div></div></div></header>  <div class="${"fixed inset-0 z-50 transition-opacity duration-300 " + escape("hidden", true)}"><button type="button" aria-label="Close mobile menu backdrop" class="absolute inset-0 bg-ink/40 w-full h-full border-none cursor-default"></button> <div class="${"drawer absolute top-0 left-0 h-full w-[82%] max-w-[360px] bg-paper flex flex-col transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] overflow-y-auto " + escape("-translate-x-full", true)}"><div class="flex items-center justify-between h-[76px] px-6 border-b border-line flex-shrink-0"><span class="logo-script text-2xl" data-svelte-h="svelte-1tnh03c">Chikndisy</span> <button type="button" aria-label="Close menu" class="w-8 h-8 flex items-center justify-center" data-svelte-h="svelte-1ph7991"><svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3"><line x1="1" y1="1" x2="15" y2="15"></line><line x1="15" y1="1" x2="1" y2="15"></line></svg></button></div> <nav aria-label="Mobile primary" class="flex flex-col px-6 py-8 gap-6 text-[15px] tracking-wide border-b border-line"><a href="/" class="underline-grow w-fit" data-svelte-h="svelte-qau4qh">Home</a> <a href="/shop" class="underline-grow w-fit" data-svelte-h="svelte-1oowcbi">Shop</a> <a href="/about" class="underline-grow w-fit" data-svelte-h="svelte-1g5ryly">About</a> <a href="/contact" aria-current="page" class="w-fit relative text-ink underline-active" data-svelte-h="svelte-cdd1ci">Contact Us</a></nav> <div class="mt-auto px-6 py-8 flex flex-col gap-3 text-[13px] tracking-[0.06em] text-charcoal">${!$auth.isLoggedIn ? `<button type="button" class="text-left py-1" data-svelte-h="svelte-1xors8n">Login</button> <button type="button" class="text-left py-1" data-svelte-h="svelte-15nv88b">Sign Up</button>` : `<span class="block text-[11px] uppercase tracking-widest2 text-clay mb-2">Account (${escape($auth.user?.name)})</span> <a href="/account/profile" class="py-1" data-svelte-h="svelte-1bjbj3c">Profile</a> <a href="/account/orders" class="py-1" data-svelte-h="svelte-19yzan4">Orders</a> <a href="/account/recently-viewed" class="py-1" data-svelte-h="svelte-1totl9z">Recently Viewed</a> <a href="/account/saved" class="py-1" data-svelte-h="svelte-q3t78a">Saved Products</a> <a href="/account/addresses" class="py-1" data-svelte-h="svelte-1483edi">Shipping Address</a> <a href="/account/manage" class="py-1" data-svelte-h="svelte-e5zv7t">Manage Profile</a> <button type="button" class="text-left py-1 pt-3 border-t border-line mt-2 hover:text-ink" data-svelte-h="svelte-1epac22">Logout</button>`}</div></div></div>`;
});
const css = {
  code: ".logo-script.svelte-15dnf66{font-family:'Playfair Display', serif;font-style:italic;font-weight:500}.underline-grow.svelte-15dnf66{position:relative}.underline-grow.svelte-15dnf66::after{content:'';position:absolute;left:0;bottom:-2px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform 0.35s ease}.underline-grow.svelte-15dnf66:hover::after{transform:scaleX(1)}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<script>\\n    import { cartOpen, auth } from '../../stores/cart.store';\\n\\n    function openCart(/** @type {MouseEvent} */  e) {\\n      e.preventDefault();\\n      cartOpen.set(true);\\n    }\\n\\n<\/script>\\n  \\n<footer class=\\"border-t border-line bg-ink text-paper/90\\">\\n    <div class=\\"max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20\\">\\n      <div class=\\"grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8\\">\\n        <div class=\\"col-span-2 lg:col-span-1\\">\\n          <span class=\\"logo-script text-2xl text-paper\\">Chikndisy</span>\\n          <p class=\\"mt-4 text-[13px] text-paper/60 leading-relaxed max-w-[220px]\\">\\n            A boutique fragrance house — small collection, carefully chosen.\\n          </p>\\n          <p class=\\"mt-4 text-[13px] text-paper/60\\">hello@chikndisy.com</p>\\n        </div>\\n        <div>\\n          <h4 class=\\"text-[12px] tracking-widest2 uppercase text-paper/50 mb-5\\">Explore</h4>\\n          <ul class=\\"space-y-3 text-[13px] text-paper/80\\">\\n            <li><a href=\\"/\\" class=\\"underline-grow\\">Home</a></li>\\n            <li><a href=\\"/shop\\" class=\\"underline-grow\\">Shop</a></li>\\n            <li><a href=\\"/about\\" class=\\"underline-grow\\">About</a></li>\\n            <li><a href=\\"/contact\\" class=\\"underline-grow\\">Contact</a></li>\\n          </ul>\\n        </div>\\n        <div>\\n          <h4 class=\\"text-[12px] tracking-widest2 uppercase text-paper/50 mb-5\\">Customer</h4>\\n          <ul class=\\"space-y-3 text-[13px] text-paper/80\\">\\n            <li><a href=\\"/account\\" class=\\"underline-grow\\">My Account</a></li>\\n            <li>\\n              <a href=\\"/cart\\" class=\\"underline-grow\\" on:click|preventDefault={openCart}>Cart</a>\\n            </li>\\n            <li><a href=\\"/orders\\" class=\\"underline-grow\\">Orders</a></li>\\n          </ul>\\n        </div>\\n        <div>\\n          <h4 class=\\"text-[12px] tracking-widest2 uppercase text-paper/50 mb-5\\">Follow</h4>\\n          <div class=\\"flex items-center gap-4\\">\\n            <a href=\\"https://instagram.com\\" aria-label=\\"Chikndisy on Instagram\\" class=\\"text-paper/80 hover:text-paper\\">\\n              <svg width=\\"17\\" height=\\"17\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.4\\">\\n                <rect x=\\"3\\" y=\\"3\\" width=\\"18\\" height=\\"18\\" rx=\\"5\\" />\\n                <circle cx=\\"12\\" cy=\\"12\\" r=\\"4\\" />\\n                <circle cx=\\"17.2\\" cy=\\"6.8\\" r=\\"0.6\\" fill=\\"currentColor\\" stroke=\\"none\\" />\\n              </svg>\\n            </a>\\n            <a href=\\"https://pinterest.com\\" aria-label=\\"Chikndisy on Pinterest\\" class=\\"text-paper/80 hover:text-paper\\">\\n              <svg width=\\"17\\" height=\\"17\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.4\\">\\n                <circle cx=\\"12\\" cy=\\"12\\" r=\\"9\\" />\\n                <path\\n                  d=\\"M9 17c1-4 1.2-6.5 1.2-8a1.8 1.8 0 0 1 3.6 0c0 1.1-.7 3.5-1 4.6a1.8 1.8 0 0 0 3.4 1.2c.8-1.4 1-2.6 1-3.8 0-2.5-2-4.5-5-4.5-3.4 0-5.4 2.3-5.4 5 0 1 .3 1.8.8 2.4\\"\\n                />\\n              </svg>\\n            </a>\\n          </div>\\n        </div>\\n      </div>\\n      <div class=\\"mt-14 pt-6 border-t border-paper/15 text-[12px] text-paper/45\\">\\n        © 2026 Chikndisy. All rights reserved.\\n      </div>\\n    </div>\\n  </footer>\\n  \\n  <style>\\n    .logo-script {\\n      font-family: 'Playfair Display', serif;\\n      font-style: italic;\\n      font-weight: 500;\\n    }\\n    .underline-grow {\\n      position: relative;\\n    }\\n    .underline-grow::after {\\n      content: '';\\n      position: absolute;\\n      left: 0;\\n      bottom: -2px;\\n      width: 100%;\\n      height: 1px;\\n      background: currentColor;\\n      transform: scaleX(0);\\n      transform-origin: left;\\n      transition: transform 0.35s ease;\\n    }\\n    .underline-grow:hover::after {\\n      transform: scaleX(1);\\n    }\\n  </style>"],"names":[],"mappings":"AAmEI,2BAAa,CACX,WAAW,CAAE,kBAAkB,CAAC,CAAC,KAAK,CACtC,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,GACf,CACA,8BAAgB,CACd,QAAQ,CAAE,QACZ,CACA,8BAAe,OAAQ,CACrB,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,YAAY,CACxB,SAAS,CAAE,OAAO,CAAC,CAAC,CACpB,gBAAgB,CAAE,IAAI,CACtB,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,IAC9B,CACA,8BAAe,MAAM,OAAQ,CAC3B,SAAS,CAAE,OAAO,CAAC,CACrB"}`
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<footer class="border-t border-line bg-ink text-paper/90"><div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20"><div class="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8"><div class="col-span-2 lg:col-span-1" data-svelte-h="svelte-qagi7m"><span class="logo-script text-2xl text-paper svelte-15dnf66">Chikndisy</span> <p class="mt-4 text-[13px] text-paper/60 leading-relaxed max-w-[220px]">A boutique fragrance house — small collection, carefully chosen.</p> <p class="mt-4 text-[13px] text-paper/60">hello@chikndisy.com</p></div> <div data-svelte-h="svelte-1euxfe7"><h4 class="text-[12px] tracking-widest2 uppercase text-paper/50 mb-5">Explore</h4> <ul class="space-y-3 text-[13px] text-paper/80"><li><a href="/" class="underline-grow svelte-15dnf66">Home</a></li> <li><a href="/shop" class="underline-grow svelte-15dnf66">Shop</a></li> <li><a href="/about" class="underline-grow svelte-15dnf66">About</a></li> <li><a href="/contact" class="underline-grow svelte-15dnf66">Contact</a></li></ul></div> <div><h4 class="text-[12px] tracking-widest2 uppercase text-paper/50 mb-5" data-svelte-h="svelte-1lbc3kt">Customer</h4> <ul class="space-y-3 text-[13px] text-paper/80"><li data-svelte-h="svelte-1b8k4r3"><a href="/account" class="underline-grow svelte-15dnf66">My Account</a></li> <li><a href="/cart" class="underline-grow svelte-15dnf66" data-svelte-h="svelte-mhiezt">Cart</a></li> <li data-svelte-h="svelte-102biqd"><a href="/orders" class="underline-grow svelte-15dnf66">Orders</a></li></ul></div> <div data-svelte-h="svelte-yvgitf"><h4 class="text-[12px] tracking-widest2 uppercase text-paper/50 mb-5">Follow</h4> <div class="flex items-center gap-4"><a href="https://instagram.com" aria-label="Chikndisy on Instagram" class="text-paper/80 hover:text-paper"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"></circle></svg></a> <a href="https://pinterest.com" aria-label="Chikndisy on Pinterest" class="text-paper/80 hover:text-paper"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"></circle><path d="M9 17c1-4 1.2-6.5 1.2-8a1.8 1.8 0 0 1 3.6 0c0 1.1-.7 3.5-1 4.6a1.8 1.8 0 0 0 3.4 1.2c.8-1.4 1-2.6 1-3.8 0-2.5-2-4.5-5-4.5-3.4 0-5.4 2.3-5.4 5 0 1 .3 1.8.8 2.4"></path></svg></a></div></div></div> <div class="mt-14 pt-6 border-t border-paper/15 text-[12px] text-paper/45" data-svelte-h="svelte-18rbdgu">© 2026 Chikndisy. All rights reserved.</div></div> </footer>`;
});
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { open = false } = $$props;
  createEventDispatcher();
  const formData = { email: null, password: null };
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  $$unsubscribe_page();
  return ` ${open ? `<div class="fixed inset-0 z-[60]"><button type="button" aria-label="Close modal background" class="absolute inset-0 bg-ink/50 w-full h-full border-none cursor-default"></button> <div class="relative min-h-full flex items-center justify-center p-5 pointer-events-none"><div class="modal-panel pointer-events-auto w-full max-w-[420px] bg-paper border border-line max-h-[90vh] overflow-y-auto no-scrollbar transition-all duration-300 transform" role="dialog" aria-modal="true" aria-labelledby="loginModalTitle"><div class="flex items-center justify-between px-7 pt-7"><h2 id="loginModalTitle" class="font-serif text-[22px]" data-svelte-h="svelte-181xfcd">Log In</h2> <button type="button" aria-label="Close login" class="w-8 h-8 flex items-center justify-center -mr-2" data-svelte-h="svelte-jdkfr3"><svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3"><line x1="1" y1="1" x2="15" y2="15"></line><line x1="15" y1="1" x2="1" y2="15"></line></svg></button></div> <form class="px-7 pb-8 pt-6"><div class="mb-5"><label for="loginEmail" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2" data-svelte-h="svelte-ethk49">Email Address <span class="text-clay">*</span></label> <input id="loginEmail" type="email" required placeholder="you@example.com" class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"${add_attribute("value", formData.email, 0)}></div> <div class="mb-2"><label for="loginPassword" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2" data-svelte-h="svelte-aop5nc">Password</label> <div class="relative">${`<input id="loginPassword" type="password" required placeholder="Enter your password" class="w-full bg-transparent border border-line px-4 py-3 pr-16 text-[14px] placeholder:text-charcoal/40 focus:outline-none"${add_attribute("value", formData.password, 0)}>`} <button type="button" data-toggle-password="loginPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] tracking-[0.03em] text-charcoal" data-svelte-h="svelte-1stzuz8">Show</button></div></div> <button type="submit" ${""} class="w-full mt-6 bg-ink text-paper py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors disabled:opacity-60">${escape("Log In")}</button> <p class="text-center text-[13px] text-charcoal mt-6">Don&#39;t have an account?
            <button type="button" class="text-ink underline-grow ml-1" data-svelte-h="svelte-173olbo">Sign Up</button></p></form></div></div></div>` : ``}`;
});
const Sign_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  createEventDispatcher();
  const formData = {
    email: null,
    phoneNumber: null,
    password: null,
    firstName: null,
    lastName: null
  };
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  return ` ${open ? `<div class="fixed inset-0 z-[60]"><button type="button" aria-label="Close modal background" class="absolute inset-0 bg-ink/50 w-full h-full border-none cursor-default"></button> <div class="relative min-h-full flex items-center justify-center p-5 pointer-events-none"><div class="modal-panel pointer-events-auto w-full max-w-[420px] bg-paper border border-line max-h-[90vh] overflow-y-auto no-scrollbar transition-all duration-300 transform" role="dialog" aria-modal="true" aria-labelledby="signupModalTitle"><div class="flex items-center justify-between px-7 pt-7"><h2 id="signupModalTitle" class="font-serif text-[22px]" data-svelte-h="svelte-psvuh4">Create Account</h2> <button type="button" aria-label="Close signup" class="w-8 h-8 flex items-center justify-center -mr-2" data-svelte-h="svelte-7jloos"><svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3"><line x1="1" y1="1" x2="15" y2="15"></line><line x1="15" y1="1" x2="1" y2="15"></line></svg></button></div> <form class="px-7 pb-8 pt-6"><div class="mb-5"><label for="signupFName" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2" data-svelte-h="svelte-9qu93k">First Name <span class="text-clay">*</span></label> <input id="signupFName" type="text" required placeholder="Jerome" class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"${add_attribute("value", formData.firstName, 0)}></div> <div class="mb-5"><label for="signupLName" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2" data-svelte-h="svelte-6umsqg">Last Name <span class="text-clay">*</span></label> <input id="signupLName" type="text" required placeholder="Olaniyi" class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"${add_attribute("value", formData.lastName, 0)}></div> <div class="mb-5"><label for="signupEmail" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2" data-svelte-h="svelte-1jcyqlm">Email Address <span class="text-clay">*</span></label> <input id="signupEmail" type="email" required placeholder="you@example.com" class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"${add_attribute("value", formData.email, 0)}></div> <div class="mb-5"><label for="signupPhone" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2" data-svelte-h="svelte-ap3ktb">Phone Number <span class="text-clay">*</span></label> <input id="signupPhone" type="tel" required placeholder="+234 800 000 0000" class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"${add_attribute("value", formData.phoneNumber, 0)}></div> <div class="mb-2"><label for="signupPassword" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2" data-svelte-h="svelte-1clsop4">Password <span class="text-clay">*</span></label> <div class="relative">${`<input id="signupPassword" type="password" required minlength="8" placeholder="At least 8 characters" class="w-full bg-transparent border border-line px-4 py-3 pr-16 text-[14px] placeholder:text-charcoal/40 focus:outline-none"${add_attribute("value", formData.password, 0)}>`} <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] tracking-[0.03em] text-charcoal">${escape("Show")}</button></div></div> <button type="submit" ${""} class="w-full mt-6 bg-ink text-paper py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors disabled:opacity-60">${escape("Create Account")}</button> <p class="text-center text-[13px] text-charcoal mt-6">Already have an account?
            <button type="button" class="text-ink underline-grow ml-1" data-svelte-h="svelte-16lswsu">Login</button></p></form></div></div></div>` : ``}`;
});
export {
  Footer as F,
  Login as L,
  Navbar as N,
  Sign_up as S,
  cartCount as a,
  cart as b,
  cartOpen as c,
  cartSubtotal as d,
  auth as e,
  formatNaira as f
};
