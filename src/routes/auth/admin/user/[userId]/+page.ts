import { findUserById } from "../../../../../api-requests/request";

export async function load({ params }) {  
    return await findUserById(params.userId);
}