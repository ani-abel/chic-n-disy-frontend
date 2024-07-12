<script>
	import { slide } from "svelte/transition";

    let hide = true;
</script>

<nav>
    <div class="bg-[#CFD8DF] text-center p-4 hidden lg:block">
        <p class="font-semibold text-sm playfair tracking-widest uppercase text-black">
            Free Ground Shipping ₦4,000 Purchase
        </p>
    </div>
    <div class="w-full border-b p-8 border-[#f4f4f4] flex justify-between items-center gap-8">
        <a href="/search">
            <button class="hidden lg:inline-block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                    />
                </svg>
            </button>
        </a>

        <button on:click={() => (hide = !hide)} class="inline-block lg:hidden" id="myBtn">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
            >
                <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
            </svg>
        </button>

        <div class="text-center pl-4 sm:pl-8 lg:pl-0">
            <a href="/" class="hidden lg:block">
                <div
                    class="text-xs sm:text-base h-24 lg:text-lg uppercase text-[#47484A] font-semibold tracking-widest w-full"
                >
                <img src="https://ik.imagekit.io/37hskgspznp/disy_YF3j0SS20.jpg?updatedAt=1719914779230&tr=w-100,h-80" 
                alt="Chick 'N' Disy Logo" 
                class="w-full h-full object-contain"/>
                </div>
            </a>
            <a href="/" class="block lg:hidden">
                <div class="text-xs sm:text-base h-10 lg:h-24 lg:text-lg uppercase text-[#47484A] font-semibold tracking-widest w-full">
                <img src="https://ik.imagekit.io/37hskgspznp/disy_YF3j0SS20.jpg?updatedAt=1719914779230&tr=w-250,h-100" 
                    alt="Chick 'N' Disy Logo" 
                    class="w-full h-full object-contain"
                />
                </div>
            </a>
            <div class="text-sm hidden lg:flex flex-row items-center gap-8 pt-4">
                <a href="/">
                    <p>Home</p>
                </a>
                <a href="/about">
                    <p>About Us</p>
                </a>
                <a href="contact-us">
                    <p>Contact Us</p>
                </a>
            </div>
        </div>
        {#if !hide}
        <!-- responsive nav here -->
        <nav id="nav" class="display-block nav text-sm pr-4" in:slide={{ duration: 600, delay: 300 }} out:slide={{ duration: 600, delay: 300 }}>
            <div class="w-full flex justify-end py-2">
                <svg on:click={() => (hide = true)}
                    on:keydown={() => (hide = true)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-x-lg close"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                    />
                </svg>
            </div>

            <a href="/pages/categories.html">
                <div class="pb-4 border-b pl-8 py-4">
                    <p>Shop All</p>
                </div>
            </a>
            <a href="/">
                <div class="pb-4 border-b pl-8 py-4">
                    <p>Home</p>
                </div>
            </a>
            <a href="/about">
                <div class="pb-4 border-b pl-8 py-4">
                    <p>About Us</p>
                </div>
            </a>
            <a href="/contact-us">
                <div class="pb-4 border-b pl-8 py-4">
                    <p>Contact Us</p>
                </div>
            </a>
        </nav>
        {/if}

        <div class="flex gap-4 md:gap-8 items-center">
            <!-- icons -->

            <a href="/auth" class="">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                    />
                </svg>
            </a>
            <a href="/search">
                <button class="inline-block lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                        />
                    </svg>
                </button>
            </a>
            <a href="/pages/orders.html">
                <button class="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-bag"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
                        />
                    </svg>
                </button>
            </a>
        </div>
    </div>
    <!-- Alert section -->
    <div class="bg-[#CFD8DF] text-center p-6 block lg:hidden">
        <p class="font-semibold text-[10px] tracking-widest playfair uppercase text-black">
            Free Ground Shipping ₦4,000 Purchase
        </p>
    </div>
</nav>