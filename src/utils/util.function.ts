import axios, { type AxiosResponse } from 'axios';
import { toast } from '@zerodevx/svelte-toast';
import type { NotificationMetaType } from './util.type';
import { ORIGIN_URL } from './index';

export const fillArray = (length = 1): number[] => {
	const items = [];
	for (let i = 0; i < length; i++) {
		items.push(i + 1);
	}
	return items;
};

export const formatDate = (dateString: string, type: 'TIME' | 'DATE' = 'TIME'): string => {
	const date = new Date(dateString);
	if (type === 'DATE') {
		return date.toDateString();
	}
	// Default to "TIME"
	return date.toTimeString();
};

export const deleteFromLocalStorage = (key: string) => localStorage.removeItem(key);

export const saveToLocalStorage = (key: string, data: string) => localStorage.setItem(key, data);

export const getItemFromLocalStorage = (key: string, parseJson = true) => {
	const data = localStorage.getItem(key);
	if (parseJson) {
		return JSON.parse(data as string);
	}
	return data;
};

export const getJwtToken = (): string => {
	const userObject = getItemFromLocalStorage('ecommerce-user', true);
	return userObject?.token;
};

export const displayMessage = (error: NotificationMetaType): void => {
	switch (error.type) {
		default:
		case 'success':
			toast.push(error.message, {
				theme: {
					'--toastBackground': '#22C55E',
					'--toastBarBackground': '#22C55E'
				}
			});
			break;
		case 'danger':
			toast.push(error.message, {
				theme: {
					'--toastBackground': '#EF4444',
					'--toastBarBackground': '#EF4444'
				}
			});
			break;
		case 'info':
			toast.push(error.message, {
				theme: {
					'--toastBackground': '#3B82F6',
					'--toastBarBackground': '#3B82F6'
				}
			});
	}
};

export const httpGet = async <T>(url: string, headers = {}): Promise<T> => {
	try {
		const response: AxiosResponse = await axios.get(url, {
			headers: {
				'X-Requested-With': 'axios',
				origin: ORIGIN_URL,
				...headers
			}
		});
		return response.data as T;
	} catch (ex: any) {
		throw ex;
	}
};

export const httpPost = async <U, T>(url: string, payload: T, headers = {}): Promise<U> => {
	try {
		const response: AxiosResponse = await axios.post(url, payload, {
			headers: {
				'X-Requested-With': 'axios',
				origin: ORIGIN_URL,
				...headers
			}
		});
		return response.data as U;
	} catch (ex: any) {
		throw ex;
	}
};

export const httpDelete = async <T>(url: string, headers = {}): Promise<T> => {
	try {
		const response: AxiosResponse = await axios.delete(url, { headers });
		return response.data as T;
	} catch (ex: any) {
		throw ex;
	}
};

export const httpPatch = async <U, T>(url: string, payload: T, headers = {}): Promise<U> => {
	try {
		const response: AxiosResponse = await axios.patch(url, payload, {
			headers
		});
		return response.data as U;
	} catch (ex: any) {
		throw ex;
	}
};

export const convertFilesToBase64Strings = async (event: Event): Promise<string[]> => {
	const base64Strings: string[] = [];
	const files: FileList = (event.target as HTMLInputElement).files as FileList;
	for (const file of files) {
		const filePath: string = await new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.onload = () => resolve(fileReader.result as string);
			fileReader.onerror = (error) => reject(error);
			fileReader.readAsDataURL(file);
		});
		base64Strings.push(filePath);
	}
	return base64Strings;
};
