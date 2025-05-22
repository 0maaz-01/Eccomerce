import React, { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './stores/useUserStore';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { useCartStore } from './stores/useCartStore';
import ProductPage from './pages/ProductPage';
import VideoPage from './pages/VideoPage';
import CategoryItem from './components/CategoryItem';
import CartItem from './components/CartItem';
import FeaturedProducts from './components/FeaturedProducts';
import PeopleAlsoBought from './components/PeopleAlsoBought';
import OrderSummary from './components/OrderSummary';
import GiftCouponCard from './components/GiftCouponCard';


const App = () => {

	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

//	useEffect(() => {
//		checkAuth();
//	}, [checkAuth])

//	if ( checkingAuth ) return <LoadingSpinner/>

// this will fetch the no. of items in the cart for the current user.
useEffect(() => {
	if (user) getCartItems();
}, [getCartItems, user])

  return (
	<div className='min-h-screen bg-gray-900 text-white relative'>

		
			{/* to set the Background gradient or the background color of the screen*/}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#FFE4C4]' />
				</div>
			</div>
	
		<div className='relative z-50 pt-20'>
			<Navbar/>
			<Routes>
				<Route path = "/" element = { <HomePage/> }/>
				<Route path = "/signup" element = { <SignUpPage/> }/>
				{/*If the user has logged in then send him to the home page otherwise keep him on the Login Page.*/}
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to = '/'/>} />
				<Route 
					path='/secret-dashboard' 
					element={user?.role === "admin" ? <AdminPage /> : <Navigate to = '/login'/>} 
				/>

				<Route 
					path='/category/:category' 
					element = { <CategoryPage/> }
				/>

				<Route
					  path = "/cart" element = {user ? <CartPage/> : <Navigate to = '/login'/>}
				/>
				<Route
					path='/purchase-success'
					element = {<PurchaseSuccessPage />}
					// element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
				/>
				<Route path='/purchase-cancel' 
					// element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} 
					element={<PurchaseCancelPage />}
				/>

			</Routes>
		 </div>
		 {/*To display the errors on the screen.*/}
		 <Toaster/>
	</div>
  )
}

export default App