import { apiConfig } from "./config";

//This method is fetches the order History by Email Search
export async function getOrderHistoryByEmail(emailAddress, accessToken) {
  const { baseUrl, orderHistoryUri } = apiConfig;
  const orderHistoryUrl = `${baseUrl}${orderHistoryUri}/${emailAddress}`;
  try {
    const response = await fetch(orderHistoryUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    const orderHistory = await response.json();
    return orderHistory;
  } catch (error) {
    throw error;
  }
}

//This method is fetches the order Details by OrderId Search
export async function getOrderDetails(orderNo, accessToken) {
  const { baseUrl, orderDetailsUri } = apiConfig;
  const orderDetailsUrl = `${baseUrl}${orderDetailsUri}/${orderNo}`;
  try {
    const response = await fetch(orderDetailsUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    const orderDetails = await response.json();
    return orderDetails;
  } catch (error) {
    throw error;
  }
}

//This method is fetches the shipment Details based on order Id 
export async function getShipmentDetails(orderNo, accessToken) {
  const { baseUrl, shipmentDetailsUri } = apiConfig;
  const shipmentDetailsUrl = `${baseUrl}${shipmentDetailsUri}/${orderNo}`;
  try {
    const response = await fetch(shipmentDetailsUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    const shipmentDetails = await response.json();
    return shipmentDetails;
  } catch (error) {
    throw error;
  }
}

//This method is fetches the Authorization Token from Kibo
export async function getAccessToken() {
  const { baseUrl, tokenUri } = apiConfig;
  try {
    const response = await fetch(`${baseUrl}${tokenUri}`);
    const data = await response.json();
    const accessToken = data.accessToken;
    if (!accessToken) {
      throw new Error('Access token not found in the response.');
    }
    return accessToken;
  } catch (error) {
    throw error;
  }
}

//This method is fetches the order cancellation reasons
export const fetchOrderCancelReasons = async(accessToken) => {
  const { baseUrl, orderCancelReasons } = apiConfig;
  const data = await (await fetch(`${baseUrl}${orderCancelReasons}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })).json();
  return data.orderCancelReasons;
};

//This method performs the cancellation order
export const cancelOrder = async(data) => {
  const { baseUrl, cancelOrder } = apiConfig;
  const accessToken = await getAccessToken();
  const response = await (await fetch(`${baseUrl}${cancelOrder}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    method: "PUT",
    body: JSON.stringify(data)
  })).json();
  return response.cancelOrderResponse;
};

//This method performs the Updation of the shipment Address based on the order
export const updateShipmentAddress = async(data) => {
  const { baseUrl, updateShipmentAddress } = apiConfig;
  const accessToken = await getAccessToken();
  const response = await (await fetch(`${baseUrl}${updateShipmentAddress}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    method: "PUT",
    body: JSON.stringify(data)
  })).json();
  return response.cancelOrderResponse;
}