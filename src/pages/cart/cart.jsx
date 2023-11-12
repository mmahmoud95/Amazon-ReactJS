import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removFromCart, udateQuantity } from "../../Store/Slice/Cart";
import { ProductCard } from "../../components/category-product/productCard";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { authContext } from "../../context/authcontex";
import { removeToCartWithAPI } from "../../services/auth";
import { useTranslation } from "react-i18next";
// import { instance } from "../../services/axios/instance";
export const Cart = () => {
    const cartPage = useSelector((state) => state.Cart);
    // console.log(cartPage[0].quantity);
    // const count = useSelector((state) => state.counter.counter);
    const [count, setCount] = useState(1);
    const { isLogin, setLogin } = useContext(authContext);
    const dispatch = useDispatch();
    var handelRemove = (id) => {
        console.log(id);
        dispatch(removeToCartWithAPI(id));
    };
    var handelincreas = (index) => {
        const quantity = cartPage[index].quantity;
        // console.log(quantity);
        let updatequantity = quantity + 1;
        // console.log(updatequantity);
        dispatch(udateQuantity({ updatequantity, index }));
        setCount(cartPage[index].quantity);
    };
    var handeldecres = (index) => {
        const quantity = cartPage[index].quantity;
        // console.log(quantity);
        let updatequantity = quantity;
        if (updatequantity > 1) {
            updatequantity = quantity - 1;
            dispatch(udateQuantity({ updatequantity, index }));
            setCount(cartPage[index].quantity);
        }
        // console.log(updatequantity);
    };
    let total = 0;
    for (const i in cartPage) {
        let price = cartPage[i].product.price;
        let quantity = cartPage[i].quantity;
        total += price * quantity;
    }

    console.log(total);

    /////right side//
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
        //         console.log(err);
        //     });
    }, [categoryname]);
    /////
    const {t}=useTranslation()
    return (
        <>
            <section className='container-fluid bg-light p-4'>
                <div className='row'>
                    <div className='col-md-8 bg-white p-5 pt-3 shadow'>
                    {isLogin ? (
                        <span>
    <div className='head-cart mb-0'>
        <h3>{t("cart.part2")}</h3>
        <a
            href='#'
            className='deselect text-decoration-none'
        >
           {t("cart.part3")}
        </a>
    </div>
    <hr />
    </span>
) : null}                  

{isLogin ? (
    cartPage.length > 0 ? (
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
                                    {t("cart.part5")}
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
                                {t("cart.part4")}
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='text-decoration-none me-2'
                            >
                                {t("cart.part6")}
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='text-decoration-none me-2'
                            >
                                {t("cart.part7")}
                            </a>
                        </li>
                    </ul>
                    <p className='total-price fw-bold'>
                    {t("cart.part8")}: EGP{" "}
                        {item.product.price *
                            cartPage[index].quantity}
                    </p>
                </div>
            </div>

            <hr />
        </div>
    ))        
    ) : (
        <p className='text-center mt-5' style={{ fontSize: '22px' }}>
            {t("cart.part1")}
        </p>
    )
) : (
    <div className="text-center mt-5"  > 
        <h4>{t("cart.part1")}</h4>
        <Link to='/login' className='btn rounded-pill bg-warning'>
            <span className='pe-2'>{t("cart.part9")}</span>
        </Link>
        <Link to='/signup' className='btn rounded-pill bg-light'>
            <span className='pe-2'>{t("cart.part10")}</span>
        </Link>
 </div>
)}

 </div>

                    {/* right side */}
                    <div className='col-md-3 p-0 mx-md-4 my-2 my-md-0'>
                        {isLogin?( cartPage.length>0?(
                        <div className='shadow p-3 bg-white mb-2'>
                            <p className='total-cart'>
                                <ion-icon name='checkmark-circle'></ion-icon>{" "}
                                {t("cart.part11")}{" "}
                                <a href='#'>{t("cart.part12")}</a>
                            </p>
                            {/* {cartPage .map((product, index) => ( */}
                            <p className='total-price'>
                            {t("cart.part8")} ({cartPage.length} {t("cart.part13")}) :
                                <span className='price'>{total}</span>
                            </p>
                            {/* // ))} */}
                            <a
                                href='#'
                                className='to-buy d-inline-block text-decoration-none'
                            >
                             {t("cart.part14")}
                            </a>
                        </div>):null):null}

                       {isLogin?( <div className='shadow p-3 bg-white'>
                            <h5>
                                <strong>{t("cart.part15")}</strong>
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
                        </div>):null} 
                    </div>
                </div>
            </section>
        </>
    );
};
