import { BASE_URL, httpPost, httpGet, httpDelete, httpPatch } from '../utils';

export const apiLogin = async (email: string, password: string) => {
	const url = `${BASE_URL}/auth/login`;
	const body = {
		email,
		password
	};
	return httpPost<any, any>(url, body);
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

export const deleteProduct = async (id: string) => {
	const url = `${BASE_URL}/product/${id}`;
	return httpDelete<any>(url);
};

export const updateProduct = async (payload: any, headers: any) => {
	const url = `${BASE_URL}/product`;
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
