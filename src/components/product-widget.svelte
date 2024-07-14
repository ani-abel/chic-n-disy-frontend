<script>
	import { AxiosError } from 'axios';
	import { displayMessage, getItemFromLocalStorage } from '../utils';
	import { saveProduct } from '../api-requests/request';

	export let /** @type {any} */ product;

	let /** @type {string} */ imageUrl;
	if (product.imagesForThisProduct.length > 0) {
		imageUrl = product.imagesForThisProduct[0].url;
	}
	let /** @type {any} */ user = getItemFromLocalStorage('ecommerce-user', true);

	const saveFavourite = async (/** @type {string} */ productId) => {
		try {
			if (user) {
				await saveProduct(
					{ productId, userId: user.userId },
					{ Authorization: `Bearer ${user.token}` }
				);
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
	};
</script>

<div class="w-full pt-10 h-fit">
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
		{#if user}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<p on:click={() => saveFavourite(product.id)}>Save to favourite</p>
		{/if}
		<div class="w-full p-2">
			<button
				class="w-full flex justify-between items-center bg-[#BFCBC6] border border-[#000] text-sm font-medium p-2"
			>
				<p class="cursor-pointer">Add to Bag</p>
				<p>₦{(product?.unitPrice).toLocaleString('en-US')}</p>
			</button>
		</div>
	</div>
</div>
