import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, e as escape, v as validate_component, b as each, a as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import { C as Cart } from "../../../../chunks/Cart.js";
import { e as auth, N as Navbar, f as formatNaira, F as Footer, L as Login, S as Sign_up } from "../../../../chunks/Sign-up.js";
import { g as getItemFromLocalStorage } from "../../../../chunks/util.function.js";
import { P as Pagination } from "../../../../chunks/Pagination.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pageData;
  let paginationControl;
  let PAGE_SIZE;
  let currentPage;
  let total;
  let totalPages;
  let start;
  let pageItems;
  let favoriteProductIds;
  let $auth, $$unsubscribe_auth;
  $$unsubscribe_auth = subscribe(auth, (value) => $auth = value);
  let { data } = $$props;
  const { category } = data;
  getItemFromLocalStorage("ecommerce-user", true);
  let loginModalOpen = false;
  let signupModalOpen = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  pageData = data.products.data;
  paginationControl = data.products.paginationControl;
  PAGE_SIZE = paginationControl.pageSize ?? 12;
  currentPage = paginationControl.currentPage ?? 1;
  total = paginationControl?.totalCount;
  totalPages = paginationControl?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));
  {
    if (currentPage > totalPages)
      currentPage = totalPages;
  }
  start = (currentPage - 1) * PAGE_SIZE;
  pageItems = pageData;
  favoriteProductIds = new Set($auth.user ? pageItems.filter((product) => product.savedProducts?.some((saved) => saved.userId === $auth.user?.userId)).map((product) => product.id) : []);
  $$unsubscribe_auth();
  return `${$$result.head += `<!-- HEAD_svelte-f1y64z_START -->${$$result.title = `<title>${escape(category.name)} — Chikndisy</title>`, ""}<meta name="description" content="Get in touch with Chikndisy — questions about an order, a fragrance, or anything else. We'd love to hear from you."><!-- HEAD_svelte-f1y64z_END -->`, ""}   ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <main> <section class="pt-[76px]"><div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-16 pb-10 sm:pb-12"><p class="text-[12px] tracking-widest2 uppercase text-clay mb-4" data-svelte-h="svelte-mc2tub">Category</p> <h1 class="font-serif text-[32px] sm:text-[42px] leading-[1.1] mb-4">${escape(category.name)}</h1> ${category.description ? `<p class="text-[15px] text-charcoal leading-relaxed max-w-[520px]">${escape(category.description)}</p>` : ``} ${total > 0 ? `<p id="resultsContext" class="mt-6 text-[13px] text-charcoal/70">Showing ${escape(start + 1)}–${escape(Math.min(start + PAGE_SIZE, total))} of ${escape(total)} fragrances</p>` : ``}</div></section>  ${total > 0 ? `<section class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10"><div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">${each(pageItems, (product) => {
    let imageUrl = product.imagesForThisProduct[0].url;
    return ` <article class="product-card group relative"><div class="hover-zoom relative aspect-[4/5] overflow-hidden bg-line/40 mb-5"><img${add_attribute("src", imageUrl, 0)}${add_attribute("alt", `${product.name} perfume bottle`, 0)} class="w-full h-full object-cover" loading="lazy"> ${$auth.isLoggedIn ? (() => {
      let isFav = favoriteProductIds.has(product.id);
      return `  <button type="button"${add_attribute("aria-label", isFav ? "Remove from favorites" : "Add to favorites", 0)} class="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-paper/80 backdrop-blur-sm text-ink hover:scale-110 transition-all cursor-pointer"><svg width="18" height="18" viewBox="0 0 24 24"${add_attribute("fill", isFav ? "currentColor" : "none", 0)} stroke="currentColor" stroke-width="1.5"${add_attribute("class", !isFav ? "text-ink" : "text-charcoal hover:text-ink", 0)}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> </button>`;
    })() : ``}</div> <h3 class="font-serif text-[19px] mb-1">${escape(product.name)}</h3> <p class="text-[13px] text-charcoal leading-relaxed mb-3">${escape(product.description)}</p> <div class="flex items-center justify-between"><span class="text-[15px]">${escape(formatNaira(product.unitPrice))}</span> <a${add_attribute("href", `/product-detail/${product.slug}`, 0)} class="text-[12px] tracking-[0.04em] underline-grow">View More →</a></div> <button class="add-to-cart-btn mt-4 w-full border border-ink py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors" data-svelte-h="svelte-19uxro1">Add to Cart</button> </article>`;
  })}</div></section> ${paginationControl ? ` ${validate_component(Pagination, "Pagination").$$render($$result, { meta: paginationControl }, {}, {})}` : ``}` : ` <section id="emptyState" class="max-w-[640px] mx-auto px-5 sm:px-8 pb-28 sm:pb-36 text-center" data-svelte-h="svelte-7j8ejc"><svg class="mx-auto mb-8" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"><rect x="4" y="7" width="16" height="13" rx="1"></rect><path d="M8 7V5a4 4 0 0 1 8 0v2"></path></svg> <h2 class="font-serif text-[24px] sm:text-[28px] mb-4">No Fragrances Found in This Category</h2> <p class="text-[15px] text-charcoal leading-relaxed mb-8">We&#39;re currently updating this collection. Please explore our other fragrances in the meantime.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"><a href="/shop" class="border border-ink px-7 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors">View All Perfumes</a> <a href="/" class="text-[13px] tracking-[0.06em] underline-grow">Return Home</a></div></section>`}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(Cart, "Cart").$$render($$result, {}, {}, {})} ${validate_component(Login, "LoginModal").$$render($$result, { open: loginModalOpen }, {}, {})} ${validate_component(Sign_up, "SignupModal").$$render($$result, { open: signupModalOpen }, {}, {})} ${``}`;
});
export {
  Page as default
};
