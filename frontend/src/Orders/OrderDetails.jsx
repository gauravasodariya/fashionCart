import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
import Loader from "../components/Loader";

function OrderDetails() {
  const { orderId } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const titleFontSize = isMobile ? "1.2rem" : "1.5rem";
  const tableFontSize = isMobile ? "0.9rem" : "1rem";
  const itemImgSize = isMobile ? "50px" : "60px";

  const getStatusTagStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "delivered")
      return {
        padding: "0.2rem 0.5rem",
        borderRadius: "4px",
        fontWeight: "bold",
        color: "green",
        background: "rgba(0, 128, 0, 0.2)",
      };
    if (s === "cancelled")
      return {
        padding: "0.2rem 0.5rem",
        borderRadius: "4px",
        fontWeight: "bold",
        color: "#dc3545",
        background: "rgba(220, 53, 69, 0.2)",
      };
    return {
      padding: "0.2rem 0.5rem",
      borderRadius: "4px",
      fontWeight: "bold",
      color: "orange",
      background: "rgba(255, 165, 0, 0.2)",
    };
  };
  const getPayTagStyle = (paid) => {
    return paid
      ? {
          padding: "0.2rem 0.5rem",
          borderRadius: "4px",
          fontWeight: "bold",
          color: "#28a745",
          background: "rgba(40, 167, 69, 0.2)",
        }
      : {
          padding: "0.2rem 0.5rem",
          borderRadius: "4px",
          fontWeight: "bold",
          color: "#dc3545",
          background: "rgba(220, 53, 69, 0.2)",
        };
  };
  const { order, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      console.error(error);
      dispatch(removeErrors());
    }
  }, [dispatch, error, orderId]);
  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemPrice,
    paidAt,
  } = order;
  const paymentStatus =
    paymentInfo?.status === "succeeded" ? "Paid" : "Not Paid";
  const finalOrderStatus =
    paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;
  // Removed unused CSS class variables after inlining styles
  return (
    <>
      <PageTitle title={orderId} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            maxWidth: "900px",
            margin: "4rem auto",
            padding: "1.5rem",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {error && (
            <div
              style={{
                background: "#fdecea",
                color: "#611a15",
                border: "1px solid #f5c6cb",
                borderRadius: "8px",
                padding: "10px 12px",
                marginBottom: "12px",
              }}
            >
              {typeof error === "string"
                ? error
                : error.message || "An error occurred"}
            </div>
          )}
          {/* Order Items table */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: titleFontSize,
                marginBottom: "1rem",
                color: "#444",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "0.5rem",
              }}
            >
              Order Items
            </h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                marginBottom: "1rem",
                fontSize: tableFontSize,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "0.8rem",
                      background: "var(--bg-secondary)",
                      fontWeight: "bold",
                      color: "var(--text-primary)",
                    }}
                  >
                    Image
                  </th>
                  <th
                    style={{
                      padding: "0.8rem",
                      background: "var(--bg-secondary)",
                      fontWeight: "bold",
                      color: "var(--text-primary)",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      padding: "0.8rem",
                      background: "var(--bg-secondary)",
                      fontWeight: "bold",
                      color: "var(--text-primary)",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      padding: "0.8rem",
                      background: "var(--bg-secondary)",
                      fontWeight: "bold",
                      color: "var(--text-primary)",
                    }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, idx) => (
                  <tr key={idx} style={{ background: "#fafafa" }}>
                    <td
                      style={{
                        padding: "0.8rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: itemImgSize,
                          height: itemImgSize,
                          borderRadius: "4px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "0.8rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      {item.name}{" "}
                    </td>
                    <td
                      style={{
                        padding: "0.8rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "0.8rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      {item.price}/-
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping Info Table */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: titleFontSize,
                marginBottom: "1rem",
                color: "#444",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "0.5rem",
              }}
            >
              Shipping Info
            </h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                marginBottom: "1rem",
                fontSize: tableFontSize,
              }}
            >
              <tbody>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    Address
                  </th>
                  <td
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {shippingInfo.address},{shippingInfo.city},
                    {shippingInfo.state},{shippingInfo.country}-
                    {shippingInfo.pinCode}
                  </td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    Phone
                  </th>
                  <td
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {shippingInfo.phoneNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: titleFontSize,
                marginBottom: "1rem",
                color: "#444",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "0.5rem",
              }}
            >
              Order Summary
            </h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                marginBottom: "1rem",
                fontSize: tableFontSize,
              }}
            >
              <tbody>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    Order Status
                  </th>
                  <td
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <span style={getStatusTagStyle(finalOrderStatus)}>
                      {finalOrderStatus}
                    </span>
                  </td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    Payment
                  </th>
                  <td
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <span style={getPayTagStyle(paymentStatus === "Paid")}>
                      {paymentStatus}
                    </span>
                  </td>
                </tr>
                {paidAt && (
                  <tr style={{ background: "#fafafa" }}>
                    <th
                      style={{
                        padding: "0.8rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      Paid At
                    </th>
                    <td
                      style={{
                        padding: "0.8rem",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      {new Date(paidAt).toLocaleString()}
                    </td>
                  </tr>
                )}
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    Items Price
                  </th>
                  <td
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {itemPrice}/-
                  </td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    Tax Price
                  </th>
                  <td
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {taxPrice}/-
                  </td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    Shipping Price
                  </th>
                  <td
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {shippingPrice}/-
                  </td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    Total Price
                  </th>
                  <td
                    style={{
                      padding: "0.8rem",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {totalPrice}/-
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default OrderDetails;
