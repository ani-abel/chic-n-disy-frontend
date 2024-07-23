<script>
	import { onMount } from 'svelte';
	import { getJwtToken } from '../../../../utils';
	import { findRecentlyViewedProducts } from '../../../../api-requests/request';

	let /** @type {any[]} */ recentlyViewedProducts = [];

	onMount(async () => {
		const token = getJwtToken();
		const headers = { Authorization: `Bearer ${token}` };
		const response = await findRecentlyViewedProducts({}, headers);
		recentlyViewedProducts = response.data;
	});
</script>

<section class="w-full lg:w-4/5">
	<div class="w-full grid md:grid-cols-2 gap-2">
		{#if recentlyViewedProducts.length > 0}
			{#each recentlyViewedProducts as product}
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
									<div
										class="cursor-pointer w-fit rounded bg-[#BFCBC6] border border-[#000] py-1 px-2 text-black text-[10px] my-1"
									>
										Add to bag
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
			<p class="text-[#520000] text-sm font-medium pb-4">No recently view products</p>
		{/if}
	</div>
</section>
