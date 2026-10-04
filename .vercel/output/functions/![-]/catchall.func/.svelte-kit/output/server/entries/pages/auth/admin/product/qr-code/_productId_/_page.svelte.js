import { c as create_ssr_component, e as escape } from "../../../../../../../chunks/ssr.js";
import "@solana/qr-code-styling";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-95e8hu_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"><!-- HEAD_svelte-95e8hu_END -->`, ""} <section class="w-11/12 pt-50"><section class="grid grid-cols-12 gap-4"><div class="col-span-12 md:col-span-4"></div> <div class="w-full flex justify-centercol-span-12 sm:col-span-8 md:col-span-4 p-4"><div class="w-fit"><h2 class="text-4xl text-center my-12">${escape(data.data.name)}</h2> ${``}</div></div></section></section>`;
});
export {
  Page as default
};
