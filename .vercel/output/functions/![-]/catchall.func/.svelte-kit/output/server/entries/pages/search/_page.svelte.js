import { c as create_ssr_component, e as escape, v as validate_component, a as add_attribute, b as each } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { C as Cart } from "../../../chunks/Cart.js";
import { N as Navbar, f as formatNaira, F as Footer, L as Login, S as Sign_up } from "../../../chunks/Sign-up.js";
import { P as Pagination } from "../../../chunks/Pagination.js";
import "../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let paginationControl;
  let PAGE_SIZE;
  let currentPage;
  let total;
  let totalPages;
  let start;
  let pageItems;
  let { data } = $$props;
  const query = data.searchQuery ?? "";
  let searchQuery = query;
  let activeQuery = query;
  let loginModalOpen = false;
  let signupModalOpen = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  paginationControl = data.products?.paginationControl;
  PAGE_SIZE = paginationControl?.pageSize ?? 12;
  currentPage = paginationControl?.currentPage ?? 1;
  total = paginationControl?.totalCount ?? 0;
  totalPages = paginationControl?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));
  {
    if (currentPage > totalPages)
      currentPage = totalPages;
  }
  start = (currentPage - 1) * PAGE_SIZE;
  pageItems = data.products?.data;
  return `${$$result.head += `<!-- HEAD_svelte-1y57owq_START -->${$$result.title = `<title>${escape(searchQuery ?? "Search")} — Chikndisy</title>`, ""}<meta name="description" content="Get in touch with Chikndisy — questions about an order, a fragrance, or anything else. We'd love to hear from you."><!-- HEAD_svelte-1y57owq_END -->`, ""}   ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <main> <section id="searchHeader" class="pt-[76px]"><div class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-10 sm:pb-12"><div class="max-w-[560px]" data-svelte-h="svelte-dhbime"><p class="text-[12px] tracking-widest2 uppercase text-clay mb-4">Search</p> <h1 class="font-serif text-[32px] sm:text-[42px] leading-[1.1] mb-4">Find Your Fragrance</h1> <p class="text-[15px] text-charcoal leading-relaxed">Explore our collection and discover a scent that feels uniquely yours.</p></div>  <form role="search" class="mt-10 sm:mt-12 max-w-[720px]"><label for="pageSearchInput" class="sr-only" data-svelte-h="svelte-1nsitak">Search fragrances</label> <div class="flex items-stretch gap-4 sm:gap-5"><div class="relative flex-1 flex items-center border-b border-ink"><svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="8.2" cy="8.2" r="6.2"></circle><line x1="13" y1="13" x2="18" y2="18"></line></svg> <input id="pageSearchInput" type="text" placeholder="Search fragrances, notes, collections…" class="w-full bg-transparent pl-4 pr-9 py-3 sm:py-3.5 font-serif italic text-[19px] sm:text-[24px] placeholder:text-ink/40 focus:outline-none" autocomplete="off"${add_attribute("value", searchQuery, 0)}> ${searchQuery.length > 0 ? `<button type="button" aria-label="Clear search" class="absolute right-0 w-8 h-8 flex items-center justify-center text-charcoal hover:text-ink" data-svelte-h="svelte-132qzww"><svg width="14" height="14" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3"><line x1="1" y1="1" x2="15" y2="15"></line><line x1="15" y1="1" x2="1" y2="15"></line></svg></button>` : ``}</div> <button type="submit" class="flex-shrink-0 bg-ink text-paper px-6 sm:px-8 py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors" data-svelte-h="svelte-1h4gn23">Search</button></div></form>  <div id="resultsSummary" class="mt-8 sm:mt-10 pt-6 border-t border-line"><h2 class="font-serif text-[20px] sm:text-[23px] mb-1.5">${escape(activeQuery.trim() ? `Results for “${activeQuery.trim()}”` : "All Fragrances")}</h2> <p class="text-[13px] text-charcoal tracking-[0.02em]">${total === 0 ? `No fragrances found.` : `${escape(total === 1 ? "1 fragrance found" : `${total} fragrances found`)} · Showing ${escape(start + 1)}–${escape(Math.min(start + PAGE_SIZE, total))} of ${escape(total)} fragrances`}</p></div></div></section> ${searchQuery !== void 0 && searchQuery !== null && searchQuery.trim().length === 0 ? ` <section class="max-w-[640px] mx-auto px-5 sm:px-8 pb-28 sm:pb-36 text-center"><svg class="mx-auto mb-8" width="40" height="40" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"><circle cx="8.2" cy="8.2" r="6.2"></circle><line x1="13" y1="13" x2="18" y2="18"></line></svg> <h2 class="font-serif text-[24px] sm:text-[28px] mb-4" data-svelte-h="svelte-7bk47c">Please Enter a Search Keyword</h2> <p class="text-[15px] text-charcoal leading-relaxed mb-8" data-svelte-h="svelte-a6148v">Type a product name, note, or collection above to discover our fragrances.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"><button class="border border-ink px-7 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors" data-svelte-h="svelte-by7d66">View All Fragrances</button></div></section>` : `${total > 0 ? ` <section class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10"><div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">${each(pageItems, (product) => {
    let imageUrl = product.imagesForThisProduct?.[0]?.url;
    return ` <article class="product-card group"><div class="hover-zoom relative aspect-[4/5] overflow-hidden bg-line/40 mb-5"><img${add_attribute("src", imageUrl, 0)}${add_attribute("alt", `${product.name} perfume bottle`, 0)} class="w-full h-full object-cover" loading="lazy"></div> <h3 class="font-serif text-[19px] mb-1">${escape(product.name)}</h3> <p class="text-[13px] text-charcoal leading-relaxed mb-3">${escape(product.description)}</p> <div class="flex items-center justify-between"><span class="text-[15px]">${escape(formatNaira(product.unitPrice))}</span> <a${add_attribute("href", `/product-detail/${product.slug}`, 0)} class="text-[12px] tracking-[0.04em] underline-grow">View Details →
            </a></div> <button class="add-to-cart-btn mt-4 w-full border border-ink py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors" data-svelte-h="svelte-1ay3s80">Add to Bag</button> </article>`;
  })}</div></section> ${paginationControl ? ` ${validate_component(Pagination, "Pagination").$$render($$result, { meta: paginationControl }, {}, {})}` : ``}` : ` <section class="max-w-[640px] mx-auto px-5 sm:px-8 pb-28 sm:pb-36 text-center"><svg class="mx-auto mb-8" width="40" height="40" viewBox="0 0 19 19" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"><circle cx="8.2" cy="8.2" r="6.2"></circle><line x1="13" y1="13" x2="18" y2="18"></line></svg> <h2 class="font-serif text-[24px] sm:text-[28px] mb-4" data-svelte-h="svelte-1ovu4ut">No Fragrances Found</h2> <p class="text-[15px] text-charcoal leading-relaxed mb-1" data-svelte-h="svelte-fh5b5p">We couldn&#39;t find any fragrances matching</p> <p class="font-serif italic text-[18px] mb-8">“${escape((activeQuery || "").trim())}”</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"><button class="text-[13px] tracking-[0.06em] underline-grow" data-svelte-h="svelte-1krwcq7">Clear Search</button> <button class="border border-ink px-7 py-3 text-[13px] tracking-[0.06em] hover:bg-ink hover:text-paper transition-colors" data-svelte-h="svelte-1u0v9n">Explore Collection</button></div></section>`}`}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(Cart, "Cart").$$render($$result, {}, {}, {})} ${validate_component(Login, "LoginModal").$$render($$result, { open: loginModalOpen }, {}, {})} ${validate_component(Sign_up, "SignupModal").$$render($$result, { open: signupModalOpen }, {}, {})} ${``}`;
});
export {
  Page as default
};
