import toast from "react-hot-toast";
import { instance } from "./axios/instance";
import { addToCart } from "../Store/Slice/Cart";
import { useDispatch, useSelector } from "react-redux";

export const login = (data) => {
    return instance.post("api/user/checkEmail", data).catch((error) => {
        if (error.response.status === 404) {
            toast.error("Email not found. Please sign up", {
                position: "top-center",
            });
        }
        throw error;
    });
};

export const registerr = (data) => {
    return instance.post("/api/user/signup", data);
};

export const addToCartWithAPI = (product) => async (dispatch) => {
    console.log(product.product._id);
    dispatch(addToCart(product));
    try {
        const response = await instance.post(
            "/cart",
            { productId: product.product._id },
            {
                headers: {
                    Authorization: localStorage.getItem("userToken"),
                },
            }
        );
        console.log(response);
        //  response.status(201)
    } catch (error) {
        console.log("error");
    }
    // try {

    //   const response = await instance.post('/cart');
    //   console.log(response);
    // //  response.status(201)
    // } catch (error) {
    //   console.log('error');
    // }
};
