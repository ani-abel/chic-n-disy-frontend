import { c as create_ssr_component, a as add_attribute } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const formData = {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    password: null,
    confirmPassword: null
  };
  return `<section class="w-full lg:w-4/5"><div class="w-full grid md:grid-cols-4 gap-2"><form class="w-full md:col-span-3"><div class="my-6"><label for="firstName" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-lxskpq">First Name</label> <input required type="text" name="firstName" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.firstName, 0)}></div> <div class="my-6"><label for="lastName" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-16dkfuw">Last Name</label> <input type="text" name="lastName" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.lastName, 0)}></div> <div class="my-6"><label for="email" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-sg5726">Email</label> <input required type="email" name="email" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.email, 0)}></div> <div class="my-6"><label for="phoneNumber" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-1abekq6">Phone Number</label> <input required type="tel" name="phoneNumber" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.phoneNumber, 0)}></div> <div class="my-6"><label for="password" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-xfdf82">Password</label> <input type="password" name="password" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.password, 0)}></div> ${``} <div class="my-6 text-center" data-svelte-h="svelte-17czmm0"><button class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3" type="submit">Update</button></div></form></div></section>`;
});
export {
  Page as default
};
