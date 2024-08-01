<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { resetCart } from '../../stores/app.store';
	import { cancelOrder, updateOrder, verifyPayment } from '../../api-requests/request';
	import {
		PaymentStatus,
		displayMessage,
		NotificationMetaType,
		getItemFromLocalStorage
	} from '../../utils';

	let /** @type {string |  null} */ orderId;
	let /** @type {string |  null} */ reference;

	onMount(() => {
		const pageData = $page;
		const queryParams = pageData.url.searchParams;
		orderId = queryParams.get('orderId');
		reference = queryParams.get('reference');
		const user = getItemFromLocalStorage('ecommerce-user', true);
		if (user?.token) {
			setTimeout(async () => {
				if (reference && orderId) {
					const result = await verifyPayment(reference);
					let /*** @type {NotificationMetaType} */ notify;
					const headers = { Authorization: `Bearer ${user.token}` };
					if (result.success) {
						await updateOrder({ orderId, paymentStatus: PaymentStatus.PAID }, headers);
						notify = {
							header: result.message,
							message: result.message,
							type: 'success'
						};
						resetCart();
					} else {
						// Do I need to update the call again?
						await updateOrder({ orderId, paymentStatus: PaymentStatus.FAILED }, headers);
						await cancelOrder(orderId, headers);
						notify = {
							header: result.message,
							message: result.message,
							type: 'danger'
						};
					}
					displayMessage(notify);
					goto('/');
				}
			}, 60000); // 1 minute
		}
	});
</script>

<div class="modal" id="loaderModal">
	<div class="loader"></div>
</div>

<div class="content pt-50">
	<h1>Verifying payment</h1>
	<p>Please do not reload this page while we verify your payment.</p>
</div>

<style>
	h1 {
		font-size: 30px;
	}

	.content {
		padding: 20px;
		text-align: center;
	}

	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		/* top: 0;
		left: 0; */
	}

	.loader {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loader {
		border: 2px solid #f3f3f3;
		border-top: 2px solid #000;
		border-radius: 50%;
		width: 80px;
		height: 80px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.loader div {
		width: 20px;
		height: 20px;
		background-color: #3498db;
		margin: 5px;
		animation: bounce 1.2s infinite ease-in-out;
	}

	.loader div:nth-child(2) {
		animation-delay: -1.1s;
	}

	.loader div:nth-child(3) {
		animation-delay: -1s;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0);
		}

		40% {
			transform: scale(1);
		}
	}
</style>
