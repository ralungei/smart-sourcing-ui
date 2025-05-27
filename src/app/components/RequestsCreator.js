"use client";
import { formApi } from "@/lib/formApi";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useRequests } from "../context/RequestsContext";
import RequestForm from "./RequestForm";
import RequestSummaryCard from "./RequestSummaryCard";

const LoadingIndicator = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
});

const SuccessMessage = styled(Box)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.9)",
  textAlign: "center",
  margin: theme.spacing(2, 0),
  lineHeight: 1.5,
  maxWidth: "600px",
  width: "100%",
  alignSelf: "center",
}));

const RequestCreator = () => {
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const summaryRef = useRef(null);
  const { refreshRequests } = useRequests();

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const requestPayload = {
        item_requested: formData.partName,
        quantity_requested: parseInt(formData.quantity),
        max_delivery_date: formData.maxDeliveryDate,
        delivery_location: formData.deliveryLocation,
      };

      const result = await formApi.submitRequest(requestPayload);

      const requestObj = {
        request_id: result,
        request_to_agent: {
          part_name: formData.partName,
          quantity: parseInt(formData.quantity),
          delivery_date: formData.maxDeliveryDate,
          delivery_time: formData.deliveryTime,
          delivery_location: formData.deliveryLocation,
        },
      };

      setRequestId(result);
      setRequestData(requestObj);
      setIsCompleted(true);

      setTimeout(() => refreshRequests(), 5000);
    } catch (err) {
      console.error("Error submitting request:", err);
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewRequest = () => {
    setIsCompleted(false);
    setRequestId(null);
    setRequestData(null);
    setError(null);
  };

  useEffect(() => {
    summaryRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isCompleted]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          m: 2,
        }}
      >
        {isCompleted ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: -2,
                height: "100%",
              }}
            >
              <Box>
                {requestData && (
                  <RequestSummaryCard requestData={requestData} />
                )}
              </Box>
              <SuccessMessage>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  Your booking is being processed. You&apos;ll be notified when
                  supplier offers are available.
                </Typography>
                <Typography variant="body1">
                  Want to{" "}
                  <Link
                    component="button"
                    onClick={handleNewRequest}
                    sx={{
                      cursor: "pointer",
                      display: "inline",
                      verticalAlign: "baseline",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    create a new booking
                  </Link>
                  ?
                </Typography>
              </SuccessMessage>
            </Box>

            {loading && (
              <LoadingIndicator>
                <CircularProgress
                  size={24}
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                />
              </LoadingIndicator>
            )}
            <div ref={summaryRef} />
          </>
        ) : (
          <RequestForm onSubmit={handleFormSubmit} />
        )}
      </Box>
    </Box>
  );
};

export default RequestCreator;
