import {
	findRelatedProducts,
	productReviewSummary,
	findProductFullDetailBySlug
} from '../../../api-requests/request';

export async function load({ params }) {
	const [product, relatedProducts, reviewSummary] = await Promise.all([
		findProductFullDetailBySlug(params.slug),
		findRelatedProducts(params.slug),
		productReviewSummary(params.slug)
	]);

	return { product, relatedProducts, reviewSummary };
}
