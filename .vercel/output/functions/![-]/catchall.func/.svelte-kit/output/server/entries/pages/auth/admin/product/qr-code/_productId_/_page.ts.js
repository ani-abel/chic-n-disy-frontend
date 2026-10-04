import { c as findProductById } from "../../../../../../../chunks/request.js";
async function load({ params }) {
  return await findProductById(params.productId);
}
export {
  load
};
