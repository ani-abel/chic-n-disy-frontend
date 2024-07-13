<script>
	import { onMount } from 'svelte';
	import Nav from '../../../components/nav.svelte';
	import Footer from '../../../components/footer.svelte';
	import { findProductFullDetail } from '../../../api-requests/request';
	import { AppRole, formatDate, getItemFromLocalStorage } from '../../../utils';

	export /** @type {any} */ let data;
	let /** @type {any} */ user;
	const formData = {
		rating: 0,
		title: null,
		comment: null
	};

	onMount(async () => {
		user = getItemFromLocalStorage('ecommerce-user', true);
		if (user?.userId && user?.role === AppRole.CUSTOMER) {
			data = await findProductFullDetail(data.product.id, user.userId);
		}
	});

	const onSubmit = (/** @type {Event} */ e) => {
		e.preventDefault();
	};

	// Remove later
	data.userHasBoughtProduct = true;
	data.reviews = [
		{
			title: 'Loved it',
			comment: 'I liked this product',
			rating: 2.8,
			user: {
				email: 'ghgh@gmail.com'
			},
			dateCreated: new Date()
		},
		{
			title: 'Loved it',
			comment: 'I liked this product',
			rating: 2.8,
			user: {
				email: 'ghgh@gmail.com'
			},
			dateCreated: new Date()
		}
	];
	const productPictures = (data.product.imagesForThisProduct ?? []).map(
		(/** @type {any} */ { url }) => url
	);

	const rating = data.product.rating;
	let pictureInFocus = productPictures[0];
	const productName = data.product.name;

	let inFocus = 'image';
	const videoInFocus = data.product?.productVideo;

	const setImageInFocus = (/** @type {string} */ picture) => {
		inFocus = 'image';
		pictureInFocus = picture;
	};
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
	/>
	<!-- <link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
		integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
		crossorigin="anonymous"
	/> -->
</svelte:head>

