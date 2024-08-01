<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { AxiosError } from 'axios';
	import { goto } from '$app/navigation';
	import { slide, fly, fade } from 'svelte/transition';
	import { cart, loggedInUser } from '../stores/app.store';
	import CartItem from './cart-item.svelte';
	import {
		initiatePaystackPayment,
		orderCheckout,
		validateOrderBeforePayment
	} from '../api-requests/request';
	import {
		AppRole,
		deleteFromLocalStorage,
		displayMessage,
		getItemFromLocalStorage,
		NAIRA_SIGN
	} from '../utils';

	let /*** @type {boolean} */ hide = true;
	let /*** @type {boolean} */ hideCart = true;
	let /*** @type {boolean} */ hideUserDropdown = true;
	let /*** @type {any} */ user;

	onMount(() => {
		user = getItemFromLocalStorage('ecommerce-user', true);
	});

	const logout = () => {
		deleteFromLocalStorage('ecommerce-user');
		loggedInUser.set(null);
		goto('/auth');
	};

	const onCheckout = (/*** @type {Event} */ e) => {
		e.preventDefault();
		if (user) {
			if (user.role === AppRole.ADMIN) {
				const message = 'Logged-in as admin. Cannot checkout';
				displayMessage({
					message,
					type: 'danger',
					header: message
				});
				return;
			}
			const cartSnapshot = get(cart);
			const headers = { Authorization: `Bearer ${user.token}` };
			const payload = {
				amount: cartSnapshot.totalPrice,
				products: cartSnapshot.items.map(
					(/** @type {{ quantity: any; product: { id: any; }; }} */ item) => ({
						quantity: item.quantity,
						productId: item.product.id
					})
				)
			};
			(async () => {
				try {
					const orderValidationResult = await validateOrderBeforePayment(
						{ products: payload.products },
						headers
					);
					if (orderValidationResult?.length > 0) {
						const result = await orderCheckout(payload, headers);
						if (result?.success) {
							const origin = window.location.origin;
							const successUrl = `${origin}/payment-verification?orderId=${result.data.id}`;
							const paymentResult = await initiatePaystackPayment(
								{
									successUrl,
									amount: payload.amount,
									orderId: result.data.id,
									reference: result.data.paymentReference
								},
								headers
							);
							if (paymentResult?.success) {
								window.location.href = paymentResult.url;
							}
						}
					}
				} catch (ex) {
					if (ex instanceof AxiosError) {
						const axiosErrorObject = ex.response?.data;
						displayMessage({
							message: axiosErrorObject?.message,
							header: 'Error',
							type: 'danger'
						});
					}
				}
			})();
		} else {
			displayMessage({
				type: 'danger',
				header: 'Error',
				message: 'Please login to checkout'
			});
			goto('/auth?redirect=/');
		}
	};
</script>

