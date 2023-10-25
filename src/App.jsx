import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar } from "./layout/Navbar/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Cart } from "./pages/cart/cart";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route index path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
