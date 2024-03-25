import React, { useEffect, useState } from "react";
import {
  cancelOrder,
  fetchOrderCancelReasons,
  getAccessToken,
} from "../api/api";
import { Field, Label, Select, Input } from "@zendeskgarden/react-forms";
import { Skeleton } from "@zendeskgarden/react-loaders";
import styled from "styled-components";
import CustomButton from "./customButton";
import { useToast } from "@zendeskgarden/react-notifications";
import CustomNotification from "./customNotification";

const StyledField = styled(Field)`
  margin: 10px 0;
`;

const CancelOrderForm = ({ orderId, siteId, closeModal, onSuccess }) => {
  const [data, setData] = useState({
    reasonCode: "",
    description: "",
    moreInfo: "",
    siteId,
    orderId,
  });
  const [orderCancelReasons, setOrderCancelReasons] = useState([]);
  const [needsMoreInfo, setNeedsMoreInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    getOrderCancelReasons();
  }, []);

  const getOrderCancelReasons = async () => {
    setLoading(true);
    const accessToken = await getAccessToken();
    try {
      const reasons = await fetchOrderCancelReasons(accessToken);
      setOrderCancelReasons(reasons);
    } catch (err) {
    }
    setLoading(false);
  };

  const handleReasonDropdownChange = ({ target: { value } }) => {
    const { needsMoreInfo, name } =
      orderCancelReasons.find((reason) => reason.reasonCode === value) || {};
    setData((prev) => ({
      ...prev,
      ...(!needsMoreInfo ? { moreInfo: "" } : {}),
      description: name,
      reasonCode: value,
    }));
    setNeedsMoreInfo(needsMoreInfo);
  };

  const handleMoreInfoChange = ({ target: { value } }) => {
    setData((prev) => ({
      ...prev,
      moreInfo: value,
    }));
  };

  const isFormValid = () => {
    const { needsMoreInfo } =
      orderCancelReasons.find(
        (reason) => reason.reasonCode === data.reasonCode
      ) || {};
    if (needsMoreInfo) {
      return !!(data.reasonCode && data.description && data.moreInfo);
    }
    return !!(data.reasonCode && data.description);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setSubmitting(true);
      try {
        const response = await cancelOrder(data);
        closeModal();
        if (response.status === "Cancelled") {
          onSuccess();
          addToast(
            CustomNotification({
              content: "Successfully cancelled order",
            })
          );
        } else {
          addToast(
            CustomNotification({
              content: "Failed to cancel order",
              type: "error",
            })
          );
        }
      } catch (err) {
        closeModal();
        addToast(
          CustomNotification({
            content: "Failed to cancel order",
            type: "error",
          })
        );
      }
      setSubmitting(false);
    }
  };

  return loading ? (
    <div>
      <Skeleton height="15px" width="100px" />
      <Skeleton height="24px" width="90%" />
      <Skeleton height="15px" width="100px" />
      <Skeleton height="24px" width="90%" />
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <StyledField>
        <Label aria-required="true">Cancel Reason *</Label>
        <Select value={data.reasonCode} onChange={handleReasonDropdownChange}>
          <option value="" disabled>
            Select a reason
          </option>
          {orderCancelReasons?.map((el, index) => (
            <option key={index} value={el.reasonCode}>
              {el.name}
            </option>
          ))}
        </Select>
      </StyledField>
      {needsMoreInfo && (
        <StyledField>
          <Label aria-required="true">Specify Reason *</Label>
          <Input value={data.moreInfo} onChange={handleMoreInfoChange} />
        </StyledField>
      )}
      <CustomButton
        loading={submitting}
        type="submit"
        disabled={!isFormValid()}
      >
        Cancel Order
      </CustomButton>
    </form>
  );
};

export default CancelOrderForm;
