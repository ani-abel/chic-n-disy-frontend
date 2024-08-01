<script>
	import { onMount } from 'svelte';
	import { cancelOrder, findOrders, updateOrder } from '../../../../api-requests/request';
	import PaginationFullControl from '../../../../components/pagination-full-control.svelte';
	import {
		displayMessage,
		fillArray,
		formatDate,
		getItemFromLocalStorage,
		NAIRA_SIGN,
		OrderStatus,
		PaymentProvider,
		PaymentStatus
	} from '../../../../utils';

	let selectedPage = 1;
	let /** @type {any} */ user;
	let /** @type {any} */ headers;
	let fullPaginationList = null;
	let /** @type {any[]} */ orders = [];
	let /** @type {any} */ paginationControl = null;
	const formData = {
		orderStatus: null,
		paymentStatus: null,
		paymentProvider: null,
		searchTerm: null,
		pageSize: 10,
		pageNumber: 1
	};

	onMount(() => {
		user = getItemFromLocalStorage('ecommerce-user', true);
		if (user?.token) {
			headers = { Authorization: `Bearer ${user.token}` };
			onLoad();
		}
	});

	const onLoad = () => {
		(async () => {
			const result = await findOrders(
				{
					pageNumber: 1,
					pageSize: 10,
					status: true
				},
				headers
			);
			if (result?.success) {
				paginationControl = result.paginationControl;
				fullPaginationList = fillArray(paginationControl.totalPages);
				orders = result.data;
			}
		})();
	};

	const onCancelOrder = (/** @type {string} */ orderId) => {
		(async () => {
			const result = await cancelOrder(orderId, headers);
			if (result?.success) {
				displayMessage({
					header: 'Success',
					message: result.message,
					type: 'success'
				});
				onLoad();
			}
		})();
	};

	const completeOrder = (/** @type {string} */ orderId) => {
		(async () => {
			const result = await updateOrder({ orderId, orderStatus: OrderStatus.SUCCESSFUL }, headers);
			if (result?.success) {
				displayMessage({
					header: 'Success',
					message: 'Order completed',
					type: 'success'
				});
				onLoad();
			}
		})();
	};

	const applyFilters = (/** @type {any} */ e, /** @type {boolean} */ isSearch = false) => {
		const value = e.target.value;
		if (isSearch) {
			paginationControl = null;
			setTimeout(async () => {
				const result = await findOrders(formData, headers);
				if (result) {
					paginationControl = result.paginationControl;
					fullPaginationList = fillArray(paginationControl.totalPages);
					orders = result.data;
				}
			}, 2000);
		} else {
			paginationControl = null;
			(async () => {
				const result = await findOrders(formData, headers);
				if (result) {
					paginationControl = result.paginationControl;
					fullPaginationList = fillArray(paginationControl.totalPages);
					orders = result.data;
				}
			})();
		}
	};

	const navigate = (/** @type {Event} */ e, /** @type {number} */ page) => {
		e.preventDefault();
		(async () => {
			selectedPage = page;
			formData.pageNumber = page;
			const result = await findOrders(formData, headers);
			if (result) {
				paginationControl = result.paginationControl;
				fullPaginationList = fillArray(paginationControl.totalPages);
				orders = result.data;
			}
		})();
	};
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
	/>
</svelte:head>

<section class="flex-1 pt-50">
	<div class="w-full flex justify-center">
		<section class="w-11/12">
			<div class="w-full flex justify-between my-4">
				<p class="text-2xl">Orders</p>
			</div>
			<!-- Filters start here -->
			<div class="grid grid-cols-12 gap-4">
				<!-- Equivalent to Bootstrap's col-sm-6 -->
				<div class="col-span-12 sm:col-span-3 bg-black-gold p-4">
					<label for="in-stock" class="text-xs uppercase tracking-widest">Payment Status</label>
					<select
						bind:value={formData.paymentStatus}
						on:change={applyFilters}
						name="in-stock"
						class="border border-black w-full p-1.5 mt-1"
					>
						<option value={null}>Filter by Payment Status</option>
						{#each Object.values(PaymentStatus) as paymentStatus}
							<option value={paymentStatus}>{paymentStatus}</option>
						{/each}
					</select>
				</div>
				<div class="col-span-12 sm:col-span-3 bg-black-gold p-4">
					<label for="in-stock" class="text-xs uppercase tracking-widest">Order Status</label>
					<select
						bind:value={formData.orderStatus}
						on:change={applyFilters}
						name="in-stock"
						class="border border-black w-full p-1.5 mt-1"
					>
						<option value={null}>Filter by Order Status</option>
						{#each Object.values(OrderStatus) as orderStatus}
							<option value={orderStatus}>{orderStatus}</option>
						{/each}
					</select>
				</div>
				<div class="col-span-12 sm:col-span-3 bg-black-gold p-4">
					<label for="in-stock" class="text-xs uppercase tracking-widest">Payment Provider</label>
					<select
						bind:value={formData.paymentProvider}
						on:change={applyFilters}
						name="in-stock"
						class="border border-black w-full p-1.5 mt-1"
					>
						<option value={null}>Filter by Payment Provider</option>
						{#each Object.values(PaymentProvider) as paymentProvider}
							<option value={paymentProvider}>{paymentProvider}</option>
						{/each}
					</select>
				</div>
				<div class="col-span-12 sm:col-span-3 bg-black-gold p-4">
					<label for="search-field" class="text-xs uppercase tracking-widest">Search</label>
					<input
						bind:value={formData.searchTerm}
						on:input={(e) => applyFilters(e, true)}
						type="search"
						name="search-field"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>
			</div>
			<!-- Filters end here -->
			<div class="table-wrap">
				<table>
					<thead>
						<tr id="thead">
							<th>#</th>
							<th>Order Number</th>
							<th>Product count</th>
							<th>Amount</th>
							<th>Payment Reference</th>
							<th>Date</th>
							<th>Owner</th>
							<th>Shipping Address</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{#each orders as order, index}
							<tr id="tr">
								<td>{index + 1}</td>
								<td>{order.orderNumber}</td>
								<td>{order.productsInThisOrder?.length ?? 0}</td>
								<td><b>{NAIRA_SIGN}{Number(order.amount).toLocaleString('en-US')}</b></td>
								<td>{order.paymentReference}</td>
								<td><b>{formatDate(order.dateCreated, 'DATE')}</b></td>
								<td
									>{order.user?.firstName}
									{order.user?.lastName} <b class="text-lowercase">({order.user.email})</b></td
								>
								<td>
									<p>{order.userShippingAddress.address}</p>
									<p><b>LGA:</b>{order.userShippingAddress.lga}</p>
									<p><b>State:</b>{order.userShippingAddress.state}</p>
								</td>
								<td>
									{#if order.orderStatus === OrderStatus.PENDING}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<span on:click={() => completeOrder(order.id)} class="cursor-pointer">
											<i class="text-gray far fa-check-circle"></i>
										</span>

										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<span on:click={() => onCancelOrder(order.id)} class="cursor-pointer">
											<i class="bg-red fa fa-times-circle"></i>
										</span>
									{/if}
									{#if order.orderStatus === OrderStatus.SUCCESSFUL}
										<i class="text-green cursor-deactivated far fa-check-circle"></i>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="container mx-auto">
				{#if paginationControl}
					<PaginationFullControl {paginationControl} {selectedPage} {navigate} />
				{/if}
			</div>
		</section>
	</div>
</section>

<style>
	i {
		font-size: 18px;
	}
</style>
