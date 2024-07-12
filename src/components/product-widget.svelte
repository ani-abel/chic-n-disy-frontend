<script>
    export let /** @type {any} */ product;

    let /** @type {string} */ imageUrl;
    if (product.imagesForThisProduct.length > 0) {
        imageUrl = product.imagesForThisProduct[0].url;
    }
</script>

<div class="w-full pt-10 h-fit">
    <img 
        src={imageUrl} 
        alt={product.name}
        class="w-full h-[15rem]"
    />
    <div class="text-center bg-[#FAF8F3]">
        <a href="/product-detail/{product.id}">
            <p class="font-medium text-sm">{product?.name}</p>
            <p class="text-xs">{product?.description}</p>
        </a>
        <div class="flex justify-center my-8 gap-1 text-sm items-center">
            {#each Array(product?.rating) as _}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            {/each}
            {#if product?.rating > 5}
                <p>&nbsp;{product?.rating}</p>
            {/if}
        </div>
        <div class="w-full p-2">
            <button class="w-full flex justify-between items-center bg-[#BFCBC6] border border-[#000] text-sm font-medium p-2">
                <p class="cursor-pointer">Add to Bag</p>
                <p>₦{(product?.unitPrice).toLocaleString('en-US')}</p>
            </button>
        </div>
    </div>
</div>