import React from "react";

const OrderDetails = ({ shipmentDetails }) => {
  if (!shipmentDetails) {
    return <div>Loading...</div>;
  }
  const detailsArray = shipmentDetails?.shipmentDetails || [];
  const nonTransferShipments = detailsArray.filter(
    (shipment) => shipment.shipmentType !== "Transfer"
  );

  return (
    <div>
      {nonTransferShipments.map((shipment, index) => {
        const totalNonTransferShipments = nonTransferShipments.length;
        return (
          <div key={index}>
            <h2>
              <b>
                Shipment : {index + 1}/{totalNonTransferShipments}
              </b>
            </h2>
            <div style={{ marginBottom: "16px", overflowX: "auto" }}>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <b>Item</b>
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <b>Quantity</b>
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <b>Discount</b>
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <b>Price</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipment.items.map((item, itemIndex) => (
                    <tr key={itemIndex} style={{ border: "1px solid #ddd" }}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {item.name}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {item.quantity}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        $ {item.itemDiscount}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        $ {item.actualPrice}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ border: "none" }}>
                    <td colSpan={2} style={{ padding: "8px" }}></td>
                    <td
                      style={{
                        textAlign: "right",
                        border: "none",
                        padding: "8px",
                      }}
                    >
                      <b>Total : </b> $ {shipment.lineItemSubtotal || 0}
                    </td>
                    <td style={{ border: "none", padding: "8px" }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <p>
                <b>Status :</b> {shipment.shipmentStatus}
              </p>
            </div>
            <div>
              {shipment.packages.map((pkg, packageIndex) => (
                <div key={packageIndex}>
                  {pkg.trackingNumbers.map((trackingNumber, index) => (
                    <p key={index}>
                      <b>Tracking No:</b>{" "}
                      <a
                        href={`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${trackingNumber}`} //for poc purpose we are using the standard courier service in india
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {trackingNumber}
                      </a>
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetails;
