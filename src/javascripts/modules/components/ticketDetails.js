import React, { useState } from "react";
import OrderDetails from "./orderDetails";
import CustomAlert from "./customAlert";
import CustomButton from "./customButton";
import CancelOrderForm from "./cancelOrderForm";
import CustomIconButton from "./customIconButton";
import EditIcon from "./icons/edit";
import EditShipmentAddressForm from "./editShipmentAddressForm";
import { getAccessToken, getOrderDetails } from "../api/api";

const TicketDetails = ({
  orderDetails,
  shipmentDetails,
  order,
  shipmentDetailsInfo,
}) => {
  const [selectedOrder, setSelectedOrder] = useState(order);
  const [instantlyCancelled, setInstantlyCancelled] = useState(false);

  const handleCancelSuccess = () => {
    setInstantlyCancelled(true);
  };

  const handleEditSuccess = async () => {
    try {
      const accessToken = await getAccessToken();
      const orderDetails = await getOrderDetails(
        order.orderNumber,
        accessToken
      );
      setSelectedOrder(orderDetails.orderDetails[0]);
    } catch (err) {
      console.log(err);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  const {
    email,
    orderNumber,
    billingInfo,
    fulfillmentInfo,
    line_items,
    status,
    shipment,
    siteId,
    id,
    fulfillmentStatus,
  } = selectedOrder;

  console.log(order, "checking in the ticketdetails.js");
  console.log(shipmentDetailsInfo, "111111111111111111111111111111111111111");

  const isEligibleForCancel = () => {
    return (
      fulfillmentStatus !== "Fulfilled" &&
      fulfillmentStatus !== "PartiallyFulfilled" &&
      !instantlyCancelled &&
      status !== "Cancelled"
    );
  };

  const isEligibleForEdit = () => {
    return (
      fulfillmentStatus !== "Fulfilled" &&
      fulfillmentStatus !== "PartiallyFulfilled" &&
      !instantlyCancelled &&
      status !== "Cancelled"
    );
  };

  const cancelOrderForm = (props) => (
    <CancelOrderForm
      {...props}
      onSuccess={handleCancelSuccess}
      orderId={id}
      siteId={siteId}
    />
  );

  const cancelWarning =
    instantlyCancelled || status === "Cancelled"
      ? "The order is already cancelled"
      : `${fulfillmentStatus} order cannot be cancelled`;

  const editWarning =
    instantlyCancelled || status === "Cancelled"
      ? "Cancelled order cannot be Edited"
      : `${fulfillmentStatus} order cannot be Edited`;

  const editButton = (
    <CustomIconButton
      title={isEligibleForEdit() ? "Edit" : editWarning}
      isBasic={false}
      isPill={false}
      size="small"
      iconName="edit"
      iconComponent={<EditIcon />}
      disabled={!isEligibleForEdit()}
    />
  );

  const editShipmentAddressForm = (props) => (
    <EditShipmentAddressForm
      {...props}
      formData={{
        ...fulfillmentInfo.fulfillmentContact,
        ...fulfillmentInfo,
        siteId: siteId,
        orderId: id,
      }}
      onSuccess={handleEditSuccess}
    />
  );

  return (
    <div style={{ maxWidth: "md", overflow: "hidden", position: "relative" }}>
      <div style={{ padding: "16px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "16px" }}>
          <b>Customer Order Information</b>
        </h1>
        <div>
          <p>
            <b>Customer Email :</b> {email}
          </p>
        </div>
        <div>
          <p>
            <b>Order No :</b> {orderNumber}
          </p>
        </div>
        <br />
        <div>
          <div>
            <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
              <b>Shipping Address :</b>
              <CustomAlert
                trigger={editButton}
                content={editShipmentAddressForm}
              />
            </div>
            <span>{fulfillmentInfo.fulfillmentContact.address.address1}</span>
            <br />
            <span>{fulfillmentInfo.fulfillmentContact.address.cityOrTown}</span>
            <br />
            <span>
              {fulfillmentInfo.fulfillmentContact.address.stateOrProvince}
            </span>
            <br />
            <span>
              {fulfillmentInfo.fulfillmentContact.address.countryCode}
            </span>
            <br />
            <span>
              {fulfillmentInfo.fulfillmentContact.address.postalOrZipCode}
            </span>
          </div>
        </div>
        <br />
        <OrderDetails
          lineItems={line_items}
          status={status}
          shipment={shipment}
          shipmentDetails={shipmentDetailsInfo}
        />
        <br />
        <div>
          <h3>
            <b>Payment</b>
          </h3>
          <div>
            <p>
              <b>Balance :</b> {billingInfo.balance ?? "0.00"}
            </p>
          </div>
          <div>
            <p>
              <b>Card :</b>{" "}
              {billingInfo?.card?.cardNumberPartOrMask
                ? `*********${billingInfo.card.cardNumberPartOrMask.slice(
                    -4
                  )} | ${billingInfo?.card?.paymentOrCardType || ""} | ${
                    billingInfo?.paymentType || ""
                  }`
                : ""}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            margin: "16px 0",
          }}
        >
          <CustomAlert
            trigger={
              <CustomButton
                disabled={!isEligibleForCancel()}
                title={!isEligibleForCancel() && cancelWarning}
                tooltipProps={{
                  placement: "end-top",
                }}
              >
                Cancel Order
              </CustomButton>
            }
            alertTitle="Cancel"
            content={cancelOrderForm}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
