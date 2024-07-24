<script>
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import { displayMessage } from '../../../../../../utils';
	import { findLgaByState, updateShippingAddress } from '../../../../../../api-requests/request';

	export /** @type {any} */ let data;
	let /** @type {any[]} */ lgas = [];
	const formData = {
		lga: null,
		state: null,
		address: null,
		isDefault: false
	};

	onMount(async () => {
		const stateRecord = data.states.data.find(
			(/** @type {{ state: string; }} */ { state }) => state === data.address.data.state
		);
		formData.address = data.address.data.address;
		formData.lga = data.address.data.lga;
		formData.state = stateRecord.tag;
		// Get LGAs under the state
		const result = await findLgaByState(stateRecord.tag);
		lgas = result.data;
	});

	const getLgas = (/** @type {any} */ e) => {
		e.preventDefault();
		const stateTag = e.target.value;
		(async () => {
			const result = await findLgaByState(stateTag);
			lgas = result.data;
		})();
	};

	const onSubmit = (/** @type {Event} */ e) => {
		e.preventDefault();
		(async () => {
			try {
				const state = data.states.data.find(
					(/** @type {{ tag: string; }} */ { tag }) => tag === formData.state
				);
				const result = await updateShippingAddress({
					...formData,
					state: state.state,
					addressId: data.address.data.id
				});
				if (result?.success) {
					const message = result.message ?? 'Address updated successfully';
					displayMessage({
						message,
						header: message,
						type: 'success'
					});
				}
			} catch (ex) {
				if (ex instanceof AxiosError) {
					const axiosErrorObject = ex.response?.data;
					displayMessage({
						message: axiosErrorObject?.message,
						header: 'Error',
						type: 'danger'
					});
				}
			}
		})();
	};
</script>

<section class="w-full lg:w-4/5">
	<div class="w-full grid md:grid-cols-4 gap-2">
		<form on:submit={onSubmit} class="w-full md:col-span-3">
			<div class="my-6">
				<label for="state" class="text-xs uppercase tracking-widest">State</label>
				<select
					bind:value={formData.state}
					on:change={getLgas}
					name="state"
					required
					class="border border-black w-full p-1.5 mt-1"
				>
					<option>Select State</option>
					{#each data.states.data as state}
						<option value={state.tag}>{state.state}</option>
					{/each}
				</select>
			</div>
			{#if lgas.length > 0}
				<div class="my-6">
					<label for="lga" class="text-xs uppercase tracking-widest">Lga</label>
					<select
						bind:value={formData.lga}
						name="lga"
						required
						class="border border-black w-full p-1.5 mt-1"
					>
						<option value="">Select LGA</option>
						{#each lgas as lga}
							<option value={lga.lga}>{lga.lga}</option>
						{/each}
					</select>
				</div>
			{/if}
			<div class="my-6">
				<label for="address" class="text-xs uppercase tracking-widest">Address</label>
				<textarea
					bind:value={formData.address}
					name="address"
					rows="8"
					class="resize-none border border-black w-full p-1.5 mt-1"
				></textarea>
			</div>
			<div class="my-6 text-center">
				<button
					type="submit"
					class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"
				>
					Update
				</button>
			</div>
		</form>
	</div>
</section>
