import { j as findUserShippingAddressById, i as findStates } from "../../../../../../../chunks/request.js";
async function load({ params }) {
  const address = await findUserShippingAddressById(params.addressId);
  const states = await findStates();
  return { states, address };
}
export {
  load
};
