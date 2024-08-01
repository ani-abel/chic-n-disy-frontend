<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { AppRole, getItemFromLocalStorage } from '../../../utils';

	const key = 'ecommerce-user';
	let hideSideBar = true;

	onMount(() => {
		const record = getItemFromLocalStorage(key);
		if (!record) {
			goto('/auth');
		}
		if (record.role !== AppRole.ADMIN) {
			logout();
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
	{#if !hideSideBar}
		<section in:fade={{ duration: 400 }} out:fade={{ duration: 400 }} class="sidebar h-screen w-16">
			<div class="w-16 h-screen bg-black-gold-horizontal p-4 text-white">
				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<a title="Logout" class="cursor-pointer bg-red" on:click={logout}>
					<i class="fa fa-power-off"></i>
				</a>
				<a title="Products" href="/auth/admin/product">
					<i class="fa fa-gift"></i>
				</a>

				<a title="Users" href="/auth/admin/user">
					<i class="fa fa-users"></i>
				</a>
				<a title="Orders" href="/auth/admin/order">
					<i class="fa fa-shopping-cart"></i>
				</a>

				<a title="Product Categories" href="/auth/admin/product-category">
					<i class="fas fa-th-list"></i>
				</a>
			</div>
		</section>
	{/if}
	
	<slot></slot>
</div>

<button
	on:click={() => (hideSideBar = !hideSideBar)}
	type="button"
	class="circle-button cursor-pointer"
>
	<i class="fas fa-bars"></i>
</button>

<style>
	a i {
		font-size: 18px;
		padding: 15px 5px;
	}

	.circle-button {
		z-index: 99;
		position: fixed;
		bottom: 50px;
		left: 15px;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		background-color: #000;
		border: none;
		border-radius: 50%;
		color: #fff;
		outline: none;
		box-shadow:
			0 6px 8px rgba(0, 0, 0, 0.1),
			0 4px 6px rgba(0, 0, 0, 0.06);
	}

	.circle-button i {
		font-size: 24px;
	}
</style>
