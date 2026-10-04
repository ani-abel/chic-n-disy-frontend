import * as universal from '../entries/pages/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/4.DgREd_L3.js","_app/immutable/chunks/request.B9hys7nk.js","_app/immutable/chunks/util.function.BWTl4hsZ.js","_app/immutable/chunks/index.BtwF-C-j.js","_app/immutable/chunks/scheduler.dwJk_Fko.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.i4Frmz3n.js","_app/immutable/chunks/index.LLrCIvt7.js","_app/immutable/chunks/Cart.D6IZW5nK.js","_app/immutable/chunks/each.D0qKWAgx.js","_app/immutable/chunks/index.Tc1whCDR.js","_app/immutable/chunks/Sign-up.CUobPxOM.js","_app/immutable/chunks/stores.DkaXWzhm.js","_app/immutable/chunks/entry.Amt1YG4m.js"];
export const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css","_app/immutable/assets/Sign-up.BQiWGsMM.css"];
export const fonts = [];
