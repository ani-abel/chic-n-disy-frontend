import { s as subscribe } from "../../../../../../chunks/utils.js";
import { c as create_ssr_component } from "../../../../../../chunks/ssr.js";
import { p as page } from "../../../../../../chunks/stores.js";
import "../../../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `<section class="w-full lg:w-4/5"><div class="w-full grid md:grid-cols-2 gap-2">${`<p class="text-[#520000] text-sm font-medium pb-4" data-svelte-h="svelte-lhqc03">No products in this order</p>`}</div></section>`;
});
export {
  Page as default
};
