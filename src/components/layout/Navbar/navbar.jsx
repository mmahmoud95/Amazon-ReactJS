import "./navbar.css";
import amzonlogo from "../../../assets/nav-images/amzon-logo.png";
import cartImage from "../../../assets/nav-images/cart.png";
import egyptFlage from "../../../assets/nav-images/egypt-flag.svg";
import { IoSearchOutline, IoLocationOutline, IoLogOut } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { instance } from "../../../services/axios/instance";
import { useContext } from "react";
import { authContext } from "../../../context/authcontex";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { clearCart } from "../../../Store/Slice/Cart";

// import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
    let cartPageRedux = useSelector((state) => state.Cart.cart);
    const totalPrice = useSelector((state) => state.Cart.totalPrice);
    const dispatch = useDispatch();

    // const [numberItems, setNumberItems] = useState(0);
    const name = localStorage.getItem("name");
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(authContext);
    const { lang, setLang } = useContext(authContext);

    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState("All");
    //   for category
    const searchSubmit = (e) => {
        const { value } = e.target;
        if (value === "All") {
            setSearchCategory(value);
            localStorage.setItem("category", "All");
        } else if (value === "groceries") {
            localStorage.setItem("category", "653c2a48c6676875dde642fc");

            setSearchCategory("653c2a48c6676875dde642fc");
        } else if (value === "laptops") {
            localStorage.setItem("category", "653c2a4cc6676875dde642fe");

            setSearchCategory("653c2a4cc6676875dde642fe");
        } else {
            setSearchCategory("All");
            localStorage.setItem("category", "All");
        }
    };
    // useEffect(() => {
    //     if (isLogin) {
    //         instance
    //             .get("cart", {
    //                 headers: {
    //                     Authorization: localStorage.getItem("userToken"),
    //                 },
    //             })
    //             .then((res) => {
    //                 // priductsitemsid = res.data.data[0].items;
    //                 // console.log(res.data.data.items);
    //                 // setCartPage(res.data.data.items);
    //                 console.log();
    //                 // localStorage.setItem("cartItems", res.data.numOfCartItems);
    //                 setNumberItems(res.data.numOfCartItems);
    //             });
    //     }
    // }, []); // console.log(catogories);
    useEffect(() => {
        console.log(searchCategory);
        // localStorage.setItem('category',searchCategory)
    }, [searchCategory]);
    //   for text
    const handleChange = (e) => {
        setSearchText(e.target.value);
        console.log(searchCategory);
    };
    const logOut = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("cart");
        localStorage.removeItem("name");
        dispatch(clearCart(cartPageRedux));
        setLogin(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/products/results?${searchText}`);
        // ,
        //  {
        //   state: { Category: searchCategory },
        // });
        setSearchText("");
        setSearchCategory("");
    };
//
   const {t}=useTranslation()
   const changeLanguage=(language)=>{
    i18n.changeLanguage(language)
    if(language==="ar"){
        setLang("ar")
      }else{
        setLang("en")
      }
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
//
    const [catogories, setCatogories] = useState([]);
    useEffect(() => {
        instance
            .get("category")
            .then((res) => {
                // console.log(res.data);
                setCatogories(res.data);
                // setCategoryProducts(res.data.data);
                // console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [catogories]);
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
                                            className='nav-link active address'
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
                                                className='nav-item dropdown all-category-search py-2  '
                                                defaultValue={"All"}
                                            >
                                                <option
                                                    className='dropdown-item'
                                                    value='All'
                                                >
                                                     {t("navTop.part12")} 
                                                </option>
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
                                                <option className='dropdown-item'>
                                                {t("navTop.part15")}
                                                </option>
                                                <option className='dropdown-item'>
                                                {t("navTop.part16")}
                                                </option>
                                                <option className='dropdown-item'>
                                                {t("navTop.part18")}
                                                </option>
                                            </select>
                                        </li>

                                        <input
                                            className='form-control  align-items-center'
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
                                            <IoSearchOutline />
                                            {/* </span> */}
                                        </button>
                                    </form>
                                </li>
                                <li className='nav-item dropdown all-category-search'>
                                    <a
                                        className='nav-link dropdown-toggle'
                                        href='#'
                                        role='button'
                                        data-bs-toggle='dropdown'
                                        aria-expanded='false'
                                    >
                                        {t("navTop.part8")}
                                    </a>
                                    <ul className='dropdown-menu'>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                {t("navTop.part9")}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                {t("navTop.part10")}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                {t("navTop.part14")}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                {t("navTop.part19")}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                {t("navTop.part17")}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                {t("navTop.part15")}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                {t("navTop.part16")}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                {t("navTop.part18")}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <li className='nav-item dropdown'>
                                <a
                                    className='nav-link dropdown-toggle langugae-location'
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
                                        {(isLogin)?<span className='hello' >{t("navTop.part2")},{name}</span>
                                        :   <span className='hello'>
                                           {t("navTop.part2")},{t("SignIn.part1")} 
                                            <br />
                                        </span>}
                                     
                                        {t("navTop.part7")}
                                    </span>
                                </a>
                                <ul className='dropdown-menu'>
                                    <li>
                                        <a className='dropdown-item drop-account shadow'>
                                            {isLogin ? (
                                                <NavLink
                                                    className='me-auto '
                                                    to='./login'
                                                    onClick={logOut}
                                                >
                                                    {t("navTop.part13")}
                                                </NavLink>
                                            ) : (
                                                <Nav className='me-auto '>
                                                    <NavLink
                                                        to='/login'
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? "act"
                                                                : "test"
                                                        }
                                                    >
                                                        {t("SignIn.part1")} 
                                                    </NavLink>
                                                </Nav>
                                            )}
                                        </a>
                                        <p className='register'>
                                        {t("navTop.part20")}
                                            <a href='../register-page/register.html'>
                                            {t("navTop.part21")}
                                            </a>
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
                                        <a
                                            href='../account-page/account.html'
                                            className='text-decoration-none text-dark'
                                        >
                                          {t("navTop.part23")}
                                        </a>
                                        <br />
                                        <a
                                            href='../orders/order.html'
                                            className='text-decoration-none text-dark'
                                        >
                                            {t("navTop.part24")}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className='nav-link order'
                                    href='../orders/order.html'
                                >
                                    {t("navTop.part3")}
                                </a>
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
                                        {isLogin ? totalPrice : cart?.length}
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
                <div className='all-category-search'>
                    <a
                        className='nav-link dropdown-toggle'
                        href='#'
                        role='button'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                    >
                        All
                    </a>
                    {/* <ul className='dropdown-menu'>
                        <li>
                            <a className='dropdown-item' href='#'>
                                All Category
                            </a>
                        </li>
                        <li>
                            <a className='dropdown-item' href='#'>
                                Amazon Devices
                            </a>
                        </li>
                        <li>
                            <a className='dropdown-item' href='#'>
                                Amazon Fashion
                            </a>
                        </li>
                        <li>
                            <a className='dropdown-item' href='#'>
                                Amazon Warehouse
                            </a>
                        </li>
                        <li>
                            <a className='dropdown-item' href='#'>
                                Baby
                            </a>
                        </li>
                        <li>
                            <a className='dropdown-item' href='#'>
                                Books
                            </a>
                        </li>
                        <li>
                            <a className='dropdown-item' href='#'>
                                Sports
                            </a>
                        </li>
                        <li>
                            <a className='dropdown-item' href='#'>
                                Software
                            </a>
                        </li>
                    </ul> */}
                </div>
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

                    {catogories.map((category, index) => {
                        return (
                            <li key={index}>
                                <NavLink
                                    className='text-capitalize'
                                    to={`/products/category/${category._id}`}
                                >
                                    {category.name}
                                </NavLink>
                            </li>
                        );
                    })}

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
                        <a href='../help-page/help.html'>{t("nav2.part6")}</a>
                    </li>
                </ul>
            </div>
        </>
    );
};
