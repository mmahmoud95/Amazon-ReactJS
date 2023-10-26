import { useEffect } from "react";

export const Cart = () => {
    useEffect(() => {
        document.title = "Cart";
    }, []);
    return <div>cart</div>;
};
