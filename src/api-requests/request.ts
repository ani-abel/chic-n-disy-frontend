import { httpPost } from "../utils/util.function";

const BASE_URL = 'http://localhost:8080';

export const apiLogin = async (email: string, password: string) => {
	const url = `${BASE_URL}/auth/login`;
	const body = {
		email,
		password
	};
    return httpPost<any, any>(url, body);
};
