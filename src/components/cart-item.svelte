<script>
	import { addItemToCart, removeItemFromCart } from '../stores/app.store';
	import { displayMessage, NAIRA_SIGN } from '../utils';

	export let /** @type {any} */ product;
	let productQuantity = product.quantity ?? 1;

	const decrementQuantity = (/** @type {any} */ product) => {
		productQuantity = productQuantity > 1 ? (productQuantity -= 1) : 1;
		addItemToCart(product, productQuantity);
	};

	const incrementQuantity = (/** @type {any} */ product) => {
		productQuantity += 1;
		addItemToCart(product, productQuantity);
	};

	const removeProductFromCart = (/** @type {string} */ productId) => {
		removeItemFromCart(productId);
		const message = 'Product removed from bag';
		displayMessage({
			message,
			header: message,
			type: 'danger'
		});
	};
</script>

<div class="w-full border-b border-[#000] py-4 grid grid-cols-4 items-center gap-4">
	<div class="col-span-3 flex flex-row items-center">
		<img
			src={product.product.imagesForThisProduct[0]?.url}
			alt={product.product.name}
			class="w-24 h-24"
		/>
		<div class="w-fit px-3 py-2">
            <a href="/product-detail/{product.product.slug}">
                <p class="text-sm text-black pb-6">{product.product.name}</p>
            </a>

			<div class="flex flex-row items-center gap-1">
				<div
					class="border border-[#CFD8DF] flex flex-row items-center gap-4 text-black py-0.5 px-2"
				>
					<button
						disabled={productQuantity <= 1}
						on:click={() => decrementQuantity(product.product)}
						type="button"
						class="text-base font-semibold">-</button
					>
					<p class="text-sm">{productQuantity}</p>
					<button
						disabled={productQuantity >= product.product.quantity}
						on:click={() => incrementQuantity(product.product)}
						type="button"
						class="text-base font-semibold">+</button
					>
				</div>
				<button
					type="button"
					on:click={() => removeProductFromCart(product.product.id)}
					class="border border-[#CFD8DF] text-black p-1.5"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-trash"
						viewBox="0 0 16 16"
					>
						<path
							d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
						/>
						<path
							d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
	<p class="text-sm text-black pt-8">
		{NAIRA_SIGN}{Number(product.price).toLocaleString('en-US')}
	</p>
</div>
