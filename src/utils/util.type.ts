import type { AppRole, RequestStatus } from './util.const';

export type FormDataType = {
	[key: string]: { value: any; required: boolean };
};

export class ErrorMetaType {
	color!: string;
	header!: string;
	message!: string;
}

export class BaseResponseTypeDTO<T> {
	success!: boolean;
	code!: number;
	message!: string;
	data?: T;
}

export abstract class Base {
	id!: string;
	status!: boolean;
	dateCreated!: Date;
	dateUpdate!: Date;
}

export class User extends Base {
	email!: string;
	phoneNumber!: string;
	role!: AppRole;
	uniqueVerificationCode!: string;
	profileImageUrl!: string;
}

export class AuthResponse {
	userId!: string;
	email!: string;
	role!: AppRole;
	dateCreated!: Date;
	token!: string;
	tokenInitializationDate!: number;
	tokenExpiryDate!: number;
	user!: User;
}

export class AuthResponseDTO extends BaseResponseTypeDTO<AuthResponse> {}

export class NotificationMetaType {
	message!: string;
	type!: 'danger' | 'success' | 'info';
	header!: string;
}

export class PaginationResponseType {
	currentPage!: number;
	totalPages!: number;
	pageSize!: number;
	totalCount!: number;
	hasPrevious!: boolean;
	hasNext!: boolean;
}

export class FileResponseDTO<T> {
	status!: RequestStatus;
	data!: T;
}

export type NavigateFunction = (e: MouseEvent, page: number) => void;

export type MarkdownFileUploaderType = { url: string; alt: string; title: string };
