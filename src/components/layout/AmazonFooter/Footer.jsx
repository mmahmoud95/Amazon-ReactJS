import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './footerStyle.css'
import logo from "./amazon-logo.png";
import flag from "./egypt-flag.svg";

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const [show, setShow] = useState(true);
    const showDropdown = (e) => {
        setShow(!show);
    };
    const hideDropdown = (e) => {
        setShow(false);
    };
    return (
        <>
            {/*  by eng.hamza mohamed  */}
            <div
                className='container-fluid p-0 '
                style={{ backgroundColor: "#232f3e" }}
            >
                {/* first section back to top button */}
                <div className='bg-secondary text-white text-center  backToTop '>
                    <div className='backToTop py-2' onClick={handleScrollToTop}>
                        <span className='backToTop '>Back to top</span>
                    </div>
                </div>
                {/* second section links  */}
                <div
                    id='footerSection2'
                    className='text-center text-lg-start   container  p-4  '
                    style={{ fontSize: "0.9em", backgroundColor: "#232f3e" }}
                >
                    <div className=' row my-2  fw-lighter lh-lg text-info'>
                        <div className='col-lg-3 col-md-6  '>
                            <h5 className='text-white'>Get to Know Us</h5>
                            <ul className='list-unstyled'>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        about amazon
                                    </NavLink>
                                </li>
                                <li>
                                    <Link className='text-white text-decoration-none'>
                                        careers
                                    </Link>
                                </li>
                                <li>
                                    <Link className='text-white text-decoration-none'>
                                        amazon science
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-3 col-md-6 '>
                            <h5 className='text-white'>Shop with Us</h5>
                            <ul className='list-unstyled'>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Your Account
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Your Orders
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Your Addresses
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Your Lists
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-3 col-md-6 '>
                            <h5 className='text-white'>Make Money with Us</h5>
                            <ul className='list-unstyled'>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Protect and build your brand
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Advertise Your Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Sell on Amazon
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Fulfillment by Amazon
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-3 col-md-6 '>
                            <h5 className='text-white'>Let Us Help You</h5>
                            <ul className='list-unstyled'>
                                <li>
                                    <NavLink className='text-white  text-decoration-none'>
                                        Help
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Shipping & Delivery
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Returns & Replacements
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white text-decoration-none'>
                                        Amazon App Download
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* div for creating border bottom */}
                <div className=' border  border-bottom-1 border-secondary border-opacity-25'></div>

                {/* section of language and country and logo */}
                <div className=' d-flex justify-content-center p-0 m-0 w-100'>
                    <div className=' pt-3 mx-2'>
                        <Link className='m-4 '>
                            <div>
                                <img
                                    className=' d-none d-lg-flex'
                                    width='80'
                                    height='25'
                                    src={logo}
                                    alt='logo'
                                />
                            </div>
                        </Link>
                    </div>
                    {/* ********************************** */}

                    {/* language button */}

                    <div className='m-4 text-white border border-secondary'>
                        <ul className='list-unstyled pt-1 '>
                            <li className='nav-item dropdown px-2'>
                                <Link
                                    className='nav-link dropdown-toggle px-2'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <i className='fa-solid fa-globe small '></i>
                                    <span className='text small '>
                                        {" "}
                                        English
                                    </span>
                                </Link>
                                <ul className='dropdown-menu p-2 fs-6 '>
                                    <li>
                                        <input
                                            type='radio'
                                            id='arabic'
                                            name='language'
                                        />
                                        <label htmlFor='arabic'>
                                            {" "}
                                            العربية- AR
                                        </label>
                                    </li>
                                    <hr />
                                    <li>
                                        <input
                                            type='radio'
                                            id='english'
                                            name='language'
                                        />
                                        <label htmlFor='english'>
                                            {" "}
                                            English - EN
                                        </label>
                                    </li>
                                    <hr />
                                    <p style={{ fontSize: "0.7em" }}>
                                        <img src={flag} width='25px' />
                                        You are shopping on Amazon.eg
                                    </p>
                                    <p>
                                        <Link
                                            className='text-primary '
                                            style={{ fontSize: "0.7em" }}
                                        >
                                            Change country/ region.
                                        </Link>
                                    </p>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* country button */}
                    <div className=' my-4  border border-secondary'>
                        <Link className='btn  text-black  text-white '>
                            <img src={flag} width='25px' className='me-2' />
                            Egypt
                        </Link>
                    </div>
                </div>
                {/* this section is visilble only in large screens */}
                <div
                    className='m-0 '
                    id='adLinks'
                    style={{ fontSize: "0.7em", backgroundColor: "#131A22" }}
                >
                    {/* first row of 5 main links */}
                    <div className='d-none d-lg-flex justify-content-around mb-3 container pt-2'>
                        <div className='mx-5 mt-3 '>
                            <Link className='text-decoration-none text-white'>
                                <span className='d-block'>
                                    Amazon Advertising
                                </span>
                                <span className='text-secondary d-block'>
                                    Find, attract, and
                                </span>
                                <span className='text-secondary'>
                                    engage customers
                                </span>
                            </Link>
                        </div>
                        <div className='mx-5 mt-3 '>
                            <Link className='text-decoration-none text-white'>
                                <span className='d-block'>
                                    Sell on Amazon.ae
                                </span>
                                <span className='text-secondary'>
                                    {" "}
                                    Sell globally, start with UAE
                                </span>
                            </Link>
                        </div>
                        <div className='mx-2 mt-3'>
                            <Link className='text-decoration-none text-white'>
                                <span className='d-block'>
                                    Sell on Amazon.ae
                                </span>
                                <span className='text-secondary'>
                                    {" "}
                                    Sell globally, start with Saudi Arabia
                                </span>
                            </Link>
                        </div>
                        <div className='mx-4 mt-3  '>
                            <Link className='text-decoration-none text-white'>
                                <span className='d-block'>
                                    Amazon Web Services
                                </span>
                                <span className='text-secondary'>
                                    Scalable Cloud
                                </span>
                                <span className='d-block  text-secondary'>
                                    {" "}
                                    Computing Services
                                </span>
                            </Link>
                        </div>
                        <div className='mx-4  mt-3'>
                            <Link className='text-decoration-none text-white'>
                                <span className='d-block'> Goodreads</span>
                                <span className='text-secondary d-block'>
                                    Book reviews
                                </span>
                                <span className='text-secondary'>
                                 & recommendations
                                </span>
                            </Link>
                        </div>
                    </div>
                    {/* end  of first row of 5 main links */}

                    {/*  start second row of 5 main links d-xsm-none */}
                    <div className='d-none d-lg-flex justify-content-around mt-2  container'>
                        <div className=''>
                            <Link className='text-decoration-none'>
                                <span className='d-block  text-white'>
                                    {" "}
                                    Audible
                                </span>
                                <span className='text-secondary d-block'>
                                    Download
                                </span>
                                <span className='text-secondary'>
                                    {" "}
                                    Audio Books
                                </span>
                            </Link>
                        </div>
                        <div className=''>
                            <Link className='text-decoration-none '>
                                <span className='d-block text-white'>
                                    {" "}
                                    IMDb
                                </span>
                                <span className='text-secondary d-block'>
                                    Movies, TV
                                </span>
                                <span className='text-secondary'>
                                    {" "}
                                    & Celebrities
                                </span>
                            </Link>
                        </div>
                        <div className='ms-4'>
                            <Link className='text-decoration-none text-white'>
                                <span className='d-block'>Alexa</span>
                                <span className='text-secondary d-block'>
                                    Actionable Analytics
                                </span>
                                <span className='text-secondary'>
                                    {" "}
                                    for the Web
                                </span>
                            </Link>
                        </div>
                        <div className=''>
                            <Link className='text-decoration-none text-white'>
                                <span className='d-block'>Shopbop</span>
                                <span className='text-secondary d-block'>
                                    Designer
                                </span>
                                <span className='text-secondary'>
                                    Fashion Brands
                                </span>
                            </Link>
                        </div>
                        <div className='m-4'></div>
                    </div>
                </div>
                {/* bottom of the page  */}
                <div
                    className=' pt-4'
                    id='copyRightsSection'
                    style={{ fontSize: "0.8em", backgroundColor: "#131A22" }}
                >
                    <ul className='list-unstyled d-flex justify-content-center  text-decoration-none m-0'>
                        <li>
                            <Link className='text-white  text-decoration-none'>
                                Conditions of Use & Sale
                            </Link>
                        </li>
                        <li>
                            <Link className='text-white p-3 text-decoration-none'>
                                Privacy Notice
                            </Link>
                        </li>
                        <li>
                            <Link className='text-white  text-decoration-none'>
                                Interest-Based Ads
                            </Link>
                        </li>
                    </ul>
                    <span className='text-center text-white  d-block pb-2'>
                        &copy; 1996-2023, Amazon.com, Inc. or its affiliates.
                    </span>
                </div>
            </div>
        </>
    );
};

export default Footer;
