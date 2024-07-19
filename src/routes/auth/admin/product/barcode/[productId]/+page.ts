import { findProductById } from '../../../../../../api-requests/request.js';

export async function load({ params }) {
	return await findProductById(params.productId);
}
