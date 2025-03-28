import Coupon from "../models/coupon.model.js";
import { stripe } from "../lib/stripe.js";
import Order from "../models/order.model.js";



export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;

        // If the product is not in the format of the array or the length of product is zero.
        if (!Array.isArray(products) || products.length == 0) {
            return res.status(400).json({ error: "Invalid or empty products array." });
        }

        let totalAmount = 0;

        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100)          // this will convert the amount into cents because stripe want you to send the price in cents.
        
            totalAmount += amount * product.quantity

            return  {
                price_data: {
                    currency : "usd",
                    product_data: {
                        name : product.name,
                        images : [product.image],       // to send the images in the format of array.
                    },
                    unit_amount: amount
                }
            }
        });

        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({code : couponCode, isActive:true, userId : req.user._id});
            
            // if the coupon is valid
            if (coupon) {
                totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100);
            }
        }

        const session = await stripe.checkout.create({
            payment_method_types : ["card", "paypal"],   // you can remove paypal too.
            line_items : lineItems,
            // what is the mode : payment, subscription or something else.
            mode : "payment",
            success_url : `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url : `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts : coupon
                ?   [
                        {
                            coupon : await createStripeCoupon(coupon.discountPercentage),
                        },
                ] : [],
            
            // 
            metadata :   {
                userId : req.user._id.toString(),    // this is an object and for this reason we will convert it to a string.
                couponCode : couponCode || "",
                // for each product we will return the id product and price.
                products: JSON.stringify(
                    products.map((p) => ({
                        id: p._id,
                        price : p.price,
                        quantity : p.quantity
                    }))
                )
            },

        });
                // 20000 cents = 200 dollars.
        if (totalAmount >= 20000) {
            await createNewCoupon(req.user._id)
        }

        // this session id will be used to display the payment page to the user.
        res.status(200).json({ id:session.id, totalAmount: totalAmount/100});
    }

    catch (error) {
        res.status(500).json({ message: "Server Error", error : error.message });
    }
}





async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        // the pecrcentage of price that would be removed.
        percent_off : discountPercentage,
        // the coupon can be used only once.
        duration : "once",
    })

    return coupon.id;
}




async function createNewCoupon(userId){
    const newCoupon = new Coupon({
        // generating code for a coupon.
        code : "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage : 10,
        // the coupon will expire 30 days from now
        expirationDate : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId : userId,
    })

    await newCoupon.save();
    return newCoupon;
}






export const checkoutSuccess = async(req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // if the payment has been completed.
        if (session.payment_status === "paid"){
            // if the coupon is used then we will deactivate it.
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate({
                    code: session.metadata.couponCode, userId:session.metadata.userId
                }, {
                    isActive : false
                })
            }

            // create a new order
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user:session.metadata.userId,
                products: products.map(product => ({
                    product : product.id,
                    quantity: product.quantity,
                    price : product.price
                })),

                totalAmount : session.amount_total / 100,        // convert cents to dollars
                stripeSessionId : sessionId
            })

            await newOrder.save();
            res.status(200).json({ 
                success : true,
                message: "Order created successfully", 
                orderId : newOrder._id });
        }
    }

    catch (error) {
        console.error("Error processing successful checkout.". error);
        res.status(500).json({ message : "Error proccessing successful checkout", error : error.message});
    }
}