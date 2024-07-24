import { findStates, findUserShippingAddressById } from '../../../../../../api-requests/request';

export async function load({ params }) {
	const address = await findUserShippingAddressById(params.addressId);
	const states = await findStates();
	return { states, address };
}
