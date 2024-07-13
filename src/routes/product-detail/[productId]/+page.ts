import { findProductFullDetail } from "../../../api-requests/request";

export async function load({ params }) {
    return await findProductFullDetail(params.productId);
};