import { findProductCategoryGrouping, findTopSellingProducts } from '../api-requests/request';

export async function load({ url }) {
	const topProducts = await findTopSellingProducts();
	const groupings = await findProductCategoryGrouping();
	return { groupings, topProducts };
}
