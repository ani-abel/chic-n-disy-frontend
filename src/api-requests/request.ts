import { BASE_URL, httpPost, httpGet, httpDelete, httpPatch } from '../utils';

export const apiLogin = async (email: string, password: string) => {
	const url = `${BASE_URL}/auth/login`;
	const body = {
		email,
		password
	};
	return httpPost<any, any>(url, body);
};

export const getUsers = async (filter: any) => {
	let url = `${BASE_URL}/user?status=true`;
	if (filter?.pageNumber) {
		url += `&pageNumber=${filter?.pageNumber}`;
	}
	if (filter?.pageSize) {
		url += `&pageSize=${filter?.pageSize}`;
	}
	if (filter?.searchTerm) {
		url += `&searchTerm=${filter?.searchTerm}`;
	}
	if (filter?.role) {
		url += `&role=${filter?.role}`;
	}
	return httpGet<any>(url);
};

export const findUserById = async (userId: string) => {
	const url = `${BASE_URL}/user/${userId}`;
	return httpGet<any>(url);
};

export const updateUser = async (payload: any, headers: any) => {
	const url = `${BASE_URL}/user`;
	return httpPatch<any, any>(url, payload, headers);
};

export const createUserSignup = async (payload: any) => {
	const url = `${BASE_URL}/user/sign-up`;
	return httpPost<any, any>(url, payload);
};

export const getProducts = async (filter: any) => {
	let url = `${BASE_URL}/product?status=true`;
	if (filter?.pageNumber) {
		url += `&pageNumber=${filter?.pageNumber}`;
	}
	if (filter?.pageSize) {
		url += `&pageSize=${filter?.pageSize}`;
	}
	if (filter?.searchTerm) {
		url += `&searchTerm=${filter?.searchTerm}`;
	}
	if ('outOfStock' in filter) {
		url += `&outOfStock=${filter?.outOfStock}`;
	}
	if ('status' in filter) {
		url += `&status=${filter?.status}`;
	}
	if (filter?.productCategoryId) {
		url += `&productCategoryId=${filter?.productCategoryId}`;
	}
	return httpGet<any>(url);
};

export const getProductCategories = async (filter: any) => {
	let url = `${BASE_URL}/product-category?status=true`;
	if (filter?.pageNumber) {
		url += `&pageNumber=${filter?.pageNumber}`;
	}
	if (filter?.pageSize) {
		url += `&pageSize=${filter?.pageSize}`;
	}
	if ('status' in filter) {
		url += `&status=${filter?.status}`;
	}
	if (filter?.searchTerm) {
		url += `&searchTerm=${filter?.searchTerm}`;
	}
	return httpGet<any>(url);
};

export const findProductCategoryById = async (productCategoryId: string) => {
	const url = `${BASE_URL}/product-category/${productCategoryId}`;
	return httpGet<any>(url);
};

export const createProduct = async (payload: any, headers: any) => {
	const url = `${BASE_URL}/product`;
	return httpPost<any, any>(url, payload, headers);
};

export const createProductCategory = async (payload: any, headers: any) => {
	const url = `${BASE_URL}/product-category`;
	return httpPost<any, any>(url, payload, headers);
};

export const deleteProduct = async (id: string) => {
	const url = `${BASE_URL}/product/${id}`;
	return httpDelete<any>(url);
};

export const updateProduct = async (payload: any, headers: any) => {
	const url = `${BASE_URL}/product`;
	return httpPatch<any, any>(url, payload, headers);
};

export const updateProductCategory = async (payload: any, headers: any) => {
	const url = `${BASE_URL}/product-category`;
	return httpPatch<any, any>(url, payload, headers);
};

export const uploadFiles = async (files: FileList) => {
	const url = `${BASE_URL}/upload-files`;
	const payload = new FormData();
	for (const file of files) {
		payload.append('files[]', file);
	}
	return httpPost<any, any>(url, payload);
};

export const findProductById = async (productId: string) => {
	const url = `${BASE_URL}/product/${productId}`;
	return httpGet<any>(url);
};

export const findProductCategoryGrouping = async (
	productsPerCategory = 10,
	categoriesPerPage = 3
) => {
	const url = `${BASE_URL}/product/category-grouping/products?productsPerCategory=${productsPerCategory}&categoriesPerPage=${categoriesPerPage}`;
	return httpGet<any>(url);
};

export const globalSearchForProducts = async (searchTerm: string) => {
	const url = `${BASE_URL}/product/search/products?searchTerm=${searchTerm}`;
	return httpGet<any>(url);
};

export const findTopSellingProducts = async (limit = 3) => {
	const url = `${BASE_URL}/product/top-selling/products/${limit}`;
	return httpGet<any>(url);
};
