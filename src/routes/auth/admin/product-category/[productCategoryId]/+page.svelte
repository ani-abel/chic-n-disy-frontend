<script>
	import { AxiosError } from 'axios';
	import { updateProductCategory } from '../../../../../api-requests/request';
	import { displayMessage, getJwtToken } from '../../../../../utils';

	export let data;

	const formData = {
		name: data.data.name
	};

	const onSubmit = (/** @type {Event} */ e) => {
		e.preventDefault();
		const token = getJwtToken();
		(async () => {
			try {
				const updatedProductCategory = await updateProductCategory(
					{
						productCategoryId: data.data.id,
						...formData
					},
					{
						Authorization: `Bearer ${token}`
					}
				);
				if (updatedProductCategory?.success) {
					const message = updatedProductCategory.message ?? 'Product-category created successfully';
					displayMessage({
						message,
						type: 'success',
						header: message
					});
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
</script>

<section class="w-11/12 pt-50">
	<section class="grid grid-cols-12 gap-4">
		<div class="col-span-12 sm:col-span-2"></div>
		<div class="col-span-12 sm:col-span-8 p-4">
			<h2 class="text-4xl text-center my-12">Edit Category</h2>
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
