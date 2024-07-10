import { getProductCategories, findProductById } from '../../../../../api-requests/request.js';

export async function load({ params }) {
	const categories = await getProductCategories({});
	const product = await findProductById(params.productId);
	return { categories, product };
}
