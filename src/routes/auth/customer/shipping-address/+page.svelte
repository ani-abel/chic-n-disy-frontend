<script>
	import { onMount } from 'svelte';
	import { displayMessage, getItemFromLocalStorage } from '../../../../utils';
	import { findUserShippingAddress, updateShippingAddress } from '../../../../api-requests/request';

	/*** @type {any[]}*/ let shippingAddresses;

	onMount(async () => {
		loadData();
	});

	const loadData = async () => {
		const user = getItemFromLocalStorage('ecommerce-user', true);
		if (user?.token) {
			const result = await findUserShippingAddress({ Authorization: `Bearer ${user.token}` });
			shippingAddresses = result.data;
		}
	};

	const setDefaultAddress = (/** @type {any} */ address, /** @type {Event} */ e) => {
		e.preventDefault();
		(async () => {
			const isDefault = !address.isDefault;
			const result = await updateShippingAddress({
				addressId: address.id,
				isDefault
			});
			if (result?.success) {
				const message = isDefault ? 'Address set as default' : 'Address removed from default';
				displayMessage({
					header: message,
					message,
					type: 'success'
				});
                loadData();
			}
		})();
	};
</script>

<section class="w-full lg:w-4/5">
	<div class="w-full grid md:grid-cols-2 gap-2">
		{#if shippingAddresses?.length > 0}
			{#each shippingAddresses as address, index}
				<!-- Card starts here -->
				<div class="border border-gray-[#666666] bg-white p-4 rounded-lg relative">
					<div class="pb-4 border-b border-gray-[#666666] flex justify-between items-center mb-2">
						<p class="font-medium inline">
							Address {index + 1}
							{#if address.isDefault}<span class="text-gray-500">(Default)</span>{/if}
						</p>
						<a href="/auth/customer/shipping-address/edit-address/{address.id}">
							<i class="bi bi-pencil-square text-gray-500 cursor-pointer"></i>
						</a>
					</div>
					<p class="text-gray-700 p-4">
						{address?.address}
					</p>
					<div class="pt-4 border-t border-gray-[#666666] flex justify-between items-center mb-2">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span on:click={(e) => setDefaultAddress(address, e)} class="cursor-pointer">
							<i class="bi bi-stickies-fill text-gray-500"></i>
							{address.isDefault ? 'Remove as default' : 'Set as default'}
						</span>
					</div>
				</div>
				<!-- Card ends here -->
			{/each}
		{:else}
			<p class="text-[#520000] text-sm font-medium pb-4">
				No saved shipping address. <a
					class="text-underline text-black pb-6"
					href="/auth/customer/shipping-address/add-address">Create one</a
				>
			</p>
		{/if}
	</div>
</section>
