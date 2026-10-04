import axios from "axios";
import "./SvelteToast.svelte_svelte_type_style_lang.js";
const ORIGIN_URL = "https://www.chikndisy.com";
const BASE_URL = "https://chik-n-disy-backend.onrender.com";
const NAIRA_SIGN = "₦";
var AppRole = /* @__PURE__ */ ((AppRole2) => {
  AppRole2["ADMIN"] = "ADMIN";
  AppRole2["CUSTOMER"] = "CUSTOMER";
  return AppRole2;
})(AppRole || {});
var PaymentProvider = /* @__PURE__ */ ((PaymentProvider2) => {
  PaymentProvider2["PAYSTACK"] = "PAYSTACK";
  PaymentProvider2["FLUTTERWAVE"] = "FLUTTERWAVE";
  return PaymentProvider2;
})(PaymentProvider || {});
var OrderStatus = /* @__PURE__ */ ((OrderStatus2) => {
  OrderStatus2["PENDING"] = "PENDING";
  OrderStatus2["SUCCESSFUL"] = "SUCCESSFUL";
  OrderStatus2["FAILED"] = "FAILED";
  return OrderStatus2;
})(OrderStatus || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2["PAID"] = "PAID";
  PaymentStatus2["PENDING"] = "PENDING";
  PaymentStatus2["FAILED"] = "FAILED";
  return PaymentStatus2;
})(PaymentStatus || {});
const formatDate = (dateString, type = "TIME") => {
  const date = new Date(dateString);
  if (type === "DATE") {
    return date.toDateString();
  }
  return date.toTimeString();
};
const getItemFromLocalStorage = (key, parseJson = true) => {
  if (typeof window === "undefined")
    return;
  const data = localStorage.getItem(key);
  if (parseJson) {
    return JSON.parse(data);
  }
  return data;
};
const httpGet = async (url, headers = {}) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "X-Requested-With": "axios",
        origin: ORIGIN_URL,
        ...headers
      }
    });
    return response.data;
  } catch (ex) {
    throw ex;
  }
};
export {
  AppRole as A,
  BASE_URL as B,
  NAIRA_SIGN as N,
  OrderStatus as O,
  PaymentStatus as P,
  PaymentProvider as a,
  formatDate as f,
  getItemFromLocalStorage as g,
  httpGet as h
};
