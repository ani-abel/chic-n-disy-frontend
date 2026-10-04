import { h as findUserById } from "../../../../../../chunks/request.js";
async function load({ params }) {
  return await findUserById(params.userId);
}
export {
  load
};
