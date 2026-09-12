import { globalSearchForProducts } from '../../api-requests/request';

export async function load({ url }) {
	let products: any;

	const searchQuery = url.searchParams.get('query') ?? '';
	if (searchQuery && searchQuery.trim().length > 0) {
		products = await globalSearchForProducts(searchQuery, {
			pageSize: 12,
			pageNumber: 1
		});
	}

	return { searchQuery, products };
}
