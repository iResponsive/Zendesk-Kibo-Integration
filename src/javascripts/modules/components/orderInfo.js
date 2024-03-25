import React, { useEffect, useState } from "react";
import { Spinner } from "@zendeskgarden/react-loaders";
import BackIcon from "./icons/back";
import EditIcon from "./icons/edit";
import TicketDetails from "./ticketDetails";
import {
  getAccessToken,
  getOrderHistoryByEmail,
  getOrderDetails,
  getShipmentDetails,
} from "../api/api";

const styles = {
  orderInfoContainer: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "10px",
    fontFamily: "monospace",
  },
  header: {
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  customerEmail: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    marginRight: "10px",
    fontWeight: "bold",
  },
  emailContainer: {
    display: "inline-flex",
    alignItems: "center",
    marginBottom: "4px",
  },
  emailSpan: {
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  emailInput: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
    width: "200px",
  },
  orderIdInput: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
    width: "165px",
  },
  editButton: {
    padding: "5px 10px",
    borderRadius: "5px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
  },
  submitButton: {
    padding: "5px 10px",
    borderRadius: "5px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  orderHistory: {
    marginBottom: "20px",
  },
  orderContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  orderBanner: {
    display: "flex",
    flexDirection: "space-between",
    alignItems: "flex-start",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "box-shadow 0.3s, background-color 0.3s",
    width: "-webkit-fill-available",
    fontFamily: "inherit",
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
    textAlign: "right",
  },
  highlighted: {
    backgroundColor: "#f0f0f0",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  insideContainerFont: {
    fontWeight: "bold",
  },
};

