import { d as findProductCategoryById } from "../../../../../../chunks/request.js";
async function load({ params }) {
  return await findProductCategoryById(params.productCategoryId);
}
export {
  load
};
