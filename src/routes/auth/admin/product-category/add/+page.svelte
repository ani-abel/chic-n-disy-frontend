<script>
	import { createProductCategory } from '../../../../../api-requests/request';
	import { displayMessage, getJwtToken } from '../../../../../utils';

	const formData = {
		name: null
	};

	const onSubmit = (/** @type {Event} */ e) => {
		e.preventDefault();
		const token = getJwtToken();
		(async () => {
			const newCategory = await createProductCategory(formData, {
				Authorization: `Bearer ${token}`
			});
			if (newCategory?.success) {
				const message = newCategory.message ?? 'Product-category created successfully';
				displayMessage({
					message,
					type: 'success',
					header: message
				});
				formData.name = null;
			}
		})();
	};
</script>

<section class="w-11/12 pt-50">
	<section class="grid grid-cols-12 gap-4">
		<div class="col-span-12 sm:col-span-2"></div>
		<div class="col-span-12 sm:col-span-8 p-4">
			<h2 class="text-4xl text-center my-12">Add Category</h2>
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
