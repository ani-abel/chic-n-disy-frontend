import { c as create_ssr_component, a as add_attribute, b as each, e as escape } from "../../../../../chunks/ssr.js";
import { A as AppRole, f as formatDate } from "../../../../../chunks/util.function.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let users = [];
  const formData = {
    role: null,
    searchTerm: null,
    pageSize: 10,
    pageNumber: 1
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section class="flex-1 pt-50"><div class="w-full flex justify-center"><section class="w-11/12"><div class="w-full flex justify-between my-4" data-svelte-h="svelte-1gcx3qs"><p class="text-2xl">Users</p> <a class="bg-black-gold text-white font-medium px-6 py-2 text-sm mt-4 cormorant-sc-light" href="/auth/admin/user/add">Create</a></div>  <div class="grid grid-cols-12 gap-4"> <div class="col-span-12 sm:col-span-6 bg-black-gold p-4"><label for="role" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-1j0z5fq">Role</label> <select name="role" class="border border-black w-full p-1.5 mt-1"><option${add_attribute("value", null, 0)} data-svelte-h="svelte-1jj3yu">Filter by Role</option>${each(Object.values(AppRole), (role) => {
    return `<option${add_attribute("value", role, 0)}>${escape(role)}</option>`;
  })}</select></div> <div class="col-span-12 sm:col-span-6 bg-black-gold p-4"><label for="search" class="text-xs uppercase tracking-widest" data-svelte-h="svelte-1ttajpi">Search</label> <input type="search" name="search" class="border border-black w-full p-1.5 mt-1"${add_attribute("value", formData.searchTerm, 0)}></div></div>  <div class="table-wrap"><table><thead data-svelte-h="svelte-1csjcid"><tr id="thead"><th>#</th> <th>Name</th> <th>Email</th> <th>Phone Number</th> <th>Role</th> <th>Date</th> <th>Status</th> <th>Action</th></tr></thead> <tbody>${each(users, (user, index) => {
    return `<tr id="tr"><td>${escape(index + 1)}</td> <td>${escape(user.firstName)} ${escape(user.lastName)}</td> <td>${escape(user.email)}</td> <td>${escape(user.phoneNumber)}</td> <td>${escape(user.role)}</td> <td>${escape(formatDate(user.dateCreated, "DATE"))}</td> <td>${escape(user.status ? "Active" : "Inactive")}</td> <td><div class="flex items-center gap-2">${user.role === AppRole.ADMIN ? `<a href="${"/auth/admin/user/" + escape(user.id, true)}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"></path></svg> </a>` : ``}   <span class="cursor-pointer" data-svelte-h="svelte-1r5r91v"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path></svg></span> </div></td> </tr>`;
  })}</tbody></table></div> <div class="container mx-auto">${``}</div></section></div></section>`;
});
export {
  Page as default
};
