import { b as getProducts } from "../../../chunks/request.js";
async function load({ params }) {
  const products = await getProducts({
    outOfStock: false,
    pageNumber: 1,
    pageSize: 12
  });
  return { products };
}
export {
  load
};
