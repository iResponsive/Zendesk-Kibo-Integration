import React from "react";
import { render } from "react-dom";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { resizeContainer } from "../../lib/helpers";
import OrderInfo from "./orderInfo";
import { ToastProvider } from "@zendeskgarden/react-notifications";

const MAX_HEIGHT = 1000;
class App {
  constructor(client, appData) {
    this._client = client;
    this._appData = appData;
    this.initializePromise = this.init();
  }

  async init() {
    try {
      const ticketId = (await this._client.get("ticket.id"))["ticket.id"];
      //Below URL is the organization specific sandbox URL
      const zendeskResponse = {
        url: `https://d3v-iresponsivesolutions5151.zendesk.com/api/v2/tickets/${ticketId}/comments`,
      };
      const zendeskResponseData = await this._client.request(zendeskResponse);
      let emailAddress = "";
      let orderNo = "";
      let requesterEmailAddress =
        zendeskResponseData.comments[0].via.source.from.address;
      zendeskResponseData.comments.forEach((comment) => {
        const { body } = comment;
        const emailMatch = body.match(
          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        );
        const orderMatch = body.match(/\b(\d+)\b/);
        if (orderMatch) {
          orderNo = orderMatch[0];
        }
        if (emailMatch) {
          emailAddress = emailMatch[0];
        }
      });
      if (emailAddress && orderNo) {
      } else if (!emailAddress && orderNo) {
        emailAddress = "";
      } else if (!emailAddress && !orderNo) {
        emailAddress = requesterEmailAddress;
      }
      const container = document.querySelector(".main");

      render(
        <ThemeProvider theme={{ ...DEFAULT_THEME }}>
          <ToastProvider>
            <OrderInfo emailAddress={emailAddress} orderNo={orderNo} />
          </ToastProvider>
        </ThemeProvider>,
        container
      );

      return resizeContainer(this._client, MAX_HEIGHT);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export default App;
