import { c as create_ssr_component, b as each, a as add_attribute, e as escape } from "../../../../../chunks/ssr.js";
import { f as formatDate } from "../../../../../chunks/util.function.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let orders = [];
  return `<section class="w-full lg:w-4/5"><div class="w-full grid md:grid-cols-2 gap-2">${orders.length > 0 ? `${each(orders, (order) => {
    return `<div class="w-full border border-gray-[#666666] mb-2"><div class="w-full flex-col"><div class="w-full lg:w-11/12"><div class="w-full p-4 flex flex-col lg:flex-row gap-8"><div class="rounded-lg bg-slate-100 w-full lg:w-56 h-36 xl:w-44 lg:h-28"><img${add_attribute("src", order.image, 0)}${add_attribute("alt", order.orderNumber, 0)} class="w-full h-full object-cover rounded-lg"></div> <div class="w-full md:w-3/5"><p class="font-medium inline">Order No : ${escape(order.orderNumber)}</p> <p class="text-xs py-1 text-slate-500">Amount: ₦${escape(Number(order.amount).toLocaleString("en-US"))}</p> <div class="${[
      "text-capitalize w-fit rounded bg-green-700 py-1 px-2 text-white text-[10px] my-1",
      (order.orderStatus === "FAILED" ? "bg-red" : "") + " " + (order.orderStatus === "PENDING" ? "bg-orange" : "") + " " + (order.orderStatus === "SUCCESSFUL" ? "bg-green-700" : "")
    ].join(" ").trim()}">${escape(order.orderStatus)}</div> <p class="font-semibold text-xs pt-2">On ${escape(formatDate(order.dateCreated, "DATE"))} </p></div> <a href="${"/auth/customer/orders/" + escape(order.id, true)}"><p class="text-[11px] underline font-medium tracking-wider uppercase pl-4" data-svelte-h="svelte-vwt628">View</p> </a></div> </div></div> </div>`;
  })}` : `<p class="text-[#520000] text-sm font-medium pb-4" data-svelte-h="svelte-cr2wbl">No orders yet</p>`}</div></section>`;
});
export {
  Page as default
};
