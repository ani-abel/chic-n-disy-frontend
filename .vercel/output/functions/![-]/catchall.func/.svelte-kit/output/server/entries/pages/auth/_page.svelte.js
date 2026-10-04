import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import "../../../chunks/client.js";
import "../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  const formData = { email: null, password: null };
  $$unsubscribe_page();
  return `<section><section class="w-full flex justify-center"><div class="w-11/12 md:w-6/12 lg:w-4/12"><div class="w-full my-8" data-svelte-h="svelte-1h5xrn8"><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path></svg></a></div> <h2 class="text-4xl text-center my-12" data-svelte-h="svelte-65885d">Login</h2> <form><div class="my-6"><label for="email" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-1nk88y">Username</label> <input required type="email" name="email" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.email, 0)}></div> <div class="my-6"><label for="password" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-xfdf82">Password</label> <input required type="password" name="password" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.password, 0)}></div> <div class="my-6 text-center" data-svelte-h="svelte-4tk7j"><button class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3" type="submit">Login</button> <p class="mt-0">Don&#39;t have an account? <a href="/auth/signup"><span class="blue">Sign up</span></a></p></div></form></div></section></section>`;
});
export {
  Page as default
};