const OrderInfo = ({ emailAddress, orderNo, shipmentDetails }) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(emailAddress);
  const [editModeEmailId, setEditModeEmailId] = useState(false);
  const [editModeOrderId, setEditModeOrderId] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [orderId, setOrderId] = useState(orderNo);
  const [newOrderId, setNewOrderId] = useState("");
  const [submittedNewOrderId, setSubmittedNewOrderId] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [submittedNewEmail, setSubmittedNewEmail] = useState(false);
  const [orderInfoEmailUser, setOrderInfoUserEmailUser] = useState(null);
  const [orderInfoOrderIdUser, setOrderInfoUserOrderIdUser] = useState(null);
  const [dataExists, setDataExists] = useState(true);
  const [shipmentDetailsInfo, setShipmentDetailsInfo] = useState("");
  const [orderInfoData, setOrderInfoData] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);
  const selectedOrderNumber = selectedOrder ? selectedOrder.orderNumber : null;

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleEditClickEmailId = () => {
    setEditModeEmailId(true);
    setNewEmail(email);
    setEditModeOrderId(false);
  };

  const handleEditClickOrderId = () => {
    setEditModeOrderId(true);
    setNewOrderId(orderId);
    setEditModeEmailId(false);
    setSubmittedNewEmail(false);
  };

  useEffect(() => {
    let isInitialFetchAttempted = false;
    const maxRetries = 0;
    let retryCount = 0;

    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = await getAccessToken();
        const userInfo = await getOrderHistoryByEmail(
          emailAddress,
          accessToken
        );
        setOrderHistory(userInfo.orderHistory || []);
        setLoading(false);
        isInitialFetchAttempted = true;
      } catch (error) {
        setError("Error fetching order history");
        setLoading(false);
        isInitialFetchAttempted = true;
      }
    };

    const retryFetchData = async () => {
      if (emailAddress && !isInitialFetchAttempted && retryCount < maxRetries) {
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetchData();
        await retryFetchData();
      }
    };

    if (emailAddress) {
      fetchData();
      retryFetchData();
    }
  }, [emailAddress]);

  useEffect(() => {
    let isInitialOrderFetchAttempted = false;
    const maxOrderRetries = 0;
    let orderRetryCount = 0;

    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const accessToken = await getAccessToken();
        const orderInfo = await getOrderDetails(orderNo, accessToken);
        setOrderInfoUserOrderIdUser(orderInfo.orderDetails[0]);
        setOrderId(orderNo);
        setEditModeOrderId(false);
        setSubmittedNewOrderId(true);
        setDataExists(true);
        setLoading(false);
        isInitialOrderFetchAttempted = true;
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
        isInitialOrderFetchAttempted = true;
      }
    };

    const retryOrderFetchData = async () => {
      if (!isInitialOrderFetchAttempted && orderRetryCount < maxOrderRetries) {
        orderRetryCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetchOrderData();
        await retryOrderFetchData();
      }
    };

    if (orderNo) {
      fetchOrderData();
      retryOrderFetchData();
    }
  }, [orderNo]);

  const handleSubmitEmailId = async () => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const userInfo = await getOrderHistoryByEmail(newEmail, accessToken);
      setOrderInfoUserEmailUser(userInfo);
      setEmail(newEmail);
      setEditModeEmailId(false);
      setSubmittedNewEmail(true);
      setDataExists(true);
    } catch (err) {
      console.log("please enter a valid Email Address", err);
      setError("please enter a valid Email Address");
    }
    setLoading(false);
  };

  const handleSubmitOrderId = async () => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const userInfo = await getOrderDetails(newOrderId, accessToken);
      setOrderInfoUserOrderIdUser(userInfo.orderDetails[0]);
      setOrderId(newOrderId);
      setEditModeOrderId(false);
      setSubmittedNewOrderId(true);
      setDataExists(true);
    } catch (error) {
      console.error("please enter a valid Order Number", error);
      setError("please enter a valid Order Number");
      setDataExists(false);
    }
    setLoading(false);
  };

  const fetchShipmentDetails = async (orderNumber) => {
    try {
      const accessToken = await getAccessToken();
      const shipmentDetails = await getShipmentDetails(
        orderNumber,
        accessToken
      );
      setShipmentDetailsInfo(shipmentDetails);
    } catch (error) {
      console.error("Error fetching shipment details:", error);
    }
  };

  const handleInputChangeEmailId = (e) => {
    setNewEmail(e.target.value);
  };

  const handleInputChangeOrderId = (e) => {
    setNewOrderId(e.target.value);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    fetchShipmentDetails(order.orderNumber);
    setShowTicketDetails(true);
  };

  const handleBackButtonClick = () => {
    setShowTicketDetails(false);
  };

  return (
    <div style={styles.orderInfoContainer}>
      {showTicketDetails && (
        <span onClick={handleBackButtonClick} style={{ cursor: "pointer" }}>
          <BackIcon />
        </span>
      )}
      <h2 style={styles.header}>Customer Order Information</h2>
      {!showTicketDetails && (
        <>
          {emailAddress && !orderNo && (
            <div style={styles.customerEmail}>
              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              {!editModeEmailId ? (
                <div style={styles.emailContainer}>
                  <span style={styles.emailSpan}>{email}</span>
                  <span
                    onClick={handleEditClickEmailId}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                  >
                    <EditIcon />
                  </span>
                </div>
              ) : (
                <div style={styles.emailContainer}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newEmail}
                    onChange={handleInputChangeEmailId}
                    style={styles.emailInput}
                  />
                  <button
                    onClick={() => {
                      handleSubmitEmailId();
                      setSubmittedNewEmail(true); // Update state when search button is clicked
                    }}
                    style={styles.submitButton}
                  >
                    Search
                  </button>
                </div>
              )}
            </div>
          )}
          {orderNo && !emailAddress && (
            <div style={styles.customerEmail}>
              <label htmlFor="orderId" style={styles.label}>
                Order No:
              </label>
              {!editModeOrderId ? (
                <div style={styles.emailContainer}>
                  <span style={styles.emailSpan}>{orderId}</span>
                  <span
                    onClick={handleEditClickOrderId}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  >
                    <EditIcon />
                  </span>
                </div>
              ) : (
                <div style={styles.emailContainer}>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={newOrderId}
                    onChange={handleInputChangeOrderId}
                    style={styles.orderIdInput}
                  />
                  <button
                    onClick={() => {
                      handleSubmitOrderId();
                      setSubmittedNewOrderId(true); // Update state when search button is clicked
                    }}
                    style={styles.submitButton}
                  >
                    Search
                  </button>
                </div>
              )}
            </div>
          )}
          {emailAddress && orderNo && (
            <>
              <div style={styles.customerEmail}>
                <label htmlFor="email" style={styles.label}>
                  Email:
                </label>
                {!editModeEmailId ? (
                  <div style={styles.emailContainer}>
                    <span style={styles.emailSpan}>{email}</span>
                    <span
                      onClick={handleEditClickEmailId}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    >
                      <EditIcon />
                    </span>
                  </div>
                ) : (
                  <div style={styles.emailContainer}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newEmail}
                      onChange={handleInputChangeEmailId}
                      style={styles.emailInput}
                    />
                    <button
                      onClick={() => {
                        handleSubmitEmailId();
                        setSubmittedNewEmail(true); // Update state when search button is clicked
                      }}
                      style={styles.submitButton}
                    >
                      Search
                    </button>
                  </div>
                )}
              </div>
              <div style={styles.customerEmail}>
                <label htmlFor="orderId" style={styles.label}>
                  Order No:
                </label>
                {!editModeOrderId ? (
                  <div style={styles.emailContainer}>
                    <span style={styles.emailSpan}>{orderId}</span>
                    <span
                      onClick={handleEditClickOrderId}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    >
                      <EditIcon />
                    </span>
                  </div>
                ) : (
                  <div style={styles.emailContainer}>
                    <input
                      type="text"
                      id="orderId"
                      name="orderId"
                      value={newOrderId}
                      onChange={handleInputChangeOrderId}
                      style={styles.orderIdInput}
                    />
                    <button
                      onClick={() => {
                        handleSubmitOrderId();
                        setSubmittedNewOrderId(true); // Update state when search button is clicked
                      }}
                      style={styles.submitButton}
                    >
                      Search
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {loading ? (
            <div
              style={{ width: "100%", display: "grid", placeItems: "center" }}
            >
              <Spinner />
            </div>
          ) : dataExists ? (
            submittedNewEmail && orderInfoEmailUser ? (
              <div style={styles.orderHistory}>
                <h3 style={styles.header}>Order History</h3>
                {orderInfoEmailUser.orderHistory &&
                orderInfoEmailUser.orderHistory.length > 0 ? (
                  orderInfoEmailUser.orderHistory.map((order, index) => (
                    <div
                      key={index}
                      style={styles.orderContainer}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onMouseLeave={() => setHighlightedIndex(null)}
                      onClick={() => handleOrderClick(order)}
                    >
                      <div
                        style={{
                          ...styles.orderBanner,
                          ...(highlightedIndex === index
                            ? styles.highlighted
                            : null),
                        }}
                      >
                        <div>
                          <p>
                            <strong style={styles.insideContainerFont}>
                              Order No:
                            </strong>{" "}
                            {order.orderNumber}
                          </p>
                          <p>
                            <strong style={styles.insideContainerFont}>
                              Order Date:
                            </strong>{" "}
                            {formattedDate(order.submittedDate)}
                          </p>
                          <p>
                            <strong style={styles.insideContainerFont}>
                              Order Status:
                            </strong>{" "}
                            {order.status}
                          </p>
                          <p>
                            <strong style={styles.insideContainerFont}>
                              Return Status:
                            </strong>{" "}
                            {order.returnStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      ...styles.insideContainerFont,
                    }}
                  >
                    Invalid Email Address
                  </p>
                )}
              </div>
            ) : submittedNewOrderId ? (
              <div style={styles.orderHistory}>
                <h3 style={styles.header}>Order Summary</h3>
                {orderInfoOrderIdUser ? (
                  <div
                    style={{
                      ...styles.orderContainer,
                      cursor: "pointer",
                    }}
                    onClick={() => handleOrderClick(orderInfoOrderIdUser)}
                    onMouseEnter={() => setHighlightedIndex(0)}
                    onMouseLeave={() => setHighlightedIndex(null)}
                  >
                    <div
                      style={{
                        ...styles.orderBanner,
                        ...(highlightedIndex === 0 ? styles.highlighted : null),
                      }}
                    >
                      <div>
                        <p style={styles.insideContainerFont}>
                          <strong>Order No:</strong>{" "}
                          {orderInfoOrderIdUser.orderNumber}
                        </p>
                        <p style={styles.insideContainerFont}>
                          <strong>Order Date:</strong>{" "}
                          {formattedDate(orderInfoOrderIdUser.submittedDate)}
                        </p>
                        <p style={styles.insideContainerFont}>
                          <strong>Order Status:</strong>{" "}
                          {orderInfoOrderIdUser.status}
                        </p>
                        <p style={styles.insideContainerFont}>
                          <strong>Return Status:</strong>{" "}
                          {orderInfoOrderIdUser.returnStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      ...styles.insideContainerFont,
                    }}
                  >
                    Invalid Order Number
                  </p>
                )}
              </div>
            ) : null 
          ) : (
            <p
              style={{
                textAlign: "center",
                ...styles.insideContainerFont,
              }}
            >
              {error}
            </p>
          )}
        </>
      )}
      {showTicketDetails && (
        <TicketDetails
          order={selectedOrder}
          shipmentDetails={shipmentDetails}
          shipmentDetailsInfo={shipmentDetailsInfo}
        />
      )}
    </div>
  );
  
};

export default OrderInfo;
