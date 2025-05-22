import React from 'react'

const ProductPage = () => {
  return (
        <div className="bg-main">
            <div className="container mx-auto px-4 py-8 bg-main">
                <div className="flex flex-wrap -mx-4">
                
                <div class=" w-full lg:w-1/2 mb-8  ">
                    <div className="m-4 mb-0  sm:m-0    bg-side p-4 rounded-xl 2xl:m-4">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Product"
                                    className="w-full h-auto rounded-lg shadow-md mb-4 mt-4" id="mainImage"/>
                        <div class="flex gap-4 py-4 justify-center overflow-x-auto">
                            <img src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 1"
                                            className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                            onclick="changeImage(this.src)"/>
                            <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 2"
                                            className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                            onclick="changeImage(this.src)"/>
                            <img src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 3"
                                            className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                            onclick="changeImage(this.src)"/>
                            <img src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 4"
                                            className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                            onclick="changeImage(this.src)"/>
                        </div>
                    </div>
                </div>

              
                    <div className="w-full              lg:w-1/2     px-4    sm:px-0  lg:px-4 bg-main">
                        <div className=" w-full   max-w-[1024px]     lg:ml-4      lg:mt-2    xl:mt-2 xl:ml-4            2xl:mt-4    2xl:ml-4  lg:max-w-[700px]">
                            <h2 className="text-2xl       sm:text-3xl      md:text-3xl  md:mb-2    lg:text-2xl lg:mb-0         xl:text-3xl xl:mb-0             2xl:text-4xl     font-bold  text-black">Premium Wireless Headphones</h2>
                            <p className="sm:text-base     md:text-lg             lg:text-sm lg:mb-0     xl:text-base       2xl:text-xl 2xl:mt-1 2xl:mb-1    text-black   ">SKU: WH1000XM4</p>
                            <div className="mb-1   sm:mt-1   2xl:mb-2">
                                <span className="lg:text-lg   xl:text-2xl   text-black font-bold mr-2">$349.99</span>
                                <span className="text-black line-through">$399.99</span>
                            </div>
                            <div className="flex items-center mb-4  sm:mb-4  md:mb-4   lg:mb-2     xl:mb-4 ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd" />
                                </svg>
                                <span className="ml-2 text-black  2xl:text-lg">4.5 (120 reviews)</span>
                            </div>
                            <p className="text-black       sm:text-lg  sm:mb-4  md:mb-6   xl:mb-6   lg:mb-4  xl:text-lg    max-h-[170px] mb-4    sm:max-h-[170px]     lg:max-h-[145px]      2xl:max-h-[200px] overflow-auto         md:max-h-[190px]  xl:max-h-[170px]   2xl:text-xl">Despite the steady hum of conversation and the clinking of glasses echoing softly through the dimly lit café, Olivia remained fixated on the curious leather-bound journal she had found tucked behind the radiator in her rented flat just two days earlier. Its pages were filled with a strange mixture of elegant handwriting, archaic sketches, and cryptic symbols that seemed to shift subtly whenever she looked away and back again. At first, she thought it was some forgotten piece of fiction or a misplaced prop from the antique bookstore down the lane, but now she wasn't so sure. The entries detailed events that had not yet occurred, weather patterns too specific to be mere guesses, and names—hers included—that made her skin crawl with a strange mixture of dread and fascination. She had tried to show it to a friend, but the pages had gone inexplicably blank in their presence, as though the book itself was choosing who could read it. Now, with each passing hour, she felt more drawn into its mystery, almost as if something—or someone—was willing her to follow its path. The further she read, the more she realized that whatever force had left this journal for her wasn’t done yet, and the clock was ticking.</p>



                            <div class="flex space-x-4   mb-4   sm:mb-4       xl:mb-6">
                                <button
                                    className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>

                            <div className="mb-6">
                                <label for="quantity" className="text-black block text-sm font-medium  xl:text-base      2xl:text-lg     mb-1">Quantity:</label>
                                <input type="number" id="quantity" name="quantity" min="1" value="1"
                                                className="w-12 text-center rounded-md border-gray-300 text-black  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                            </div>


                            <div>
                                <h3 className="lg:text-base      xl:text-lg font-semibold mb-2 text-black       2xl:text-xl">Key Features:</h3>
                                <ul className="xl:list-disc     lg:text-base       xl:text-lg   xl:list-inside text-black       2xl:text-xl">
                                    <li>Industry-leading noise cancellation</li>
                                    <li>30-hour battery life</li>
                                    <li>Touch sensor controls</li>
                                    <li>Speak-to-chat technology</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<script>
                function changeImage(src) {
                        document.getElementById('mainImage').src = src
                    }
            </script>*/}
            </div>
  )
}

export default ProductPage;