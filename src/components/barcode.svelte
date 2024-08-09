<script>
	import { onMount } from 'svelte';
	import JsBarcode from 'jsbarcode';

	export let /** @type {any} */ product;
	let /** @type {any} */ svg;

	onMount(() => {
		JsBarcode('#barcode', product.code, {
			width: 10,
			height: 250,
			fontSize: 50,
			format: 'upc',
			lineColor: '#000',
			font: 'monospace',
			displayValue: true
		});
	});

	const downloadBarcode = () => {
		if (svg) {
			// Serialize the SVG to a string
			const serializer = new XMLSerializer();
			const svgString = serializer.serializeToString(svg);

			// Create an image element
			const img = new Image();
			img.src = 'data:image/svg+xml;base64,' + btoa(svgString);

			img.onload = function () {
				// Create a canvas element
				const canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext('2d');

				if (ctx) {
					// Draw the image onto the canvas
					ctx.drawImage(img, 0, 0);

					// Convert the canvas to a PNG data URL
					const pngUrl = canvas.toDataURL('image/png');

					// Create a download link
					const a = document.createElement('a');
					a.href = pngUrl;
					const productName = `barcode-${product.name.replace(/ /g, '-')}`;
					a.download = `${productName.toLowerCase()}.png`;

					// Programmatically click the download link
					document.body.appendChild(a);
					a.click();

					// Remove the download link from the DOM
					document.body.removeChild(a);
				}
			};
		}
	};

	// const downloadBarcode = () => {
	// 	if (svg) {
	// 		// Serialize the SVG to a string
	// 		const serializer = new XMLSerializer();
	// 		const svgString = serializer.serializeToString(svg);

	// 		// Create a Blob with the SVG string
	// 		const blob = new Blob([svgString], { type: 'image/svg+xml' });

	// 		// Create a URL for the Blob
	// 		const url = URL.createObjectURL(blob);

	// 		// Create a download link
	// 		const a = document.createElement('a');
	// 		a.href = url;
	// 		a.download = 'barcode.svg';

	// 		// Programmatically click the download link
	// 		document.body.appendChild(a);
	// 		a.click();

	// 		// Remove the download link from the DOM
	// 		document.body.removeChild(a);

	// 		// Revoke the Blob URL
	// 		URL.revokeObjectURL(url);
	// 	}
	// };
</script>

<div class="code-container text-center">
	<svg bind:this={svg} id="barcode"></svg>
</div>

<div class="text-center">
	<button
		on:click={downloadBarcode}
		class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mb-3"
		type="button"
	>
		<i class="bi bi-download"></i>
		Download
	</button>
</div>

<style>
	.code-container {
		padding: 0% !important;
	}

	.code-container svg {
		width: 100%;
	}
</style>
