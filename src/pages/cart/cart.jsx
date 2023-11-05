import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removFromCart, udateQuantity } from "../../Store/Slice/Cart";
import { ProductCard } from "../../components/category-product/productCard";
import { useContext, useState } from "react";
import { json, useParams } from "react-router-dom";
import { useEffect } from "react";
import { authContext } from "../../context/authcontex";
import axios from "axios";
import { instance } from "../../services/axios/instance";

// import { instance } from "../../services/axios/instance";
export const Cart = () => {
    const { isLogin, setLogin } = useContext(authContext);
    let cartPage = useSelector((state) => state.Cart);
    console.log(cartPage);
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();

    if (isLogin) {
        cartPage;
        const productId = cartPage[0]?.product._id;
        var increase = async () => {
            const { data } = await axios.post(
                "http://localhost:3333/cart",
                { productId: productId },
                {
                    headers: {
                        Authorization: localStorage.getItem("userToken"),
                    },
                }
            );
            console.log(data);
        };

        var decrease = async () => {
            const { data } = await axios.delete(
                "http://localhost:3333/cart",
                { productId: productId },
                {
                    headers: {
                        Authorization: localStorage.getItem("userToken"),
                    },
                }
            );
            console.log(data);
        };
    }

    var handelRemove = (id) => {
        dispatch(removFromCart(id));
        const cart = localStorage.setItem("cart", JSON.stringify(cartPage));
        console.log(localStorage.cart);
    };
    var handelincreas = (index) => {
        const quantity = cartPage[index].quantity;
        let updatequantity = quantity + 1;

        dispatch(udateQuantity({ updatequantity, index }));
        setCount(cartPage[index].quantity);
        increase();
    };
    var handeldecres = (index) => {
        const quantity = cartPage[index].quantity;
        let updatequantity = quantity;
        if (updatequantity > 1) {
            updatequantity = quantity - 1;
            dispatch(udateQuantity({ updatequantity, index }));
            setCount(cartPage[index].quantity);
            decrease();
        }
        // localStorage.setItem("cart", JSON.stringify(cartPage));
        // console.log(JSON.parse(localStorage.getItem("cart")));
        // console.log(updatequantity);
    };
    var total = 0;
    for (const i in cartPage) {
        let price = cartPage[i].product.price;
        let quantity = cartPage[i].quantity;
        total += price * quantity;
    }

    // console.log(total);

    /////right side//
    const [categoryProducts, setCategoryProducts] = useState([]);
    const { categoryname } = useParams();
    useEffect(() => {
        document.title = `Amazon - Cart`;
        let priductsitemsid;
        instance
            .get("cart", {
                headers: {
                    Authorization: localStorage.getItem("userToken"),
                },
            })
            .then((res) => {
                priductsitemsid = res.data.data[0].items;
                // console.log(priductsitemsid);
            })
            .then(() => {
                for (const i in priductsitemsid) {
                    console.log(priductsitemsid[i].productId);
                    instance
                        .get(`/products/${priductsitemsid[i].productId}`)
                        .then((res) => {
                            // setmyProd(res.data.data);
                            console.log(res.data.data);
                            for (const i in res.data.data) {
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
    }, []);
    /////
    return (
        <>
            <section className='container-fluid bg-light p-4'>
                <div className='row'>
                    <div className='col-md-8 bg-white p-5 pt-3 shadow'>
                        <div className='head-cart mb-0'>
                            <h3>Shopping Cart</h3>
                            <a
                                href='#'
                                className='deselect text-decoration-none'
                            >
                                Deselect all items
                            </a>
                        </div>
                        <hr />

                        {cartPage.length > 0 ? (
                            cartPage.map((item, index) => (
                                <div className='row' key={index}>
                                    <div className='item col-md-3 col-sm-12 d-flex align-items-center'>
                                        <div className='mt-3 mb-3'>
                                            <img
                                                className='w-100'
                                                width='500px'
                                                src={item.product.thumbnail}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-md-7 col-sm-12 justify-content-center flex-column mt-3 mb-3'>
                                        <h5>{item.product.description}</h5>
                                        <p className='price h5'>
                                            EGP: {item.product.price}
                                        </p>

                                        <p className='stock'>
                                            DiscountPercentage:
                                            {item.product.discountPercentage}
                                        </p>
                                        <p className='stock'>
                                            stock:{item.product.quantityInStock}
                                        </p>
                                        <div className='mt-3'>
                                            <ul className='list-unstyled d-flex flex-row list'>
                                                <li className='h-100'>
                                                    <div>
                                                        <button
                                                            className='btn btn-dark'
                                                            aria-label='Increment value'
                                                            onClick={() =>
                                                                handelincreas(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                        <span>
                                                            {" "}
                                                            QTY:
                                                            {
                                                                cartPage[index]
                                                                    .quantity
                                                            }{" "}
                                                        </span>
                                                        <button
                                                            className='btn btn-dark'
                                                            aria-label='Decrement value'
                                                            onClick={() =>
                                                                handeldecres(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a
                                                        href='#'
                                                        className='text-decoration-none me-2'
                                                        onClick={() =>
                                                            handelRemove(
                                                                item.product
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href='#'
                                                        className='text-decoration-none me-2'
                                                    >
                                                        Save for later
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href='#'
                                                        className='text-decoration-none me-2'
                                                    >
                                                        Share
                                                    </a>
                                                </li>
                                            </ul>
                                            <p className='total-price fw-bold'>
                                                Subtotal : EGP{" "}
                                                {item.product.price *
                                                    cartPage[index].quantity}
                                            </p>
                                        </div>
                                    </div>

                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p
                                className=' text-center mt-5'
                                style={{ fontSize: "22px" }}
                            >
                                Your Amazon cart is empty!
                            </p>
                        )}
                    </div>

                    {/* right side */}
                    <div className='col-md-3 p-0 mx-md-4 my-2 my-md-0'>
                        <div className='shadow p-3 bg-white mb-2'>
                            <p className='total-cart'>
                                <ion-icon name='checkmark-circle'></ion-icon>{" "}
                                Your order qualifies for FREE Shipping Choose
                                this option at checkout.{" "}
                                <a href='#'>See details</a>
                            </p>
                            {/* {cartPage .map((product, index) => ( */}
                            <p className='total-price'>
                                Subtotal ({cartPage.length} items) :
                                <span className='price'>{total}</span>
                            </p>
                            {/* // ))} */}
                            <a
                                href='#'
                                className='to-buy d-inline-block text-decoration-none'
                            >
                                Proced to buy
                            </a>
                        </div>

                        <div className='shadow p-3 bg-white'>
                            <h5>
                                <strong>Pair with your cart</strong>
                            </h5>
                            <div className='row'>
                                {categoryProducts.map((product, index) => (
                                    // return (
                                    <ProductCard
                                        key={index}
                                        productID={product._id}
                                        productTitle={product.title}
                                        productRating={product.rating}
                                        productDiscount={
                                            product.discountPercentage
                                        }
                                        productThumbnail={product.thumbnail}
                                        productPrice={product.price}
                                        productDescription={product.description}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
