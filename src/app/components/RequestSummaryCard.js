"use client";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";
import {
  Brain,
  Calendar,
  CheckCircle,
  Copy,
  Hash,
  Loader,
  MapPin,
  Package,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate, generateSmartId } from "../../lib/utils";

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

const shine = keyframes`
  0% {
    background-position: -100px;
  }
  40%, 100% {
    background-position: 300px;
  }
`;

const rotateIn = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-90deg);
  }
  100% {
    opacity: 1;
    transform: rotate(0);
  }
`;

const SummaryContainer = styled(Paper)(({ theme }) => ({
  padding: "16px 20px",
  marginTop: "16px",
  marginBottom: "20px",
  borderRadius: "20px",
  alignSelf: "flex-start",
  background: "rgba(0, 0, 0, 0.5)",
  color: "rgba(255, 255, 255, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  animation: `${slideIn} 0.5s ease forwards, ${pulse} 2s ease-in-out 0.5s`,
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)",
    backgroundSize: "200px 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100px",
    animation: `${shine} 2s ease-in-out 0.7s`,
    pointerEvents: "none",
  },
}));

const IconWrapper = styled(Box)(({ theme, delay }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1.5),
  color: "white",
  animation: `${rotateIn} 0.4s ease-out forwards`,
  animationDelay: delay,
  opacity: 0,
}));

const InfoGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0, 1, 0),
}));

const InfoItem = ({ icon, label, value, index }) => {
  const delay = `${0.7 + index * 0.1}s`;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconWrapper delay={delay}>{icon}</IconWrapper>
      <Box
        sx={{
          animation: `${slideIn} 0.4s ease-out forwards`,
          animationDelay: delay,
          opacity: 0,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            display: "block",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.95)",
            fontWeight: 400,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const RequestSummaryCard = ({ requestData }) => {
  console.log(
    "RequestSummaryCard received data:",
    JSON.stringify(requestData, null, 2)
  );

  const [processing, setProcessing] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!requestData) return null;

  let requestId = requestData.request_id;
  if (typeof requestId === "object" && requestId !== null) {
    requestId = requestId.request_id || "";
  }

  const {
    request_to_agent: {
      part_name,
      quantity,
      delivery_date,
      delivery_time,
      delivery_location,
    },
  } = requestData;

  const formattedDate = formatDate(delivery_date);
  const deliveryDateTime = delivery_time
    ? `${formattedDate} at ${delivery_time}`
    : formattedDate;

  const smartId = generateSmartId({
    request_id: requestId,
    input_state: {
      item_requested: part_name,
      quantity_requested: quantity,
      delivery_location,
      max_delivery_date: delivery_date,
    },
  });

  const handleCopyId = () => {
    if (requestId) {
      navigator.clipboard
        .writeText(requestId)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <SummaryContainer elevation={0}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                animation: `${slideIn} 0.5s ease-out forwards`,
              }}
            >
              Booking {smartId}
            </Typography>
            <Tooltip title="Copy identifier">
              <IconButton
                size="small"
                onClick={handleCopyId}
                sx={{
                  ml: 1,
                  p: 0.5,
                  opacity: 0.6,
                  animation: `${slideIn} 0.5s ease-out forwards`,
                  animationDelay: "0.2s",
                  "&:hover": {
                    opacity: 1,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Copy size={14} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Chip
          icon={processing ? <Loader size={14} /> : <CheckCircle size={14} />}
          label={processing ? "Processing" : "Confirmed"}
          size="small"
          color={"default"}
          sx={{
            animation: `${slideIn} 0.5s ease-out forwards`,
            animationDelay: "0.3s",
            opacity: 0,
            "& .MuiChip-label": {
              fontWeight: 500,
              fontSize: "0.7rem",
            },
          }}
        />
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255, 255, 255, 0.15)",
          my: 1.5,
          animation: `${slideIn} 0.5s ease-out forwards`,
          animationDelay: "0.3s",
          opacity: 0,
        }}
      />

      <InfoGrid>
        <InfoItem
          icon={<Package size={18} color="white" />}
          label="Item"
          value={part_name}
          index={0}
        />

        <InfoItem
          icon={<Hash size={18} color="white" />}
          label="Quantity"
          value={`${quantity} units`}
          index={1}
        />

        <InfoItem
          icon={<MapPin size={18} color="white" />}
          label="Location"
          value={delivery_location}
          index={2}
        />

        <InfoItem
          icon={<Calendar size={18} color="white" />}
          label="Delivery"
          value={deliveryDateTime}
          index={3}
        />
      </InfoGrid>

      <Divider
        sx={{
          borderColor: "rgba(255, 255, 255, 0.15)",
          mt: 2,
          mb: 1.5,
          animation: `${slideIn} 0.5s ease-out forwards`,
          animationDelay: "1s",
          opacity: 0,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
          mb: 0.5,
          animation: `${slideIn} 0.4s ease-out forwards`,
          animationDelay: "1.2s",
          opacity: 0,
        }}
      >
        <Box
          sx={{
            mr: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: `${pulse} 2s infinite ease-in-out`,
          }}
        >
          <Brain size={18} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.8rem",
          }}
        >
          AI Agent is evaluating providers via API and email
        </Typography>
      </Box>

      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px 16px",
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.9),
            color: (theme) => theme.palette.success.contrastText,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            border: (theme) =>
              `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            backdropFilter: "blur(10px)",
          }}
        >
          <CheckCircle size={18} style={{ marginRight: "8px" }} />
          <Typography variant="body2">
            Identifier copied to clipboard
          </Typography>
        </Box>
      </Snackbar>
    </SummaryContainer>
  );
};

export default RequestSummaryCard;
