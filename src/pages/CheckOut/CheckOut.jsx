import React from "react";
import logoImage from "./amazon.png";
import "./checkoutStyle.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CheckOut = () => {
    const { t } = useTranslation();

    return (
        <div className='container-fluid'>
            <div className='d-flex  checkoutHeader'>
                <div className='w-50 ps-5 '>
                    <div
                        style={{ width: "103px", height: "50px" }}
                        className='py-2 d-none d-lg-block d-xl-block '
                    >
                        <Link to='/'>
                            <img
                                src={logoImage}
                                className=' img-fluid d-sm-none d-md-block'
                            />
                        </Link>
                    </div>
                </div>
                <div className='w-50 py-3'>
                    <span className='fs-4 fw-bold'>
                        {t("checkOut.part1")} (
                        <span className='text-info'>
                            1 {t("checkOut.part2")}
                        </span>
                        )
                    </span>
                </div>
            </div>
            {/* <!-- main container  --> */}
            <div className='row  mainParent'>
                <div className='col-lg-8 col-md-8  p-1 '>
                    {/* shipping address section */}
                    <div className='border-bottom bg-white d-flex m-1'>
                        <div>
                            <Link
                                className='text-decoration-none fw-bold text-dark'
                                href=''
                            >
                                <span className='px-1'>1-</span>
                                {t("checkOut.part3")}
                            </Link>
                        </div>
                        <div className='mx-auto'>
                            <ul className='list-unstyled'>
                                <li>hamza mohamed </li>
                                <li>nasser Elzeraie street</li>
                                <li>20</li>
                                <li>Sohag, Markaz Akhmim, Markaz Akhmim</li>
                                <li>
                                    <Link className='text-decoration-none'>
                                        {t("checkOut.part4")}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='pe-3'>
                            <Link className='text-decoration-none'>
                                {" "}
                                {t("checkOut.part5")}
                            </Link>
                        </div>
                    </div>
                    <div>
                        {/* payment section */}
                        <div className='p-2'>
                            <h4 className='fs-5'> {t("checkOut.part6")}</h4>
                        </div>
                        <div className='p-1 pb-0 d-block border rounded ms-2'>
                            <h5 className='border-bottom p-1 fw-bold'>
                                {t("checkOut.part7")}
                            </h5>
                            <div className='d-flex p-3'>
                                <a className='ps-2 pt-4' href='#'>
                                    <i
                                        className='fa-solid fa-plus'
                                        // style="color: #c9cfd9"
                                    ></i>
                                </a>
                                <div className='mx-3'>
                                    <p className='small p-0 m-0 fw-bold'>
                                        {t("checkOut.part8")}
                                    </p>
                                    <div>
                                        <input
                                            type='text'
                                            className='d-block w-75'
                                            placeholder='Enter code'
                                        />
                                    </div>
                                </div>
                                <div className=''>
                                    <input
                                        type='button'
                                        className='d-block w-100 bg-white mt-3 border border-light text-muted btn'
                                        value='Apply'
                                        placeholder=''
                                    />
                                </div>
                            </div>
                            <h5 className='border-bottom fw-bold'>
                                {t("checkOut.part9")}
                            </h5>

                            <div className='d-flex p-3'>
                                <a className='p-auto' href='#'>
                                    <i
                                        className='fa-solid fa-plus'
                                        style={{ color: "#c9cfd9" }}
                                    ></i>
                                </a>
                                <div className='mx-3'>
                                    <i className='fa-brands fa-cc-amazon-pay'></i>
                                    <a
                                        href='#'
                                        target='_blank'
                                        className='text-decoration-none ps-1'
                                    >
                                        {t("checkOut.part10")}
                                        &gt;
                                        <span className='text-muted small px-2'>
                                            {t("checkOut.part11")}
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <h5 className='fw-bold'> {t("checkOut.part12")}</h5>
                            <div className='border-top d-flex p-3'>
                                <div className='mx-2'>
                                    <p className='fw-bold'>
                                        <input className='mx-2' type='radio' />
                                        {t("checkOut.part13")}{" "}
                                    </p>
                                    <div className='mx-4'>
                                        <span>
                                            {t("checkOut.part14")}
                                            <span className='fw-bold'>
                                                EGP 12
                                            </span>{" "}
                                            {t("checkOut.part15")}{" "}
                                            <a
                                                className='text-decoration-none'
                                                href='#'
                                            >
                                                {t("checkOut.part16")}
                                            </a>
                                            .
                                        </span>
                                        <p>{t("checkOut.part17")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='border-top bg-light p-3'>
                                <input
                                    type='button'
                                    className='d-block w-30 border rounded paymentButton small p-2'
                                    style={{ backgroundColor: "#FFFAE0" }}
                                    value='Use this payment method'
                                    placeholder='Use this payment method'
                                />
                            </div>
                        </div>
                        <div className='border-bottom border-top mt-3'>
                            <a
                                target='_blank'
                                aria-disabled
                                className='text-decoration-none text-muted fs-3'
                            >
                                <span className='px-1'>3</span>
                                {t("checkOut.part18")}
                            </a>
                        </div>
                        <div className='border-bottom'>
                            <a
                                target='_blank'
                                aria-disabled
                                className='text-decoration-none text-muted fs-3'
                                href='#'
                            >
                                <span className='px-1'>4</span>{" "}
                                {t("checkOut.part19")}
                            </a>
                        </div>
                        {/* last section info */}
                        <div className='row'>
                            <div className='pt-3 pb-1 text-muted small col-9'>
                                <p>
                                    {t("checkOut.part20")}
                                    <a
                                        target='_blank'
                                        href='#'
                                        className='text-decoration-none'
                                    >
                                        {t("checkOut.part21")}
                                    </a>
                                </p>
                                <p>
                                    {t("checkOut.part22")}
                                    <a
                                        href='#'
                                        target='_blank'
                                        className='text-decoration-none'
                                    >
                                        {t("checkOut.part23")}
                                    </a>
                                    {t("checkOut.part24")}

                                    <a
                                        target='_blank'
                                        href='#'
                                        className='text-decoration-none'
                                    >
                                        {t("checkOut.part25")}
                                    </a>
                                </p>
                                <p>{t("checkOut.part26")}</p>
                                <p>
                                    {t("checkOut.part27")}
                                    <a
                                        href='#'
                                        target='_blank'
                                        className='text-decoration-none'
                                    >
                                        {t("checkOut.part28")}
                                    </a>
                                    .
                                </p>
                                <p>
                                    {t("checkOut.part29")}
                                    <a
                                        href='#'
                                        target='_blank'
                                        className='text-decoration-none'
                                    >
                                        {t("checkOut.part30")}
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white col-lg-4 col-md-4 ps-4 mt-2 stickyDiv  '>
                    <div className='border rounded w-100'>
                        <div className='d-block p-2'>
                            <div className='border-bottom'>
                                <input
                                    type='button'
                                    className='d-block w-100 border rounded text-secondary small p-2'
                                    value='Use this payment method'
                                    style={{ backgroundColor: "#FFFAE0" }}
                                    placeholder=''
                                />
                                <p className='text-muted small text-center'>
                                    <span className='mb-0'>
                                        {t("checkOut.part31")}
                                    </span>
                                    <span>{t("checkOut.part32")}</span>
                                    <span>{t("checkOut.part33")}</span>
                                </p>
                            </div>
                            <div>
                                <h4>{t("checkOut.part34")}</h4>
                                <ul className='list-unstyled'>
                                    <li>
                                        <span>{t("checkOut.part35")}</span>
                                        <span style={{ float: "right" }}>
                                            EGP 65.99
                                        </span>
                                    </li>
                                    <li>
                                        <span>{t("checkOut.part36")}</span>
                                        <span style={{ float: "right" }}>
                                            ---
                                        </span>
                                    </li>
                                    <li>
                                        <span>{t("checkOut.part37")}</span>
                                        <span style={{ float: "right" }}>
                                            ---
                                        </span>
                                    </li>
                                    <li>
                                        <span>{t("checkOut.part38")}</span>
                                        <span style={{ float: "right" }}>
                                            ---
                                        </span>
                                    </li>
                                    <hr />
                                    <li>
                                        <span className='text-danger fw-bold'>
                                            {t("checkOut.part39")}
                                        </span>
                                        <span style={{ float: "right" }}>
                                            ---
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='border-top bg-light m-0'>
                            <div className='p-3'>
                                <a
                                    href='#'
                                    target='_blank'
                                    className='small text-decoration-none'
                                >
                                    {t("checkOut.part40")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
