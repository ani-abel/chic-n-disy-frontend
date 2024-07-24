import { findStates } from '../../../../../api-requests/request';

export async function load({ params }) {
	return await findStates();
}
