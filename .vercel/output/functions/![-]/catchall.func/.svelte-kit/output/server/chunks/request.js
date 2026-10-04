import { h as httpGet, B as BASE_URL } from "./util.function.js";
const getUsers = async (filter) => {
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
  return httpGet(url);
};
const findUserById = async (userId) => {
  const url = `${BASE_URL}/user/${userId}`;
  return httpGet(url);
};
const getProducts = async (filter) => {
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
  if ("outOfStock" in filter) {
    url += `&outOfStock=${filter?.outOfStock}`;
  }
  if ("status" in filter) {
    url += `&status=${filter?.status}`;
  }
  if (filter?.productCategoryId) {
    url += `&productCategoryId=${filter?.productCategoryId}`;
  }
  return httpGet(url);
};
const getProductCategories = async (filter) => {
  let url = `${BASE_URL}/product-category?status=true`;
  if (filter?.pageNumber) {
    url += `&pageNumber=${filter?.pageNumber}`;
  }
  if (filter?.pageSize) {
    url += `&pageSize=${filter?.pageSize}`;
  }
  if ("status" in filter) {
    url += `&status=${filter?.status}`;
  }
  if (filter?.searchTerm) {
    url += `&searchTerm=${filter?.searchTerm}`;
  }
  return httpGet(url);
};
const findProductCategoryById = async (productCategoryId) => {
  const url = `${BASE_URL}/product-category/${productCategoryId}`;
  return httpGet(url);
};
const findProductById = async (productId) => {
  const url = `${BASE_URL}/product/${productId}`;
  return httpGet(url);
};
const findProductCategoryGrouping = async (productsPerCategory = 10, categoriesPerPage = 3) => {
  const url = `${BASE_URL}/product/category-grouping/products?productsPerCategory=${productsPerCategory}&categoriesPerPage=${categoriesPerPage}`;
  return httpGet(url);
};
const globalSearchForProducts = async (searchTerm, filter) => {
  let url = `${BASE_URL}/product/search/products?searchTerm=${searchTerm}`;
  if (filter?.pageNumber) {
    url += `&pageNumber=${filter?.pageNumber}`;
  }
  if (filter?.pageSize) {
    url += `&pageSize=${filter?.pageSize}`;
  }
  return httpGet(url);
};
const findTopSellingProducts = async (limit = 3) => {
  const url = `${BASE_URL}/product/top-selling/products/${limit}`;
  return httpGet(url);
};
const findProductFullDetailBySlug = async (productId, userId) => {
  let url = `${BASE_URL}/product/find-product/full-data/by-slug/${productId}`;
  return httpGet(url);
};
const productReviewSummary = async (productId) => {
  const url = `${BASE_URL}/product-review/summary/${productId}`;
  return httpGet(url);
};
const findRelatedProducts = async (productId, limit = 4) => {
  const url = `${BASE_URL}/product/related-products/${productId}/?limit=${limit}`;
  return httpGet(url);
};
const findUserShippingAddressById = async (addressId) => {
  const url = `${BASE_URL}/user-shipping-address/${addressId}`;
  return await httpGet(url);
};
const findStates = async () => {
  const url = `${BASE_URL}/user-shipping-address/dropdown/find-states`;
  return await httpGet(url);
};
export {
  findProductCategoryGrouping as a,
  getProducts as b,
  findProductById as c,
  findProductCategoryById as d,
  getUsers as e,
  findTopSellingProducts as f,
  getProductCategories as g,
  findUserById as h,
  findStates as i,
  findUserShippingAddressById as j,
  findProductFullDetailBySlug as k,
  findRelatedProducts as l,
  globalSearchForProducts as m,
  productReviewSummary as p
};
