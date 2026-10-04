import { f as findTopSellingProducts, a as findProductCategoryGrouping } from "../../chunks/request.js";
async function load({ url }) {
  const topProducts = await findTopSellingProducts();
  const groupings = await findProductCategoryGrouping();
  return { groupings, topProducts };
}
export {
  load
};
