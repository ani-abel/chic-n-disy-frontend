<script>
	import { AxiosError } from 'axios';
	import { displayMessage, getJwtToken } from '../../../../../utils/index';
	import { updateUser } from '../../../../../api-requests/request';

	export let data;
	const formData = {
		email: data.data.email,
		phoneNumber: data.data.phoneNumber
	};

	const onSubmit = async (/*** @type {Event} */ e) => {
		e.preventDefault();
		try {
            const token = getJwtToken();
			(async () => {
				const result = await updateUser(
					{ userId: data.data.id, ...formData },
					{
						Authorization: `Bearer ${token}`
					}
				);
				if (result?.success) {
					const message = result.message ?? 'User updated successfully';
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
	};
</script>

<section class="w-11/12 pt-50">
	<section class="grid grid-cols-12 gap-4">
		<div class="col-span-12 sm:col-span-2"></div>
		<div class="col-span-12 sm:col-span-8 p-4">
			<h2 class="text-4xl text-center my-12">Edit User</h2>
			<form on:submit={onSubmit}>
				<div class="my-6">
					<label for="email" class="text-xs uppercase tracking-widest">Email</label>
					<input
						bind:value={formData.email}
						type="email"
						name="email"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>

				<div class="my-6">
					<label for="email" class="text-xs uppercase tracking-widest">Phone-Number</label>
					<input
						bind:value={formData.phoneNumber}
						type="tel"
						name="phoneNumber"
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
