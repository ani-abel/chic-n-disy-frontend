import { findProductCategoryById } from '../../../../../api-requests/request.js';

export async function load({ params }) {
	return await findProductCategoryById(params.productCategoryId);
}
