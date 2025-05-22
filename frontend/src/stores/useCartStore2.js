import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: [],
	coupon: null,
	total: 0,
	subtotal: 0,
	// isCouponApplied: false,

	/*getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},
	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });
			set({ coupon: response.data, isCouponApplied: true });
			get().calculateTotals();
			toast.success("Coupon applied successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	},
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},*/


	getCartItems: async () => {
		try {
			const res = await axios.get("/cart");
			set({ cart: res.data });
			get().calculateTotals();
		} 
		
		catch (error) {
			set({ cart: [] });
			toast.error(error.response.data.message || "An error occurred");
		}
	},


	/*clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},*/


	addToCart: async (product) => {
		try {
			await axios.post("/cart", { productId: product._id });
			toast.success("Product added to cart");

			set((prevState) => {
				// check whether the product is already present in the cart or not by its id.
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				// if the item is already present in the cart
				const newCart = existingItem
					? prevState.cart.map((item) =>
							// then increase this product quantity by one and for the other products keep the quantity same
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )
					  // if the product is not present in the cart, then keep all the previous products in the cart with same
					  // quantity and add this product with quantity = 1
					: [...prevState.cart, { ...product, quantity: 1 }];

				// after all these things replace the cart with the new cart.
				return { cart: newCart };
			});
			get().calculateTotals();
		} 
		
		catch (error) {
			toast.error(error.response.data.message || "An error occurred");
		}
	},


	/*removeFromCart: async (productId) => {
		await axios.delete(`/cart`, { data: { productId } });
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
	},
	updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
	},*/


	calculateTotals: () => {
		// to use the constants that are present above.
		const { cart, coupon } = get();
		// reduce function will keep on reducing the prices of the products by adding them till only one value is remaining and that is the sum of the values.
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		let total = subtotal;

		if (coupon) {
			const discount = subtotal * (coupon.discountPercentage / 100);
			total = subtotal - discount;
		}
		// after adding or removing a product, the subtotal and total price will change and this function will set the value for these variables so that 
		// they can be used further.
		set({ subtotal, total });
	},
}));
