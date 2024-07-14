<script>
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import { getUsers, updateUser } from '../../../../api-requests/request';
	import PaginationFullControl from '../../../../components/pagination-full-control.svelte';
	import { AppRole, displayMessage, fillArray, formatDate, getJwtToken } from '../../../../utils';

	export let data;

	/**
	 * @type {any[]}
	 */
	let users = [];
	let /** @type {any} */ paginationControl = null;
	let fullPaginationList = null;
	let selectedPage = 1;

	const formData = {
		role: null,
		searchTerm: null,
		pageSize: 10,
		pageNumber: 1
	};

	onMount(() => {
		if (data) {
			paginationControl = data?.paginationControl;
			fullPaginationList = fillArray(paginationControl.totalPages);
			users = data.data;
		}
	});

	const deleteUser = (/** @type {string} */ userId) => {
		const token = getJwtToken();
		try {
			(async () => {
				const deleteResult = await updateUser(
					{ userId, status: false },
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
					const result = await getUsers(formData);
					if (result) {
						paginationControl = data?.paginationControl;
						fullPaginationList = fillArray(paginationControl.totalPages);
						users = result.data;
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

	const navigate = (/** @type {Event} */ e, /** @type {number} */ page) => {
		e.preventDefault();
		(async () => {
			formData.pageNumber = page;
			const result = await getUsers(formData);
			if (result) {
				paginationControl = data?.paginationControl;
				fullPaginationList = fillArray(paginationControl.totalPages);
				users = result.data;
			}
		})();
	};

	const applyFilters = (/** @type {any} */ e, /** @type {boolean} */ isSearch = false) => {
		const value = e.target.value;
		if (isSearch) {
			setTimeout(async () => {
				const result = await getUsers(formData);
				if (result) {
					paginationControl = data?.paginationControl;
					fullPaginationList = fillArray(paginationControl.totalPages);
					users = result.data;
				}
			}, 2000);
		} else {
			(async () => {
				const result = await getUsers(formData);
				if (result) {
					paginationControl = data?.paginationControl;
					fullPaginationList = fillArray(paginationControl.totalPages);
					users = result.data;
				}
			})();
		}
	};
</script>

<section class="flex-1 pt-50">
	<div class="w-full flex justify-center">
		<section class="w-11/12">
			<div class="w-full flex justify-between my-4">
				<p class="text-2xl">Users</p>
				<a
					class="bg-black-gold text-white font-medium px-6 py-2 text-sm mt-4 cormorant-sc-light"
					href="/auth/admin/user/add"
					>Create
				</a>
			</div>

			<!-- Filters start here -->
			<div class="grid grid-cols-12 gap-4">
				<!-- Equivalent to Bootstrap's col-sm-6 -->
				<div class="col-span-12 sm:col-span-6 bg-black-gold p-4">
					<label for="role" class="text-xs uppercase tracking-widest">Role</label>
					<select
						on:change={applyFilters}
						bind:value={formData.role}
						name="role"
						class="border border-black w-full p-1.5 mt-1"
					>
						<option value={null}>Filter by Role</option>
						{#each Object.values(AppRole) as role}
							<option value={role}>{role}</option>
						{/each}
					</select>
				</div>
				<div class="col-span-12 sm:col-span-6 bg-black-gold p-4">
					<label for="search" class="text-xs uppercase tracking-widest">Search</label>
					<input
						on:input={(e) => applyFilters(e, true)}
						bind:value={formData.searchTerm}
						type="search"
						name="search"
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
							<th>Email</th>
							<th>Phone Number</th>
							<th>Role</th>
							<th>Date</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{#each users as user, index}
							<tr id="tr">
								<td>{index + 1}</td>
								<td>{user.firstName} {user.lastName}</td>
								<td>{user.email}</td>
								<td>{user.phoneNumber}</td>
								<td>{user.role}</td>
								<td>{formatDate(user.dateCreated, 'DATE')}</td>
								<td>{user.status ? 'Active' : 'Inactive'}</td>
								<td>
									<div class="flex items-center gap-2">
										{#if user.role === AppRole.ADMIN}
											<a href="/auth/admin/user/{user.id}">
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
										{/if}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<span on:click={() => deleteUser(user.id)} class="cursor-pointer">
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
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="container mx-auto">
				{#if paginationControl}
					<PaginationFullControl {paginationControl} {selectedPage} {navigate} />
				{/if}
			</div>
		</section>
	</div>
</section>
