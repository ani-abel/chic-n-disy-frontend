<script>
	import Nav from '../../components/nav.svelte';
	import Footer from '../../components/footer.svelte';
	import ProductWidget from '../../components/product-widget.svelte';
	import { globalSearchForProducts } from '../../api-requests/request';

	const formData = {
		searchTerm: null
	};
	let /** @type {any[]} */ searchResults = [];

	const onSearch = (/** @type {Event} */ event) => {
		event.preventDefault();
		setTimeout(async () => {
			if (formData?.searchTerm) {
				const results = await globalSearchForProducts(formData.searchTerm);
				searchResults = results.data;
			}
		}, 2000);
	};
</script>

<section>
	<div class="w-full">
		<Nav />

		<section class="w-full">
			<section class="w-full flex justify-center">
				<div class="w-10/12 md:w-6/12 lg:w-8/12 text-center">
					<div class="my-6">
						<input
							on:input={onSearch}
							bind:value={formData.searchTerm}
							required
							placeholder="Search..."
							type="search"
							name="search"
							class="border border-black w-full p-1.5 mt-1"
						/>
					</div>
				</div>
			</section>

			<!-- Results found -->
			<div class="w-full flex flex-col items-start gap-12 px-12">
				{#if searchResults?.length > 0}
					<div class="w-full pt-50">
						<p class="text-[#520000] text-sm font-medium pb-4">
							{searchResults?.length} search results
						</p>
						<div class="w-full grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
							{#each searchResults as product}
								<ProductWidget {product} />
							{/each}
						</div>
					</div>
				{:else}
					<!-- No content found -->
					<div class="w-full flex flex-col items-start gap-12 px-12 pt-50">
						<div class="w-full">
							<p class="text-[#520000] text-sm font-medium pb-4">0 search results</p>
							<div class="w-full grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
								{#if formData.searchTerm}
									<h1>No results found...</h1>
								{:else}
									<h1>Try changing your search parameters and try again...</h1>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</section>
		<Footer />
	</div>
</section>
