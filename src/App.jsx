import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Navbar } from "./layout/Navbar/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Home } from "./pages/home/home";
import { Cart } from "./pages/cart/cart";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Applayout from "./components/layout/AppLayout/applayout";
import { Category } from "./pages/category/category";
import ProductDetails from "./pages/product-details/ProductDetails";
import CheckOut from "./pages/CheckOut/CheckOut";

import { store } from "./Store/store";
import { Provider } from "react-redux";
import LoginStep2 from "./pages/Login/loginStep2";
import { Search } from "./pages/search/search";
import { AuthProvider } from "./context/authcontex";
import { useState } from "react";
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
        path: "/",
        element: <Applayout />,
        children: [
            { path: "cart", element: <Cart /> },
            { path: "products/category/:categoryID", element: <Category /> },
            { path: "products/:id", element: <ProductDetails /> },
            { path: "products/results/", element: <Search /> },
        ],
    },
    { path: "login", element: <Login /> },
    { path: "login/loginStep2", element: <LoginStep2 /> },
    { path: "signup", element: <Register /> },
    { path: "checkout", element: <CheckOut/> },

]);

function App() {
   const[isLogin,setLogin] =useState(localStorage.getItem('userToken')?true:false)
    return (
        <>
        <AuthProvider value={{isLogin,setLogin}}> <Provider store={store}>
                <RouterProvider router={router} />
            </Provider></AuthProvider>  
        </>
    );
}

export default App;
