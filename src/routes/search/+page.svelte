<script>
	import Nav from "../../components/nav.svelte";
    import Footer from "../../components/footer.svelte";
	import ProductWidget from "../../components/product-widget.svelte";
 
</script>
<section>
    <div class="w-full">
        <Nav />

        <section class="w-full">
            <section class="w-full flex justify-center">
                <div class="w-10/12 md:w-6/12 lg:w-8/12 text-center">
                        <div class="my-6">
                            <input 
                                required
                                placeholder="Search..."
                                type="search"
                                name="search"
                                class="border border-black w-full p-1.5 mt-1"
                            />
                        </div>
                        <!-- <div class="my-6 text-center">
                            <button class="bg-black uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3" type="submit">
                                Submit
                            </button>
                            <p class="mt-0">Already have an account? <a href="/auth"><span class="blue">Login</span></a></p>
                        </div> -->
                </div>
            </section>

            <!-- Results found -->
            <div class="w-full flex flex-col items-start gap-12 px-12">
                <div class="w-full">
                    <p class="text-[#520000] text-sm font-medium pb-4">5 search results</p>
                    <div class="w-full grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        <ProductWidget />

                        <ProductWidget />
                    </div>
            </div>

            <!-- No content found -->
            <div class="w-full flex flex-col items-start gap-12 px-12">
                <div class="w-full">
                    <p class="text-[#520000] text-sm font-medium pb-4">0 search results</p>
                    <div class="w-full grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        <h1>No content</h1>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</section>
