import { k as findProductFullDetailBySlug, l as findRelatedProducts, p as productReviewSummary } from "../../../../chunks/request.js";
async function load({ params }) {
  const [product, relatedProducts, reviewSummary] = await Promise.all([
    findProductFullDetailBySlug(params.slug),
    findRelatedProducts(params.slug),
    productReviewSummary(params.slug)
  ]);
  return { product, relatedProducts, reviewSummary };
}
export {
  load
};
