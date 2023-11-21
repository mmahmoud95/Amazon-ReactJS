import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Navbar } from "./layout/Navbar/Navbar";

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
import { AuthProvider, CartProvider } from "./context/authcontex";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {SubCategory} from './pages/subCategory/subCategory';


const stripePromise = loadStripe("pk_test_51OCi3SLRQrL1VrZswDwPuvrsnACjfHOIZRWWV8YwoO8ayi21WLiX8ZfLTEFH2IA0HvyMW5aTpisVbwc72emP0yCf00az2YHAv7");

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/",
    element: <Applayout />,
    children: [
      { path: "cart", element: <Cart /> },
      { path: "products/category/:categoryID", element: <Category /> },
      { path: "products/SubCategory/:SubCategoryID", element: <SubCategory /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "products/results/", element: <Search /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "login/loginStep2", element: <LoginStep2 /> },
  { path: "signup", element: <Register /> },
  { path: "checkout", element: <CheckOut /> },
]);

function App() {
    const [isLogin, setLogin] = useState(
        localStorage.getItem("userToken") ? true : false
    );
    const [lang, setLang] = useState("en");

    //    const {t,i18nKey}=useTranslation()
    //    const changeLanguage=(language)=>{
    //     i18n.changeLanguage(language)
    //     }
    return (
        <>
            {/* <button onClick={()=>changeLanguage('en')}>En</button>
   <button onClick={()=>changeLanguage('ar')}>De</button>
    <hr/>   
         <Trans i18nKey="description.part1">
             hi <div>{t("description.part1")}</div>
         </Trans> */}
      <Elements stripe={stripePromise}>
        <AuthProvider value={{ isLogin, setLogin, lang, setLang }}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </AuthProvider>
      </Elements>
    </>
  );
}

export default App;
