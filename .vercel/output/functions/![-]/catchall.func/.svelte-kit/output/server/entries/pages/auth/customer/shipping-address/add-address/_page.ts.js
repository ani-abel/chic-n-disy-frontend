import { i as findStates } from "../../../../../../chunks/request.js";
async function load({ params }) {
  return await findStates();
}
export {
  load
};
