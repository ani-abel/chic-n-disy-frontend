import { e as getUsers } from "../../../../../chunks/request.js";
async function load({ url }) {
  return await getUsers({
    pageSize: 10,
    pageNumber: 1
  });
}
export {
  load
};
