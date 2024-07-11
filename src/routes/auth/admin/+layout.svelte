<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import { getItemFromLocalStorage } from '../../../utils';

	const key = 'ecommerce-user';

	onMount(() => {
		const record = getItemFromLocalStorage(key);
		if (!record) {
			goto('/auth');
		}
	});

	const logout = () => {
		localStorage.removeItem(key);
		goto('/auth');
	};
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
		integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="flex">
	<section class="sidebar h-screen w-16">
		<div class="w-16 h-screen bg-black-gold-horizontal p-4 text-white">
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<a title="Logout" class="cursor-pointer" on:click={logout}>
				<i class="fa fa-power-off"></i>
			</a>
			<a title="Products" href="/auth/admin/product">
				<i class="fa fa-gift"></i>
			</a>

			<a title="Users" href="/auth/admin/user">
				<i class="fa fa-users"></i>
			</a>

			<a title="Product Categories" href="/auth/admin/product-category">
				<i class="fas fa-th-list"></i>
			</a>
		</div>
	</section>

	<slot></slot>
</div>

<style>
	a i {
		font-size: 18px;
		padding: 15px 5px;
	}
</style>
