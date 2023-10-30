/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { instance } from "../../services/axios/instance";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Link, useParams } from "react-router-dom";
import prime from "./1prime.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/Slice/Cart";

const ProductDetails = () => {
    var { id } = useParams();
    const dispatch = useDispatch();
    var cart = useSelector((state) => state.Cart);
    const handelAdd = (product) => {
        const isProductIncart = cart.some(
            (products) => products._id === product._id
        );
        if (!isProductIncart) {
            dispatch(addToCart(product));
        }
    };

    const [myProd, setmyProd] = useState();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        instance
            .get(`/products/${id}`)
            .then((res) => {
                setmyProd(res.data.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    // to handle carousel
    const [currentIndex, setCurrentIndex] = useState();
    function handleChange(index) {
        setCurrentIndex(index);
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row m-0 py-2 border-bottom '>
                    {/* carousel for product images */}
                    <div className='col-lg-5 p-2'>
                        <Carousel
                            animation={true}
                            showArrows={false}
                            autoPlay={false}
                            infiniteLoop={true}
                            verticalSwipe='natural'
                            selectedItem={myProd?.images[currentIndex]}
                            onChange={handleChange}
                            className='carousel-container bg-dark h-100 '
                        >
                            {myProd?.images.map((image, index) => (
                                <div
                                    key={index}
                                    className=''
                                    style={{ height: "" }}
                                >
                                    <img
                                        src={image}
                                        alt={"product images"}
                                        className='h-100'
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    {/* product details */}
                    <div className='col-lg-4  '>
                        <h2 className='product-title fw-normal'>
                            {myProd?.description}
                        </h2>
                        <Link className='product-link text-decoration-none'>
                            visit amazon store
                        </Link>
                        <div className='border-bottom pb-2'>
                            <span className='px-1'>{myProd?.rating}</span>
                            <i className='fa-solid fa-star text-warning'></i>
                            <i className='fa-solid fa-star text-warning'></i>
                            <i className='fa-solid fa-star text-warning'></i>
                            <i className='fa-solid fa-star text-warning'></i>
                            <i className='fa-solid fa-star-half-stroke text-warning'></i>
                            <span className='text-primary'> 40 ratings</span>
                        </div>

                        <div className='product-price d-flex p-2'>
                            <span className='new-price text-muted pt-2 fs-3'>
                                Price:
                            </span>
                            <span className=' text-muted px-1 '>EGP</span>

                            <span className='text-dark fw-bold fs-3 '>
                                {myProd?.price}
                            </span>
                            <span className=' text-muted px-1 '>00</span>
                        </div>

                        <div className='product-detail border-bottom'>
                            <ul className='list-group list-group-horizontal '>
                                <li className='list-group-item w-50 border-0 fw-bold'>
                                    Brand Name :
                                </li>
                                <li className='list-group-item border-0'>
                                    {myProd?.brand}
                                </li>
                            </ul>

                            <ul className=' list-unstyled list-group list-group-horizontal '>
                                <li className='list-group-item w-50 border-0 fw-bold'>
                                    {" "}
                                    Model Name:
                                </li>
                                <li className='list-group-item border-0'>
                                    {myProd?.title}
                                </li>
                            </ul>

                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item w-50 border-0 fw-bold'>
                                    Color:{" "}
                                </li>
                                <li className='list-group-item border-0'>
                                    Black
                                </li>
                            </ul>

                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item border-0 w-50  fw-bold'>
                                    Category:
                                </li>
                                <li className='list-group-item border-0'>
                                    {myProd?.category.name}
                                </li>
                            </ul>

                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item border-0 w-50 fw-bold small'>
                                    Connectivity Technology:
                                </li>
                                <li className='list-group-item border-0'>
                                    SODO SD 1004
                                </li>
                            </ul>
                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item w-50 border-0 fw-bold'>
                                    Stock:{" "}
                                </li>
                                <li className='list-group-item border-0'>
                                    {myProd?.quantityInStock}
                                </li>
                            </ul>

                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item border-0 w-50 fw-bold'>
                                    Shipping Area:
                                </li>
                                <li className='list-group-item border-0'>
                                    All over the world
                                </li>
                            </ul>

                            <ul className='list-group list-group-horizontal '>
                                <li className='list-group-item border-0 w-50 fw-bold'>
                                    Shipping Fee:
                                </li>
                                <li className='list-group-item border-0'>
                                    Free
                                </li>
                            </ul>
                        </div>
                        <div>
                            <span className='fs-4 fw-bold'>
                                about this item:
                            </span>
                            <p>{myProd?.description}</p>
                        </div>

                        <div className='d-block'>
                            <p>Share At:</p>
                            <a
                                href='https://www.facebook.com/'
                                target='_blank'
                                className='text-decoration-none'
                            >
                                <i className='fa-brands fa-facebook px-3'></i>
                            </a>
                            <a
                                href='https://twitter.com/?lang=en'
                                target='_blank'
                                className='text-decoration-none'
                            >
                                <i className='fab fa-twitter px-3'></i>
                            </a>
                            <a
                                href='https://www.instagram.com/'
                                target='_blank'
                                className='text-decoration-none'
                            >
                                <i className='fab fa-instagram px-3'></i>
                            </a>
                            <a
                                href='https://web.whatsapp.com/'
                                target='_blank'
                                className='text-decoration-none'
                            >
                                <i
                                    className='fab fa-solid fa-whatsapp px-3'
                                    style={{ color: "green" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                    <div className='col-lg-3  '>
                        {/* style={{position:"fixed",right:"10px"}} */}
                        {/*  amazon prime section */}
                        <div className=' bg-white border p-1 w-100 m-1'>
                            <div className='p-1 text-center bg-secondary'>
                                <input
                                    type='checkbox'
                                    id='Fdelevir'
                                    name='Fdelevir'
                                />
                                <label htmlFor='Fdelevir'>
                                    Yes, I want FREE Delivery
                                </label>
                            </div>
                            <p className='text-center'>
                                Enjoy FREE & FAST delivery with
                            </p>
                            <p className='text-center'>
                                <a href='' className='text-decoration-none'>
                                    Amazon Prime
                                </a>
                            </p>
                            <img
                                className='mx-auto d-block image-fluid w-50 '
                                src={prime}
                            />
                        </div>
                        {/*  add to cart and buy section */}
                        <div className='border d-block  p-1 w-100 m-1'>
                            <div className=' d-flex  p-2'>
                                <span className=' text-muted px-1 '>EGP</span>
                                <span className='text-dark  fs-3 '>
                                    {myProd?.price}
                                </span>
                                <span className=' text-muted px-1 '>00</span>
                            </div>
                            <div className='p-1'>
                                <ul className='list-unstyled p-1 small '>
                                    <li className='pb-1'>
                                        <Link className='text-decoration-none '>
                                            FREE Returns
                                        </Link>
                                    </li>
                                    <li className='py-1'>
                                        <Link className='text-decoration-none'>
                                            FREE Delivery, in 3 days
                                        </Link>
                                    </li>
                                    <li className='py-1'>
                                        <Link
                                            className='text-decoration-none '
                                            aria-disabled
                                        >
                                            <i className='fa-solid fa-location-dot pe-2'></i>
                                            Deliver to Sohag , Egypt
                                        </Link>
                                    </li>
                                </ul>
                                <span className='text-success ps-2 fs-5'>
                                    In Stock
                                </span>
                                <div className='d-flex px-2 pt-3'>
                                    <span className='pe-2'>Qty : </span>
                                    <select>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                    </select>
                                </div>
                            </div>

                            <div className='text-center my-2'>
                                <button
                                    id='add-to-cart-button '
                                    type='button'
                                    className='btn rounded-pill bg-warning w-75'
                                    onClick={() => handelAdd(myProd)}
                                >
                                    <span className='pe-2'>Add to Cart</span>

                                    <i className='fas fa-shopping-cart'></i>
                                </button>
                                <button
                                    type='button'
                                    className='btn w-75 rounded-pill text-center my-2 '
                                    style={{ backgroundColor: "#FFA41C" }}
                                >
                                    <span className='pe-3'>Buy now</span>
                                    <i className='fa-solid fa-money-check'></i>
                                </button>
                            </div>

                            <div className=' p-0 small lh-1'>
                                <ul className='list-group list-group-horizontal '>
                                    <li className='list-group-item w-50 border-0'>
                                        Payment :
                                    </li>
                                    <li className='list-group-item border-0'>
                                        Secure transaction
                                    </li>
                                </ul>

                                <ul className=' list-unstyled list-group list-group-horizontal '>
                                    <li className='list-group-item w-50 border-0'>
                                        Ships from :
                                    </li>
                                    <li className='list-group-item border-0'>
                                        Amazon.eg
                                    </li>
                                </ul>

                                <ul className='list-group list-group-horizontal'>
                                    <li className='list-group-item w-50 border-0'>
                                        Sold by :
                                    </li>
                                    <li className='list-group-item border-0'>
                                        Amazon.eg
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* search section */}
                <div className='container p-2 '>
                    <h3 className='fw-bold'>Looking for specific info?</h3>
                    <div className='py-2'>
                        <input
                            type='search'
                            className='form-control'
                            placeholder='search in reviews Q&A'
                        ></input>
                    </div>
                    <ul className='list-unstyled fs-5 text-muted'>
                        <li>Typical questions asked about products:</li>
                        <li>- Is the item durable?</li>
                        <li>- Is this item easy to use?</li>
                        <li>- What are the dimensions of this item?</li>
                    </ul>
                </div>
                <div className='border-top row'>
                    {/*  third section for ratings and comments  */}
                    <div className='col-lg-5 col-md-3'>
                        {/*   rating section   */}
                        <div className='product-rating p-2'>
                            <h1>Customer reviews</h1>
                            <i
                                className='fa-solid fa-star'
                                style={{ color: " #f4d84e" }}
                            ></i>
                            <i
                                className='fa-solid fa-star'
                                style={{ color: " #f4d84e" }}
                            ></i>
                            <i
                                className='fa-solid fa-star'
                                style={{ color: " #f4d84e" }}
                            ></i>
                            <i
                                className='fa-solid fa-star'
                                style={{ color: " #f4d84e" }}
                            ></i>
                            <i
                                className='fa-solid fa-star-half-alt'
                                style={{ color: " #f4d84e" }}
                            ></i>
                            <span>4.5 of 5</span>
                            <p className='text-muted small mb-0'>
                                500 - global ratings
                            </p>
                        </div>
                        <div className='p-2  pb-4'>
                            <span>5 Stars:</span>
                            <div className='progress mb-2'>
                                <div
                                    className='progress-bar  '
                                    role='progressbar'
                                    style={{
                                        width: "60%",
                                        backgroundColor: "#FFA41C",
                                    }}
                                    aria-valuenow='100'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                >
                                    60%
                                </div>
                            </div>

                            <span>4 Stars:</span>
                            <div className='progress mb-2'>
                                <div
                                    className='progress-bar  '
                                    role='progressbar'
                                    style={{
                                        width: "20%",
                                        backgroundColor: "#FFA41C",
                                    }}
                                    aria-valuenow='80'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                >
                                    20%
                                </div>
                            </div>
                            <span>3 Stars:</span>
                            <div className='progress mb-2'>
                                <div
                                    className='progress-bar  '
                                    role='progressbar'
                                    style={{
                                        width: "7%",
                                        backgroundColor: "#FFA41C",
                                    }}
                                    aria-valuenow='60'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                >
                                    7%
                                </div>
                            </div>
                            <span>2 Stars:</span>
                            <div className='progress mb-2'>
                                <div
                                    className='progress-bar  '
                                    role='progressbar'
                                    style={{
                                        width: "8%",
                                        backgroundColor: "#FFA41C",
                                    }}
                                    aria-valuenow='40'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                >
                                    8%
                                </div>
                            </div>
                            <span>1 Star:</span>
                            <div className='progress '>
                                <div
                                    className='progress-bar  '
                                    role='progressbar'
                                    style={{
                                        width: "5%",
                                        backgroundColor: "#FFA41C",
                                    }}
                                    aria-valuenow='20'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                >
                                    5%
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className='border-top mt-2 p-2'>
                            <div>
                                <h4>Review this product</h4>
                                <p className='text-secondary'>
                                    Share your thoughts with other customers
                                </p>
                            </div>
                            <Link className='btn bg-light border-dark'>
                                Write a customer review{" "}
                            </Link>
                        </div>
                    </div>
                    {/*  comments section  */}
                    <div className='col-lg-7'>
                        <select className='my-2'>
                            <option>top reviews</option>
                            <option>most recent</option>
                        </select>
                        {/*   user comment   */}
                        <div className='m-2 p-2'>
                            <div className='d-block'>
                                <h6 className='text-start text-dark'>
                                    <p>
                                        {" "}
                                        <i className='fa-solid fa-user fa-lg '></i>
                                        Hamza Mohamed
                                    </p>
                                </h6>
                                <p className='text-muted small mb-0'>
                                    anonymous user
                                </p>
                                <i
                                    className='fa-solid fa-star'
                                    style={{ color: " #f4d84e" }}
                                ></i>
                                <i
                                    className='fa-solid fa-star'
                                    style={{ color: " #f4d84e" }}
                                ></i>
                                <i
                                    className='fa-solid fa-star'
                                    style={{ color: " #f4d84e" }}
                                ></i>
                                <i
                                    className='fa-solid fa-star'
                                    style={{ color: " #f4d84e" }}
                                ></i>
                                <i
                                    className='fa-solid fa-star-half-alt'
                                    style={{ color: " #f4d84e" }}
                                ></i>
                                <span>4.5 of 5</span>

                                <p className='mt-3 mb-4 pb-2'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    consequat.
                                </p>
                                <div className='small d-flex justify-content-start'>
                                    <a
                                        href='#'
                                        className='d-flex align-items-center me-3'
                                        target='_blank'
                                    >
                                        <i className='far fa-thumbs-up me-2'></i>
                                        <p className='mb-0'>Like</p>
                                    </a>
                                    <a
                                        href='#'
                                        className='d-flex align-items-center me-3'
                                        target='_blank'
                                    >
                                        <i className='far fa-comment-dots me-2'></i>
                                        <p className='mb-0'>Comment</p>
                                    </a>
                                    <a
                                        href='#'
                                        className='d-flex align-items-center me-3'
                                        target='_blank'
                                    >
                                        <i className='far fa-comment-dots me-2'></i>
                                        <p className='mb-0'>report</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
