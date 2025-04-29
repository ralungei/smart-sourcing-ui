import { Box, Typography, Chip, alpha, useTheme } from "@mui/material";
import { darken, styled } from "@mui/material/styles";
import {
  DollarSign,
  Calendar,
  Award,
  Check,
  Clock,
  TrendingUp,
  TrendingDown,
  Truck,
} from "lucide-react";
import { formatDate } from "../../lib/utils";

const GlassOfferCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isChosen",
})(({ theme, isChosen }) => ({
  background: isChosen
    ? `linear-gradient(135deg, ${darken(
        theme.palette.success.main,
        0.12
      )} 0%, ${darken(theme.palette.success.main, 0.4)} 100%)`
    : "rgba(0, 0, 0, 0.45)",
  border: isChosen
    ? `1px solid ${alpha(theme.palette.success.main, 0.25)}`
    : "1px solid rgba(255, 255, 255, 0.06)",
  borderRadius: "16px",
  padding: theme.spacing(2),
  boxShadow: isChosen
    ? `0 8px 24px rgba(0, 0, 0, 0.15), 0 0 12px ${alpha(
        theme.palette.success.main,
        0.2
      )}`
    : "0 6px 16px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: isChosen
      ? `0 12px 30px rgba(0, 0, 0, 0.2), 0 0 15px ${alpha(
          theme.palette.success.main,
          0.25
        )}`
      : "0 10px 24px rgba(0, 0, 0, 0.15)",
    border: isChosen
      ? `1px solid ${alpha(theme.palette.success.main, 0.35)}`
      : "1px solid rgba(255, 255, 255, 0.1)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "10px",
  padding: "6px",
  marginRight: theme.spacing(1),
}));

const DataRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(1.5),
}));

const DataContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

const SelectedBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: alpha(theme.palette.success.main, 0.9),
  borderBottomLeftRadius: "10px",
  padding: "2px 10px 2px 13px",
}));

const OfferCard = ({ offer, isChosen, isLateDelivery, requestedPrice }) => {
  const theme = useTheme();

  if (!offer || !offer.prov_id) {
    return null;
  }

  const isPriceHigher =
    requestedPrice !== undefined &&
    !isNaN(requestedPrice) &&
    offer.price > requestedPrice;
  const isPriceLower =
    requestedPrice !== undefined &&
    !isNaN(requestedPrice) &&
    offer.price < requestedPrice;

  return (
    <GlassOfferCard isChosen={isChosen}>
      {isChosen && (
        <SelectedBadge>
          <Typography
            variant="caption"
            sx={{
              color: "white",
              fontWeight: 600,
              mr: 0.8,
              fontSize: "0.8rem",
            }}
          >
            Selected
          </Typography>
          <Check size={14} color="white" />
        </SelectedBadge>
      )}

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconWrapper>
            <Truck size={16} />
          </IconWrapper>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: isChosen ? 600 : 500,
            }}
          >
            {offer.prov_id}
          </Typography>
        </Box>
      </Box>

      <DataRow>
        <IconWrapper>
          <DollarSign size={16} style={{ color: "rgba(255, 255, 255, 0.9)" }} />
        </IconWrapper>
        <DataContent>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: isChosen ? 600 : 400,
            }}
          >
            ${offer.price ? offer.price.toFixed(2) : "0.00"}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {isPriceHigher && (
              <Chip
                label="Higher"
                size="small"
                color="error"
                icon={<TrendingUp size={12} />}
                sx={{ px: 0.4 }}
              />
            )}

            {isPriceLower && (
              <Chip
                label="Lower"
                size="small"
                color="success"
                icon={<TrendingDown size={12} />}
                sx={{ px: 0.4 }}
              />
            )}

            {offer.price === requestedPrice && (
              <Chip
                label="Lowest price"
                size="small"
                color="success"
                icon={<Award size={12} />}
                sx={{ px: 0.4 }}
              />
            )}
          </Box>
        </DataContent>
      </DataRow>

      <DataRow>
        <IconWrapper>
          <Calendar size={16} style={{ color: "rgba(255, 255, 255, 0.9)" }} />
        </IconWrapper>
        <DataContent>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: isChosen ? 500 : 400,
            }}
          >
            {formatDate(offer.delivery_date)}
          </Typography>

          <Box>
            {isLateDelivery ? (
              <Chip
                size="small"
                label="Late"
                color="error"
                icon={<Clock size={12} />}
              />
            ) : (
              <Chip
                size="small"
                label="On time"
                color="success"
                icon={<Clock size={12} />}
              />
            )}
          </Box>
        </DataContent>
      </DataRow>
    </GlassOfferCard>
  );
};

export default OfferCard;
