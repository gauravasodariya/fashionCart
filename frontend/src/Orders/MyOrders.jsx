import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import { LaunchOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyOrders, removeErrors } from "../features/order/orderSlice";
import Loader from "../components/Loader";

function MyOrders() {
  const { orders, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMyOrders());
    if (error) {
      console.error(error);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "4rem auto",
      padding: "1.5rem",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: isMobile ? "1.4rem" : "1.8rem",
      marginBottom: "1rem",
      color: "#333",
      borderBottom: "2px solid #f0f0f0",
      paddingBottom: "0.5rem",
    },
    tableResponsive: { overflowX: "auto" },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
      fontSize: isMobile ? "0.9rem" : "1rem",
    },
    th: {
      padding: "0.8rem",
      background: "var(--bg-secondary)",
      color: "var(--text-primary)",
      fontWeight: "bold",
    },
    tr: { background: "#fafafa" },
    td: { padding: "0.8rem", borderBottom: "1px solid #e0e0e0" },
    link: {
      display: "inline-flex",
      alignItems: "center",
      color: "#007bff",
      textDecoration: "none",
    },
    noOrders: {
      maxWidth: "900px",
      margin: "4rem auto",
      padding: "2rem",
      textAlign: "center",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    noOrderMessage: { fontSize: isMobile ? "1rem" : "1.2rem", color: "#555" },
  };
  return (
    <>
      <Navbar />
      <PageTitle title="User Order" />
      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <div style={styles.container}>
          <h1 style={styles.title}>My Orders</h1>
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
          <div style={styles.tableResponsive}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Items Count</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Total Price</th>
                  <th style={styles.th}>View Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={styles.tr}>
                    <td style={styles.td}>{order._id}</td>
                    <td style={styles.td}>{order.orderItems.length}</td>
                    <td style={styles.td}>{order.orderStatus}</td>
                    <td style={styles.td}>{order.totalPrice}</td>
                    <td style={styles.td}>
                      <Link to={`/order/${order._id}`} style={styles.link}>
                        <LaunchOutlined />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={styles.noOrders}>
          <p style={styles.noOrderMessage}>No Orders Found</p>
          {error && (
            <div
              style={{
                background: "#fdecea",
                color: "#611a15",
                border: "1px solid #f5c6cb",
                borderRadius: "8px",
                padding: "10px 12px",
                marginTop: "12px",
              }}
            >
              {typeof error === "string"
                ? error
                : error.message || "An error occurred"}
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default MyOrders;
