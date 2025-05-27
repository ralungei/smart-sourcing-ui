import { formApi } from "@/lib/formApi";
import {
  Avatar,
  Box,
  Card,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  Copy,
  Flame,
  MapPin,
  MoreVertical,
  Package,
  RefreshCcw,
} from "lucide-react";
import { useState } from "react";
import {
  formatDate,
  formatDateTime,
  generateSmartId,
  getStatusColor,
  toTitleCase,
} from "../../lib/utils";
import { useRequests } from "../context/RequestsContext";
import OfferCard from "./OfferCard";

const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: "30px",
  maxWidth: 800,
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow:
    "0px -1px 1px 0px rgba(255, 255, 255, 0.1) inset, 0px 1px 1px 0px rgba(255, 255, 255, 0.25) inset, 0px 8px 6px 0px rgba(0, 0, 0, 0.05)",
  backdropFilter: "blur(10px)",
  overflow: "hidden",
  transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  marginBottom: theme.spacing(3),
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "12px",
  padding: "8px",
  marginRight: theme.spacing(1.5),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const DataRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1.5),
}));

const InnerContent = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2.5),
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
    pointerEvents: "none",
  },
}));

const ExpandButton = styled(IconButton)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  padding: "8px",
  transition: "all 0.2s ease",
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-2px)",
  },
}));

const OffersGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const CartAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#33302A",
  width: 36,
  height: 36,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  marginRight: theme.spacing(1.5),
}));

const textStyles = {
  caption: {
    color: "rgba(255, 255, 255, 0.6)",
    textTransform: "uppercase",
    display: "block",
    mb: 0.5,
    fontSize: "0.8rem",
    letterSpacing: "0.5px",
  },
  body: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "1rem",
  },
  bodyBold: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "1rem",
    fontWeight: 600,
  },
};

const InfoItem = ({ label, value, icon }) => (
  <Box sx={{ textAlign: "center" }}>
    <Typography variant="caption" sx={textStyles.caption}>
      {label}
    </Typography>
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {icon && (
        <Box
          component="span"
          sx={{ mr: 0.5, display: "flex", alignItems: "center" }}
        >
          {icon}
        </Box>
      )}
      <Typography variant="h5">{value}</Typography>
    </Box>
  </Box>
);

const ProviderInfo = ({ icon, text, customStyle }) => (
  <DataRow>
    <IconWrapper sx={icon.wrapperStyle || {}}>{icon.component}</IconWrapper>
    <Typography variant="body1" sx={{ ...textStyles.bodyBold, ...customStyle }}>
      {text}
    </Typography>
  </DataRow>
);

function getStatusColorValue(statusName) {
  switch (statusName) {
    case "success":
      return "rgba(46, 196, 94, 0.8)";
    case "warning":
      return "rgba(255, 171, 0, 0.8)";
    case "error":
      return "rgba(235, 87, 87, 0.8)";
    default:
      return "rgba(160, 174, 192, 0.8)";
  }
}

const calculateReferencePrice = (offers) => {
  if (!offers || offers.length === 0) return undefined;

  return Math.min(...offers.map((offer) => offer.price));
};

