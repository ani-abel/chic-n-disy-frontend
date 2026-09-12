import { getProducts } from '../../api-requests/request';

export async function load({ params }) {
	const products = await getProducts({
		outOfStock: false,
		pageNumber: 1,
		pageSize: 12
	});

	return { products };
}