<section>
	<div class="w-full">
		<Nav />
		<section class="w-full">
			<div class="w-full flex flex-col lg:flex-row gap-4">
				<div
					class="w-full lg:w-1/2 h-[75vh] p-8 flex flex-col-reverse md:flex-row items-center gap-4"
				>
					<div class="w-fit flex flex-row md:flex-col gap-4">
						{#each productPictures as picture, index}
							<button
								class="w-16 h-16 focus:border-4 focus:border-black"
								on:click={() => setImageInFocus(productPictures[index])}
							>
								<img
									src={picture}
									alt={productName + ' ' + index + 1}
									class="w-full h-full object-cover"
								/>
							</button>
						{/each}
						<button
							on:click={() => (inFocus = 'video')}
							class="w-16 h-16 focus:border-4 focus:border-black"
						>
							<video src={videoInFocus} class="w-full h-full object-cover">
								<track kind="captions" />
							</video>
						</button>
					</div>
					<div class="w-4/5 h-full">
						{#if inFocus === 'video'}
							<video controls src={videoInFocus} class="w-full h-full object-cover">
								<track kind="captions" />
							</video>
						{:else}
							<img src={pictureInFocus} alt={productName} class="w-full h-full object-cover" />
						{/if}
					</div>
				</div>

				<div class="w-full lg:w-1/2 h-fit lg:h-screen p-4 md:p-8">
					<p class="text-3xl uppercase mt-8 playfair">{productName}</p>
					<div class="w-full flex flex-row items-center gap-1 my-8">
						{#each Array(5).fill(0) as _, i}
							{#if rating >= i + 1}
								<i class="bi bi-star-fill star"></i>
							{:else if rating > i && rating < i + 1}
								<i class="bi bi-star-half star"></i>
							{:else}
								<i class="bi bi-star star"></i>
							{/if}
						{/each}
						<p class="text-sm">
							&nbsp;{data.product.rating}&emsp;|&emsp;{data.noOfReviews ?? 0} Reviews
						</p>
					</div>

					<section class="w-full my-4 flex items-center gap-2 border-b border-black pt-4 pb-8">
						<div class="w-fit px-3 py-2 border border-black flex flex-row items-center gap-4">
							<button class="text-base font-semibold">-</button>
							<p class="text-sm">1</p>
							<button class="text-base font-semibold">+</button>
						</div>

						<button class="w-full bg-black p-3 text-white text-xs font-medium uppercase">
							Add to bag | ₦&nbsp;{Number(data.product.unitPrice).toLocaleString('en-US')}
						</button>
					</section>

					<section class="text-sm">
						<p class="text-sm py-8 text-justify">
							{data.product?.description}
						</p>

						<div class="border border-black my-4">
							<div class="relative mb-1">
								<h6 class="mb-0">
									<button
										class="relative flex items-center uppercase w-full p-4
                                    text-left transition-all ease-in
                                    border-b border-solid cursor-pointer border-black
                                    text-black rounded-t-1 group text-dark-500 text-sm"
										data-collapse-target="animated-collapse-1"
									>
										<span>Scent</span>
										<i
											class="absolute right-5 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"
										></i>
									</button>
								</h6>
								<div
									data-collapse="animated-collapse-1"
									class="h-0 overflow-hidden transition-all duration-300 ease-in-out"
								>
									<div class="p-4 text-sm leading-normal text-blue-gray-500/80">
										We're not always in the position that we want to be at. We're constantly
										growing. We're constantly making mistakes. We're constantly trying to express
										ourselves and actualize our dreams.
									</div>
								</div>
							</div>
							<div class="relative mb-1">
								<h6 class="mb-0">
									<button
										class="relative flex items-center w-full p-4
                                    uppercase text-left transition-all ease-in
                                    cursor-pointer text-black rounded-t-1 group text-dark-500
                                    text-sm uppercase"
										data-collapse-target="animated-collapse-2"
									>
										<span>ingredients</span>
										<i
											class="absolute right-5 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"
										></i>
									</button>
								</h6>
								<div
									data-collapse="animated-collapse-2"
									class="h-0 overflow-hidden transition-all duration-300 ease-in-out"
								>
									<div class="p-4 text-sm leading-normal text-blue-gray-500/80">
										We're not always in the position that we want to be at. We're constantly
										growing. We're constantly making mistakes. We're constantly trying to express
										ourselves and actualize our dreams.
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</section>

		<p class="text-xl uppercase py-8 lg:py-16 text-center playfair">Reviews</p>

		<section class="w-full flex justify-center">
			<div class="w-11/12 lg:w-1/2 flex flex-col lg:justify-between items-center">
				<section class="flex gap-2">
					<p class="font-semibold text-4xl">{data.product.rating}</p>
					<div class="my-2">
						<div class="flex flex-row items-center gap-2">
							{#each Array(5).fill(0) as _, i}
								{#if rating >= i + 1}
									<i class="bi bi-star-fill star"></i>
								{:else if rating > i && rating < i + 1}
									<i class="bi bi-star-half star"></i>
								{:else}
									<i class="bi bi-star star"></i>
								{/if}
							{/each}
						</div>
						<p class="text-xs font-medium py-1">Based on {data.noOfReviews ?? 0} Reviews</p>
					</div>
				</section>

				<section class="h-auto flex items-center my-2 lg:my-0">
					<button class="text-xs text-white bg-[#A5B1AA] py-2.5 font-medium px-6 rounded-xl">
						Write a Review
					</button>
				</section>
			</div>
		</section>

		{#if user && data.userHasBoughtProduct && !data.userHasReviewedProduct}
			<!-- Display if user is logged in -->
			<section id="give-review" class="w-full flex justify-center">
				<div class="p-8 border-y border-bottom-none w-11/12 lg:w-3/5 my-10">
					<form on:submit={onSubmit}>
						<div class="my-6">
							<label for="password" class="text-xs uppercase tracking-widest">Give a rating</label>
							<div class="flex flex-row items-center gap-2">
								{#each Array(5).fill(0) as _, i}
									{#if formData.rating >= i + 1}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<!-- svelte-ignore a11y-mouse-events-have-key-events -->
										<i
                                            on:mouseover={() => (formData.rating = i + 1)}
											on:click={() => (formData.rating = i + 1)}
											class="cursor-pointer bi bi-star-fill star"
										></i>
									{:else if rating > i && rating < i + 1}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<!-- svelte-ignore a11y-mouse-events-have-key-events -->
										<i
                                            on:mouseover={() => (formData.rating = i + 1)}
											on:click={() => (formData.rating = i + 1)}
											class="cursor-pointer bi bi-star-half star"
										></i>
									{:else}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<!-- svelte-ignore a11y-mouse-events-have-key-events -->
										<i
                                            on:mouseover={() => (formData.rating = i + 1)}
											on:click={() => (formData.rating = i + 1)}
											class="cursor-pointer bi bi-star star"
										></i>
									{/if}
								{/each}
							</div>
						</div>
						<div class="my-6">
							<label for="email" class="text-xs uppercase tracking-widest">Title</label>
							<input bind:value={formData.title} class="border border-black w-full p-1.5 mt-1" />
						</div>
						<div class="my-6">
							<label for="email" class="text-xs uppercase tracking-widest"
								>Your Comment (Optional)</label
							>
							<textarea
								bind:value={formData.comment}
								rows="10"
								class="resize-none border border-black w-full p-1.5 mt-1"
								name=""
								id=""
							></textarea>
						</div>
						<div class="my-6 text-center">
							<button
								class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"
								type="submit"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</section>
		{/if}

		<!-- reviews -->
		<section class="w-full flex justify-center">
			<div class="w-11/12 lg:w-3/5 my-10">
				{#each data.reviews as review}
					<div class="w-full p-8 border-y flex flex-col lg:justify-between gap-8">
						<div class="">
							<p class="text-xs font-medium playfair">{review.user.email}</p>
							<div class="text-xs text-[#A5B1AA] flex items-center gap-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-check-circle-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
									/>
								</svg>
								<span class="py-1">Verified Buyer</span>
							</div>
						</div>

						<div class="w-full lg:w-3/5">
							<div class="flex items-center text-base gap-1">
								{#each Array(5).fill(0) as _, i}
									{#if review.rating >= i + 1}
										<i class="bi bi-star-fill star"></i>
									{:else if review.rating > i && review.rating < i + 1}
										<i class="bi bi-star-half star"></i>
									{:else}
										<i class="bi bi-star star"></i>
									{/if}
								{/each}
								<p class="font-medium hidden lg:inline playfair">{review.title}</p>
							</div>
							<p class="font-medium inline lg:hidden playfair">{review.title}</p>
							{#if review.comment}
								<p class="text-sm py-2 text-justify">
									{review.comment}
								</p>
							{/if}

							<!-- <div class="my-4">
							<p class="font-medium text-sm">Company</p>
							<p class="text-sm py-1">
								We appreciate your feedback and are so happy our products are working for you!
							</p>
						</div> -->
						</div>

						<p>{formatDate(review.dateCreated, 'DATE')}</p>
					</div>
				{/each}
			</div>
		</section>

		<Footer />
	</div>
</section>
