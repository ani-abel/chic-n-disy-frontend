import { c as create_ssr_component, d as createEventDispatcher, a as add_attribute, e as escape, b as each } from "./ssr.js";
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pageNumbers;
  let { meta } = $$props;
  let { ariaLabel = "Category results pages" } = $$props;
  createEventDispatcher();
  if ($$props.meta === void 0 && $$bindings.meta && meta !== void 0)
    $$bindings.meta(meta);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  pageNumbers = (() => {
    if (!meta || meta.totalPages <= 1)
      return [];
    const total = meta.totalPages;
    const current = meta.currentPage;
    const delta = 1;
    const pages = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || i >= current - delta && i <= current + delta) {
        pages.push(i);
      }
    }
    return pages;
  })();
  return `${meta && meta.totalPages > 1 ? `<nav${add_attribute("aria-label", ariaLabel, 0)} class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-24 sm:pb-32"><div class="flex items-center justify-between sm:justify-center gap-2 sm:gap-3 border-t border-line pt-8"> <button type="button" ${!meta.hasPrevious || meta.currentPage === 1 ? "disabled" : ""} aria-label="Previous page" class="flex items-center gap-2 text-[13px] tracking-[0.04em] text-charcoal hover:text-ink disabled:opacity-30 disabled:pointer-events-none cursor-pointer"><span aria-hidden="true" data-svelte-h="svelte-1xubtx1">←</span><span class="hidden sm:inline" data-svelte-h="svelte-rznee3">Previous</span></button>  <span class="sm:hidden text-[13px] tracking-[0.04em] text-charcoal">${escape(meta.currentPage)} / ${escape(meta.totalPages)}</span>  <div class="hidden sm:flex items-center gap-1">${each(pageNumbers, (page, idx) => {
    return `${idx > 0 && page - pageNumbers[idx - 1] > 1 ? `<span class="w-8 h-8 flex items-center justify-center text-[13px] text-charcoal/50" aria-hidden="true" data-svelte-h="svelte-184pos5">…</span>` : ``} <button type="button"${add_attribute("aria-label", `Go to page ${page}`, 0)}${add_attribute("aria-current", page === meta.currentPage ? "page" : void 0, 0)}${add_attribute(
      "class",
      `w-8 h-8 flex items-center justify-center text-[13px] transition-colors cursor-pointer ${page === meta.currentPage ? "bg-ink text-paper font-medium" : "text-charcoal hover:text-ink"}`,
      0
    )}>${escape(page)} </button>`;
  })}</div>  <button type="button" ${!meta.hasNext || meta.currentPage === meta.totalPages ? "disabled" : ""} aria-label="Next page" class="flex items-center gap-2 text-[13px] tracking-[0.04em] text-charcoal hover:text-ink disabled:opacity-30 disabled:pointer-events-none cursor-pointer"><span class="hidden sm:inline" data-svelte-h="svelte-1hxgo6f">Next</span><span aria-hidden="true" data-svelte-h="svelte-59zckz">→</span></button></div></nav>` : ``}`;
});
export {
  Pagination as P
};
