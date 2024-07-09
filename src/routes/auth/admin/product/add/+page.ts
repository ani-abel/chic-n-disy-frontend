import { getProductCategories } from "../../../../../api-requests/request";

export async function load({ url }) {
	const categories = await getProductCategories({});
    return { categories };
}
