<script>
	import { AxiosError } from 'axios';
	import { slide } from 'svelte/transition';
	import { joinNewsletter } from '../api-requests/request';
	import { displayMessage, getItemFromLocalStorage } from '../utils';

	const year = new Date().getFullYear();

	const formData = {
		email: null
	};
	const footerToggle = {
		whoAreWe: false,
		customerCare: false,
		more: false
	};

	const onSubmit = (/** @type {Event} */ e) => {
		e.preventDefault();
		const /** @type {any} */ payload = { email: formData.email };
		const user = getItemFromLocalStorage('ecommerce-user', true);
		if (user?.userId) {
			payload.userId = user.userId;
		}
		(async () => {
			try {
				const result = await joinNewsletter(payload);
				if (result?.success) {
					const message = result.message ?? 'Joined successfully';
					displayMessage({
						message,
						header: message,
						type: 'success'
					});
					// Reset form
					formData.email = null;
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

	const handleClick = (/** @type {string} */ section) => {
		if (section === 'whoAreWe') {
			footerToggle.whoAreWe = !footerToggle.whoAreWe;
		}
		if (section === 'customerCare') {
			footerToggle.customerCare = !footerToggle.customerCare;
		}
		if (section === 'more') {
			footerToggle.more = !footerToggle.more;
		}
	};

	const handleKeyDown = (/** @type {KeyboardEvent} */ event, /** @type {string} */ section) => {
		if (event.key === 'Enter' || event.key === ' ') {
		}
		handleClick(section);
	};
</script>

<footer class="w-full flex justify-center mt-16 h-fit lg:h-80 bg-black p-0 pb-4 lg:p-12">
	<div class="w-11/12 lg:w-4/5">
		<div class="w-full hidden lg:grid grid-cols-4 gap-8">
			<div class="text-xs capitalize text-[#FFD700]">
				<p class="py-4 text-xs uppercase tracking-wider">Who we are</p>

				<a href="#">
					<p class="py-1">About us</p>
				</a>
				<a href="#"><p class="py-1">Products</p></a>
				<a href="#"><p class="py-1">Products_1</p></a>
			</div>

			<div class="text-xs capitalize text-[#FFD700]">
				<p class="py-4 text-xs uppercase tracking-wider">Customer Care</p>

				<a href="#">
					<p class="py-1">About us</p>
				</a>
				<a href="#"><p class="py-1">Contact Us</p></a>
			</div>

			<div class="text-xs capitalize text-[#FFD700]">
				<p class="py-4 text-xs uppercase tracking-wider">more</p>

				<a href="#">
					<p class="py-1">Privacy Policy</p>
				</a>
				<a href="#"><p class="py-1">Terms of Use</p></a>
				<a href="#"><p class="py-1">Product Recall</p></a>
			</div>

			<div>
				<p class="py-4 text-xs uppercase tracking-wider text-[#FFD700]">Be the first to know 🔈</p>
				<form on:submit={onSubmit}>
					<input
						type="email"
						bind:value={formData.email}
						name="email"
						class="w-full border-b border-[#FFD700] bg-black text-[#FFD700] focus:outline-none text-xs pt-4 pb-2 placeholder:text-[#FFD700]"
						placeholder="Enter your email"
					/>
				</form>

				<div class="w-full flex items-center gap-4 my-4 text-[#FFD700]">
					<a href="">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							class="bi bi-instagram"
							viewBox="0 0 16 16"
						>
							<path
								d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
							/>
						</svg>
					</a>
					<a href="">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							class="bi bi-messenger"
							viewBox="0 0 16 16"
						>
							<path
								d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.64.64 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.64.64 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"
							/>
						</svg>
					</a>

					<a href="">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							class="bi bi-whatsapp"
							viewBox="0 0 16 16"
						>
							<path
								d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
							/>
						</svg>
					</a>
					<a href="">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							class="bi bi-tiktok"
							viewBox="0 0 16 16"
						>
							<path
								d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
		<div class="space-y-3 block lg:hidden">
			<!-- 1 -->
			<div class="relative transition-all duration-700 border-b border-[#FFD700] py-2">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => handleClick('whoAreWe')}
					on:keydown={(e) => handleKeyDown(e, 'whoAreWe')}
					class="w-full p-4 text-left cursor-pointer"
				>
					<div class="flex items-center justify-between text-[#FFD700]">
						<span class="tracking-wide text-xs uppercase font-medium">Who we are</span>
						<span class="transition-transform duration-500 transform fill-current">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-chevron-down"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
								/>
							</svg>
						</span>
					</div>
				</div>

				{#if footerToggle.whoAreWe}
					<div
						class="relative overflow-hidden transition-all duration-700"
						in:slide={{ duration: 600, delay: 300 }}
						out:slide={{ duration: 600, delay: 300 }}
					>
						<div class="px-6 pb-4 text-[#FFD700] text-center text-xs capitalize">
							<a href="#">
								<p class="py-1 text-start">About us</p>
							</a>
							<a href="#"><p class="py-1 text-start">Product Safety</p></a>
							<a href="#"><p class="py-1 text-start">Ingredient Glossary</p></a>
							<a href="#"><p class="py-1 text-start">Tips & How-Tos</p></a>
							<a href="#"><p class="py-1 text-start">Careers</p></a>
						</div>
					</div>
				{/if}
			</div>
			<!-- End 1 -->
			<!-- 2 -->
			<div class="relative transition-all duration-700 border-b border-[#FFD700]">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => handleClick('customerCare')}
					on:keydown={(e) => handleKeyDown(e, 'customerCare')}
					class="w-full p-4 text-left cursor-pointer"
				>
					<div class="flex items-center justify-between text-[#FFD700]">
						<span class="tracking-wide text-xs uppercase font-medium">Customer Care</span>
						<span class="transition-transform duration-500 transform fill-current">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-chevron-down"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
								/>
							</svg>
						</span>
					</div>
				</div>

				{#if footerToggle.customerCare}
					<div
						class="relative overflow-hidden transition-all duration-700"
						in:slide={{ duration: 600, delay: 300 }}
						out:slide={{ duration: 600, delay: 300 }}
					>
						<div class="px-6 pb-4 text-[#FFD700] text-center text-xs capitalize">
							<a href="#">
								<p class="py-1 text-start">My Account</p>
							</a>
							<a href="#"><p class="py-1 text-start">Contact Us & FAQs</p></a>
							<a href="#"><p class="py-1 text-start">Returns</p></a>
							<a href="#"><p class="py-1 text-start">Auto-Replenishment</p></a>
							<a href="#"><p class="py-1 text-start">Loyalty Program</p></a>
							<a href="#"><p class="py-1 text-start">Gift Cards</p></a>
						</div>
					</div>
				{/if}
			</div>
			<!-- End 2 -->
			<!-- 3 -->
			<div class="relative transition-all duration-700 border-b border-[#FFD700]">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => handleClick('more')}
					on:keydown={(e) => handleKeyDown(e, 'more')}
					class="w-full p-4 text-left cursor-pointer"
				>
					<div class="flex items-center justify-between text-[#FFD700]">
						<span class="tracking-wide text-xs uppercase font-medium">More</span>
						<span class="transition-transform duration-500 transform fill-current">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-chevron-down"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
								/>
							</svg>
						</span>
					</div>
				</div>

				{#if footerToggle.more}
					<div
						class="relative overflow-hidden transition-all duration-700"
						in:slide={{ duration: 600, delay: 300 }}
						out:slide={{ duration: 600, delay: 300 }}
					>
						<div class="px-6 pb-4 text-start text-xs capitalize text-[#FFD700]">
							<a href="#">
								<p class="py-1 text-start">My Account</p>
							</a>
							<a href="#"><p class="py-1 text-start">Contact Us & FAQs</p></a>
							<a href="#"><p class="py-1 text-start">Returns</p></a>
						</div>
					</div>
				{/if}
			</div>
			<!-- End 3 -->

			<p class="text-[#FFD700] text-[10px] text-center font-medium">{year} &copy;chicndisy.com</p>
		</div>
	</div>

	<div class="w[20%] hidden lg:inline-block"></div>
</footer>

<style>
	* {
		font-size: 16px;
	}
</style>
