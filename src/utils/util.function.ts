import { toast } from '@zerodevx/svelte-toast';
import axios, { type AxiosResponse } from 'axios';
import type { NotificationMetaType } from './util.type';

export const displayError = (error: NotificationMetaType): void => {
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
		const response: AxiosResponse = await axios.get(url, { headers });
		return response.data as T;
	} catch (ex: any) {
		throw ex;
	}
};

export const httpPost = async <U, T>(url: string, payload: T, headers = {}): Promise<U> => {
	try {
		const response: AxiosResponse = await axios.post(url, payload, {
			headers
		});
		return response.data as U;
	} catch (ex: any) {
		throw ex;
	}
};
