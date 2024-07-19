<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';

	const options = {};
</script>

<svelte:head>
  <meta charset="UTF-8">
	<script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</svelte:head>

<SvelteToast {options} />

<slot />
