<script>
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import { displayMessage, getJwtToken } from '../../../../utils';
	import { findSavedProducts, removeSavedProduct } from '../../../../api-requests/request';

	let /** @type {any[]} */ products = [];

	const loadData = async () => {
		const token = getJwtToken();
		const result = await findSavedProducts({}, { Authorization: `Bearer ${token}` });
		products = result.data;
	};

	const deleteSavedProduct = (/** @type {string} */ productId) => {
		const token = getJwtToken();
		(async () => {
			try {
				const result = await removeSavedProduct(productId, { Authorization: `Bearer ${token}` });
				if (result.success) {
					const message = result.message ?? 'Deleted successfully';
					displayMessage({
						message,
						header: message,
						type: 'success'
					});
					await loadData();
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

	onMount(async () => {
		await loadData();
	});
</script>

{#if products.length > 0}
	{#each products as product}
		<div class="w-full border border-gray-[#666666] mb-2">
			<div class="w-full flex-col">
				<div class="w-full lg:w-11/12">
					<div class="w-full p-4 flex flex-col lg:flex-row gap-8">
						<div class="rounded-lg bg-slate-100 w-full lg:w-44 h-36 lg:h-28">
							<img
								src={product.imagesForThisProduct[0].url}
								alt={product.name}
								class="w-full h-full object-cover rounded-lg"
							/>
						</div>
						<div class="w-full md:w-3/5">
							<p class="font-medium inline">{product.name}</p>
							{#if !product.outOfStock}
								<p class="text-green text-xs py-1 text-slate-500">Status:&nbsp;In Stock</p>
							{:else}
								<p class="text-red text-xs py-1 text-slate-500">Status:&nbsp;Out of Stock</p>
							{/if}
							<p class="font-semibold text-xs pt-2">Saved On: 03-04</p>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								on:click={() => deleteSavedProduct(product.id)}
								class="cursor-pointer w-fit rounded bg-red-700 py-1 px-2 text-white text-[10px] my-1"
							>
								Remove
							</div>
						</div>
						{#if !product.outOfStock}
							<a href="/product-detail/{product.id}">
								<p class="text-[11px] underline font-medium tracking-wider uppercase">View</p>
							</a>
						{:else}
							<p
								class="cursor-deactivated text-[11px] underline font-medium tracking-wider uppercase"
							>
								View
							</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
{:else}
	<p class="text-[#520000] text-sm font-medium pb-4">No saved products</p>
{/if}
