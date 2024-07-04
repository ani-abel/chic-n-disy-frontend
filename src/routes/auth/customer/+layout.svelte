<script lang="ts">
    import { page } from '$app/stores';
    import { customerSection } from '../../../stores/app.store';
	import Footer from '../../../components/footer.svelte';
	import Nav from '../../../components/nav.svelte';

	let pageTitle = '';
    customerSection.subscribe((data) => {
        pageTitle = data.title;
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
				<a href="/auth/customer/orders">
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Orders</p>
					</div>
				</a>
				<a href="/auth/customer/saved-products">
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Saved Products</p>
					</div>
				</a>
				<a href="/auth/customer/recently-viewed">
					<div class="border-b border-[#CFD8DF] py-4">
						<p class="uppercase text-xs tracking-wider">Recently Viewed</p>
					</div>
				</a>
			</div>
			<section class="w-full lg:w-4/5">
				<slot></slot>
			</section>
		</div>
	</section>
	<Footer />
</section>
