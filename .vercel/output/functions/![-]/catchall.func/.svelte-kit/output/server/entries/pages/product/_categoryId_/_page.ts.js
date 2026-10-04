import { d as findProductCategoryById, b as getProducts } from "../../../../chunks/request.js";
async function load({ params }) {
  const [category, products] = await Promise.all([
    findProductCategoryById(params.categoryId),
    getProducts({
      outOfStock: false,
      productCategoryId: params.categoryId,
      pageNumber: 1,
      pageSize: 12
    })
  ]);
  return {
    products,
    category: category.data
  };
}
export {
  load
};