const RequestCard = ({ request }) => {
  const [expanded, setExpanded] = useState(false);
  const [resubmitting, setResubmitting] = useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const { refreshRequests } = useRequests();

  const statusColor = getStatusColor(request.status);
  const statusColorValue = getStatusColorValue(statusColor);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleResubmit = async () => {
    if (resubmitting) return;

    try {
      setResubmitting(true);
      await formApi.resubmitRequest(request.request_id);
      // Add timeout to give the backend time to process the resubmitted request
      setTimeout(() => refreshRequests(), 5000);
    } catch (err) {
      console.error("Error resubmitting request:", err);
    } finally {
      setResubmitting(false);
    }
  };

  const hasChosenOffer = request.chosen_offer && request.chosen_offer.prov_id;

  const isLateDelivery = (date) => {
    if (!date) return false;
    const deliveryDate = new Date(date);
    const maxDate = new Date(request.input_state.max_delivery_date);
    return deliveryDate > maxDate;
  };

  const referencePrice = calculateReferencePrice(request.all_offers);

  const requestInfoItems = [
    {
      label: "Item",
      value: request.input_state.item_requested,
    },
    {
      label: "Quantity",
      value: `${request.input_state.quantity_requested} units`,
    },
    {
      label: "Location",
      value: request.input_state.delivery_location,
      icon: <MapPin size={16} style={{ color: "rgba(255, 255, 255, 0.7)" }} />,
    },
    {
      label: "Max Pickup",
      value: formatDate(request.input_state.max_delivery_date),
    },
  ];

  const handleCopyId = (id) => {
    if (id) {
      navigator.clipboard
        .writeText(id)
        .then(() => {})
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <GlassCard>
      <InnerContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <CartAvatar>
              <Package size={20} />
            </CartAvatar>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 700 }}
                >
                  {generateSmartId(request)}
                </Typography>
                <Tooltip title="Copy identifier">
                  <IconButton
                    size="small"
                    onClick={() => handleCopyId(request.request_id)}
                    sx={{
                      ml: 1,
                      p: 0.5,
                      opacity: 0.6,
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
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {formatDateTime(request.start_date)}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            {request.hasUnreadNotification && (
              <Chip
                color="error"
                icon={<Flame size={14} />}
                label="New"
                size="small"
                sx={{
                  mr: 1,
                }}
              />
            )}
            <Chip
              label={toTitleCase(request.status)}
              color={statusColor}
              size="small"
              sx={{ mr: 1.5 }}
            />

            {request.status === "FAILED" && (
              <>
                <IconButton
                  size="small"
                  aria-label="more"
                  aria-controls="request-menu"
                  aria-haspopup="true"
                  onClick={(event) => setMenuAnchorEl(event.currentTarget)}
                  sx={{
                    mr: 1.5,
                    height: 28,
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    },
                  }}
                >
                  <MoreVertical size={14} />
                </IconButton>
                <Menu
                  id="request-menu"
                  anchorEl={menuAnchorEl}
                  keepMounted
                  open={Boolean(menuAnchorEl)}
                  onClose={() => setMenuAnchorEl(null)}
                  PaperProps={{
                    sx: {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      minWidth: "160px",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleResubmit();
                      setMenuAnchorEl(null);
                    }}
                    disabled={resubmitting}
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.875rem",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    {resubmitting ? (
                      <CircularProgress size={14} sx={{ mr: 1.5 }} />
                    ) : (
                      <RefreshCcw size={14} style={{ marginRight: "12px" }} />
                    )}
                    Resubmit
                  </MenuItem>
                </Menu>
              </>
            )}

            <ExpandButton
              onClick={handleExpandClick}
              aria-label="expand details"
            >
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </ExpandButton>
          </Box>
        </Box>

        <Divider sx={{ mb: 2.5, borderColor: "rgba(255, 255, 255, 0.08)" }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                maxWidth: "90%",
                position: "relative",
              }}
            >
              {requestInfoItems.map((item, index) => (
                <InfoItem
                  key={index}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                />
              ))}

              <Divider
                orientation="vertical"
                sx={{
                  position: "absolute",
                  top: "15%",
                  bottom: "15%",
                  left: "50%",
                  height: "70%",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              />

              <Divider
                sx={{
                  position: "absolute",
                  left: "0%",
                  right: "15%",
                  top: "50%",
                  width: "100%",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              />
            </Box>
          </Box>

          <Box sx={{ height: "100%" }}>
            {hasChosenOffer ? (
              <Box
                sx={{
                  background: alpha("#000", 0.45),
                  borderRadius: "16px",
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <IconWrapper
                    sx={{ background: alpha("#000", 0.25), mr: 1.5 }}
                  >
                    <Award size={26} style={{ color: "#fff" }} />
                  </IconWrapper>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ ...textStyles.caption, mb: 0, textAlign: "left" }}
                    >
                      SELECTED PROVIDER
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ ...textStyles.bodyBold, fontSize: "1.1rem" }}
                    >
                      {request.chosen_offer.prov_id}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mt: 0.5,
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={textStyles.caption}>
                      MAX PICKUP
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Calendar
                        size={16}
                        style={{
                          color: "rgba(255, 255, 255, 0.7)",
                          marginRight: "4px",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          ...textStyles.body,
                          ...(isLateDelivery(request.chosen_offer.delivery_date)
                            ? { color: "rgba(235, 87, 87, 0.9)" }
                            : {}),
                        }}
                      >
                        {formatDate(request.chosen_offer.delivery_date)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={textStyles.caption}>
                      PRICE
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1" sx={textStyles.body}>
                        ${request.chosen_offer.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  background: alpha("#000", 0.45),
                  borderRadius: "16px",
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    ...textStyles.bodyBold,
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                >
                  Awaiting supplier selection
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  AI is analyzing the best options
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.08)" }} />

          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              mb: 2,
              fontWeight: 500,
              letterSpacing: "0.3px",
            }}
          >
            All Available Supplier Offers
          </Typography>

          <OffersGrid>
            {request.all_offers && request.all_offers.length > 0 ? (
              request.all_offers.map((offer, index) => (
                <OfferCard
                  key={index}
                  offer={offer}
                  isChosen={
                    hasChosenOffer &&
                    offer.prov_id === request.chosen_offer.prov_id
                  }
                  isLateDelivery={isLateDelivery(offer.delivery_date)}
                  requestedPrice={referencePrice}
                />
              ))
            ) : (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  p: 3,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                <Typography variant="body1">No offers available yet</Typography>
              </Box>
            )}
          </OffersGrid>
        </Collapse>
      </InnerContent>
    </GlassCard>
  );
};

export default RequestCard;
