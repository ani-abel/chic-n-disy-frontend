<script>
    import { slide } from 'svelte/transition';
	import Nav from '../../components/nav.svelte';
	import Footer from '../../components/footer.svelte';

	const faqToggle = {
		closeQuestionOne: false,
		closeQuestionTwo: true,
		closeQuestionThree: true
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

<section>
	<div class="w-full">
		<Nav />
		<section class="w-full flex justify-center">
			<div class="w-11/12 lg:w-[55%] my-10">
				<p class="text-center text-4xl playfair">Customer Service</p>
				<p class="text-base uppercase tracking-wider py-4 underline">Contact us</p>

				<div class="mt-4">
					<p class="text-justify text-base">
						Ask about our products, an order you placed, and get expert fabric care advice. We’re
						here to ensure you have an exceptional experience.
					</p>
					<p class="text-base py-4">
						Monday - Thursday 10:30am to 5pm EST, Friday 9:30am to 1pm EST
					</p>

					<p class="text-base py-4">Email Us: customerservice@thelaundress.com</p>
					<p class="text-base py-4">Call Us: +1-800-282-4121</p>

					<p class="text-base py-4">
						Our Customer Service team works to respond to all inquiries within 24-48 hours. To help
						ensure the quickest response, kindly leave only one message, and include your order
						number, if applicable.
					</p>

					<p class="text-lg tracking-wider uppercase underline py-4">Media&nbsp;inquiries</p>
					<p class="text-base underline py-4">Email us: communications@thelaundress.com</p>

					<div class="w-full my-12">
						<p class="text-center text-4xl">Frequently Asked Questions</p>
						<p class="text-base uppercase text-center py-8">Media&nbsp;inquiries</p>
						<div class="relative mb-1">
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<h6
								class="mb-0"
								on:keydown={() => (faqToggle.closeQuestionOne = !faqToggle.closeQuestionOne)}
								on:click={() => (faqToggle.closeQuestionOne = !faqToggle.closeQuestionOne)}
							>
								<button
									class="relative flex items-center w-full p-4 text-left transition-all ease-in border-b border-solid cursor-pointer border-black text-black rounded-t-1 group text-dark-500"
									data-collapse-target="animated-collapse-1"
								>
									<span>What is Material Tailwind?</span>
									<i
										class="absolute right-5 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"
									></i>
								</button>
							</h6>
							{#if !faqToggle.closeQuestionOne}
								<div
									in:slide={{ duration: 600, delay: 300 }}
									out:slide={{ duration: 600, delay: 300 }}
								>
									<div class="p-4 text-sm leading-normal text-blue-gray-500/80">
										We're not always in the position that we want to be at. We're constantly
										growing. We're constantly making mistakes. We're constantly trying to express
										ourselves and actualize our dreams.
									</div>
								</div>
							{/if}
						</div>

                        <div class="relative mb-1">
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<h6
								class="mb-0"
								on:keydown={() => (faqToggle.closeQuestionTwo = !faqToggle.closeQuestionTwo)}
								on:click={() => (faqToggle.closeQuestionTwo = !faqToggle.closeQuestionTwo)}
							>
								<button
									class="relative flex items-center w-full p-4 text-left transition-all ease-in border-b border-solid cursor-pointer border-black text-black rounded-t-1 group text-dark-500"
									data-collapse-target="animated-collapse-1"
								>
									<span>What is Material Tailwind?</span>
									<i
										class="absolute right-5 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"
									></i>
								</button>
							</h6>
							{#if !faqToggle.closeQuestionTwo}
								<div
									in:slide={{ duration: 600, delay: 300 }}
									out:slide={{ duration: 600, delay: 300 }}
								>
									<div class="p-4 text-sm leading-normal text-blue-gray-500/80">
										We're not always in the position that we want to be at. We're constantly
										growing. We're constantly making mistakes. We're constantly trying to express
										ourselves and actualize our dreams.
									</div>
								</div>
							{/if}
						</div>

                        <div class="relative mb-1">
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<h6
								class="mb-0"
								on:keydown={() => (faqToggle.closeQuestionThree = !faqToggle.closeQuestionThree)}
								on:click={() => (faqToggle.closeQuestionThree = !faqToggle.closeQuestionThree)}
							>
								<button
									class="relative flex items-center w-full p-4 text-left transition-all ease-in border-b border-solid cursor-pointer border-black text-black rounded-t-1 group text-dark-500"
									data-collapse-target="animated-collapse-1"
								>
									<span>What is Material Tailwind?</span>
									<i
										class="absolute right-5 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"
									></i>
								</button>
							</h6>
							{#if !faqToggle.closeQuestionThree}
								<div
									in:slide={{ duration: 600, delay: 300 }}
									out:slide={{ duration: 600, delay: 300 }}
								>
									<div class="p-4 text-sm leading-normal text-blue-gray-500/80">
										We're not always in the position that we want to be at. We're constantly
										growing. We're constantly making mistakes. We're constantly trying to express
										ourselves and actualize our dreams.
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</section>

		<Footer />
	</div>
	<script src="https://unpkg.com/@material-tailwind/html@latest/scripts/script-name.js"></script>
	<script src="node_modules/@material-tailwind/html@latest/scripts/ripple.js"></script>

	<!-- from cdn -->
	<script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
</section>
