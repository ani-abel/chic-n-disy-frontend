<script>
	import { onMount } from 'svelte';
	import QRCodeStyling from '@solana/qr-code-styling';

	export let /** @type {any} */ product;
	export let /** @type {string} */ url;
	let /** @type {HTMLElement} */ canvas;
	let /** @type {any} */ qrCode;

	onMount(() => {
		if (canvas) {
			qrCode = new QRCodeStyling({
				width: 300,
				height: 300,
				type: 'svg',
				data: url,
				// image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
				dotsOptions: {
					color: '#000',
					type: 'rounded'
				},
				backgroundOptions: {
					color: '#e9ebee'
				},
				imageOptions: {
					crossOrigin: 'anonymous',
					margin: 20
				}
			});
			qrCode.append(canvas);
		}
	});

	const downloadQrCode = () => {
		const productName = `qr-code-${product.name.replace(/ /g, '-')}`;
		qrCode.download({ name: `${productName.toLowerCase()}`, extension: 'png' });
	};
</script>

<div class="code-container my-6 text-center flex justify-center">
	<div class="w-fit">
		<div bind:this={canvas} id="canvas"></div>
		<button
			on:click={downloadQrCode}
			class="bg-black uppercase text-sm py-3 my-6 text-center tracking-widest w-full text-white mt-4 mb-3"
			type="button"
		>
			<i class="bi bi-download"></i>
			Download
		</button>
	</div>
</div>

<style>
	.code-container #canvas {
		width: 100%;
	}
</style>
