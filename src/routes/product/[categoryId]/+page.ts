import { findProductCategoryById, getProducts } from '../../../api-requests/request';

export async function load({ params }) {
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
