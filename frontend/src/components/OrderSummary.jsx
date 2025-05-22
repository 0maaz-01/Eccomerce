import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
      // keep your publishable key here
      "pk_test_51KZYccCoOZF2UhtOwdXQl3vcizup20zqKqT9hVUIsVzsdBrhqbUI2fE0ZdEVLdZfeHjeyFXtqaNsyCJCmZWnjNZa00PzMAjlcL"
);

const OrderSummary = () => {
    //
    const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

    const savings = subtotal - total;
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedTotal = total.toFixed(2);
    const formattedSavings = savings.toFixed(2);


    const handlePayment = async () => {
        const stripe = await stripePromise;
        const res = await axios.post("/payments/create-checkout-session", {
          products: cart,
          couponCode: coupon ? coupon.code : null,
      });

      const session = res.data;
      console.log("session is here", session);
      const result = await stripe.redirectToCheckout({
        // in the backend (payment.controller.js in createCheckoutSession) we are returning the session id as repsonse so from here we need 
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Error:", result.error);
      }
    };


	return (
		<motion.div
        className='space-y-4 rounded-lg border bg-side p-4 shadow-sm sm:p-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className='text-xl font-semibold text-white'>Order summary</p>

        <div className='space-y-4'>
            <div className='space-y-2'>
                <dl className='flex items-center justify-between gap-4 text-white'>
                    <dt className='text-base font-normal text-white'>Original price</dt>
                    <dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
                </dl>

              {savings > 0 && (
                <dl className='flex items-center justify-between gap-4'>
                  <dt className='text-base font-normal text-white'>Savings</dt>
                  <dd className='text-base font-medium text-main'>-${formattedSavings}</dd>
                </dl>
              )}

              {coupon && isCouponApplied && (
                <dl className='flex items-center justify-between gap-4'>
                    <dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
                    <dd className='text-base font-medium text-main'>-{coupon.discountPercentage}%</dd>
                </dl>
              )}
                <dl className='flex items-center justify-between gap-4 border-t border-white pt-2'>
                    <dt className='text-base font-bold text-white'>Total</dt>
                    <dd className='text-base font-bold text-black'>${formattedTotal}</dd>
                </dl>
            </div>

            <motion.button
                className='flex w-full items-center justify-center rounded-lg bg-main px-5 py-2.5 text-sm font-medium text-black hover:bg-hovering focus:outline-none focus:ring-4 focus:ring-black'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePayment}
            >
                Proceed to Checkout
            </motion.button>

            <div className='flex items-center justify-center gap-2'>
                <span className='text-sm font-normal text-white'>or</span>
                <Link
                  to='/'
                  className='inline-flex items-center gap-2 text-sm font-medium text-hovering underline hover:text-black hover:no-underline'
                >
                    Continue Shopping
                    <MoveRight size={16} />
                </Link>
            </div>
        </div>
		</motion.div>
	);
};


export default OrderSummary;