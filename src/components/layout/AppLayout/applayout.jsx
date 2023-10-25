import { Outlet } from "react-router-dom";
import { Header } from "../Navbar/navbar";
import Footer from "../AmazonFooter/Footer";

const Applayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Applayout;
