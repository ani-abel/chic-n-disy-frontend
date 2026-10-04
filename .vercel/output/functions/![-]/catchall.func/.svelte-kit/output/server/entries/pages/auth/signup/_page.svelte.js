import { c as create_ssr_component, a as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import "../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const formData = {
    email: null,
    phoneNumber: null,
    password: null,
    fullName: null
  };
  return `<section><section class="w-full flex justify-center"><div class="w-11/12 md:w-6/12 lg:w-4/12"><div class="w-full my-8" data-svelte-h="svelte-1h5xrn8"><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path></svg></a></div> <h2 class="text-4xl text-center my-12" data-svelte-h="svelte-rsb78e">Sign up</h2> <form><div class="my-6"><label for="fullName" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-8ki7uc">Full Name</label> <input required type="text" name="fullName" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.fullName, 0)}></div> <div class="my-6"><label for="email" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-sg5726">Email</label> <input required type="email" name="email" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.email, 0)}></div> <div class="my-6"><label for="phoneNumber" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-1abekq6">Phone Number</label> <input required type="tel" name="phoneNumber" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.phoneNumber, 0)}></div> <div class="my-6"><label for="password" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-xfdf82">Password</label> <input required type="password" name="password" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.password, 0)}></div> <div class="my-6 text-center" data-svelte-h="svelte-tr3b58"><button class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3" type="submit">Submit</button> <p class="mt-0">Already have an account? <a href="/auth"><span class="blue">Login</span></a></p></div></form></div></section></section>`;
});
export {
  Page as default
};
