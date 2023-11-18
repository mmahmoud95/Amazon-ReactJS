import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { instance } from "../../services/axios/instance";
import { authContext } from "../../context/authcontex";
const Order = () => {
  const { lang, setLang } = useContext(authContext);
  const { isLogin, setLogin } = useContext(authContext);
  const [orders, setOrders] = useState([]);

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
    // Initial fetch of orders when the component mounts
    getUserOrders();
  }, []);

  return (
    <>
      <div className="container mt-2">
        <h2>Orders List</h2>
        <div className="row">
          {orders.length > 0 ? (
            orders?.map((order) => (
              <div key={order._id} className="card col-12 my-2">
                <div className="card-body">
                  <div>
                    <button
                      className="btn btn-warning"
                      style={{ float: "right" }}
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete order
                    </button>
                  </div>
                  <h3 className="card-title">Order Details</h3>
                  <p className="card-text">
                    Shipping Address: {order.shippingAddress.street},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.province},{" "}
                    {order.shippingAddress.zip}, {order.shippingAddress.country}
                  </p>
                  <p className="card-text">
                    Total Order Price: ${order.totalOrderPrice}
                  </p>
                  <p className="card-text">
                    Payment Method: {order.paymentMethodType}
                  </p>
                  <h3 className="card-title">Products</h3>
                  <div className="row border p-2">
                    {order.cartItems?.map((item) => (
                      <div
                        key={item._id}
                        className="product-card col-lg-6 col-12"
                      >
                        <p>Title: {item.productId?.en?.title}</p>
                        <p>Description: {item.productId?.en?.description}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>

                        {/* Add image display logic here */}
                        <img
                          src={item.productId?.thumbnail}
                          alt={item.productId?.en.title}
                          className="img-fluid"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Additional order details, if any */}
                  <p className="card-text">
                    Is Paid: {order.isPaid ? "Yes" : "No"}
                  </p>
                  <p className="card-text">
                    Is Delivered: {order.isDelivered ? "Yes" : "No"}
                  </p>

                  {/* Add more Bootstrap classes or components for styling */}
                </div>
              </div>
            ))
          ) : (
            <h1>you do not have any orders yet</h1>
          )}
        </div>
      </div>
    </>
  );
};
export default Order;
