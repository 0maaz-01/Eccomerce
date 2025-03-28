import Product from '../models/product.model.js';
import { redis } from '../lib/redis.js';
import cloudinary from '../lib/cloudinary.js';



export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});   // show everything that is present in the products
        res.json({ products })
    }

    catch(error) {
        console.log("Error in getAllProducts controller", error.message)
        res.status(500).json({ message: "Server Error", error : error.message });
    }
};




export const getFeaturedProducts = async (req, res) => {
    try{
        let featuredProducts = await redis.get("featured_products")
        
        // redis will store the featured products as string that is the reason we need to parse it.
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts))
        }

        // if the featured products is not in redis then we will fetch it from mongo db.
        // .lean() is gonna return a plain hs object instead of a mongodb document which more faster.
        featuredProducts = await Product.find({isFeatured : true}).lean();

        // if no featured products are found 
        if (!featuredProducts) {
            return res.json({ message: "No featured products found" })
        }

        // store in redis for feature quick access
        await redis.set("featured_products", JSON.stringify(featuredProducts));

        // return the products.
        res.json(featuredProducts);
    }   



    catch(error){
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server Error", error : error.message });
    }
};




export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null

        // if there is an image then we will upload it and save it in a folder named as products.
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder : "products"})
        }

        const product = await Product.create({
            name, 
            description, 
            price,
            image : cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        })
        res.status(201).json(product)
    }

    catch(error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({ message: "Server Error", error : error.message });
    }
}




export const deleteProduct = async ( req, res ) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message : "Product not found" });
        }

        // if the product is image. then delete it from cloudinary.
        if (product.image){
            // this will get the id of the image.
            const publicId = product.image.split("/").pop().split(".")[0];

            try{
                // this will delete the image from cloudinary.
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("deleted image from cloudinary.")
            }

            catch(error) {
                console.log("Error deleting image from cloudinary", error)
                console.log("Error in deleteProduct controller", error.message);
            }
        }

        // deleting the image from mongodb.
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message : "Product deleted successfully" })

    }

    catch(error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server Error", error : error.message });
    }
}




export const getRecommendedProducts = async (req, res) => {
    try{
        const products = await Product.aggregate([
            {   // it should display 3 products 
                $sample : {size : 3}
            },
            {   // what properties should be displayed with the product.
                $project:{
                    _id : 1,
                    name : 1,
                    price : 1, 
                    image : 1
                }
            }
        ])

        // display the products.
        res.json(products)
    }

    catch (error){
        console.log("Error in getRecommendedProducts controller", error.message);
        res.status(500).json({ message: "Server Error", error : error.message });
    }
}




export const getProductsByCategory = async (req, res) => {
    
    const { category } = req.params;
    
    try{
        // get all the products of the category and show them on the screen.
        const products = await Product.find( {category} );
        res.json(products);
    }

    catch(error){
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server Error", error : error.message });
    }
}




export const toggleFeaturedProduct = async (req, res) => {

    try{
        const product = await Product.findById(req.params.id);

        if (product) {
            // toggle the isFeatured property.
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();

            // update redis
            await updateFeaturedProductsCache();

            // return the updated product
            res.json(updatedProduct);
        }

        else{
            res.status(404).json({ message: "Product not found" });
        }
    }

    catch(error){
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: "Server Error", error : error.message });
    }
}



async function updateFeaturedProductsCache() {
    try{
        const featuredProducts = await Product.find({ isFeatured : true}).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    }

    catch (error){
        console.log("error in update cache function");
    }
}