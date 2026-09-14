<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import "../app-v2.css";
	// import '../app.css';

	const options = {};
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
	/>
	<script src="https://cdn.tailwindcss.com"></script>
	<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

	<!-- ================= FONTS ================= -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Karla:ital,wght@0,300..700;1,300..700&family=Playfair+Display:ital,wght@1,400..700&display=swap" rel="stylesheet" />

	<script>
		tailwind.config = {
		  theme: {
			extend: {
			  colors: {
				ink: '#15130F',
				paper: '#FAF8F3',
				sand: '#EFE9DD',
				line: '#DAD2C1',
				clay: '#8C7A5C',
				charcoal: '#4A463E',
				sage: '#6E7A5E',
				rust: '#8B4A42',
			  },
			  fontFamily: {
				serif: ['Fraunces', 'serif'],
				script: ['"Playfair Display"', 'serif'],
				sans: ['Karla', 'sans-serif'],
			  },
			  letterSpacing: {
				widest2: '0.28em',
			  },
			},
		  },
		};
	</script>
</svelte:head>

<SvelteToast {options} />

<slot />
