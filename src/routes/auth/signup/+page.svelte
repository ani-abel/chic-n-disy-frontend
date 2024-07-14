<script>
	import { AxiosError } from 'axios';
    import { AppRole, displayMessage } from '../../../utils';
	import { createUserSignup } from '../../../api-requests/request';

	const formData = {
		email: null,
		phoneNumber: null,
		password: null,
		fullName: null
	};

	const resetForm = () => {
		formData.email = null;
		formData.password = null;
		formData.fullName = null;
		formData.phoneNumber = null;
	};

	const signup = (/** @type {Event} */ event) => {
		event.preventDefault();
		(async () => {
			try {
				const names = String(formData.fullName)?.split(' ');
				const firstName = names[0];
				let /** @type {string} */ lastName;
				const /** @type {any} */ payload = {
						password: formData.password,
						role: AppRole.CUSTOMER,
						email: formData.email,
						phoneNumber: formData.phoneNumber,
						firstName
					};
				if (names?.length > 1) {
					lastName = names[1];
					payload.lastName = lastName;
				}
				const result = await createUserSignup(payload);
				if (result?.success) {
					const message = result.message ?? 'User created successfully';
					displayMessage({
						message,
						type: 'success',
						header: message
					});
					resetForm();
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

<section>
	<section class="w-full flex justify-center">
		<div class="w-11/12 md:w-6/12 lg:w-4/12">
			<div class="w-full my-8">
				<a href="/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						class="bi bi-chevron-left"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
						/>
					</svg>
				</a>
			</div>
			<h2 class="text-4xl text-center my-12">Sign up</h2>
			<form on:submit={signup}>
				<div class="my-6">
					<label for="fullName" class="text-xs uppercase tracking-widest">Full Name</label>
					<input
						bind:value={formData.fullName}
						required
						type="text"
						name="fullName"
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
						required
						type="password"
						name="password"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>
				<div class="my-6 text-center">
					<button
						class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"
						type="submit"
					>
						Submit
					</button>
					<p class="mt-0">
						Already have an account? <a href="/auth"><span class="blue">Login</span></a>
					</p>
				</div>
			</form>
		</div>
	</section>
</section>
