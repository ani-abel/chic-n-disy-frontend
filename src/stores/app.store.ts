import { writable } from 'svelte/store';
import type { AppRole } from '../utils';

type User = {
	email: string;
	userId: string;
	token: string;
	role: AppRole;
	firstName: string;
	lastName?: string;
};

type CartItem = {
	product: any;
	quantity: number;
	price: number;
};

type Cart = {
	items: CartItem[];
	totalPrice: number;
};

type ProductsResponse = {
	success: boolean;
	code: number;
	message: string;
	data: any[];
	paginationControl?: {
		currentPage: number;
		hasNext: boolean;
		hasPrevious: boolean;
		pageSize: number;
		totalCount: number;
		totalPages: number;
	};
};

export const customerSection = writable({
	title: 'Orders'
});

export const productsList = writable<ProductsResponse>({
	success: false,
	code: 0,
	message: '',
	data: []
});

export const setProductList = (result: any) => {
	productsList.update((data) => result);
};

export const loggedInUser = writable<User | null>();

const cartInitialState = {
	items: [],
	totalPrice: 0
};
export const cart = writable<Cart>(cartInitialState);

export const addItemToCart = (product: any, quantity = 1) => {
	cart.update((data: Cart) => {
		const itemIndex = data.items.findIndex((item: any) => item.product.id === product.id);
		if (itemIndex > -1) {
			const item = data.items[itemIndex];
			item.quantity += quantity;
			item.price = Number(item.product.unitPrice) * Number(quantity);
			data.items[itemIndex] = item;
		} else {
			data.items.push({
				product,
				quantity,
				price: product.unitPrice * quantity
			});
		}
		// set total price of items in cart
		data.totalPrice = data.items.reduce((acc: any, item: any) => acc + item.price, 0);
		return data;
	});
};

export const resetCart = () => {
	cart.update((data: Cart) => ({ ...cartInitialState }));
};

export const removeItemFromCart = (productId: string) => {
	cart.update((data: Cart) => {
		const itemIndex = data.items.findIndex((item) => item.product.id === productId);
		if (itemIndex > -1) {
			data.items.splice(itemIndex, 1);
		}
		// set total price of items in cart
		data.totalPrice = data.items.reduce((acc, item) => acc + item.price, 0);
		return data;
	});
};
