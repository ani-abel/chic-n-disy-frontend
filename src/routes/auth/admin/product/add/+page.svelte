<script>
	import { AxiosError } from 'axios';
	import { createProduct, uploadFiles } from '../../../../../api-requests/request';
	import { convertFilesToBase64Strings, displayMessage, getJwtToken } from '../../../../../utils';

	export let data;

	let /*** @type {string[]} */ imagePreviews = [];
	let /** * @type {string | null} */ videoPreview = null;

	const formData = {
		name: null,
		code: null,
		description: null,
		quantity: 0,
		unitPrice: 0,
		productCategoryId: null,
		productVideo: null,
		images: []
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
					const newProduct = await createProduct(formData, { Authorization: `Bearer ${token}` });
					if (newProduct?.success) {
						const message = newProduct.message ?? 'Product created successfully';
						displayMessage({
							message,
							type: 'success',
							header: message
						});
						resetForm();
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

	const resetForm = () => {
		formData.images = [];
		formData.name = null;
		formData.code = null;
		formData.description = null;
		formData.quantity = 0;
		formData.unitPrice = 0;
		formData.productCategoryId = null;
		formData.productVideo = null;
		imagePreviews = [];
		videoPreview = null;
	};

	const uploadImages = (/** @type {any} */ e) => {
		const /** @type {FileList} */ files = e.target.files;
		(async () => {
			imagePreviews = await convertFilesToBase64Strings(e);
			const uploadedFiles = await uploadFiles(files);
			formData.images = uploadedFiles.data;
		})();
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
				const [firstUrl] = await convertFilesToBase64Strings(e);
				videoPreview = firstUrl;
				const uploadedFiles = await uploadFiles(files);
				formData.productVideo = uploadedFiles.data[0];
			})();
		}
	};
</script>

<section class="w-11/12 pt-50">
	<section class="grid grid-cols-12 gap-4">
		<div class="col-span-12 sm:col-span-2"></div>
		<div class="col-span-12 sm:col-span-8 p-4">
			<h2 class="text-4xl text-center my-12">Add Product</h2>
			<form on:submit={onSubmit}>
				<div class="my-6">
					<label for="name" class="text-xs uppercase tracking-widest">Name</label>
					<input
						required
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
						{#each data.categories.data as category}
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
							on:change={uploadImages}
							accept="image/*"
							name="images"
							multiple
							type="file"
							class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
						/>
					</label>

					{#if imagePreviews.length > 0}
						<div class="container mx-auto">
							<!-- Photo Gallery -->
							<div class="my-6 text-center">
								<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{#each imagePreviews as imagePreview, index}
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
						{#if videoPreview}
							<div class="container mx-auto">
								<!-- Photo Gallery -->
								<div class="my-6 text-center">
									<div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
										<div class="product-video-preview bg-white p-4 shadow rounded-lg">
											<video controls src={videoPreview} class="w-full h-full rounded-md">
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
				</div>
			</form>
		</div>
	</section>
</section>
