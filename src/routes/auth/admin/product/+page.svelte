<section class="flex-1 pt-50">
    <div class="w-full flex justify-center">
        <section class="w-11/12">
            <div class="w-full flex justify-between my-4">
                <p class="text-2xl">Products</p>
                <a class="bg-black-gold text-white font-medium px-6 py-2 text-sm mt-4 cormorant-sc-light" 
                    href="/auth/admin/product/add"
                >Create
                </a>
            </div>

            <!-- Filters start here -->
            <div class="grid grid-cols-12 gap-4">
                <!-- Equivalent to Bootstrap's col-sm-6 -->
                <div class="col-span-12 sm:col-span-4 bg-black-gold p-4">
                    <label for="password" class="text-xs uppercase tracking-widest">In Stock</label>
                    <select class="border border-black w-full p-1.5 mt-1">
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                    </select>
                </div>
                <div class="col-span-12 sm:col-span-8 bg-black-gold p-4">
                    <label for="password" class="text-xs uppercase tracking-widest">Search</label>
                    <input 
                        type="search"
                        name="search"
                        class="border border-black w-full p-1.5 mt-1"
                    />
                </div>
            </div>
            <!-- Filters end here -->
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr id="thead">
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Payment Mode</th>
                            <th>Reference No</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr id="tr">
                            <td>30,000</td>
                            <td>Payment for Perfume</td>
                            <td>paystack</td>
                            <td>02034-492042-4949</td>
                            <td>09/04/2020</td>
                            <td>active</td>
                            <td>
                                <div class="flex items-center gap-2">
                                <a href="/auth/admin/product/peoeorodk">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                    </svg>
                                </a>
                                    <span class="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="container mx-auto">
                <!-- Content here -->
                
                <!-- Pagination Controls -->
                <div class="flex justify-center mt-8">
                <nav class="inline-flex space-x-2">
                    <a href="#" class="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-black rounded-md">Previous</a>
                    <a href="#" class="px-3 py-2 bg-black text-white hover:bg-black rounded-md">1</a>
                    <a href="#" class="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-black rounded-md">2</a>
                    <a href="#" class="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-black rounded-md">Next</a>
                </nav>
                </div>
            </div>
        </section>
    </div>
</section>

 <!-- modal -->
 <section id="backdrop" class="backdrop">
    <div class="modal w-11/12 sm:w-10/12 md:w-3/5 lg:w-1/2">
        <div class="px-8 py-4">
            <div class="w-full flex justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="20" height="20" fill="currentColor" 
                class="bi bi-x-lg close" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </div>

            <h2 class="text-xl text-center my-4">Form</h2>
            <form>
                <label for="name" class="text-xs uppercase tracking-widest">Name</label>
                <input 
                    type="text"
                    name="name"
                    class="border border-black w-full p-1.5 mt-1"
                />
                <div class="my-6">
                    <label for="tile" class="text-xs uppercase tracking-widest">Title</label>
                    <input 
                        type="text"
                        name="tile"
                        class="border border-black w-full p-1.5 mt-1"
                    />
                </div>

                <div class="my-6">
                    <label for="desc" class="text-xs uppercase tracking-widest">Description</label>
                    <textarea name="desc" rows="4" class="border border-black w-full p-1.5 mt-1"></textarea>
                </div>

                <div class="my-6 flex flex-col">
                    <label for="file" class="text-sm uppercase tracking-widest font-semibold">Add Media</label>
                    <input 
                        type="file"
                        name="file"
                        class="border border-black p-1.5 my-2 w-fit"
                    />
                    <span class="text-xs text-black font-semibold">Upload up to 10 images and 3 videos (max. file size 2 GB)</span>
                </div>

                <div class="my-6 text-center flex justify-center">
                    <input 
                    type="submit"
                    value="Submit"
                    class="bg-black uppercase text-sm py-3 tracking-widest w-1/2 text-white mt-4 mb-3"
                    />
                </div>
            </form>
        </div>
    </div>
</section>