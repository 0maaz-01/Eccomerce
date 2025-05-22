import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
    try {

        //  in method will find products whose _id is present in the req.user.cartItems array. in method matches documents where the value of the field (in this case, _id) is within the specified array.
        const products = await Product.find({ _id: { $in: req.user.cartItems } });

        // add quantity for each product
        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);
            return { ...product.toJSON(), quantity: item.quantity };
        });

        res.json(cartItems);
    } 
    
    catch (error) {
        console.log("Error in getCartProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





export const addToCart = async (req, res) => {

    // add to route controller has protected route in between so it will contain req.user too.
    try{
        const { productId } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(item => item.id === productId);


        // if the item already exists then increment the count by one.
        if (existingItem) {
            existingItem.quantity += 1;
        }

        // if the item is not present in the cart then add it to the cart.
        else {
            user.cartItems.push(productId);
        }

        // save the changes made in the card product for the user.
        await user.save();
        res.json(user.cartItems);
    }

    catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message: "Failed to add to cart", error : error.message });
    }
};





export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        // if the item is not present in the cart.
        if (!productId) {
            user.cartItems = [];
        } 
        
        // otherwise only keep those items in the cart whose id is equal to the selected product.
        else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }
        
        // save the user to the database.
        await user.save();
        res.json(user.cartItems);
    } 
    
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





export const updateQuantity = async (req, res) => {
    try {
        // renaming the id as productId after recieving it from req.params.
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find((item) => item.id === productId);

        // if the item exists in the cart.
        if (existingItem) {
            // if the quantity is zero then remove the item from the cart.
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            }

            // if the quantity is not zero then save the quantity given by the user.
            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } 
        
        // if the item doesn't exist in the cart.
        else {
            res.status(404).json({ message: "Product not found" });
        }
    } 
    
    catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
