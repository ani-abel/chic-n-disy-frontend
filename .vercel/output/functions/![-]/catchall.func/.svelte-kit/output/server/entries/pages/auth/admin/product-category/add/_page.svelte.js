import { c as create_ssr_component, a as add_attribute, e as escape } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const formData = { name: null, description: null };
  return `<section class="w-11/12 pt-50"><section class="grid grid-cols-12 gap-4"><div class="col-span-12 sm:col-span-2"></div> <div class="col-span-12 sm:col-span-8 p-4"><h2 class="text-4xl text-center my-12" data-svelte-h="svelte-19ytjlr">Add Category</h2> <form><div class="my-6"><label for="name" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-h5o2km">Name</label> <input required type="text" name="name" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.name, 0)}></div> <div class="my-6"><label for="name" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-66zj4r">Description</label> <textarea required maxlength="1200" rows="5" name="description" class="border border-black w-full p-1.5 mt-1">${escape("")}</textarea></div> <div class="my-6 text-center" data-svelte-h="svelte-evn5nw"><input type="submit" value="Submit" class="bg-black-gold uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"></div></form></div></section></section>`;
});
export {
  Page as default
};
