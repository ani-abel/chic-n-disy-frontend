import { c as create_ssr_component, a as add_attribute } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const formData = {
    email: null,
    phoneNumber: null,
    firstName: null,
    lastName: null
  };
  return `<section class="w-11/12 pt-50"><section class="grid grid-cols-12 gap-4"><div class="col-span-12 sm:col-span-2"></div> <div class="col-span-12 sm:col-span-8 p-4"><h2 class="text-4xl text-center my-12" data-svelte-h="svelte-1bcgihe">Add User</h2> <form><div class="my-6"><label for="firstName" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-lxskpq">First Name</label> <input required type="text" name="firstName" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.firstName, 0)}></div> <div class="my-6"><label for="lastName" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-16dkfuw">Last Name</label> <input required type="text" name="lastName" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.lastName, 0)}></div> <div class="my-6"><label for="email" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-sg5726">Email</label> <input required type="email" name="email" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.email, 0)}></div> <div class="my-6"><label for="phoneNumber" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-vur0nr">Phone-Number</label> <input required type="tel" name="phoneNumber" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.phoneNumber, 0)}></div> <div class="my-6 text-center" data-svelte-h="svelte-evn5nw"><input type="submit" value="Submit" class="bg-black-gold uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"></div></form></div></section></section>`;
});
export {
  Page as default
};
