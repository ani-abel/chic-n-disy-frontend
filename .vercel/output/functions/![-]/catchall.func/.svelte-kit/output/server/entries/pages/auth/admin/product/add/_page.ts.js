import { g as getProductCategories } from "../../../../../../chunks/request.js";
async function load({ url }) {
  const categories = await getProductCategories({});
  return { categories };
}
export {
  load
};
