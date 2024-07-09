<script>
	import { PaginationResponseType, fillArray } from '../utils';

	export let /** @type {number} */ selectedPage;
	export let /** @type {any} */ navigate;
	export let /** @type {PaginationResponseType} */ paginationControl;
	let fullPaginationList = fillArray(paginationControl.totalPages);

	const handleNavigateWrapper = (/** @type {MouseEvent} */ e, /** @type {number} */ page) =>
		navigate(e, page);
</script>

<!-- Pagination Controls -->
<div class="flex justify-center mt-8 pb-20">
	<nav class="inline-flex space-x-2">
		<a
			on:click={(e) => handleNavigateWrapper(e, selectedPage <= 1 ? 1 : selectedPage - 1)}
			class="cursor-pointer px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-black rounded-md"
			>Previous</a
		>
		{#each fullPaginationList as pageNumber}
			<a
				on:click={(e) => handleNavigateWrapper(e, pageNumber)}
				class=" cursor-pointer px-3 py-2 bg-black text-white hover:bg-black rounded-md"
				>{pageNumber}</a
			>
		{/each}
		<a on:click={(e) =>
				handleNavigateWrapper(
					e,
					selectedPage >= fullPaginationList[fullPaginationList.length - 1]
						? fullPaginationList[fullPaginationList.length - 1]
						: selectedPage + 1
				)}
			class="cursor-pointer px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-black rounded-md"
			>Next</a
		>
	</nav>
</div>
