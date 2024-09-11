// export const BASE_URL = 'http://localhost:8080';
export const BASE_URL = 'http://162.254.32.201:8080';

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
