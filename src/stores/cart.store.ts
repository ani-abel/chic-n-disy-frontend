import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';

export interface CartItem {
	product: any;
	quantity: number;
	price: number;
}

export interface User {
	name: string;
	email: string;
}

export interface AuthState {
	isLoggedIn: boolean;
	user: User | null;
}

// Initial Mock Cart
const initialItems: CartItem[] = [];

function createCartStore() {
	const { subscribe, update, set } = writable<CartItem[]>(initialItems);

	return {
		subscribe,

		/**
		 * Add a product item to the cart or update quantity if it already exists.
		 * @param product Product object (must contain an `id` or `_id`)
		 * @param price Price of the item
		 * @param quantity Quantity to add (default: 1)
		 */
		addItem: (product: any, price: number, quantity = 1) => {
			update((items) => {
				const productId = product.id;
				const existingIndex = items.findIndex((i) => {
					const itemProdId = i.product?.id;
					return itemProdId === productId;
				});

				if (existingIndex > -1) {
					items[existingIndex].quantity += quantity;
					return [...items];
				}
				return [...items, { product, price, quantity }];
			});
		},

		/**
		 * Change the quantity of an item by a delta amount (+1, -1, etc.).
		 * Automatically removes the item if quantity drops to 0 or less.
		 * @param index Array index of the item in the cart
		 * @param delta Change in quantity (e.g., +1 or -1)
		 */
		updateQty: (index: number, delta: number) => {
			update((items) => {
				if (!items[index]) return items;
				items[index].quantity += delta;
				if (items[index].quantity <= 0) {
					items.splice(index, 1);
				}
				return [...items];
			});
		},

		/**
		 * Remove a specific item from the cart by array index or product ID.
		 * @param target Index (number) or Product ID (string/number)
		 */
		removeItem: (target: number | string) => {
			update((items) => {
				if (typeof target === 'number') {
					items.splice(target, 1);
				} else {
					return items.filter((i) => {
						const prodId = i.product?.id || i.product?._id || i.product;
						return prodId !== target;
					});
				}
				return [...items];
			});
		},

		/**
		 * Clear all items from the cart.
		 */
		clear: () => set([])
	};
}

export const cart = createCartStore();

export const cartCount = derived(cart, ($cart) =>
	$cart.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartSubtotal = derived(cart, ($cart) =>
	$cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const cartOpen = writable<boolean>(false);

export function formatNaira(amount: number): string {
	return '₦' + amount?.toLocaleString('en-NG');
}

/**
 * @typedef {Object} AuthState
 * @property {boolean} isLoggedIn
 * @property {User | null} user
 */

const STORAGE_KEY = 'ecommerce-user';

/** @type {AuthState} */
const initialAuthState = {
	isLoggedIn: false,
	user: null
};

// 1. Read stored state during client initialization
function getStoredAuth() {
	if (browser) {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const user = JSON.parse(stored);
				if (user && user.token) {
					return { isLoggedIn: true, user };
				}
			}
		} catch (err) {
			console.error('Failed to parse auth state from localStorage:', err);
		}
	}
	return initialAuthState;
}

// 2. Create the writable store
function createAuthStore() {
	const { subscribe, set, update } = writable(getStoredAuth());

	return {
		subscribe,

		/**
		 * Call on successful login
		 * @param {User} user
		 */
		login: (user: any) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
			}
			set({ isLoggedIn: true, user });
		},

		/**
		 * Call on logout
		 */
		logout: () => {
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
			set({ isLoggedIn: false, user: null });
		},

		/**
		 * Re-check localStorage manually if needed
		 */
		refresh: () => {
			set(getStoredAuth());
		}
	};
}

export const auth = createAuthStore();

// export const auth = writable<AuthState>({
// 	isLoggedIn: false,
// 	user: null
// });
