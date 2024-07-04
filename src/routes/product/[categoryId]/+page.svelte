<script>
	import Footer from "../../../components/footer.svelte";
	import Nav from "../../../components/nav.svelte";
	import ProductWidget from "../../../components/product-widget.svelte";

</script>
<section>
    <div class="w-full">
        <Nav />

        <section class="w-full">
            <p class="text-4xl text-black my-12 text-center playfair">Deodorants</p>

            <div class="w-full flex flex-col items-start gap-12 px-12">
                <!-- <div class="w-full lg:w-[20%]">

                    <a href="/pages/saved-products.html">
                        <div class="flex flex-row items-center gap-2 border-b border-[#CFD8DF] py-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>
                            <p class="uppercase text-xs tracking-wider">Saved Products</p>
                        </div>
                    </a>
                    <a href="/pages/saved-products.html">
                        <div class="flex flex-row items-center gap-2 border-b border-[#CFD8DF] py-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>
                            <p class="uppercase text-xs tracking-wider">Saved Products</p>
                        </div>
                    </a>
                </div> -->

                <div class="w-full">
                    <p class="text-[#520000] text-sm font-medium pb-4">5 Products</p>

                    <div class="w-full grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        <ProductWidget />

                        <ProductWidget />
                    </div>
            </div>

        </section>

        <Footer />
    </div>
</section>