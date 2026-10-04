import { c as create_ssr_component, a as add_attribute, e as escape, b as each } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let imagePreviews = [];
  const formData = {
    name: null,
    code: null,
    description: null,
    quantity: 0,
    unitPrice: 0,
    productCategoryId: null,
    productVideo: null,
    images: []
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section class="w-11/12 pt-50"><section class="grid grid-cols-12 gap-4"><div class="col-span-12 sm:col-span-2"></div> <div class="col-span-12 sm:col-span-8 p-4"><h2 class="text-4xl text-center my-12" data-svelte-h="svelte-6xugzs">Add Product</h2> <form><div class="my-6"><label for="name" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-h5o2km">Name</label> <input required type="text" name="name" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.name, 0)}></div> <div class="my-6"><label for="description" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-rfhyc2">Description</label> <textarea required rows="8" class="resize-none border border-black w-full p-1.5 mt-1" name="description">${escape("")}</textarea></div> <div class="my-6"><label for="code" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-1m8yezu">Code</label> <input type="text" name="code" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.code, 0)}></div> <div class="my-6"><label for="quantity" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-10toc3q">Quantity</label> <input required type="number" min="1" name="quantity" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.quantity, 0)}></div> <div class="my-6"><label for="unitPrice" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-c8f3ln">Price per unit</label> <input required type="number" min="1" name="unitPrice" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.unitPrice, 0)}></div> <div class="my-6"><label for="category" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-1n1xi5b">Product Category</label> <select name="category" required class="border border-black w-full p-1.5 mt-1">${each(data.categories.data, (category) => {
    return `<option${add_attribute("value", category.id, 0)}>${escape(category.name)}</option>`;
  })}</select></div> <div class="border-top-solid mt-10 my-6 pt-10"> <label for="images" class="relative cursor-pointer bg-black text-white font-medium py-2 px-4 rounded-md shadow hover:bg-black focus:ring focus:ring-blue-300 focus:outline-none"><span data-svelte-h="svelte-1pgvkzz">Upload Photo(s)</span> <input accept="image/*" name="images" multiple type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"></label> ${imagePreviews.length > 0 ? `<div class="container mx-auto"> <div class="my-6 text-center"><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">${each(imagePreviews, (imagePreview, index) => {
    return `<div class="bg-white p-4 shadow rounded-lg"><img${add_attribute("src", imagePreview, 0)}${add_attribute("alt", `image-${index}`, 0)} class="w-full h-auto rounded-md"> </div>`;
  })}</div></div></div>` : ``} <div class="border-top-solid mt-10 my-6 pt-10"> <label class="relative cursor-pointer bg-black text-white font-medium py-2 px-4 rounded-md shadow hover:bg-black focus:ring focus:ring-blue-300 focus:outline-none"><span data-svelte-h="svelte-663qbo">Upload Video</span> <input accept="video/*" type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"></label> ${``}</div> <div class="my-6 text-center" data-svelte-h="svelte-yp9bvm"><input type="submit" value="Submit" class="bg-black-gold uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"></div></div></form></div></section></section>`;
});
export {
  Page as default
};
