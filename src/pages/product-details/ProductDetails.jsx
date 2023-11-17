/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { instance } from "../../services/axios/instance";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { totalPriceAction, udateQuantity } from "../../Store/Slice/Cart";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import prime from "./1prime.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/Slice/Cart";
import { addToCartWithAPI } from "../../services/auth";
import { authContext } from "../../context/authcontex";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
    const { isLogin, setLogin } = useContext(authContext);
    const { lang, setLang } = useContext(authContext);
    const [quantity, setSelectedValue] = useState(1); // Initialize with a default value of '1'

    const handleSelectChange = (event) => {
        setSelectedValue(+event.target.value);
    };
    const { t } = useTranslation();

    var { id } = useParams();
    const dispatch = useDispatch();
    var cartPage = useSelector((state) => state.Cart.cart);
    const handelAdd = (product) => {
        const isProductIncart = cartPage.some(
            (item) => item.product._id === product._id
        );
        console.log(cartPage);
        console.log(isProductIncart);
        if (!isProductIncart) {
            dispatch(addToCart({ product: product, quantity: quantity }));
            toast.success(`${t("prodInfo.part16")}`, {
                position: "bottom-left",
            });
        } else {
            for (const i in cartPage) {
                const product1 = cartPage.find((items) => {
                    return items.product._id === product._id;
                });
                let index = cartPage.findIndex(
                    (item) => item.product._id === product._id
                );
                // console.log(quantity);
                let updatequantity = product1.quantity + +quantity;
                // updatequantity = product1.quantity + 1;
                dispatch(udateQuantity({ updatequantity, index: index }));
            }
            toast.success(`${t("prodInfo.part17") + quantity}`, {
                position: "bottom-left",
            });
        }
    };
    // const dispatch = useDispatch();

    const hanleAddWithAp = (myProd) => {
        console.log(myProd);
        const items = [
            {
                productId: myProd._id,
                quantity: quantity,
            },
        ];
        console.log(items);
        toast.success(`${t("prodInfo.part16") +" " + quantity}`, {
          position: "bottom-left",
      });
        instance
            .post(
                `cart/`,
                {
                    items: items,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("userToken"),
                    },
                }
            )
            .then((res) => {
                console.log(res);
                dispatch(totalPriceAction());
            });
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
                <Toaster />
                <div className='row m-0 py-2 border-bottom '>
                    {/* carousel for product images */}
                    <div className='col-lg-5 p-2' dir='ltr'>
                        <Carousel
                            animation={true}
                            showArrows={true}
                            autoPlay={false}
                            infiniteLoop={true}
                            verticalSwipe='natural'
                            selectedItem={myProd?.images[2]}
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
                            {lang === "en"
                                ? myProd?.en.description
                                : myProd?.ar.description}
                        </h2>
                        <Link className='product-link text-decoration-none'>
                            {t("prodInfo.part1")}
                        </Link>
                        <div className='border-bottom pb-2'>
                            <span className='px-1'>{myProd?.rating}</span>
                            <i className='fa-solid fa-star text-warning'></i>
                            <i className='fa-solid fa-star text-warning'></i>
                            <i className='fa-solid fa-star text-warning'></i>
                            <i className='fa-solid fa-star text-warning'></i>
                            <i className='fa-solid fa-star-half-stroke text-warning'></i>
                            <span className='text-primary'>
                                {" "}
                                40 {t("prodInfo.part2")}
                            </span>
                        </div>

                        <div className='product-price d-flex p-2'>
                            <span className='new-price text-muted pt-2 fs-3'>
                                {t("prodInfo.part3")}:
                            </span>
                            <span className=' text-muted px-1 '>EGP</span>

              <span className="text-dark fw-bold fs-3 ">{myProd?.price}</span>
              <span className=" text-muted px-1 ">00</span>
            </div>

                        <div className='product-detail border-bottom'>
                            <ul className='list-group list-group-horizontal '>
                                <li className='list-group-item w-50 border-0 fw-bold'>
                                    {t("prodInfo.part4")}:
                                </li>
                                <li className='list-group-item border-0'>
                                    {lang === "en"
                                        ? myProd?.en.brand
                                        : myProd?.ar.brand}
                                </li>
                            </ul>

                            <ul className=' list-unstyled list-group list-group-horizontal '>
                                <li className='list-group-item w-50 border-0 fw-bold'>
                                    {t("prodInfo.part5")}:
                                </li>
                                <li className='list-group-item border-0'>
                                    {" "}
                                    {lang === "en"
                                        ? myProd?.en.title
                                        : myProd?.ar.title}
                                </li>
                            </ul>

                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item w-50 border-0 fw-bold'>
                                    {t("prodInfo.part6")}:
                                </li>
                                <li className='list-group-item border-0'>
                                    Black
                                </li>
                            </ul>

              <ul className="list-group list-group-horizontal">
                <li className="list-group-item border-0 w-50  fw-bold">
                  {t("prodInfo.part7")}:
                </li>
                <li className="list-group-item border-0">
                  {lang === "en"
                    ? myProd?.category?.en?.name
                    : myProd?.category?.ar?.name}
                </li>
              </ul>

                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item border-0 w-50 fw-bold small'>
                                    {t("prodInfo.part8")}:
                                </li>
                                <li className='list-group-item border-0'>
                                    .......
                                </li>
                            </ul>
                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item w-50 border-0 fw-bold'>
                                    {t("prodInfo.part9")}:
                                </li>
                                <li className='list-group-item border-0'>
                                    {myProd?.quantityInStock}
                                </li>
                            </ul>

                            <ul className='list-group list-group-horizontal'>
                                <li className='list-group-item border-0 w-50 fw-bold'>
                                    {t("prodInfo.part10")}:
                                </li>
                                <li className='list-group-item border-0'>
                                    {t("prodInfo.part12")}
                                </li>
                            </ul>

                            <ul className='list-group list-group-horizontal '>
                                <li className='list-group-item border-0 w-50 fw-bold'>
                                    {t("prodInfo.part11")}:
                                </li>
                                <li className='list-group-item border-0'>
                                    {t("prodInfo.part13")}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <span className='fs-4 fw-bold'>
                                {t("prodInfo.part14")}:
                            </span>
                            <p>{myProd?.description}</p>
                        </div>

                        <div className='d-block'>
                            <p>{t("prodInfo.part15")}:</p>
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
                                    {t("prime.part1")}
                                </label>
                            </div>
                            <p className='text-center'>{t("prime.part2")}</p>
                            <p className='text-center'>
                                <a href='' className='text-decoration-none'>
                                    {t("prime.part3")}
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
                                            {t("prime.part4")}
                                        </Link>
                                    </li>
                                    <li className='py-1'>
                                        <Link className='text-decoration-none'>
                                            {t("prime.part5")}
                                        </Link>
                                    </li>
                                    <li className='py-1'>
                                        <Link
                                            className='text-decoration-none '
                                            aria-disabled
                                        >
                                            <i className='fa-solid fa-location-dot pe-2'></i>
                                            {t("prime.part6")}
                                        </Link>
                                    </li>
                                </ul>
                                <span className='text-success ps-2 fs-5'>
                                    {t("prime.part7")}
                                </span>
                                <div className='d-flex px-2 pt-3'>
                                    <span className='pe-2'>Qty : </span>
                                    <select
                                        value={quantity}
                                        onChange={handleSelectChange}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                            </div>

                            <div className='text-center my-2'>
                                <button
                                    id='add-to-cart-button '
                                    type='button'
                                    className='btn rounded-pill bg-warning w-75'
                                    onClick={() =>
                                        isLogin
                                            ? hanleAddWithAp(myProd)
                                            : handelAdd(myProd)
                                    }
                                >
                                    <span className='pe-2'>
                                        {t("prime.part8")}
                                    </span>

                                    <i className='fas fa-shopping-cart'></i>
                                </button>
                                <button
                                    type='button'
                                    className='btn w-75 rounded-pill text-center my-2 '
                                    style={{ backgroundColor: "#FFA41C" }}
                                >
                                    <Link to='/checkout' className='pe-3'>
                                        {t("prime.part9")}
                                    </Link>
                                    <i className='fa-solid fa-money-check'></i>
                                </button>
                            </div>

                            <div className=' p-0 small lh-1'>
                                <ul className='list-group list-group-horizontal '>
                                    <li className='list-group-item w-50 border-0'>
                                        {" "}
                                        {t("prime.part10")}:
                                    </li>
                                    <li className='list-group-item border-0'>
                                        {t("prime.part11")}
                                    </li>
                                </ul>

                                <ul className=' list-unstyled list-group list-group-horizontal '>
                                    <li className='list-group-item w-50 border-0'>
                                        {t("prime.part12")} :
                                    </li>
                                    <li className='list-group-item border-0'>
                                        Amazon.eg
                                    </li>
                                </ul>

                                <ul className='list-group list-group-horizontal'>
                                    <li className='list-group-item w-50 border-0'>
                                        {t("prime.part13")} :
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
                    <h3 className='fw-bold'>{t("ask.part1")}</h3>
                    <div className='py-2'>
                        <input
                            type='search'
                            className='form-control'
                            placeholder={t("ask.part2")}
                        ></input>
                    </div>
                    <ul className='list-unstyled fs-5 text-muted'>
                        <li>{t("ask.part3")}:</li>
                        <li>-{t("ask.part4")} </li>
                        <li>- {t("ask.part5")}</li>
                        <li>-{t("ask.part6")} </li>
                    </ul>
                </div>
                <div className='border-top row'>
                    {/*  third section for ratings and comments  */}
                    <div className='col-lg-5 col-md-3'>
                        {/*   rating section   */}
                        <div className='product-rating p-2'>
                            <h1>{t("rev.part1")}</h1>
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
                                500 - {t("rev.part2")}
                            </p>
                        </div>
                        <div className='p-2  pb-4'>
                            <span>5 {t("rev.part3")}:</span>
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

                            <span>4 {t("rev.part3")}:</span>
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
                            <span>3 {t("rev.part3")}:</span>
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
                            <span>2 {t("rev.part3")}:</span>
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
                            <span>1 {t("rev.part3")}:</span>
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
                                <h4>{t("rev.part4")}</h4>
                                <p className='text-secondary'>
                                    {t("rev.part5")}
                                </p>
                            </div>
                            <Link className='btn bg-light border-dark'>
                                {t("rev.part6")}
                            </Link>
                        </div>
                    </div>
                    {/*  comments section  */}
                    <div className='col-lg-7'>
                        <select className='my-2'>
                            <option>{t("rev.part7")}</option>
                            <option>{t("rev.part8")}</option>
                        </select>
                        {/*   user comment   */}
                        <div className='m-2 p-2'>
                            <div className='d-block'>
                                <h6 className=' text-dark'>
                                    <p>
                                        {" "}
                                        <i className='fa-solid fa-user fa-lg '></i>
                                        Hamza Mohamed
                                    </p>
                                </h6>
                                <p className='text-muted small mb-0'>
                                    {t("rev.part9")}
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
                                        <p className='mb-0'>
                                            {t("rev.part10")}
                                        </p>
                                    </a>
                                    <a
                                        href='#'
                                        className='d-flex align-items-center me-3'
                                        target='_blank'
                                    >
                                        <i className='far fa-comment-dots me-2'></i>
                                        <p className='mb-0'>
                                            {t("rev.part11")}
                                        </p>
                                    </a>
                                    <a
                                        href='#'
                                        className='d-flex align-items-center me-3'
                                        target='_blank'
                                    >
                                        <i className='far fa-comment-dots me-2'></i>
                                        <p className='mb-0'>
                                            {t("rev.part12")}
                                        </p>
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
