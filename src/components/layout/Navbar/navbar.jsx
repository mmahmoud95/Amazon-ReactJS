import "./navbar.css";
import amzonlogo from "../../../assets/nav-images/amzon-logo.png";
import cartImage from "../../../assets/nav-images/cart.png";
import egyptFlage from "../../../assets/nav-images/egypt-flag.svg";
import { IoSearchOutline, IoLocationOutline, IoLogOut } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { instance } from "../../../services/axios/instance";
import { useContext } from "react";
import { authContext } from "../../../context/authcontex";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { clearCart, totalPriceAction } from "../../../Store/Slice/Cart";
import Spinner from "react-bootstrap/Spinner";
import { changeLoader } from "../../../Store/Slice/Loader";

// import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
    var loading = useSelector((state) => state.Loader.loader);
    let cartPageRedux = useSelector((state) => state.Cart.cart);
    const totalPrice = useSelector((state) => state.Cart.totalPrice);
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(true);

    // const [numberItems, setNumberItems] = useState(0);
    const name = localStorage.getItem("name");
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(authContext);
    const { lang, setLang } = useContext(authContext);

    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    //   for category
    const searchSubmit = (e) => {
        const { value } = e.target;
        if (value === "All") {
            setSearchCategory("All");
        } else if (value === "groceries") {
            setSearchCategory("65527c22376a52ea210d9708");
        } else if (value === "laptops") {
            setSearchCategory("65527a31376a52ea210d9703");
        } else if (value === "smart") {
            setSearchCategory(value);
            setSearchCategory("65522f3250f3b49965ea7807");
        } else if (value === "fashion") {
            setSearchCategory("65527ac3376a52ea210d9706");
        } else {
            setSearchCategory("All");
        }
    };
    useEffect(() => {
        console.log(searchCategory);
        // localStorage.setItem('category',searchCategory)
    }, [searchCategory]);
    //   for text
    useEffect(() => {
        dispatch(totalPriceAction());
    }, []);
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };
    const logOut = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("cart");
        localStorage.removeItem("name");
        dispatch(clearCart(cartPageRedux));
        setLogin(false);
    };
    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            navigate(`/products/search/${searchCategory || "All"}`, {
                state: { searchValue: searchText },
            });
        } catch (err) {
            navigate("/");
        }
    };
    //
    const { t } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        if (language === "ar") {
            setLang("ar");
        } else {
            setLang("en");
        }
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    };
    //

    const catogories = {
        electronics: {
            name: `${t("nav2.part7")}`,
            id: "65527a31376a52ea210d9703",
        },
        fashion: {
            name: `${t("nav2.part8")}`,
            id: "65527ac3376a52ea210d9706",
        },
        grocery: {
            name: `${t("nav2.part9")}`,
            id: "65527c22376a52ea210d9708",
        },
        beauty: {
            name: `${t("nav2.part10")}`,
            id: "65527c8c376a52ea210d970a",
        },
        sports: {
            name: `${t("nav2.part11")}`,
            id: "65527d1a376a52ea210d970e",
        },
        mobilephones: {
            name: `${t("nav2.part12")}`,
            id: "65522f3250f3b49965ea7807",
        },
    };

    // console.log(catogories);
    const cart = useSelector((state) => state.Cart.cart);

    return (
        <>
            <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                    <NavLink className='navbar-brand' to='/'>
                        <img
                            src={amzonlogo}
                            style={{ width: "120px", height: "40px" }}
                        />
                    </NavLink>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarNavDropdown'
                        aria-controls='navbarNavDropdown'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarNavDropdown'
                    >
                        <ul className='navbar-nav align-items-lg-center'>
                            <li className='nav-item location-item'>
                                <div className='d-flex'>
                                    <div className='me-1'>
                                        <span className='location'>
                                            <IoLocationOutline />
                                        </span>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <p className='deliver'>
                                            {t("navTop.part1")}
                                        </p>
                                        <a
                                            className='nav-link active address text-decoration-none'
                                            aria-current='page'
                                            href='#'
                                        >
                                            {t("navTop.part6")}
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <ul className='navbar-nav search-bar'>
                                <li className='nav-item'>
                                    <form
                                        className='d-flex'
                                        role='search'
                                        onSubmit={(e) => {
                                            handleSubmit(e);
                                        }}
                                    >
                                        <li className='nav-item dropdown all-category-search'>
                                            <select
                                                onChange={(e) => {
                                                    searchSubmit(e);
                                                }}
                                                className='nav-item dropdown all-category-search py-2 rounded-0 border-0'
                                                defaultValue='All'
                                            >
                                                <option
                                                    className='dropdown-item'
                                                    value='All'
                                                >
                                                    {t("navTop.part9")}
                                                </option>
                                                <option
                                                    className='dropdown-item'
                                                    value='groceries'
                                                >
                                                    {t("navTop.part14")}
                                                </option>
                                                <option
                                                    className='dropdown-item'
                                                    value='laptops'
                                                >
                                                    {t("navTop.part17")}
                                                </option>
                                                <option
                                                    className='dropdown-item'
                                                    value='fashion'
                                                >
                                                    {t("navTop.part15")}
                                                </option>
                                                <option
                                                    className='dropdown-item'
                                                    value=''
                                                >
                                                    {t("navTop.part16")}
                                                </option>
                                                <option className='dropdown-item'>
                                                    {t("navTop.part18")}
                                                </option>
                                            </select>
                                        </li>

                                        <input
                                            className='form-control  align-items-center rounded-0'
                                            style={{ width: "400px" }}
                                            type='text'
                                            placeholder={t("navTop.part11")}
                                            aria-label='Search'
                                            value={searchText}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                        />
                                        <button
                                            type='submit'
                                            className='serch-icon border-0'
                                        >
                                            {/* <span className='d-block'> */}
                                            <IoSearchOutline
                                                style={{ marginRight: "-18px" }}
                                            />
                                            {/* </span> */}
                                        </button>
                                    </form>
                                </li>
                            </ul>
                            <li className='nav-item dropdown text-decoration-none'>
                                <a
                                    className='nav-link dropdown-toggle langugae-location text-decoration-none'
                                    href='#'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <img
                                        src={egyptFlage}
                                        style={{ width: "25px" }}
                                    />
                                    {t("navTop.part5")}
                                </a>
                                <ul className='dropdown-menu p-2'>
                                    <li>
                                        <input
                                            type='radio'
                                            id='arabic'
                                            name='languge'
                                            onClick={() => changeLanguage("ar")}
                                        />
                                        <label htmlFor='arabic'>
                                            العربية- AR
                                        </label>
                                    </li>
                                    <hr />
                                    <li>
                                        <input
                                            type='radio'
                                            id='english'
                                            name='languge'
                                            onClick={() => changeLanguage("en")}
                                        />
                                        <label htmlFor='english'>
                                            English - EN
                                        </label>
                                    </li>
                                    <p>
                                        <a href='#'>{t("navTop.part25")}</a>
                                    </p>
                                    <hr />
                                    <p>
                                        <img
                                            src={egyptFlage}
                                            style={{ width: "25px" }}
                                        />
                                        {t("navTop.part26")}
                                    </p>
                                    <p>
                                        <a href='#'>{t("navTop.part27")}</a>
                                    </p>
                                </ul>
                            </li>
                            <li className='nav-item dropdown nav-account'>
                                <a
                                    className='nav-link dropdown-toggle'
                                    href='#'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <span className='account-lists'>
                                        {isLogin ? (
                                            <span className='hello'>
                                                {t("navTop.part2")},{name}
                                            </span>
                                        ) : (
                                            <span className='hello'>
                                                {t("navTop.part2")},
                                                {t("SignIn.part1")}
                                                <br />
                                            </span>
                                        )}

                                        {t("navTop.part7")}
                                    </span>
                                </a>
                                <ul className='dropdown-menu'>
                                    <li>
                                        {isLogin ? (
                                            <NavLink
                                                className='me-auto dropdown-item drop-account shadow text-decoration-none'
                                                to='./login'
                                                onClick={logOut}
                                            >
                                                {t("navTop.part13")}
                                            </NavLink>
                                        ) : (
                                            <NavLink
                                                to='/login'
                                                className='me-auto dropdown-item drop-account shadow text-decoration-none '
                                            >
                                                {t("SignIn.part1")}
                                            </NavLink>
                                        )}
                                        <p className='register'>
                                            {t("navTop.part20")}
                                            <Link to='./signUp'>
                                                {t("navTop.part21")}
                                            </Link>
                                        </p>
                                        <hr />
                                    </li>
                                    <li>
                                        <p className='border-3 fw-bold d-inline-block'>
                                            {t("navTop.part22")}
                                        </p>
                                        <p className='fw-bold mb-0'>
                                            {t("navTop.part23")}
                                        </p>
                                        <Link
                                            to='/account'
                                            className='text-decoration-none text-dark'
                                        >
                                            {t("navTop.part23")}
                                        </Link>
                                        <br />
                                        <NavLink
                                            to='/orders/'
                                            className='text-decoration-none text-dark'
                                        >
                                            {t("navTop.part24")}
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <NavLink
                                    className='nav-link order text-decoration-none'
                                    to='/orders/'
                                >
                                    {t("navTop.part3")}
                                </NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-decoration-none cart-container d-flex active-link p-1"
                                            : "text-decoration-none cart-container d-flex p-1"
                                    }
                                    to='/cart'
                                >
                                    <span className='item-count'>
                                        {isLogin ? (
                                            loading ? (
                                                <Spinner
                                                    style={{
                                                        display: "block",
                                                        width: "16px",
                                                        height: "16px",
                                                        marginLeft: "-4px",
                                                        marginBottom: "8px",
                                                        color: "#ffff",
                                                    }}
                                                    animation='border'
                                                    role='status'
                                                ></Spinner>
                                            ) : (
                                                totalPrice
                                            )
                                        ) : (
                                            cart?.length
                                        )}
                                    </span>
                                    <img className='mb-2' src={cartImage} />
                                    <span className='cart text-decoration-none'>
                                        {t("navTop.part4")}
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='search-bar-meduim d-flex d-lg-none'>
                <div className='flex-grow-1 h-100'>
                    <form role='search'>
                        <input
                            className='form-control seearch-input'
                            type='search'
                            placeholder='Search'
                            aria-label='Search'
                        />
                    </form>
                </div>
                <div className='h-100'>
                    <ion-icon
                        className='serch-icon'
                        name='search-outline'
                    ></ion-icon>
                </div>
            </div>
            <div className='menu'>
                <ul className='list-unstyled d-flex flex-row'>
                    <li>
                        <a href='#'>{t("nav2.part1")}</a>
                    </li>
                    <li>
                        <a href='#'>{t("nav2.part2")}</a>
                    </li>
                    <li>
                        <NavLink
                            className='text-capitalize'
                            to={`/products/category/${catogories.electronics.id}`}
                        >
                            {catogories.electronics.name}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='text-capitalize'
                            to={`/products/category/${catogories.fashion.id}`}
                        >
                            {catogories.fashion.name}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='text-capitalize'
                            to={`/products/category/${catogories.grocery.id}`}
                        >
                            {catogories.grocery.name}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='text-capitalize'
                            to={`/products/category/${catogories.beauty.id}`}
                        >
                            {catogories.beauty.name}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='text-capitalize'
                            to={`/products/category/${catogories.sports.id}`}
                        >
                            {catogories.sports.name}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='text-capitalize'
                            to={`/products/category/${catogories.mobilephones.id}`}
                        >
                            {catogories.mobilephones.name}
                        </NavLink>
                    </li>

                    <li>
                        <a href='#'>{t("nav2.part3")}</a>
                    </li>
                    <li>
                        <a href='#'>{t("nav2.part4")}</a>
                    </li>
                    <li>
                        <a href='#'>{t("nav2.part5")}</a>
                    </li>
                    <li>
                        <Link to={"/help"}>{t("nav2.part6")}</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};
