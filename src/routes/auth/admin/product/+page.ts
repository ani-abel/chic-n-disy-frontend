import { getProducts, getProductCategories } from '../../../../api-requests/request.js';

export async function load({ url }) {
	const categories = await getProductCategories({});
	const products = await getProducts({
		pageSize: 10,
		pageNumber: 1,
		outOfStock: false
	});
	return { categories, products };
}
