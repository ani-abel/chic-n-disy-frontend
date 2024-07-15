<script>
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import { displayMessage, getItemFromLocalStorage } from '../utils';
	import { removeSavedProduct, saveProduct } from '../api-requests/request';

	export let /** @type {any} */ product;
	let /** @type {boolean} */ productIsFav = false;

	let /** @type {string} */ imageUrl;
	if (product.imagesForThisProduct.length > 0) {
		imageUrl = product.imagesForThisProduct[0].url;
	}
	let /** @type {any} */ user;

	onMount(() => {
		user = getItemFromLocalStorage('ecommerce-user', true);
	});

	const handleProductFavourite = (/** @type {string} */ productId) => {
		(async () => {
			try {
				// Add toggling functions here
				if (user) {
					const headers = { Authorization: `Bearer ${user.token}` };
					await saveProduct({ productId, userId: user.userId }, headers);
					// Handle toggling logic later
					// await removeSavedProduct(productId, headers);
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
				throw ex;
			}
		})();
	};
</script>

<div class="w-full pt-10 h-fit relative">
	<img src={imageUrl} alt={product.name} class="w-full h-[15rem]" />
	<div class="text-center bg-[#FAF8F3]">
		<a href="/product-detail/{product.id}">
			<p class="font-medium text-sm">{product?.name}</p>
			<p class="text-xs">
				{String(product?.description).length > 30
					? String(product?.description).substring(0, 35) + '...'
					: product?.description}
			</p>
		</a>
		<div class="flex justify-center my-8 gap-1 text-sm items-center">
			{#each Array(5).fill(0) as _, i}
				{#if product.rating >= i + 1}
					<i class="bi bi-star-fill star"></i>
				{:else if product.rating > i && product.rating < i + 1}
					<i class="bi bi-star-half star"></i>
				{:else}
					<i class="bi bi-star star"></i>
				{/if}
			{/each}
		</div>
		<div class="w-full p-2">
			<button
				class="w-full flex justify-between items-center bg-[#BFCBC6] border border-[#000] text-sm font-medium p-2"
			>
				<p class="cursor-pointer">Add to Bag</p>
				<p>₦{(product?.unitPrice).toLocaleString('en-US')}</p>
			</button>
		</div>
	</div>
	{#if user}
		<button
			on:click={() => handleProductFavourite(product.id)}
			class="absolute top-5 right-2 bg-white p-1 rounded"
		>
			{#if !productIsFav}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-heart"
					viewBox="0 0 16 16"
				>
					<path
						d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
					/>
				</svg>
			{:else}
				<!-- toggle btw favorites and yet to be -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-heart-fill"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
					/>
				</svg>
			{/if}
		</button>
	{/if}
</div>
