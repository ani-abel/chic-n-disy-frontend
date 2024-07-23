<script>
	import { onMount } from 'svelte';
	import { findUserOrderHistory } from '../../../../api-requests/request';
	import { formatDate, getItemFromLocalStorage } from '../../../../utils';

	let /** @type {any[]} */ orders = [];

	onMount(async () => {
		const user = getItemFromLocalStorage('ecommerce-user', true);
		if (user) {
			const result = await findUserOrderHistory({}, { Authorization: `Bearer ${user.token}` });
			orders = result.data;
		}
	});
</script>

<section class="w-full lg:w-4/5">
	<div class="w-full grid md:grid-cols-2 gap-2">
		{#if orders.length > 0}
			{#each orders as order}
				<div class="w-full border border-gray-[#666666] mb-2">
					<div class="w-full flex-col">
						<div class="w-full lg:w-11/12">
							<div class="w-full p-4 flex flex-col lg:flex-row gap-8">
								<div class="rounded-lg bg-slate-100 w-full lg:w-56 h-36 xl:w-44 lg:h-28">
									<img
										src={order.image}
										alt={order.orderNumber}
										class="w-full h-full object-cover rounded-lg"
									/>
								</div>
								<div class="w-full md:w-3/5">
									<p class="font-medium inline">Order&nbsp;No&nbsp;:&nbsp;{order.orderNumber}</p>
									<p class="text-xs py-1 text-slate-500">
										Amount: ₦{Number(order.amount).toLocaleString('en-US')}
									</p>
									<div
										class:bg-red={order.orderStatus === 'FAILED'}
										class:bg-orange={order.orderStatus === 'PENDING'}
										class:bg-green-700={order.orderStatus === 'SUCCESSFUL'}
										class="text-capitalize w-fit rounded bg-green-700 py-1 px-2 text-white text-[10px] my-1"
									>
										{order.orderStatus}
									</div>
									<p class="font-semibold text-xs pt-2">
										On {formatDate(order.dateCreated, 'DATE')}
									</p>
								</div>
								<a href="/auth/customer/orders/{order.id}">
									<p class="text-[11px] underline font-medium tracking-wider uppercase pl-4">
										View
									</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		{:else}
			<p class="text-[#520000] text-sm font-medium pb-4">No orders yet</p>
		{/if}
	</div>
</section>
