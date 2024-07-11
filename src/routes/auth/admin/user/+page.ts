import { getUsers } from "../../../../api-requests/request";

export async function load({ url }) {
	return await getUsers({
		pageSize: 10,
		pageNumber: 1,
	});
}
