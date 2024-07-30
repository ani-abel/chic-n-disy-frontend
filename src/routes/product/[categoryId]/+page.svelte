<script>
	import { onMount } from 'svelte';
	import { fillArray } from '../../../utils';
	import Nav from '../../../components/nav.svelte';
	import Footer from '../../../components/footer.svelte';
	import { getProducts } from '../../../api-requests/request';
	import ProductWidget from '../../../components/product-widget.svelte';
	import PaginationFullControl from '../../../components/pagination-full-control.svelte';

	export let data;

	const category = data.category.data;
	/** @type {any[]} */ let products = data.products.data;
	let /** @type {any} */ paginationControl = null;
	let fullPaginationList = null;
	let selectedPage = 1;

	onMount(() => {
		if (data) {
			paginationControl = data?.products.paginationControl;
			fullPaginationList = fillArray(paginationControl.totalPages);
			products = data.products.data;
		}
	});

	const navigate = (/** @type {Event} */ e, /** @type {number} */ page) => {
		e.preventDefault();
		(async () => {
			selectedPage = page;
			const result = await getProducts({
				outOfStock: false,
				productCategoryId: category.id,
				pageNumber: page,
				pageSize: 20
			});
			if (result) {
				paginationControl = data?.products.paginationControl;
				fullPaginationList = fillArray(paginationControl.totalPages);
				products = result.data;
			}
		})();
	};
</script>

<section>
	<div class="w-full">
		<Nav />
		<section class="w-full">
			<p class="text-4xl text-black my-12 text-center playfair">{category.name}</p>
			<div class="w-full flex flex-col items-start gap-12 px-12">
				<div class="w-full">
					<p class="text-[#520000] text-sm font-medium pb-4">
						{paginationControl?.totalCount} Products
					</p>

					<div class="w-full grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
						{#each products as product}
							<ProductWidget {product} />
						{/each}
					</div>
				</div>
				<div class="container mx-auto">
					{#if paginationControl}
						<PaginationFullControl {paginationControl} {selectedPage} {navigate} />
					{/if}
				</div>
			</div>
		</section>
		<Footer />
	</div>
</section>
