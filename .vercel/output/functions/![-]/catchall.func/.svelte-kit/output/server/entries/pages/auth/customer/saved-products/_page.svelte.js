import { c as create_ssr_component, b as each, a as add_attribute, e as escape } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let products = [];
  return `<section class="w-full lg:w-4/5"><div class="w-full grid md:grid-cols-2 gap-2">${products.length > 0 ? `${each(products, (product) => {
    return `<div class="w-full border border-gray-[#666666] mb-2"><div class="w-full flex-col"><div class="w-full lg:w-11/12"><div class="w-full p-4 flex flex-col lg:flex-row gap-8"><div class="rounded-lg bg-slate-100 w-full lg:w-44 h-36 lg:h-28"><img${add_attribute("src", product.imagesForThisProduct[0].url, 0)}${add_attribute("alt", product.name, 0)} class="w-full h-full object-cover rounded-lg"></div> <div class="w-full md:w-3/5"><p class="font-medium inline">${escape(product.name)}</p> ${!product.outOfStock ? `<p class="text-green text-xs py-1 text-slate-500" data-svelte-h="svelte-13t6e4">Status: In Stock</p>` : `<p class="text-red text-xs py-1 text-slate-500" data-svelte-h="svelte-1pv20ey">Status: Out of Stock</p>`} <p class="font-semibold text-xs pt-2">Code: ${escape(product.code)}</p>   <div class="cursor-pointer w-fit rounded bg-red-700 py-1 px-2 text-white text-[10px] my-1" data-svelte-h="svelte-1syt6ym">Remove
									</div></div> ${!product.outOfStock ? `<a href="${"/product-detail/" + escape(product.slug, true)}"><p class="text-[11px] underline font-medium tracking-wider uppercase" data-svelte-h="svelte-btvlfa">View</p> </a>` : `<p class="cursor-deactivated text-[11px] underline font-medium tracking-wider uppercase" data-svelte-h="svelte-1j7nmoj">View
									</p>`}</div> </div></div> </div>`;
  })}` : `<p class="text-[#520000] text-sm font-medium pb-4" data-svelte-h="svelte-9u6gez">No saved products</p>`}</div></section>`;
});
export {
  Page as default
};
