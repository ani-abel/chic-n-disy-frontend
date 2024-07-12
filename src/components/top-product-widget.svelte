<script>
	export let /** @type {any} */ product;

	let /** @type {string} */ imageUrl;
	if (product.imagesForThisProduct.length > 0) {
		imageUrl = product.imagesForThisProduct[0].url;
	}
</script>

<div class="h-[30rem] relative">
	<img src={imageUrl} alt={product.name} class="w-full h-full object-cover" />
	<div
		class="absolute w-96 sm:w-80 bg-white h-34 p-8 pt-4 flex justify-center items-center left-[50%] bottom-1"
		style="transform: translate(-50%, -50%);"
	>
		<div class="w-full">
			<p class="text-2xl text-center py-2 playfair">{product?.name}</p>
			<div class="w-full flex justify-center pt-2">
				<a
					href="/product-detail/{product.id}"
					class="bg-black text-white font-medium px-6 py-2 text-sm"
				>
					View
				</a>
			</div>
		</div>
	</div>
</div>
