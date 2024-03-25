export const apiConfig = {
  baseUrl: 'https://kibo-api-proxy.azurewebsites.net', // This is the middleware application URL
  orderDetailsUri: '/api/getOrderDetails',
  shipmentDetailsUri: '/api/getShipmentDetails', 
  tokenUri: '/api/getToken',
  orderHistoryUri: '/api/getOrderHistoryByEmail',
  orderCancelReasons: '/api/getOrderCancelReasons',
  cancelOrder: '/api/cancelOrder',
  updateShipmentAddress: '/api/editShipmentAddress',
};
