<script>
	import { AxiosError } from 'axios';
	import { createUserSignup } from '../../../../../api-requests/request';
	import { AppRole, displayMessage } from '../../../../../utils';

	const formData = {
		email: null,
		phoneNumber: null
	};

	const onSubmit = (/** @type {Event} */ event) => {
		event.preventDefault();
		try {
			(async () => {
				const newUser = await createUserSignup({
					...formData,
					password: '12345',
					role: AppRole.ADMIN
				});
				if (newUser?.success) {
					const message = newUser.message ?? 'User created successfully';
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
	};

	const resetForm = () => {
		formData.email = null;
		formData.phoneNumber = null;
	};
</script>

<section class="w-11/12 pt-50">
	<section class="grid grid-cols-12 gap-4">
		<div class="col-span-12 sm:col-span-2"></div>
		<div class="col-span-12 sm:col-span-8 p-4">
			<h2 class="text-4xl text-center my-12">Add User</h2>
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
					<label for="phoneNumber" class="text-xs uppercase tracking-widest">Phone-Number</label>
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
