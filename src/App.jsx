import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar } from "./layout/Navbar/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Cart } from "./pages/cart/cart";
import { ProductDetails } from "./pages/product-details/product-details";
import AFooter from "./components/AmazonFooter/AFooter";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/product/:id' element={<ProductDetails />} />
                </Routes>
                <AFooter />
            </BrowserRouter>
        </>
    );
}

export default App;
