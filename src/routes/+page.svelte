<script>
	import ProductWidget from '../components/product-widget.svelte';
	import TopProductWidget from '../components/top-product-widget.svelte';
	import Footer from '../components/footer.svelte';
	import Nav from '../components/nav.svelte';
	
</script>

<section>
	<div class="w-full">
		<Nav />
		<div class="w-full h-[70vh] lg:h-[90vh] relative">
			<img src="./images/perfume-1.jpeg" alt="" class="w-full h-full object-cover" />
			<div
				class="hidden lg:block absolute w-[40rem] bg-white bg-opacity-75 h-34 p-8 pt-4 left-[25%] top-[30%]"
				style="transform: translate(-50%, -50%);"
			>
				<p class="text-4xl py-2 playfair">New! <br />The Home Cleaning Collection</p>
				<p class="text-base font-medium poppins-regular">Beautify your home cleaning ritual.</p>
				<a href="/pages/categories.html">
					<button class="bg-black text-white font-medium px-6 py-2 text-sm mt-4 cormorant-sc-light"
						>Shop&nbsp;Now</button
					>
				</a>
			</div>
		</div>
		<div class="block lg:hidden w-full bg-white h-34 p-8 pt-4 playfair">
			<p class="text-4xl py-2">New! <br />The Home Cleaning Collection</p>
			<p class="text-base font-medium poppins-regular">Beautify your home cleaning ritual.</p>
			<a href="/pages/categories.html">
				<button class="bg-black text-white font-medium px-6 py-2 text-sm my-4 poppins-regular"
					>Shop&nbsp;Now</button
				>
			</a>
		</div>

        <!-- First category -->
		<section class="padding-widget-round">
			<p class="text-3xl text-center playfair">Fragrances</p>
			<div class="w-full flex justify-center py-4">
				<a href="/product/fragrances">
					<button
						class="text-xs uppercase text-black border border-black px-6 py-2.5 poppins-regular"
						>View All</button
					>
				</a>
			</div>
			<div class="w-full flex justify-center mt-8">
				<div
					class="w-11/12 grid gap-4 overflow-x-auto grid-flow-col auto-cols-[20rem] lg:overflow-x-hidden md:grid-flow-row md:grid-cols-3 lg:grid-cols-5"
				>
				<ProductWidget />

				<ProductWidget />

				<ProductWidget />

				<ProductWidget />

				<ProductWidget />

				<ProductWidget />

				<ProductWidget />

				<ProductWidget />

				<ProductWidget />
			</div>
		</section>

        <!-- Second category -->
        <section class="padding-widget-round bg-[#F2F0EA]">
			<p class="text-3xl text-center playfair">Fragrances</p>
			<div class="w-full flex justify-center py-4">
				<a href="/product/fragrances">
					<button
						class="text-xs uppercase text-black border border-black px-6 py-2.5 poppins-regular"
						>View All</button
					>
				</a>
			</div>
			<div class="w-full flex justify-center mt-8">
				<div
					class="w-11/12 grid gap-4 overflow-x-auto grid-flow-col auto-cols-[20rem] lg:overflow-x-hidden md:grid-flow-row md:grid-cols-3 lg:grid-cols-5"
				>
					<ProductWidget />
					<ProductWidget />
					<ProductWidget />
					<ProductWidget />
					<ProductWidget />
				</div>
			</div>
		</section>

		<section class="w-full flex justify-center items-center">
			<div class="w-11/12 md:w-3/5 lg:w-1/2 my-14 p-4 great-vibes-regular">
				<p class="text-center text-3xl md:text-2xl">
					"If you've been looking for a dry-cleaning alternative, The Laundress makes luxe,
					long-lasting cleansers for at-home care whether it's linen or cashmere season."
				</p>
			</div>
		</section>

		<section class="w-full flex justify-center py-8">
			<div class="w-11/12">
				<p class="text-center text-3xl py-8 playfair">Top Sellers</p>

				<div class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					<TopProductWidget />
					<TopProductWidget />
					<TopProductWidget />
				</div>
			</div>
		</section>

		<section class="w-full flex justify-center mt-20">
			<div class="w-11/12">
				<div class="w-full h-96 relative">
					<img
						src="https://images.pexels.com/photos/21926651/pexels-photo-21926651/free-photo-of-bottle-of-exclusive-chanel-coco-noir-perfume.jpeg?auto=compress&cs=tinysrgb&w=800"
						alt=""
						class="w-full h-full object-cover"
					/>
					<div
						class="playfair absolute w-full bg-white h-full bottom-0 top-0 bg-opacity-50 p-4 flex justify-center items-center"
					>
						<p class="text-center text-xl md:text-2xl lg:text-3xl">
							If you've been looking for a dry-cleaning alternative, The Laundress makes luxe,
							long-lasting cleansers for at-home care whether it's linen or
						</p>
					</div>
				</div>
			</div>
		</section>

		<Footer />
	</div>
</section>
