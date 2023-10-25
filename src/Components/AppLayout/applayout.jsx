import { Outlet } from "react-router-dom";
import { Header } from "../../layout/Navbar/Navbar";
import AFooter from "../AmazonFooter/AFooter";

const Applayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <AFooter/>
        </>
    );
}

export default Applayout;
