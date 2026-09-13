import { findProductFullDetailBySlug, findRelatedProducts } from '../../../api-requests/request';

export async function load({ params }) {
	const [product, relatedProducts] = await Promise.all([
		findProductFullDetailBySlug(params.slug),
		findRelatedProducts(params.slug)
	]);

	return { product, relatedProducts };
}
