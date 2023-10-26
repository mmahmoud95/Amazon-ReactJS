// import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { addToCart } from "../../Store/Slice/Cart";

export const ProductDetails = () => {

    const { id } = useParams();
// const dispatch=useDispatch()
// var cart = useSelector((state)=>state.Cart);
// const handelAdd = (product) => {
//     const isProductIncart = cart.some((products) => products.id === product.id);
//     if (!isProductIncart) {
//         dispatch(addToCart(product));
//     }
//     };
    return <div>product-details {id}</div>;
};
