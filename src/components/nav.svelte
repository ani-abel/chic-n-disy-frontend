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
	import { page } from '$app/stores';

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

<section class="sticky top-0 z-50">
	<!-- navbar -->
	<nav>
		<div class="bg-black text-center p-4">
			<p class="font-semibold text-sm playfair tracking-widest uppercase text-[#FFD700]">
				Free Ground Shipping ₦4,000 Purchase
			</p>
		</div>
		<section
			class="w-full p-4 flex justify-between items-center gap-8 bg-white border-b border-[#000]"
		>
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

			<div>
				<!-- <a href="/index.html">
					<p class="text-xs sm:text-base lg:text-lg uppercase text-[#47484A] font-semibold tracking-widest">Chik&nbsp;'N'&nbsp;Disy</p>
				</a>    
				<p class="text-[9px] sm:text-[10px] tracking-widest">Lagos</p> -->

				<div class="text-sm hidden lg:flex flex-row items-center gap-8 font-medium">
					<a class:custom-link-active={$page.route.id === '/'} class="custom-link" href="/">
						<p>Home</p>
					</a>
					<a
						class:custom-link-active={$page.route.id === '/about'}
						class="custom-link"
						href="/about"
					>
						<p>About&nbsp;Us</p>
					</a>
					<a
						class:custom-link-active={$page.route.id === '/contact-us'}
						class="custom-link"
						href="/contact-us"
					>
						<p>Contact&nbsp;Us</p>
					</a>
				</div>
			</div>
			{#if !hide}
				<!-- responsive nav here -->
				<div
					in:slide={{ duration: 400 }}
					out:slide={{ duration: 400 }}
					id="nav"
					class="nav text-sm pr-4 display-block"
				>
					<div class="w-full flex justify-end py-2">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span class="cursor-pointer" on:click={() => (hide = true)}>
							<svg
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
						</span>
					</div>
					<a class:sm-custom-link-active={$page.route.id === '/'} href="/">
						<div class="pb-4 border-b pl-8 py-4">
							<p>Home</p>
						</div>
					</a>
					<a
						class:sm-custom-link-active={$page.route.id === '/about'}
						class="custom-link"
						href="/about"
					>
						<div class="pb-4 border-b pl-8 py-4">
							<p>About Us</p>
						</div>
					</a>
					<a
						class:sm-custom-link-active={$page.route.id === '/contact-us'}
						class="custom-link"
						href="/contact-us"
					>
						<div class="pb-4 border-b pl-8 py-4">
							<p>Contact Us</p>
						</div>
					</a>
				</div>
			{/if}
			<!-- chin n disy logo -->
			<section class="mr-0 sm:mr-32">
				<a href="/">
					<p class="font-bold text-xl dancing-script">Chik&nbsp;N&nbsp;Disy</p>
				</a>
			</section>
			<div class="flex gap-4 md:gap-8 items-center">
				<!-- icons -->
				<div class="relative">
					{#if !user || user.role === AppRole.ADMIN}
						<a href="/auth" id="dropdownButton" class="flex items-end gap-1">
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
						<button
							on:click={() => (hideUserDropdown = !hideUserDropdown)}
							id="dropdownButton"
							class="flex items-end gap-1"
						>
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
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
					{/if}
					{#if !hideUserDropdown}
						<div
							in:fade={{ duration: 400 }}
							out:fade={{ duration: 400 }}
							id="dropdownMenu"
							class="absolute mt-2 w-[10rem] text-sm bg-white rounded-md shadow-lg z-50"
						>
							<a href="/auth/customer/orders" class="block p-2.5 text-gray-800 hover:bg-gray-200"
								>Orders
							</a>
							<a
								href="/auth/customer/saved-products"
								class="block p-2.5 text-gray-800 hover:bg-gray-200">Saved Products</a
							>
							<a
								href="/auth/customer/recently-viewed"
								class="block p-2.5 text-gray-800 hover:bg-gray-200">Recently Viewed</a
							>
							<a
								href="/auth/customer/shipping-address"
								class="block p-2.5 text-gray-800 hover:bg-gray-200">Shipping Address</a
							>
							<a
								href="/auth/customer/update-profile"
								class="block p-2.5 text-gray-800 hover:bg-gray-200">Profile</a
							>
							<!-- svelte-ignore a11y-missing-attribute -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<a
								on:click={logout}
								class="block cursor-pointer p-2.5 text-gray-800 hover:bg-gray-200"
							>
								<i class="bi bi-box-arrow-right"></i> Logout</a
							>
						</div>
					{/if}
				</div>

				<a href="/search" class="inline-block">
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
				</a>
				<button on:click={() => (hideCart = !hideCart)}>
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
					<div
						class="bg-black text-white text-[9px] rounded-full absolute py-1 px-2 right-2 top-[3.5rem]"
					>
						<span>{$cart.items.length}</span>
					</div>
				</button>
			</div>
		</section>
	</nav>
</section>

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

					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
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

	.custom-link:hover,
	.sm-custom-link-active {
		text-decoration: underline;
	}

	.custom-link-active {
		color: #fff;
		border: solid 5px rgb(48, 46, 46) 101;
		background: #000;
		padding: 5px;
	}
</style>
