import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";


export const useProductStore = create((set) => ({
	products: [],
	loading: false,


	setProducts: (products) => set({ products }),


	createProduct: async (productData) => {
		set({ loading: true });
		try {
			// add the new product to the products list.
			const res = await axios.post("/products", productData);
			// keep all the previous products and also add this new product to the array.
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} 
		
		catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},


	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products");
			// we are returning the products in the product.controller.js file as an object and for this reason here we
			// have written response.data.products
			set({ products: response.data.products, loading: false });
		} 
		catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},


	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} 
		catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},


	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} 
		
		catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},


	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} 
		
		catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},


	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} 
		catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
}));
