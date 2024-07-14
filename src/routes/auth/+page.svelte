<script>
	import { AxiosError } from 'axios';
	import { goto } from '$app/navigation';
	import { apiLogin } from '../../api-requests/request';
	import { AppRole, displayMessage, saveToLocalStorage } from '../../utils';

	const formData = {
		email: null,
		password: null
	};
	
	const login = async (/** @type {Event} */ event) => {
		try {
			event.preventDefault();
			if (formData?.email && formData?.password) {
				const response = await apiLogin(formData.email, formData.password);
				const {
					data: { userId, token, role, email }
				} = response;
				saveToLocalStorage('ecommerce-user', JSON.stringify({ role, userId, email, token }));
				if (role === AppRole.ADMIN) {
					goto('/auth/admin');
				} else {
					goto('/auth/customer/orders');
				}
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
			<h2 class="text-4xl text-center my-12">Login</h2>
			<form on:submit={login}>
				<div class="my-6">
					<label for="email" class="text-xs uppercase tracking-widest">Username</label>
					<input
						bind:value={formData.email}
						required
						type="email"
						name="email"
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
						Login
					</button>
					<p class="mt-0">
						Don't have an account? <a href="/auth/signup"><span class="blue">Sign up</span></a>
					</p>
				</div>
			</form>
		</div>
	</section>
</section>