<nav>
	<div class="bg-[#CFD8DF] text-center p-4 hidden lg:block">
		<p class="font-semibold text-sm playfair tracking-widest uppercase text-black">
			Free Ground Shipping ₦4,000 Purchase
		</p>
	</div>
	<div class="w-full border-b py-4 md:p-8 border-[#f4f4f4] flex justify-between items-center gap-8">
		<a href="/search">
			<button class="hidden lg:inline-block">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="currentColor"
					class="bi bi-search"
					viewBox="0 0 16 16"
				>
					<path
						d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
					/>
				</svg>
			</button>
		</a>

		<button on:click={() => (hide = !hide)} class="inline-block lg:hidden" id="myBtn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				fill="currentColor"
				class="bi bi-list"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
				/>
			</svg>
		</button>

		<div class="text-center pl-4 sm:pl-8 lg:pl-0">
			<a href="/" class="hidden lg:block">
				<div
					class="text-xs sm:text-base h-24 lg:text-lg uppercase text-[#47484A] font-semibold tracking-widest w-full"
				>
					<img
						src="https://ik.imagekit.io/37hskgspznp/disy_YF3j0SS20.jpg?updatedAt=1719914779230&tr=w-100,h-80"
						alt="Chick 'N' Disy Logo"
						class="w-full h-full object-contain"
					/>
				</div>
			</a>
			<a href="/" class="block lg:hidden">
				<div
					class="text-xs sm:text-base h-10 lg:h-24 lg:text-lg uppercase text-[#47484A] font-semibold tracking-widest w-full"
				>
					<img
						src="https://ik.imagekit.io/37hskgspznp/disy_YF3j0SS20.jpg?updatedAt=1719914779230&tr=w-250,h-100"
						alt="Chick 'N' Disy Logo"
						class="w-full h-full object-contain"
					/>
				</div>
			</a>
			<div class="text-sm hidden lg:flex flex-row items-center gap-8 pt-4">
				<a href="/">
					<p>Home</p>
				</a>
				<a href="/about">
					<p>About Us</p>
				</a>
				<a href="contact-us">
					<p>Contact Us</p>
				</a>
			</div>
		</div>
		{#if !hide}
			<!-- responsive nav here -->
			<nav
				id="nav"
				class="display-block nav text-sm pr-4"
				in:slide={{ duration: 600, delay: 300 }}
				out:slide={{ duration: 600, delay: 300 }}
			>
				<div class="w-full flex justify-end py-2">
					<svg
						on:click={() => (hide = true)}
						on:keydown={() => (hide = true)}
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						class="bi bi-x-lg close"
						viewBox="0 0 16 16"
					>
						<path
							d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
						/>
					</svg>
				</div>

				<a href="/">
					<div class="pb-4 border-b pl-8 py-4">
						<p>Home</p>
					</div>
				</a>
				<a href="/about">
					<div class="pb-4 border-b pl-8 py-4">
						<p>About Us</p>
					</div>
				</a>
				<a href="/contact-us">
					<div class="pb-4 border-b pl-8 py-4">
						<p>Contact Us</p>
					</div>
				</a>
			</nav>
		{/if}

		<div class="flex gap-4 md:gap-8 items-center">
			<!-- icons -->

			{#if !user || user.role === AppRole.ADMIN}
				<a href="/auth">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						class="bi bi-person"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
						/>
					</svg>
				</a>
			{:else}
				<div class="relative">
					<button
						on:click={() => (hideUserDropdown = !hideUserDropdown)}
						class="flex items-center gap-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="currentColor"
							class="bi bi-person"
							viewBox="0 0 16 16"
						>
							<path
								d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
							/>
						</svg>
						<p class="text-sm hidden md:inline">Hi&nbsp;<b>{user.firstName}</b></p>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							fill="currentColor"
							class="bi bi-chevron-down"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
							/>
						</svg>
					</button>

					{#if !hideUserDropdown}
						<ul
							in:fade={{ duration: 400 }}
							out:fade={{ duration: 400 }}
							class="absolute z-50 text-gray-700 pt-1 w-40 top-7 bg-white rounded shadow-lg"
						>
							<li>
								<a
									class="rounded-t hover:bg-slate-100 py-2 px-4 block whitespace-no-wrap text-sm"
									href="/auth/customer/orders">Orders</a
								>
							</li>
							<li>
								<a
									class="rounded-t hover:bg-slate-100 py-2 px-4 block whitespace-no-wrap text-sm"
									href="/auth/customer/saved-products">Saved Products</a
								>
							</li>
							<li>
								<a
									class="rounded-t hover:bg-slate-100 py-2 px-4 block whitespace-no-wrap text-sm"
									href="/auth/customer/recently-viewed">Recently Viewed</a
								>
							</li>
							<li>
								<a
									class="rounded-t hover:bg-slate-100 py-2 px-4 block whitespace-no-wrap text-sm"
									href="/auth/customer/shipping-address">Shipping Address</a
								>
							</li>
							<li>
								<a
									class="rounded-t hover:bg-slate-100 py-2 px-4 block whitespace-no-wrap text-sm"
									href="/auth/customer/update-profile">Profile</a
								>
							</li>
							<li>
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									on:click={logout}
									class="hover:bg-slate-100 py-2 px-4 block whitespace-no-wrap text-sm cursor-pointer"
									><i class="bi bi-box-arrow-right"></i> Logout</a
								>
							</li>
						</ul>
					{/if}
				</div>
			{/if}

			<a href="/search">
				<button class="inline-block lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						class="bi bi-search"
						viewBox="0 0 16 16"
					>
						<path
							d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
						/>
					</svg>
				</button>
			</a>
			<button on:click={() => (hideCart = !hideCart)} class="relative w-12 h-12 cursor-pointer">
				<div class="bg-black text-white text-[9px] rounded-full absolute py-1 px-2 right-4 top-0">
					<span>{$cart.items.length}</span>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="currentColor"
					class="bi bi-bag"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
					/>
				</svg>
			</button>
		</div>
	</div>
	<!-- Alert section -->
	<div class="bg-[#CFD8DF] text-center p-6 block lg:hidden">
		<p class="font-semibold text-[10px] tracking-widest playfair uppercase text-black">
			Free Ground Shipping ₦4,000 Purchase
		</p>
	</div>
</nav>

{#if !hideCart}
	<!-- Cart-Sidebar -->
	<div
		class="fixed w-full h-screen z-50 transform"
		style="background-color: rgba(0,0,0,0.75);"
		id="sidebar"
		in:fade={{ duration: 400 }}
		out:fade={{ duration: 400 }}
	>
		<div
			in:fly={{ duration: 600, x: 300 }}
			out:fly={{ duration: 600, x: 300 }}
			class="absolute right-0 bg-white
   text-white w-11/12 sm:w-4/5 md:w-3/5
   lg:w-[40%] xl:w-[35%] min-h-screen overflow-y-auto"
		>
			<!-- Your Sidebar Content -->
			<div class="p-4 text-black border-b border-[#cfd8df]">
				<div class="w-full flex justify-between items-center p-4">
					<h1 class="text-3xl font-medium playfair">My Bag</h1>

					<span class="cursor-pointer" on:click={() => (hideCart = true)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-x-lg"
							viewBox="0 0 16 16"
							id="close"
						>
							<path
								d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
							/>
						</svg></span
					>
				</div>
				<div class="bg-[#CFD8DF] text-center p-3 hidden lg:block">
					<p class="text-xs tracking-widest normal-case text-black">
						Your Order Qualifies for Free Shipping
					</p>
				</div>
			</div>
			<section class="flex justify-center">
				<div class="w-11/12 h-[40rem] overflow-y-auto">
					{#each $cart.items as item}
						<CartItem product={item} />
					{/each}
				</div>
			</section>
			<div class="w-full border-t border-[#cfd8df] p-4 mt-4 absolute bottom-0 text-black">
				<div class="flex justify-between items-center py-4">
					<p class="text-xs uppercase tracking-widest">TOTAL</p>
					<p class="text-xs text-black">
						{NAIRA_SIGN}{Number($cart.totalPrice).toLocaleString('en-US')}
					</p>
				</div>
				<button
					on:click={onCheckout}
					type="button"
					disabled={$cart.items.length <= 0}
					class="w-full bg-black p-3 text-white text-xs font-medium uppercase"
				>
					Check Out
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	#sidebar {
		top: 0;
		left: 0;
	}
</style>
