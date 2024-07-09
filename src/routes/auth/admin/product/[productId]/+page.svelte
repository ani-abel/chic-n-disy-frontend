<script>

</script>

<section class="w-11/12 pt-50">
    <section class="grid grid-cols-12 gap-4">
        <div class="col-span-12 sm:col-span-2"></div>
        <div class="col-span-12 sm:col-span-8 p-4">
            <h2 class="text-4xl text-center my-12">Edit Product</h2>
            <form>
                <div class="my-6">
                    <label for="email" class="text-xs uppercase tracking-widest">Name</label>
                    <input 
                        type="email"
                        name="email"
                        class="border border-black w-full p-1.5 mt-1"
                    />
                </div>

                <div class="my-6">
                    <label for="email" class="text-xs uppercase tracking-widest">Quantity</label>
                    <input 
                        type="number"
                        min="1"
                        value="1"
                        name="quantity"
                        class="border border-black w-full p-1.5 mt-1"
                    />
                </div>

                <div class="my-6">
                    <label for="password" class="text-xs uppercase tracking-widest">Price per unit</label>
                    <input 
                        type="number"
                        min="1"
                        value="1"
                        name="unitPrice"
                        class="border border-black w-full p-1.5 mt-1"
                    />
                </div>

                <div class="my-6">
                    <label for="password" class="text-xs uppercase tracking-widest">Product Category</label>
                    <select class="border border-black w-full p-1.5 mt-1">
                        <option>Perfumes</option>
                    </select>
                </div>

                <div class="border-top-solid mt-10 my-6 pt-10">
                    <!-- Custom File Upload Button -->
                    <label class="relative cursor-pointer bg-black text-white font-medium py-2 px-4 rounded-md shadow hover:bg-black focus:ring focus:ring-blue-300 focus:outline-none">
                        <span>Upload Photo(s)</span>
                        <input accept="image/*" type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                    </label>
                    
                    <div class="container mx-auto">
                        <!-- Photo Gallery -->
                        <div class="my-6 text-center">
                          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div class="bg-white p-4 shadow rounded-lg">
                              <img src="https://via.placeholder.com/150" alt="Photo 1" class="w-full h-auto rounded-md" />
                            </div>
                          </div>
                        </div>
                      </div>
                </div>

                <div class="border-top-solid mt-10 my-6 pt-10">
                    <!-- Custom File Upload Button -->
                    <label class="relative cursor-pointer bg-black text-white font-medium py-2 px-4 rounded-md shadow hover:bg-black focus:ring focus:ring-blue-300 focus:outline-none">
                        <span>Upload Video</span>
                        <input accept="video/*" type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                    </label>
                    
                    <div class="container mx-auto">
                        <!-- Photo Gallery -->
                        <div class="my-6 text-center">
                          <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div class="product-video-preview bg-white p-4 shadow rounded-lg">
                              <img src="https://via.placeholder.com/150" alt="Photo 1" class="w-full h-full rounded-md">
                            </div>
                          </div>
                        </div>
                      </div>
                </div>

                <div class="my-6 text-center">
                    <input 
                    type="submit"
                    value="Submit"
                    class="bg-black-gold uppercase text-sm py-3 tracking-widest w-full text-white mt-4 mb-3"
                    />
                </div>
                </form>
        </div>
    </section>
</section>