<script>
	import { AxiosError } from 'axios';
	import { displayMessage, getJwtToken } from '../../../../../utils';
	import { updateProduct, uploadFiles } from '../../../../../api-requests/request';

	export let data;

	const { product, categories } = data;

	const images = (product.data.imagesForThisProduct ?? []).map(
		(/*** @type {any} */ image) => image.url
	);

	const formData = {
		images,
		code: product.data.code,
		name: product.data.name,
		quantity: product.data.quantity,
		unitPrice: product.data.unitPrice,
		description: product.data.description,
		productVideo: product.data.productVideo,
		productCategoryId: product.data.productCategoryId
	};

	const onSubmit = (/** @type {Event} */ e) => {
		e.preventDefault();
		if (formData?.images?.length <= 0) {
			displayMessage({
				header: 'Error',
				type: 'danger',
				message: 'Images must be selected'
			});
		} else {
			const token = getJwtToken();
			try {
				(async () => {
					const updatedProduct = await updateProduct(
						{
							productId: product.data.id,
							...formData
						},
						{ Authorization: `Bearer ${token}` }
					);
					if (updatedProduct?.success) {
						const message = updatedProduct.message ?? 'Product created successfully';
						displayMessage({
							message,
							type: 'success',
							header: message
						});
					}
				})();
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
		}
	};

	const uploadVideo = (/** @type {any} */ e) => {
		const /** @type {FileList} */ files = e.target.files;
		if (files[0].size >= 5 * 1024 * 1024) {
			// 5MB in bytes
			displayMessage({
				header: 'Error',
				type: 'danger',
				message: 'Video size should be less than 5MB'
			});
		} else {
			(async () => {
				const uploadedFiles = await uploadFiles(files);
				formData.productVideo = uploadedFiles.data[0];
			})();
		}
	};

	const uploadImages = (/*** @type {any} */ e) => {
		const /** @type {FileList} */ files = e.target.files;
		(async () => {
			const uploadedFiles = await uploadFiles(files);
			formData.images = uploadedFiles.data;
		})();
	};
</script>

<section class="w-11/12 pt-50">
	<section class="grid grid-cols-12 gap-4">
		<div class="col-span-12 sm:col-span-2"></div>
		<div class="col-span-12 sm:col-span-8 p-4">
			<h2 class="text-4xl text-center my-12">Edit Product</h2>
			<form on:submit={onSubmit}>
				<div class="my-6">
					<label for="name" class="text-xs uppercase tracking-widest">Name</label>
					<input
						bind:value={formData.name}
						type="text"
						name="name"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>
				<div class="my-6">
					<label for="description" class="text-xs uppercase tracking-widest">Description</label>
					<textarea
						required
						rows="8"
						class="resize-none border border-black w-full p-1.5 mt-1"
						bind:value={formData.description}
						name="description"
					></textarea>
				</div>
				<div class="my-6">
					<label for="code" class="text-xs uppercase tracking-widest">Code</label>
					<input
						bind:value={formData.code}
						type="text"
						name="code"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>
				<div class="my-6">
					<label for="quantity" class="text-xs uppercase tracking-widest">Quantity</label>
					<input
						required
						type="number"
						min="1"
						bind:value={formData.quantity}
						name="quantity"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>
				<div class="my-6">
					<label for="unitPrice" class="text-xs uppercase tracking-widest">Price per unit</label>
					<input
						required
						type="number"
						min="1"
						bind:value={formData.unitPrice}
						name="unitPrice"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>
				<div class="my-6">
					<label for="category" class="text-xs uppercase tracking-widest">Product Category</label>
					<select
						name="category"
						required
						bind:value={formData.productCategoryId}
						class="border border-black w-full p-1.5 mt-1"
					>
						{#each categories.data as category}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</div>

				<div class="border-top-solid mt-10 my-6 pt-10">
					<!-- Custom File Upload Button -->
					<label
						for="images"
						class="relative cursor-pointer bg-black text-white font-medium py-2 px-4 rounded-md shadow hover:bg-black focus:ring focus:ring-blue-300 focus:outline-none"
					>
						<span>Upload Photo(s)</span>
						<input
							accept="image/*"
							on:change={uploadImages}
							name="images"
							multiple
							type="file"
							class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
						/>
					</label>

					{#if formData.images.length > 0}
						<div class="container mx-auto">
							<!-- Photo Gallery -->
							<div class="my-6 text-center">
								<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{#each formData.images as imagePreview, index}
										<div class="bg-white p-4 shadow rounded-lg">
											<img
												src={imagePreview}
												alt={`image-${index}`}
												class="w-full h-auto rounded-md"
											/>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>

				<div class="border-top-solid mt-10 my-6 pt-10">
					<!-- Custom File Upload Button -->
					<label
						class="relative cursor-pointer bg-black text-white font-medium py-2 px-4 rounded-md shadow hover:bg-black focus:ring focus:ring-blue-300 focus:outline-none"
					>
						<span>Upload Video</span>
						<input
							accept="video/*"
							on:change={uploadVideo}
							type="file"
							class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
						/>
					</label>
					{#if formData.productVideo}
						<div class="container mx-auto">
							<!-- Photo Gallery -->
							<div class="my-6 text-center">
								<div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
									<div class="product-video-preview bg-white p-4 shadow rounded-lg">
										<video controls src={formData.productVideo} class="w-full h-full rounded-md">
											<track kind="captions" />
										</video>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<div class="my-6 text-center">
					<input
						type="submit"
						value="Submit"
						class="bg-black-gold uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"
					/>
				</div>
			</form>
		</div>
	</section>
</section>
