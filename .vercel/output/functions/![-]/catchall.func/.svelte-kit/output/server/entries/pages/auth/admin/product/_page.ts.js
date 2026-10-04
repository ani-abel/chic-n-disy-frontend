import { g as getProductCategories, b as getProducts } from "../../../../../chunks/request.js";
async function load({ url }) {
  const categories = await getProductCategories({});
  const products = await getProducts({
    pageSize: 10,
    pageNumber: 1,
    outOfStock: false
  });
  return { categories, products };
}
export {
  load
};
