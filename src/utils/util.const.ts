// export const BASE_URL = 'http://localhost:8080';
// export const ORIGIN_URL = 'http://localhost:5173';
export const ORIGIN_URL = 'https://www.chikndisy.com';
export const BASE_URL = `https://chikndisy.duckdns.org`;

export const NAIRA_SIGN = '₦';

export enum RequestStatus {
	SUCCESSFUL = 'SUCCESSFUL',
	FAILED = 'FAILED'
}

export enum AppRole {
	ADMIN = 'ADMIN',
	CUSTOMER = 'CUSTOMER'
}

export enum PaymentProvider {
	PAYSTACK = 'PAYSTACK',
	FLUTTERWAVE = 'FLUTTERWAVE'
}

export enum OrderStatus {
	PENDING = 'PENDING',
	SUCCESSFUL = 'SUCCESSFUL',
	FAILED = 'FAILED'
}

export enum PaymentStatus {
	PAID = 'PAID',
	PENDING = 'PENDING',
	FAILED = 'FAILED'
}
