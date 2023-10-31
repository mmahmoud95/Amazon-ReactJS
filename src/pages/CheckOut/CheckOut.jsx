import React from "react";
import logoImage from "./amazon.png";
import "./checkoutStyle.css";
import { Link } from "react-router-dom";

const CheckOut = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex  checkoutHeader">
        <div className="w-50 ps-5 ">
          <div style={{ width: "103px", height: "50px" }} className="py-2 d-none d-lg-block d-xl-block ">
            <Link to="/">
              <img src={logoImage} className=" img-fluid d-sm-none d-md-block" />
            </Link>
          </div>
        </div>
        <div className="w-50 py-3">
          <span className="fs-4 fw-bold">Checkout (<span className="text-info">1 item</span>)</span>
        </div>
      </div>
      {/* <!-- main container  --> */}
      <div
        className="row  mainParent"
      >
        <div className="col-lg-8 col-md-8  p-1 ">
          {/* shipping address section */}
          <div className="border-bottom bg-white d-flex m-1">
            <div>
              <Link className="text-decoration-none fw-bold text-dark" href="">
                <span className="px-1">1-</span> Shipping address
              </Link>
            </div>
            <div className="mx-auto">
              <ul className="list-unstyled">
                <li>hamza mohamed </li>
                <li>nasser Elzeraie street</li>
                <li>20</li>
                <li>Sohag, Markaz Akhmim, Markaz Akhmim</li>
                <li>
                  <Link className="text-decoration-none">
                    Add delivery instructions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pe-3" >
              <Link className="text-decoration-none">Change</Link>
            </div>
          </div>
          <div>
            {/* payment section */}
            <div className="p-2">
              <h4 className="fs-5">2 Choose a payment method</h4>
            </div>
            <div className="p-1 pb-0 d-block border rounded ms-2">
              <h5 className="border-bottom p-1 fw-bold">
                Your available balance
              </h5>
              <div className="d-flex p-3">
                <a className="ps-2 pt-4" href="#">
                  <i
                    className="fa-solid fa-plus"
                    // style="color: #c9cfd9"
                  ></i>
                </a>
                <div className="mx-3">
                  <p className="small p-0 m-0 fw-bold">
                    Enter a gift card or promotional code
                  </p>
                  <div>
                    <input
                      type="text"
                      className="d-block w-75"
                      placeholder="Enter code"
                    />
                  </div>
                </div>
                <div className="">
                  <input
                    type="button"
                    className="d-block w-100 bg-white mt-3 border border-light text-muted btn"
                    value="Apply"
                    placeholder=""
                  />
                </div>
              </div>
              <h5 className="border-bottom fw-bold">Your credit and debit cards</h5>

              <div className="d-flex p-3">
                <a className="p-auto" href="#">
                  <i
                    className="fa-solid fa-plus"
                    style={{color: "#c9cfd9"}}
                  ></i>
                </a>
                <div className="mx-3">
                  <i className="fa-brands fa-cc-amazon-pay"></i>
                  <a href="#" target="_blank" className="text-decoration-none ps-1">
                    Add a credit or debit card &gt;
                    <span className="text-muted small px-2">
                      amazon.eg accepts all major credit cards
                    </span>
                  </a>
                </div>
              </div>
              <h5 className="fw-bold">Other payment options</h5>
              <div className="border-top d-flex p-3">
                <div className="mx-2">
                  <p className="fw-bold">
                    <input className="mx-2" type="radio" />
                    Cash on Delivery
                  </p>
                  <div className="mx-4">
                    <span>
                      Pay by cash on delivery. Non-refundable COD fees of
                      <span className="fw-bold">EGP 12</span> may apply.
                      <a className="text-decoration-none" href="#">
                        Learn more
                      </a>
                      .
                    </span>
                    <p>Pay online for contactless deliveries.</p>
                  </div>
                </div>
              </div>
              <div className="border-top bg-light p-3">
                <input
                  type="button"
                  className="d-block w-30 border rounded paymentButton small p-2"
                  style={{backgroundColor:"#FFFAE0"}}
                  value="Use this payment method"

                  placeholder="Use this payment method"
                />
              </div>

            </div>
            <div className="border-bottom border-top mt-3">
                <a target="_blank" aria-disabled className="text-decoration-none text-muted fs-3" >
                  <span className="px-1">3</span> Offers
                </a>
              </div>
              <div className="border-bottom">
                <a target="_blank" aria-disabled  className="text-decoration-none text-muted fs-3" href="#">
                  <span className="px-1">4</span> Items and Shipping
                </a>
              </div>
            {/* last section info */}
            <div className="row">
              <div className="pt-3 pb-1 text-muted small col-9" >
                <p>
                  *Why has sales tax been applied?
                  <a  target="_blank"  href="#"  className="text-decoration-none">See tax and seller information</a>
                </p>
                <p>
                  Need help? Check our <a href="#" target="_blank" className="text-decoration-none">Help pages</a> or
                  <a  target="_blank"  href="#"  className="text-decoration-none">contact us</a>
                </p>
                <p>
                  For an item sold by amazon.eg: When you click the ""Place your
                  order"" button, we'll send you an email message acknowledging
                  receipt of your order. Your contract to purchase an item will
                  not be complete until we send you an email notifying you that
                  the item has been shipped.
                </p>
                <p>
                  You may return new, unopened merchandise in original condition
                  within 15 days of delivery. Exceptions and restrictions apply.
                  See amazon.eg's
                  <a href="#"   target="_blank" className="text-decoration-none">Returns Policy</a>.
                </p>
                <p>
                  Need to add more items to your order? Continue shopping on the{" "}
                  <a href="#"  target="_blank" className="text-decoration-none" >amazon.eg homepage</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white col-lg-4 col-md-4 ps-4 mt-2 stickyDiv  " >
          <div className="border rounded w-100">
            <div className="d-block p-2">
              <div className="border-bottom">
                <input
                  type="button"
                  className="d-block w-100 border rounded text-secondary small p-2"
                  value="Use this payment method"
                  style={{backgroundColor:"#FFFAE0"}}
                  placeholder=""
                />
                <p className="text-muted small text-center">
                  <span className="mb-0">Choose a payment method to continue</span>
                  <span>checking out. You'll still have a chance to</span>
                  <span>review and edit your order before it's final.</span>
                </p>
              </div>
              <div>
                <h4>Order Summary</h4>
                <ul className="list-unstyled">
                  <li>
                    <span>Items:</span>
                    <span style={{float: "right"}}>EGP 65.99</span>
                  </li>
                  <li>
                    <span>Shipping & handling:</span>
                    <span style={{float: "right"}}>---</span>
                  </li>
                  <li>
                    <span>Total:</span>
                    <span style={{float: "right"}}>---</span>
                  </li>
                  <li>
                    <span>Promotion applied:</span>
                    <span style={{float: "right"}}>---</span>
                  </li>
                  <hr />
                  <li>
                    <span className="text-danger fw-bold">Order total:</span>
                    <span style={{float: "right"}}>---</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-top bg-light m-0">
              <div className="p-3">
                <a href="#" target="_blank" className="small text-decoration-none">
                  How are shipping costs calculated?
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
