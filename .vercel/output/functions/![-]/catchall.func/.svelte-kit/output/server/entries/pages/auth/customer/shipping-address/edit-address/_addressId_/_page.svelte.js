import { c as create_ssr_component, b as each, e as escape, a as add_attribute } from "../../../../../../../chunks/ssr.js";
import "../../../../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let lgas = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section class="w-full lg:w-4/5"><div class="w-full grid md:grid-cols-4 gap-2"><form class="w-full md:col-span-3"><div class="my-6"><label for="state" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-sso8x4">State</label> <select name="state" required class="border border-black w-full p-1.5 mt-1"><option value="Select State" data-svelte-h="svelte-109pwfl">Select State</option>${each(data.states.data, (state) => {
    return `<option${add_attribute("value", state.tag, 0)}>${escape(state.state)}</option>`;
  })}</select></div> ${lgas.length > 0 ? `<div class="my-6"><label for="lga" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-15dhi9i">Lga</label> <select name="lga" required class="border border-black w-full p-1.5 mt-1"><option value="" data-svelte-h="svelte-1ezn97y">Select LGA</option>${each(lgas, (lga) => {
    return `<option${add_attribute("value", lga.lga, 0)}>${escape(lga.lga)}</option>`;
  })}</select></div>` : ``} <div class="my-6"><label for="address" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-1yrr08m">Address</label> <textarea name="address" rows="8" class="resize-none border border-black w-full p-1.5 mt-1">${escape("")}</textarea></div> <div class="my-6 text-center" data-svelte-h="svelte-5bkzly"><button type="submit" class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3">Update</button></div></form></div></section>`;
});
export {
  Page as default
};
