<script>
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import { findUserById, updateUser } from '../../../../api-requests/request';
	import { displayMessage, getItemFromLocalStorage, getJwtToken } from '../../../../utils';

	/** @type {any} */ let userObject;
	/** @type {any} */ const formData = {
		firstName: null,
		lastName: null,
		phoneNumber: null,
		email: null,
		password: null,
		confirmPassword: null
	};

	onMount(async () => {
		userObject = getItemFromLocalStorage('ecommerce-user', true);
		if (userObject) {
			const user = await findUserById(userObject.userId);
			if (user?.data) {
				formData.firstName = user.data.firstName;
				formData.lastName = user.data.lastName;
				formData.email = user.data.email;
				formData.phoneNumber = user.data.phoneNumber;
			}
		}
	});

	const onSubmit = (/** @type {Event} */ e) => {
		e.preventDefault();
		(async () => {
			try {
				if (!formData.password || !formData.confirmPassword) {
					delete formData.password;
					delete formData.confirmPassword;
				}
				const token = getJwtToken();
				const result = await updateUser(
					{ ...formData, userId: userObject.userId },
					{ Authorization: `Bearer ${token}` }
				);
				if (result?.success) {
					const message = result.message ?? 'Profile updated successfully';
					displayMessage({
						message,
						header: message,
						type: 'success'
					});
				}
			} catch (ex) {
				if (ex instanceof AxiosError) {
					const message = ex.response?.data.message ?? 'Something went wrong';
					displayMessage({
						message,
						header: 'Error',
						type: 'danger'
					});
				}
			}
		})();
	};

	const comparePassword = (/** @type {Event} */ e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			const message = 'Passwords do not match';
			displayMessage({
				message,
				header: message,
				type: 'danger'
			});
		}
	};
</script>

<section class="w-full lg:w-4/5">
	<div class="w-full grid md:grid-cols-4 gap-2">
		<form on:submit={onSubmit} class="w-full md:col-span-3">
			<div class="my-6">
				<label for="firstName" class="text-xs uppercase tracking-widest">First Name</label>
				<input
					bind:value={formData.firstName}
					required
					type="text"
					name="firstName"
					class="border border-black w-full p-1.5 mt-1"
				/>
			</div>
			<div class="my-6">
				<label for="lastName" class="text-xs uppercase tracking-widest">Last Name</label>
				<input
					bind:value={formData.lastName}
					type="text"
					name="lastName"
					class="border border-black w-full p-1.5 mt-1"
				/>
			</div>
			<div class="my-6">
				<label for="email" class="text-xs uppercase tracking-widest">Email</label>
				<input
					bind:value={formData.email}
					required
					type="email"
					name="email"
					class="border border-black w-full p-1.5 mt-1"
				/>
			</div>
			<div class="my-6">
				<label for="phoneNumber" class="text-xs uppercase tracking-widest">Phone Number</label>
				<input
					bind:value={formData.phoneNumber}
					required
					type="tel"
					name="phoneNumber"
					class="border border-black w-full p-1.5 mt-1"
				/>
			</div>
			<div class="my-6">
				<label for="password" class="text-xs uppercase tracking-widest">Password</label>
				<input
					bind:value={formData.password}
					type="password"
					name="password"
					class="border border-black w-full p-1.5 mt-1"
				/>
			</div>
			{#if formData.password}
				<div class="my-6">
					<label for="confirmPassword" class="text-xs uppercase tracking-widest"
						>Confirm Password</label
					>
					<input
						bind:value={formData.confirmPassword}
						on:blur={comparePassword}
						required
						type="password"
						name="confirmPassword"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>
			{/if}
			<div class="my-6 text-center">
				<button
					class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"
					type="submit"
				>
					Update
				</button>
			</div>
		</form>
	</div>
</section>
