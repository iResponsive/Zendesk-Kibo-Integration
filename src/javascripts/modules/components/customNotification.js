import React, { useEffect } from "react";
import { Notification, Close } from "@zendeskgarden/react-notifications";

const CustomNotification = ({ content, type = "success", ...rest }) => {
  return ({ close }) => {
    useEffect(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, []);
    return (
      <Notification
        style={{
          zIndex: 100,
        }}
        type={type}
        {...rest}
        onClick={(event) => {
          event.stopPropagation();
          if (rest.onClick) {
            rest.onClick(event);
          }
        }}
      >
        {content}
        <Close onClick={close} aria-label="Close" />
      </Notification>
    );
  };
};

export default CustomNotification;
