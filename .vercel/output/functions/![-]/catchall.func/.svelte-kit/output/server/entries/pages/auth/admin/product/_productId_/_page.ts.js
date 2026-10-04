import { g as getProductCategories, c as findProductById } from "../../../../../../chunks/request.js";
async function load({ params }) {
  const categories = await getProductCategories({});
  const product = await findProductById(params.productId);
  return { categories, product };
}
export {
  load
};
