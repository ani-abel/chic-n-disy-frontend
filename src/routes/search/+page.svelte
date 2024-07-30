<script>
	import { fillArray } from '../../utils';
	import Nav from '../../components/nav.svelte';
	import Footer from '../../components/footer.svelte';
	import ProductWidget from '../../components/product-widget.svelte';
	import { globalSearchForProducts } from '../../api-requests/request';
	import PaginationFullControl from '../../components/pagination-full-control.svelte';

	const formData = {
		searchTerm: null,
		pageNumber: 1,
		pageSize: 20,
	};
	let /** @type {any[]} */ searchResults = [];
	let /** @type {any} */ paginationControl = null;
	let fullPaginationList = null;
	let selectedPage = 1;

	const onSearch = (/** @type {Event} */ event) => {
		event.preventDefault();
		setTimeout(async () => {
			paginationControl = null;
			if (formData?.searchTerm) {
				const results = await globalSearchForProducts(formData.searchTerm, {
					pageSize: formData.pageSize,
					pageNumber: formData.pageNumber
				});
				searchResults = results.data;
				paginationControl = results?.paginationControl;
				fullPaginationList = fillArray(paginationControl.totalPages);
			}
		}, 2000);
	};

	const navigate = (/** @type {Event} */ e, /** @type {number} */ page) => {
		e.preventDefault();
		(async () => {
			if (formData?.searchTerm) {
				selectedPage = page;
				formData.pageNumber = page;
				const results = await globalSearchForProducts(formData.searchTerm, {
					pageSize: formData.pageSize,
					pageNumber: formData.pageNumber
				});
				if (results) {
					searchResults = results.data;
					paginationControl = results?.paginationControl;
					fullPaginationList = fillArray(paginationControl.totalPages);
				}
			}
		})();
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
							{paginationControl?.totalCount ?? 0} search results
						</p>
						<div class="w-full grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
							{#each searchResults as product}
								<ProductWidget {product} />
							{/each}
						</div>
					</div>
					<div class="container mx-auto">
						{#if paginationControl}
							<PaginationFullControl {paginationControl} {selectedPage} {navigate} />
						{/if}
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
