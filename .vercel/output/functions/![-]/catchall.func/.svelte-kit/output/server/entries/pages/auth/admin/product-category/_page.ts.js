import { g as getProductCategories } from "../../../../../chunks/request.js";
async function load({ url }) {
  return await getProductCategories({
    pageSize: 10,
    pageNumber: 1
  });
}
export {
  load
};
