<script>
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import { setProductList, productsList } from '../../../../stores/app.store';
	import { getProducts, updateProduct } from '../../../../api-requests/request';
	import PaginationFullControl from '../../../../components/pagination-full-control.svelte';
	import {
		fillArray,
		formatDate,
		NAIRA_SIGN,
		displayMessage,
		getJwtToken
	} from '../../../../utils/index';

	export let data;

	/**
	 * @type {any[]}
	 */
	let products = [];
	let /** @type {any} */ paginationControl = null;
	let fullPaginationList = null;
	let selectedPage = 1;
	const formData = {
		productCategoryId: null,
		outOfStock: false,
		searchTerm: null,
		pageSize: 10,
		pageNumber: 1
	};

	onMount(() => {
		if (data) {
			setProductList(data.products);
			const unsubscribe = productsList.subscribe((data) => {
				paginationControl = data?.paginationControl;
				fullPaginationList = fillArray(paginationControl.totalPages);
				products = data.data;
			});
			unsubscribe();
		}
	});

	const applyFilters = (/** @type {any} */ e, /** @type {boolean} */ isSearch = false) => {
		const value = e.target.value;
		if (isSearch) {
			setTimeout(async () => {
				const result = await getProducts(formData);
				if (result) {
					setProductList(result);
					const unsubscribe = productsList.subscribe((result) => {
						paginationControl = result.paginationControl;
						fullPaginationList = fillArray(paginationControl.totalPages);
						products = result.data;
					});
					unsubscribe();
				}
			}, 2000);
		} else {
			(async () => {
				const result = await getProducts(formData);
				if (result) {
					setProductList(result);
					const unsubscribe = productsList.subscribe((result) => {
						paginationControl = result.paginationControl;
						fullPaginationList = fillArray(paginationControl.totalPages);
						products = result.data;
					});
					unsubscribe();
				}
			})();
		}
	};

	const navigate = (/** @type {Event} */ e, /** @type {number} */ page) => {
		e.preventDefault();
		(async () => {
			formData.pageNumber = page;
			const result = await getProducts(formData);
			if (result) {
				paginationControl = data?.products.paginationControl;
				fullPaginationList = fillArray(paginationControl.totalPages);
				products = result.data;
			}
		})();
	};

	const deleteProduct = (/** @type {string} */ productId) => {
		const token = getJwtToken();
		try {
			(async () => {
				const deleteResult = await updateProduct(
					{ productId, status: false },
					{ Authorization: `Bearer ${token}` }
				);
				if (deleteResult?.success) {
					const message = 'Deleted successfully';
					displayMessage({
						message,
						header: message,
						type: 'success'
					});
					// Refresh table data
					const result = await getProducts(formData);
					if (result) {
						paginationControl = data?.products.paginationControl;
						fullPaginationList = fillArray(paginationControl.totalPages);
						products = result.data;
					}
				}
			})();
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

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
	/>
</svelte:head>

<section class="flex-1 pt-50">
	<div class="w-full flex justify-center">
		<section class="w-11/12">
			<div class="w-full flex justify-between my-4">
				<p class="text-2xl">Products</p>
				<a
					class="bg-black-gold text-white font-medium px-6 py-2 text-sm mt-4 cormorant-sc-light"
					href="/auth/admin/product/add"
					>Create
				</a>
			</div>

			<!-- Filters start here -->
			<div class="grid grid-cols-12 gap-4">
				<!-- Equivalent to Bootstrap's col-sm-6 -->
				<div class="col-span-12 sm:col-span-3 bg-black-gold p-4">
					<label for="in-stock" class="text-xs uppercase tracking-widest">In Stock</label>
					<select
						bind:value={formData.outOfStock}
						on:change={applyFilters}
						name="in-stock"
						class="border border-black w-full p-1.5 mt-1"
					>
						<option value={null}>Filter by Product Stock</option>
						<option value="false">In Stock</option>
						<option value="true">Out of Stock</option>
					</select>
				</div>
				<div class="col-span-12 sm:col-span-3 bg-black-gold p-4">
					<label for="in-stock" class="text-xs uppercase tracking-widest">Category</label>
					<select
						bind:value={formData.productCategoryId}
						on:change={applyFilters}
						name="in-stock"
						class="border border-black w-full p-1.5 mt-1"
					>
						<option value={null}>Filter by Category</option>
						{#each data.categories.data as category}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</div>
				<div class="col-span-12 sm:col-span-6 bg-black-gold p-4">
					<label for="search-field" class="text-xs uppercase tracking-widest">Search</label>
					<input
						bind:value={formData.searchTerm}
						on:input={(e) => applyFilters(e, true)}
						type="search"
						name="search-field"
						class="border border-black w-full p-1.5 mt-1"
					/>
				</div>
			</div>
			<!-- Filters end here -->
			<div class="table-wrap">
				<table>
					<thead>
						<tr id="thead">
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>Amount</th>
							<th>Rating</th>
							<th>Quantity In Stock</th>
							<th>Date</th>
							<th>Status</th>
							<th>Out Of Stock</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{#each $productsList?.data as product, index}
							<tr id="tr">
								<td>{index + 1}</td>
								<td>{product.name}</td>
								<td>{product.description}</td>
								<td>{NAIRA_SIGN}{Number(product.unitPrice).toLocaleString('en-US')}</td>
								<td>{product.rating}</td>
								<td>{product.quantity}</td>
								<td>{formatDate(product.dateCreated, 'DATE')}</td>
								<td>{product.status ? 'Active' : 'Inactive'}</td>
								<td>{product.outOfStock ? 'Yes' : 'No'}</td>
								<td>
									<div class="flex items-center gap-2">
										<a href="/auth/admin/product/{product.id}">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-pencil"
												viewBox="0 0 16 16"
											>
												<path
													d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
												/>
											</svg>
										</a>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<span on:click={() => deleteProduct(product.id)} class="cursor-pointer">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-trash"
												viewBox="0 0 16 16"
											>
												<path
													d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
												/>
												<path
													d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
												/>
											</svg>
										</span>
										<a href="/auth/admin/product/barcode/{product.id}">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-barcode"
												viewBox="0 0 16 16"
											>
												<path
													d="M0 0h1v16H0V0zm2 0h1v16H2V0zm2 0h2v16H4V0zm3 0h1v16H7V0zm2 0h2v16H9V0zm3 0h1v16h-1V0zm2 0h1v16h-1V0z"
												/>
											</svg></a
										>
										<a href="/auth/admin/product/qr-code/{product.id}">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-qrcode"
												viewBox="0 0 16 16"
											>
												<!-- First row -->
												<rect x="0" y="0" width="4" height="4" />
												<rect x="6" y="0" width="2" height="2" />
												<rect x="10" y="0" width="6" height="2" />
												<rect x="14" y="2" width="2" height="2" />

												<!-- Second row -->
												<rect x="0" y="6" width="4" height="4" />
												<rect x="6" y="6" width="2" height="2" />
												<rect x="8" y="6" width="2" height="2" />
												<rect x="10" y="8" width="2" height="2" />
												<rect x="14" y="6" width="2" height="2" />

												<!-- Third row -->
												<rect x="0" y="10" width="2" height="2" />
												<rect x="2" y="12" width="2" height="2" />
												<rect x="6" y="12" width="2" height="2" />
												<rect x="10" y="12" width="4" height="4" />
												<rect x="12" y="10" width="2" height="2" />

												<!-- Fourth row -->
												<rect x="0" y="14" width="4" height="2" />
												<rect x="6" y="14" width="2" height="2" />
											</svg>
										</a>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="container mx-auto">
				{#if $productsList?.paginationControl}
					<PaginationFullControl {paginationControl} {selectedPage} {navigate} />
				{/if}
			</div>
		</section>
	</div>
</section>

<!-- modal -->
<section id="backdrop" class="backdrop">
	<div class="modal w-11/12 sm:w-10/12 md:w-3/5 lg:w-1/2">
		<div class="px-8 py-4">
			<div class="w-full flex justify-end">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="currentColor"
					class="bi bi-x-lg close"
					viewBox="0 0 16 16"
				>
					<path
						d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
					/>
				</svg>
			</div>

			<h2 class="text-xl text-center my-4">Form</h2>
			<form>
				<label for="name" class="text-xs uppercase tracking-widest">Name</label>
				<input type="text" name="name" class="border border-black w-full p-1.5 mt-1" />
				<div class="my-6">
					<label for="tile" class="text-xs uppercase tracking-widest">Title</label>
					<input type="text" name="tile" class="border border-black w-full p-1.5 mt-1" />
				</div>

				<div class="my-6">
					<label for="desc" class="text-xs uppercase tracking-widest">Description</label>
					<textarea name="desc" rows="4" class="border border-black w-full p-1.5 mt-1"></textarea>
				</div>

				<div class="my-6 flex flex-col">
					<label for="file" class="text-sm uppercase tracking-widest font-semibold">Add Media</label
					>
					<input type="file" name="file" class="border border-black p-1.5 my-2 w-fit" />
					<span class="text-xs text-black font-semibold"
						>Upload up to 10 images and 3 videos (max. file size 2 GB)</span
					>
				</div>

				<div class="my-6 text-center flex justify-center">
					<input
						type="submit"
						value="Submit"
						class="bg-black uppercase text-sm py-3 tracking-widest w-1/2 text-white mt-4 mb-3"
					/>
				</div>
			</form>
		</div>
	</div>
</section>
