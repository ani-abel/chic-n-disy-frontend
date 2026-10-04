import { m as globalSearchForProducts } from "../../../chunks/request.js";
async function load({ url }) {
  let products;
  const searchQuery = url.searchParams.get("query") ?? "";
  if (searchQuery && searchQuery.trim().length > 0) {
    products = await globalSearchForProducts(searchQuery, {
      pageSize: 12,
      pageNumber: 1
    });
  }
  return { searchQuery, products };
}
export {
  load
};
