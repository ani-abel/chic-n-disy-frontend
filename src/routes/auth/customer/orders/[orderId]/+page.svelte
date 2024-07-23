<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getItemFromLocalStorage } from '../../../../../utils';
	import { findOrderById } from '../../../../../api-requests/request';

	let /** @type {any} */ order;

	onMount(async () => {
		const user = getItemFromLocalStorage('ecommerce-user', true);
		if (user) {
			const result = await findOrderById(user, $page.params.orderId);
			order = result.data;
		}
	});
</script>

<section class="w-full lg:w-4/5">
	<div class="w-full grid md:grid-cols-2 gap-2">
		{#if order?.productsInThisOrder?.length > 0}
			{#each order?.productsInThisOrder as orderProduct}
				<!-- Widget starts here -->
				<div class="w-full border border-gray-[#666666] mb-2">
					<div class="w-full flex-col">
						<div class="w-full lg:w-11/12">
							<div class="w-full p-4 flex flex-col lg:flex-row gap-8">
								<div class="rounded-lg bg-slate-100 w-full lg:w-44 h-36 lg:h-28">
									<img
										src={orderProduct.product.imagesForThisProduct[0].url}
										alt={orderProduct.product.name}
										class="w-full h-full object-cover rounded-lg"
									/>
								</div>
								<div class="w-full md:w-3/5">
									<p class="font-medium inline">{orderProduct.product.name}</p>
									<p class="font-semibold text-xs pt-2">Quantity: {orderProduct.quantity}</p>
									<p class="text-xs py-1 text-slate-500">
										Order&nbsp;No&nbsp;:&nbsp;{order.orderNumber}
									</p>
									<div
										class="cursor-pointer w-fit rounded bg-[#BFCBC6] border border-[#000] py-1 px-2 text-black text-[10px] my-1"
									>
										Add to bag
									</div>
								</div>
								{#if !orderProduct.product.outOfStock}
									<a href="/product-detail/{orderProduct.product.id}">
										<p class="text-[11px] underline font-medium tracking-wider uppercase">View</p>
									</a>
								{:else}
									<p
										class="text-red-500 cursor-deactivated text-[11px] underline font-medium tracking-wider uppercase"
									>
										Out of stock
									</p>
								{/if}
							</div>
						</div>
					</div>
				</div>
				<!-- Widget ends here -->
			{/each}
		{:else}
			<p class="text-[#520000] text-sm font-medium pb-4">No products in this order</p>
		{/if}
	</div>
</section>
