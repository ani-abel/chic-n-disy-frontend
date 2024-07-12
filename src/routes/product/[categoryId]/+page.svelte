<script>
	import Nav from "../../../components/nav.svelte";
    import Footer from "../../../components/footer.svelte";
	import ProductWidget from "../../../components/product-widget.svelte";

    export let data;

    const category = data.category.data;
    const products = data.products.data;

</script>
<section>
    <div class="w-full">
        <Nav />

        <section class="w-full">
            <p class="text-4xl text-black my-12 text-center playfair">{category.name}</p>
            <div class="w-full flex flex-col items-start gap-12 px-12">
                <div class="w-full">
                    <p class="text-[#520000] text-sm font-medium pb-4">{products.length} Products</p>

                    <div class="w-full grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {#each products as product}
                            <ProductWidget product={product} />
                        {/each}
                    </div>
            </div>
        </section>
        <Footer />
    </div>
</section>