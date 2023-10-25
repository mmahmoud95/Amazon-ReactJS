import "./navbar.css";
import amzonlogo from "../../assets/nav-images/amzon-logo.png";
import cartImage from "../../assets/nav-images/cart.png";
import egyptFlage from "../../assets/nav-images/egypt-flag.svg";
import { IoSearchOutline, IoLocationOutline } from "react-icons/io5";
import { NavLink  } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
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
                                        <p className='deliver'>Deliver to</p>
                                        <a
                                            className='nav-link active address'
                                            aria-current='page'
                                            href='#'
                                        >
                                            Egypt
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <ul className='navbar-nav search-bar'>
                                <li className='nav-item'>
                                    <form role='search'>
                                        <input
                                            className='form-control search-input align-items-center'
                                            type='search'
                                            placeholder='          Search'
                                            aria-label='Search'
                                        />
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
                                        All
                                    </a>
                                    <ul className='dropdown-menu'>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                All Category
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                Amazon Devices
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                Amazon Fashion
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                Amazon Warehouse
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                Baby
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                Books
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                Sports
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                href='#'
                                            >
                                                Software
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className='nav-item'>
                                    <span className='serch-icon d-block'>
                                        <IoSearchOutline />
                                    </span>
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
                                    EN
                                </a>
                                <ul className='dropdown-menu p-2'>
                                    <li>
                                        <input
                                            type='radio'
                                            id='arabic'
                                            name='languge'
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
                                        />
                                        <label htmlFor='english'>
                                            English - EN
                                        </label>
                                    </li>
                                    <p>
                                        <a href='#'>Learn more</a>
                                    </p>
                                    <hr />
                                    <p>
                                        <img
                                            src={egyptFlage}
                                            style={{ width: "25px" }}
                                        />
                                        You are shopping on Amazon.eg
                                    </p>
                                    <p>
                                        <a href='#'>Change country/ region.</a>
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
                                        <span className='hello'>
                                        Hello, sign in
                                            <br />
                                        </span>
                                        Account & Lists
                                    </span>
                                </a>
                                <ul className='dropdown-menu'>
                                    <li>
                                        <a
                                            className='dropdown-item drop-account shadow'
                                           
                                        >
                                 <Nav className="me-auto ">
                                 <NavLink to="/login" className={({isActive})=>(isActive)?"act":"test"}  >sign in</NavLink>
                                   </Nav> 
                                        </a>
                                        <p className='register'>
                                            New customer?
                                            <a href='../register-page/register.html'>
                                                Start here.
                                            </a>
                                        </p>
                                        <hr />
                                    </li>
                                    <li>
                                        <p className='border-3 fw-bold d-inline-block'>
                                            Your Lists
                                        </p>
                                        <p className='fw-bold mb-0'>
                                            Your Account
                                        </p>
                                        <a
                                            href='../account-page/account.html'
                                            className='text-decoration-none text-dark'
                                        >
                                            Your Account
                                        </a>
                                        <br />
                                        <a
                                            href='../orders/order.html'
                                            className='text-decoration-none text-dark'
                                        >
                                            Your Orders
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className='nav-link order'
                                    href='../orders/order.html'
                                >
                                    Orders
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
                                    <span className='item-count'>4</span>
                                    <img className='mb-2' src={cartImage} />
                                    <span className='cart text-decoration-none'>
                                        Cart
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
                    <ul className='dropdown-menu'>
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
                    </ul>
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
                        <a href='#'>All</a>
                    </li>
                    <li>
                        <a href='#'>Deals</a>
                    </li>
                    <li>
                        <a href='../category-page/category.html'>
                            Mobile Phones
                        </a>
                    </li>
                    <li>
                        <a href='#'>Electronics</a>
                    </li>
                    <li>
                        <a href='#'>Application</a>
                    </li>
                    <li>
                        <a href='#'>Fashion</a>
                    </li>
                    <li>
                        <a href='#'>Home</a>
                    </li>
                    <li>
                        <a href='#'>Video Games</a>
                    </li>
                    <li>
                        <a href='#'>Toy & Games</a>
                    </li>
                    <li>
                        <a href='#'>Grocery</a>
                    </li>
                    <li>
                        <a href='../help-page/help.html'>Help</a>
                    </li>
                </ul>
            </div>
        </>
    );
};
