import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });


    const { createProduct, loading } = useProductStore();

    
    // when the button is clicked call the createProduct function from useProductStore.js
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // create the product
            await createProduct(newProduct);
            // reset the form on the admin screen.
            setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
        } 
        
        catch {
            console.log("error creating a product");
        }
    };


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setNewProduct({ ...newProduct, image: reader.result });
        };
  
        reader.readAsDataURL(file); // base64
      }
    };
  

    /*const handleImageChange = (e) => {
        // convert the image file to base 64 file bcoz it helps in the efficiency of the website.
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            setNewProduct({ ...newProduct, image: reader.result });
          };

          reader.readAsDataURL(file); // base64
        }
    };*/

 
  
    return (
      <motion.div
          className='bg-side shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
      >
          <h2 className='text-2xl font-semibold mb-6 text-white'>Create New Product</h2>
  
  
          <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                  <label htmlFor='name' className='block text-sm font-medium text-white'>
                      Product Name
                  </label>

                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className='mt-1 px-3  block py-2 w-full bg-white border-2 border-black rounded-md shadow-sm 
                               focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black'
                    required  />
              </div>
      
    
            <div>
                <label htmlFor='description' className='block text-sm font-medium text-white'>
                  Description
                </label>

                <textarea
                  id='description'
                  name='description'
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows='3'
                  className='mt-1  py-2 px-3  block w-full  border-2 border-black rounded-md shadow-sm 
                               focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black'
                  required/>
            </div>
    
    
            <div>
              <label htmlFor='price' className='block text-sm font-medium text-white'>
                  Price
              </label>

              <input
                type='number'
                id='price'
                name='price'
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                step='1'
                className='mt-1  py-2 px-3  block w-full  border-2 border-black rounded-md shadow-sm 
                               focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black'
                required />
            </div>
    
    
            <div>
                <label htmlFor='category' className='block text-sm font-medium text-white'>
                    Category
                </label>
    
              <select
                  id='category'
                  name='category'
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className='mt-1  py-2 px-3 text-black  block w-full  border-2 border-black rounded-md shadow-sm 
                               focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black0'
                  required >
      
                  <option value=''>Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
    
    
            <div className='mt-1 flex items-center'>
                <input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
                
                <label
                    htmlFor='image'
                    className='cursor-pointer  py-2 px-3 bg-[#000000] hover:bg-[#323232] rounded-md shadow-sm text-sm leading-4 font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:black'>
        
                    <Upload className='h-5 w-5 inline-block mr-2' />
                    Upload Image
                </label>
              {newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image uploaded </span>}
            </div>
    
    
            <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                shadow-sm text-sm font-medium text-black bg-[#FFE4C4]
							 hover:bg-[#f89d2e] focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-black transition duration-150 ease-in-out disabled:opacity-50 disabled:opacity-50'
                // disabled={loading}>
                >
      
                {loading ? (
                  <>
                      <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                      Loading...
                  </>
                ) : (
                  <>
                      <PlusCircle className='mr-2 h-5 w-5' />
                      Create Product
                  </>
                )}
              </button>
          </form>       
      </motion.div>
    );
  };
  
  
  export default CreateProductForm;
  