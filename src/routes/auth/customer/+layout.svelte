<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Nav from '../../../components/nav.svelte';
	import Footer from '../../../components/footer.svelte';
	import { getItemFromLocalStorage } from '../../../utils';

	/** @type {string} */ let pageTitle = 'Orders';

	onMount(() => {
		const user = getItemFromLocalStorage('ecommerce-user', true);
		if (!user) {
			goto('/auth');
		}
		// if (user.role !== AppRole.ADMIN) {
		// 	// logout();
		// }
		// Set title bar
		const urlSections = String($page.route.id)?.split('/');
		if (urlSections?.length > 0) {
			const lastElement = urlSections[urlSections.length - 1];
			if (lastElement?.includes('[')) {
				pageTitle = urlSections[urlSections.length - 2];
			} else {
				pageTitle = lastElement;
			}
			pageTitle = pageTitle?.replace('-', ' ');
		}
	});
</script>

<section class="w-full">
	<Nav />
	<section class="w-full">
		<p class="text-4xl text-black my-12 text-center playfair text-capitalize">
			{pageTitle}
		</p>
		<div class="w-full flex flex-col xl:flex-row items-start gap-4 xl:gap-12 px-12">
			<div class="w-full lg:w-[20%]">
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/orders')}
					href="/auth/customer/orders"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Orders</p>
					</div>
				</a>
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/saved-products')}
					href="/auth/customer/saved-products"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Saved Products</p>
					</div>
				</a>
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/recently-viewed')}
					href="/auth/customer/recently-viewed"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Recently Viewed</p>
					</div>
				</a>
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/shipping-address')}
					href="/auth/customer/shipping-address"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Shipping Address</p>
					</div>
				</a>
				<a
					class:nav-active={String($page.route.id).includes('/auth/customer/update-profile')}
					href="/auth/customer/update-profile"
				>
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Profile</p>
					</div>
				</a>
			</div>
			<slot></slot>
		</div>
	</section>
	<Footer />
</section>

<style>
	.nav-active {
		text-decoration: underline;
		color: #b0934a !important;
		background-color: #cfd8de !important;
	}
</style>
