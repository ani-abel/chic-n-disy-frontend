import { findProductCategoryById, getProducts } from '../../../api-requests/request';

export async function load({ params }) {
    const category = await findProductCategoryById(params.categoryId);
    const products = await getProducts({
        outOfStock: false,
        productCategoryId: params.categoryId,
        pageNumber: 1,
        pageSize: 20
    });
    return { category, products };
}
