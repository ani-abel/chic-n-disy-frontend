<script>
	import { onMount } from 'svelte';
	import Qrcode from '../../../../../../components/qrcode.svelte';

	export let /** @type {any} */ data;
	let /** @type {string} */ url;

	onMount(() => {
		const origin = window.location.origin;
		url = `${origin}/product-detail/${data.data.slug}`;
		// url = `https://chicndisy.com/product-detail/${data.data.slug}`;
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
	/>
</svelte:head>

<section class="w-11/12 pt-50">
	<section class="grid grid-cols-12 gap-4">
		<div class="col-span-12 md:col-span-4"></div>
		<div class="w-full flex justify-centercol-span-12 sm:col-span-8 md:col-span-4 p-4">
			<div class="w-fit">
				<h2 class="text-4xl text-center my-12">{data.data.name}</h2>
				{#if url}
					<Qrcode product={data.data} {url} />
				{/if}
			</div>
		</div>
	</section>
</section>
