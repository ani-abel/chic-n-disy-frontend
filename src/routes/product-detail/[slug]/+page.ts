import { findProductFullDetailBySlug } from "../../../api-requests/request";

export async function load({ params }) {
    return await findProductFullDetailBySlug(params.slug);
};