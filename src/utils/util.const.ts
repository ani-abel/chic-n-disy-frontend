export const BASE_URL = 'http://localhost:8080';

export const NAIRA_SIGN = '₦';

export enum RequestStatus {
	SUCCESSFUL = 'SUCCESSFUL',
	FAILED = 'FAILED'
}

export enum AppRole {
	ADMIN = 'ADMIN',
	CUSTOMER = 'CUSTOMER'
}

export enum PaymentStatus {
	PAID = 'PAID',
	PENDING = 'PENDING',
	FAILED = 'FAILED'
}
