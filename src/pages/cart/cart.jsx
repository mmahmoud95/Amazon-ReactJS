import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removFromCart, udateQuantity } from "../../Store/Slice/Cart";
import { ProductCard } from "../../components/category-product/productCard";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { authContext } from "../../context/authcontex";
import { removeToCartWithAPI } from "../../services/auth";
// import { instance } from "../../services/axios/instance";
import { instance } from "../../services/axios/instance";

export const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    let cartPageRedux = useSelector((state) => state.Cart);
    // console.log(cartPageRedux[0].quantity);
    // const countRed = useSelector((state) => state.counter.counter);
    const [count, setCount] = useState(1);
    const { isLogin, setLogin } = useContext(authContext);
    const dispatch = useDispatch();
    var handelRemoveRedux = (id) => {
        console.log(id);
        dispatch(removeToCartWithAPI(id));
    };
    var handelincreasRedux = (index) => {
        const quantity = cartPageRedux[index].quantity;
        // console.log(quantity);
        let updatequantity = quantity + 1;
        // console.log(updatequantity);
        dispatch(udateQuantity({ updatequantity, index }));
        setCount(cartPageRedux[index].quantity);
    };
    var handeldecresRedux = (index) => {
        const quantity = cartPageRedux[index].quantity;
        // console.log(quantity);
        let updatequantity = quantity;
        if (updatequantity > 1) {
            updatequantity = quantity - 1;
            dispatch(udateQuantity({ updatequantity, index }));
            setCount(cartPageRedux[index].quantity);
        }
        // console.log(updatequantity);
    };
    let total = 0;
    for (const i in cartPageRedux) {
        let price = cartPageRedux[i].product?.price;
        let quantity = cartPageRedux[i].quantity;
        total += price * quantity;
    }

    // console.log(total);
    // let cartPagee;
    /////right side//

    const [cartPage, setCartPage] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const { categoryname } = useParams();
    useEffect(() => {
        document.title = `Amazon - Cart`;
        // instance
        //     .get(`category/${categoryname}`)
        //     .then((res) => {
        //         console.log(res.data.products);
        //         setCategoryProductss(res.data.products);
        //     })
        //     .catch((err) => {
        //         console.log(err);let priductsitemsid;
        if (isLogin) {
            instance
                .get("cart", {
                    headers: {
                        Authorization: localStorage.getItem("userToken"),
                    },
                })
                .then((res) => {
                    // priductsitemsid = res.data.data[0].items;
                    // console.log(res.data.data.items);
                    setCartPage(res.data.data.items);
                    setTotalPrice(res.data.data.totalPrice);
                    console.log(res.data.data.totalPrice);
                });
        }
    }, [categoryname]);

    console.log(cartPage);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (isLogin) {
            // Use Promise.all to wait for all requests to complete
            Promise.all(
                cartPage?.map(async (item) => {
                    let id = item.productId;
                    return instance
                        .get(`products/${id}`)
                        .then((res) => res.data.data);
                })
            )
                .then((productsData) => {
                    // productsData is an array of product data
                    setCartProducts(productsData);
                })
                .catch((error) => {
                    console.error("Error fetching product data:", error);
                });
        }
    }, [cartPage, isLogin]);

    var handelincreas = (itemId, quantity) => {
        console.log(itemId, quantity);
        if (isLogin && quantity > 1) {
            instance
                .patch(
                    `cart/${itemId}`,
                    {
                        quantity: quantity + 1,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem("userToken"),
                        },
                    }
                )
                .then((res) => {
                    // priductsitemsid = res.data.data[0].items;
                    // console.log(res.data.data.items);
                    setCartPage(res.data.data.items);
                    // console.log(cartPage);
                });
        }
    };

    var handeldecres = (itemId, quantity) => {
        if (isLogin) {
            instance
                .patch(
                    `cart/${itemId}`,
                    {
                        quantity: quantity - 1,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem("userToken"),
                        },
                    }
                )
                .then((res) => {
                    // priductsitemsid = res.data.data[0].items;
                    // console.log(res.data.data.items);
                    setCartPage(res.data.data.items);
                    // console.log(cartPage);
                });
        }
    };
    const handelRemove = (productId) => {
        if (isLogin) {
            instance
                .delete(`cart/${productId}`, {
                    headers: {
                        Authorization: localStorage.getItem("userToken"),
                    },
                })
                .then((res) => {
                    // Assuming res.data.data.items is the updated cart after removal
                    const updatedCart = res.data.data.items;
                    setTotalPrice(res.data.data.totalPrice);
                    // Update the local state with the updated cart
                    setCartPage(updatedCart);

                    // You may also want to update cartProducts if it's derived from cartPage
                    // setCartProducts(updatedCart.map(item => fetchProductData(item.productId)));

                    // Optional: You can log the updated cart for debugging
                    // console.log(updatedCart);
                })
                .catch((error) => {
                    console.error("Error removing product:", error);
                });
        }
    };

    // console.log(cartProducts);

    /////
    return (
        <>
            {isLogin ? (
                <section className='container-fluid bg-light p-4'>
                    <div className='row'>
                        <div className='col-md-8 bg-white p-5 pt-3 shadow'>
                            {isLogin ? (
                                <span>
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
                                </span>
                            ) : null}

                            {isLogin ? (
                                cartProducts?.length > 0 ? (
                                    cartProducts?.map((item, index) => (
                                        <div className='row' key={index}>
                                            <div className='item col-md-3 col-sm-12 d-flex align-items-center'>
                                                <div className='mt-3 mb-3'>
                                                    <img
                                                        className='w-100'
                                                        width='500px'
                                                        src={item.thumbnail}
                                                    />
                                                </div>
                                            </div>

                                            <div className='col-md-7 col-sm-12 justify-content-center flex-column mt-3 mb-3'>
                                                <h5>{item.description}</h5>
                                                <p className='price h5'>
                                                    EGP: {item.price}
                                                </p>

                                                <p className='stock'>
                                                    DiscountPercentage:
                                                    {item.discountPercentage}
                                                </p>
                                                <p className='stock'>
                                                    stock:
                                                    {item.quantityInStock}
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
                                                                            item._id,
                                                                            cartPage[
                                                                                index
                                                                            ]
                                                                                .quantity
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                                <span>
                                                                    QTY:
                                                                    {cartPage?.length >
                                                                    0
                                                                        ? cartPage[
                                                                              index
                                                                          ]
                                                                              ?.quantity
                                                                        : "0"}
                                                                </span>
                                                                <button
                                                                    className='btn btn-dark'
                                                                    aria-label='Decrement value'
                                                                    onClick={() =>
                                                                        handeldecres(
                                                                            item._id,
                                                                            cartPage[
                                                                                index
                                                                            ]
                                                                                .quantity
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className='text-decoration-none me-2'
                                                                onClick={() =>
                                                                    handelRemove(
                                                                        item._id
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
                                                    </p>
                                                </div>
                                            </div>

                                            <hr />
                                        </div>
                                    ))
                                ) : (
                                    <p
                                        className='text-center mt-5'
                                        style={{ fontSize: "22px" }}
                                    >
                                        Your Amazon cart is empty!
                                    </p>
                                )
                            ) : (
                                <div className='text-center mt-5'>
                                    <h4>Your Amazon cart is empty </h4>
                                    <Link
                                        to='/login'
                                        className='btn rounded-pill bg-warning'
                                    >
                                        <span className='pe-2'>
                                            Sign in to your account
                                        </span>
                                    </Link>
                                    <Link
                                        to='/signup'
                                        className='btn rounded-pill bg-light'
                                    >
                                        <span className='pe-2'>
                                            Sign up now
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* right side */}
                        <div className='col-md-3 p-0 mx-md-4 my-2 my-md-0'>
                            {isLogin ? (
                                cartPage?.length > 0 ? (
                                    <div className='shadow p-3 bg-white mb-2'>
                                        <p className='total-cart'>
                                            <ion-icon name='checkmark-circle'></ion-icon>{" "}
                                            Your order qualifies for FREE
                                            Shipping Choose this option at
                                            checkout.{" "}
                                            <a href='#'>See details</a>
                                        </p>
                                        {/* {cartPage .map((product, index) => ( */}
                                        <p className='total-price'>
                                            Subtotal ({cartPage.length} items) :
                                            <span className='price'>
                                                {totalPrice}
                                            </span>
                                        </p>
                                        {/* // ))} */}
                                        <Link
                                            to='/checkout'
                                            className='to-buy d-inline-block text-decoration-none'
                                        >
                                            Proced to buy
                                        </Link>
                                    </div>
                                ) : null
                            ) : null}

                            {isLogin ? (
                                <div className='shadow p-3 bg-white'>
                                    <h5>
                                        <strong>Pair with your cart</strong>
                                    </h5>
                                    <div className='row'>
                                        {categoryProducts?.map(
                                            (product, index) => (
                                                // return (
                                                <ProductCard
                                                    key={index}
                                                    productID={product._id}
                                                    productTitle={product.title}
                                                    productRating={
                                                        product.rating
                                                    }
                                                    productDiscount={
                                                        product.discountPercentage
                                                    }
                                                    productThumbnail={
                                                        product.thumbnail
                                                    }
                                                    productPrice={product.price}
                                                    productDescription={
                                                        product.description
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>
            ) : (
                <section className='container-fluid bg-light p-4'>
                    <div className='row'>
                        <div className='col-md-8 bg-white p-5 pt-3 shadow'>
                            <span>
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
                            </span>
                            {cartPageRedux.length > 0 ? (
                                cartPageRedux.map((item, index) => (
                                    <div className='row' key={index}>
                                        <div className='item col-md-3 col-sm-12 d-flex align-items-center'>
                                            <div className='mt-3 mb-3'>
                                                <img
                                                    className='w-100'
                                                    width='500px'
                                                    src={item.product?.thumbnail}
                                                />
                                            </div>
                                        </div>

                                        <div className='col-md-7 col-sm-12 justify-content-center flex-column mt-3 mb-3'>
                                            <h5>{item.product?.description}</h5>
                                            <p className='price h5'>
                                                EGP: {item.product?.price}
                                            </p>

                                            <p className='stock'>
                                                DiscountPercentage:
                                                {
                                                    item.product
                                                        ?.discountPercentage
                                                }
                                            </p>
                                            <p className='stock'>
                                                stock:
                                                {item.product?.quantityInStock}
                                            </p>
                                            <div className='mt-3'>
                                                <ul className='list-unstyled d-flex flex-row list'>
                                                    <li className='h-100'>
                                                        <div>
                                                            <button
                                                                className='btn btn-dark'
                                                                aria-label='Increment value'
                                                                onClick={() =>
                                                                    handelincreasRedux(
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
                                                                    cartPageRedux[
                                                                        index
                                                                    ].quantity
                                                                }{" "}
                                                            </span>
                                                            <button
                                                                className='btn btn-dark'
                                                                aria-label='Decrement value'
                                                                onClick={() =>
                                                                    handeldecresRedux(
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
                                                                handelRemoveRedux(
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
                                                    {item.product?.price *
                                                        cartPageRedux[index]
                                                            .quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p
                                    className='text-center mt-5'
                                    style={{ fontSize: "22px" }}
                                >
                                    Your Amazon cart is empty!
                                </p>
                            )}
                        </div>

                        {/* right side */}
                        <div className='col-md-3 p-0 mx-md-4 my-2 my-md-0'>
                            {cartPageRedux.length > 0 ? (
                                <div className='shadow p-3 bg-white mb-2'>
                                    <p className='total-cart'>
                                        <ion-icon name='checkmark-circle'></ion-icon>{" "}
                                        Your order qualifies for FREE Shipping
                                        Choose this option at checkout.{" "}
                                        <a href='#'>See details</a>
                                    </p>
                                    {/* {cartPage .map((product, index) => ( */}
                                    <p className='total-price'>
                                        Subtotal ({cartPageRedux.length} items)
                                        :<span className='price'>{total}</span>
                                    </p>
                                    {/* // ))} */}
                                    <Link
                                        to='/login'
                                        className='to-buy d-inline-block text-decoration-none'
                                    >
                                        Proced to buy
                                    </Link>
                                </div>
                            ) : null}
                            {
                                <div className='shadow p-3 bg-white'>
                                    <h5>
                                        <strong>Pair with your cart</strong>
                                    </h5>
                                    <div className='row'>
                                        {categoryProducts.map(
                                            (product, index) => (
                                                // return (
                                                <ProductCard
                                                    key={index}
                                                    productID={product._id}
                                                    productTitle={product.title}
                                                    productRating={
                                                        product.rating
                                                    }
                                                    productDiscount={
                                                        product.discountPercentage
                                                    }
                                                    productThumbnail={
                                                        product.thumbnail
                                                    }
                                                    productPrice={product.price}
                                                    productDescription={
                                                        product.description
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};
