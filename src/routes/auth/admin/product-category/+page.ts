import { getProductCategories } from '../../../../api-requests/request';

export async function load({ url }) {
	return await getProductCategories({
		pageSize: 10,
		pageNumber: 1
	});
}
