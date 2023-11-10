import toast from "react-hot-toast";
import { instance } from "./axios/instance";
import { addToCart, removFromCart } from "../Store/Slice/Cart";
// import { useDispatch, useSelector } from "react-redux";

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


// export const removeToCartWithAPI = (product) => async (dispatch) => {
//       dispatch(removFromCart(product.product._id));
// // dispatch(removFromCart(product))
//   try {
//     await instance.delete(`/cart`, {
//       headers: {
//         Authorization: localStorage.getItem("userToken"),
//       },
//     });

//   } catch (error) {
//     console.error("Error removing item from cart:", error);
 
//   }
// };


export const removeToCartWithAPI = (productId) => async (dispatch) => {
  dispatch(removFromCart(productId));
  try {
    const response = await instance.delete(`/cart/${productId._id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken"),
      },
    });
    

    if (response.status === 201) {
      console.log('success');
    } else {
      console.log("Failed to remove item from cart");
    }
  } catch (error) {
    console.log("Error removing item from cart:", error);
  }
};
