import { s as subscribe } from "./utils.js";
import { c as create_ssr_component, d as createEventDispatcher, e as escape, b as each, a as add_attribute } from "./ssr.js";
import "./SvelteToast.svelte_svelte_type_style_lang.js";
import { c as cartOpen, a as cartCount, b as cart, d as cartSubtotal, f as formatNaira } from "./Sign-up.js";
const Cart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cartOpen, $$unsubscribe_cartOpen;
  let $cartCount, $$unsubscribe_cartCount;
  let $cart, $$unsubscribe_cart;
  let $cartSubtotal, $$unsubscribe_cartSubtotal;
  $$unsubscribe_cartOpen = subscribe(cartOpen, (value) => $cartOpen = value);
  $$unsubscribe_cartCount = subscribe(cartCount, (value) => $cartCount = value);
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  $$unsubscribe_cartSubtotal = subscribe(cartSubtotal, (value) => $cartSubtotal = value);
  createEventDispatcher();
  {
    if ($cartOpen) {
      document.body.style.overflow = "hidden";
    }
  }
  $$unsubscribe_cartOpen();
  $$unsubscribe_cartCount();
  $$unsubscribe_cart();
  $$unsubscribe_cartSubtotal();
  return ` <div class="${"fixed inset-0 z-50 transition-opacity duration-300 " + escape($cartOpen ? "block" : "hidden", true)}"><button type="button" aria-label="Close cart backdrop" class="absolute inset-0 bg-ink/40 w-full h-full border-none cursor-default"></button> <div class="${"drawer absolute top-0 right-0 h-full w-[88%] max-w-[400px] bg-paper flex flex-col transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] " + escape($cartOpen ? "translate-x-0" : "translate-x-full", true)}"><div class="flex items-center justify-between h-[76px] px-6 border-b border-line"><h2 class="text-[15px] tracking-[0.04em]">Your Bag (${escape($cartCount)})</h2> <button type="button" aria-label="Close bag" class="w-8 h-8 flex items-center justify-center" data-svelte-h="svelte-1pw6tp3"><svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3"><line x1="1" y1="1" x2="15" y2="15"></line><line x1="15" y1="1" x2="1" y2="15"></line></svg></button></div> ${$cart.length > 0 ? `<div class="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">${each($cart, (item, idx) => {
    let imageUrl = item.product.imagesForThisProduct[0].url, productName = item.product.name;
    return `  <div class="flex gap-4"><div class="w-20 h-24 bg-sand flex-shrink-0 overflow-hidden"><img${add_attribute("src", imageUrl, 0)}${add_attribute("alt", productName, 0)} class="w-full h-full object-cover"></div> <div class="flex-1 flex flex-col"><div class="flex items-start justify-between gap-2"><h3 class="text-[14px] leading-snug capitalize">${escape(productName)}</h3> <button type="button" class="text-[12px] text-charcoal/60 hover:text-ink flex-shrink-0" aria-label="${"Remove " + escape(productName, true) + " from bag"}">Remove
                  </button></div> <p class="text-[13px] text-charcoal mt-1">${escape(formatNaira(item.price))}</p> <div class="mt-auto flex items-center gap-3 pt-2"><button type="button" class="w-6 h-6 border border-line flex items-center justify-center text-[13px]" aria-label="${"Decrease quantity of " + escape(productName, true)}">−</button> <span class="text-[13px] w-4 text-center" aria-live="polite">${escape(item.quantity)}</span> <button type="button" class="w-6 h-6 border border-line flex items-center justify-center text-[13px]" aria-label="${"Increase quantity of " + escape(productName, true)}">+</button> </div></div> </div>`;
  })}</div> <div class="border-t border-line px-6 py-6"><div class="flex items-center justify-between mb-5 text-[14px]"><span data-svelte-h="svelte-3vhy5m">Subtotal</span> <span>${escape(formatNaira($cartSubtotal))}</span></div> <button type="button" class="block w-full text-center bg-ink text-paper py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors" data-svelte-h="svelte-1t83hom">Checkout</button></div>` : `<div class="flex-1 flex flex-col items-center justify-center px-6 text-center" data-svelte-h="svelte-1esff1m"><p class="text-[14px] text-charcoal mb-1">Your bag is empty.</p> <p class="text-[13px] text-charcoal/70">Add a fragrance to begin.</p></div>`}</div></div>`;
});
export {
  Cart as C
};
