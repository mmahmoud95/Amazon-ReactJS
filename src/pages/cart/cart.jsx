import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removFromCart } from "../../Store/Slice/Cart";
import { CategoryProduct } from "../../components/category-product/category-product";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { instance } from "../../services/axios/instance";
import { deccreaseCounter, increaseCounter } from '../../Store/Slice/count';
export const Cart = () => {
    const cartPage = useSelector((state) => state.Cart);
    const count=useSelector((state)=>state.counter.counter)
    const dispatch = useDispatch();
    var handelRemove = (id) => {
        dispatch(removFromCart(id));
    };
    var handelincreas = (id) => {
        dispatch(increaseCounter(id));
    };
    var handeldecres = (id) => {
        dispatch(deccreaseCounter(id));
    };
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

                        {cartPage.length>0?(cartPage
                        .map((product, index) => (
                            <div className='row' key={index}>
                                <div className='item col-md-3 col-sm-12 d-flex align-items-center'>
                                    <div className='mt-3 mb-3'>
                                        <img
                                            className='w-100'
                                            width='500px'
                                            src={product.thumbnail}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-7 col-sm-12 justify-content-center flex-column mt-3 mb-3'>
                                    <h5>{product.description}</h5>
                                    <p className='price h5'>
                                     EGP: {product.price}
                                    </p>

                                    <p className='stock'>
                                        DiscountPercentage:
                                        {product.discountPercentage}
                                    </p>
                                    <p className='stock'>
                                        stock:{product.quantityInStock}
                                    </p>
                                    <div className='mt-3'>
                                        <ul className='list-unstyled d-flex flex-row list'>
                                            <li className='h-100'>

     <div>
        <button
         className="btn btn-dark"
          aria-label="Increment value"
          onClick={() => handelincreas(product._id)}
        >
          + 
        </button>
        <span> QTY:{count} </span>
        <button
        className="btn btn-dark"
          aria-label="Decrement value"
          onClick={() => handeldecres(product._id)}
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
                                                        handelRemove(product)
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
                                Subtotal : EGP {product.price*count} 
                               
                            </p>
                                    </div>
                                </div>

                                <hr />
                            </div>
                        ))):  <p className=" text-center mt-5" style={{fontSize:'22px'}}>Your Amazon cart is empty!</p>} 

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
                                Subtotal ({cartPage.length}items) :
                                <span className='price'>
                                    {count*cartPage.map((product)=>(
                                    product.price
                                    ))}
                                </span>
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
                            <CategoryProduct
                                key={index}
                                productID={product._id}
                                productTitle={product.title}
                                productRating={product.rating}
                                productDiscount={product.discountPercentage}
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
