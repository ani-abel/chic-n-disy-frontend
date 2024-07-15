<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Nav from '../../../components/nav.svelte';
	import Footer from '../../../components/footer.svelte';
	import { getItemFromLocalStorage } from '../../../utils';

	onMount(() => {
		const user = getItemFromLocalStorage('ecommerce-user', true);
		if (!user) {
			goto('/auth');
		}
	});
</script>

<section class="w-full">
	<Nav />
	<section class="w-full">
		<p class="text-4xl text-black my-12 text-center playfair text-capitalize">
			{String($page.route.id)?.split('/').pop()?.replace('-', ' ') ?? 'Orders'}
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
			</div>
			<section class="w-full lg:w-4/5">
				<div class="w-full grid md:grid-cols-2 gap-2">
					<slot></slot>
				</div>
			</section>
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
