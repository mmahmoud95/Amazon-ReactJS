import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { instance } from "../../services/axios/instance";
import { authContext } from "../../context/authcontex";
const Order = () => {
  const { lang, setLang } = useContext(authContext);
  const { isLogin, setLogin } = useContext(authContext);
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();

  const getUserOrders = async () => {
    // Fetch orders from MongoDB or your API endpoint
    await instance
      .get("/order/userOrders", {
        headers: {
          Authorization: localStorage.getItem("userToken"),
        },
      }) // Update with your actual API endpoint
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      // Make an API request to delete the order by its ID
      const response = await instance.delete(`/order/${orderId}`);

      if (response) {
        // Refresh the orders list or update state to reflect the changes
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        console.log("Order deleted successfully!");
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="text-center">
          <h2 className="mb-4">{t("order.part1")}</h2>
        </div>
        <div className="row">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="card col-lg-10 col-md-10 col-sm-12 mx-auto my-3"
              >
                <div className="card-body">
                  <div className="bg-light p-2">
                    <div>
                      <h3 className="card-title fs-4">{t("order.part2")}</h3>
                    </div>

                    <button
                      className="btn btn-warning float-right"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      {t("order.part3")}
                    </button>
                    <div>
                      <h3 className="card-title fs-4">{t("order.part16")} :{order.name}</h3>
                    </div>
                    <p className="card-text fs-6 text-info">
                      {t("order.part4")}: {order.shippingAddress.street},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.province},{" "}
                      {order.shippingAddress.country}
                    </p>
                    <p>  {t("order.part15")}:  {order.shippingAddress.zip}{" "}</p>
                    <p className="card-text fs-6">
                      {t("order.part5")}: {order.totalOrderPrice} EGP
                    </p>
                    <p className="card-text fs-6">
                      {t("order.part6")}: {order.paymentMethodType}
                    </p>
                  </div>
                  <h3 className="card-title fs-5">{t("order.part7")}</h3>
                  <div className="  p-2">
                    {order.cartItems?.map((item) => (
                      <div key={item._id} className=" d-flex row  border p-1">
                        <div className="col-8 ">
                          <p className="fs-3">
                            {t("order.part8")}:
                            {lang === "en"
                              ? item.productId?.en.title
                              : item.productId?.ar.title}
                          </p>
                          <p className="fs-4">
                            {t("order.part9")}:{" "}
                            {lang === "en"
                              ? item.productId?.en.description
                              : item.productId?.ar.description}
                          </p>
                          <p className="fs-4">
                            {t("order.part10")}:{item.price} EGP
                          </p>
                          <p className="fs-4">
                            {t("order.part11")}: {item.quantity}
                          </p>
                        </div>

                        <div className="col-4 ">
                          <img
                            src={item.productId?.thumbnail}
                            alt={item.productId?.en.title}
                            className="img-fluid"
                            style={{
                              width: "200px",
                              height: "150px",
                              objectFit: "contain",
                              marginRight: "10px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="card-text fs-5">
                    {t("order.part13")}: {order.isPaid ? "Yes" : "No"}
                  </p>
                  <p className="card-text fs-5">
                    {t("order.part14")}: {order.isDelivered ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="col-12 text-center">{t("order.part12")}</h1>
          )}
        </div>
      </div>
    </>
  );
};
export default Order;
