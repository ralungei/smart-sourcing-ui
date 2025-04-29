"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Badge,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Bell, Info } from "lucide-react";
import { styled } from "@mui/material/styles";
import { notificationsApi } from "@/lib/notificationsApi";
import { formatDistanceToNow } from "date-fns";

const NotificationContainer = styled(Box)(() => ({
  position: "relative",
}));

const StyledPopover = styled(Popover)(() => ({
  "& .MuiPaper-root": {
    width: "360px",
    maxWidth: "360px",
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
}));

const NotificationHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 16px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
}));

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 3,
    backgroundColor: "#C74634",
    padding: "0 4px",
  },
}));

const NotificationItem = styled(ListItem)(({ theme }) => ({
  padding: "12px 16px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  position: "relative",
  transition: "all 0.2s ease, background-color 0.15s ease",
  cursor: "pointer",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.05)",
  },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

const EmptyNotifications = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px 16px",
  color: "rgba(255, 255, 255, 0.5)",
}));

const NotificationList = styled(List)(({ theme }) => ({
  maxHeight: "320px",
  overflowY: "auto",
  py: 0,
  transition: "height 0.3s ease-in-out",
}));

const NotificationsButton = ({ onNotificationRead }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationsApi.getNotifications();
      setNotifications(response.items || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    setLoading(true);

    try {
      await fetchNotifications();

      await markAllAsRead();
    } catch (error) {
      console.error("Error handling notification click:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (notificationId, requestId) => {
    handleClose();

    console.log(`Navigating to request details for #${requestId}`);
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(
        (n) => n.notification_status === "UNREAD"
      );

      if (unreadNotifications.length === 0) return;

      await Promise.all(
        unreadNotifications.map((notification) =>
          notificationsApi.markAsRead(notification.request_id)
        )
      );

      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          notification_status: "READ",
        }))
      );

      if (onNotificationRead) {
        unreadNotifications.forEach((notification) =>
          onNotificationRead(notification.request_id)
        );
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const open = Boolean(anchorEl);
  const unreadCount = notifications.filter(
    (n) => n.notification_status === "UNREAD"
  ).length;

  const getNotificationMessage = (notification) => {
    const requestId = notification.request_id;
    const provId = notification.chosen_offer?.prov_id;

    return provId ? (
      <>
        Request <b>#{requestId}</b> was assigned to <b>{provId}</b>
      </>
    ) : (
      <>
        New update for Request <b>#{requestId}</b>
      </>
    );
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Recently";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Recently";
    }
  };

  return (
    <NotificationContainer>
      <StyledBadge badgeContent={unreadCount} color="error">
        <IconButton aria-label="notifications" onClick={handleClick}>
          <Bell size={20} />
        </IconButton>
      </StyledBadge>

      <StyledPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <NotificationHeader>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "rgba(255, 255, 255, 0.9)" }}
          >
            Notifications
          </Typography>
        </NotificationHeader>

        {loading ? (
          <EmptyNotifications>
            <Box
              sx={{
                mb: "10px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                size={24}
                sx={{ color: "rgba(255, 255, 255, 0.5)" }}
              />
            </Box>
            <Typography variant="body2">Loading notifications...</Typography>
          </EmptyNotifications>
        ) : notifications.length === 0 ? (
          <EmptyNotifications>
            <Info size={28} style={{ marginBottom: "10px", opacity: 0.5 }} />
            <Typography variant="body2">No notifications</Typography>
          </EmptyNotifications>
        ) : (
          <NotificationList
            sx={{
              height: notifications.length > 0 ? "auto" : 0,
              transition: "height 0.3s ease-in-out",
            }}
          >
            {notifications.map((notification) => (
              <NotificationItem
                key={`${notification.request_id}`}
                onClick={() =>
                  handleNotificationClick(
                    notification.id,
                    notification.request_id
                  )
                }
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontWeight: 400,
                      }}
                    >
                      {getNotificationMessage(notification)}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255, 255, 255, 0.5)", mt: 0.5 }}
                    >
                      {formatTimeAgo(
                        notification.completion_date || notification.start_date
                      )}
                    </Typography>
                  }
                />
              </NotificationItem>
            ))}
          </NotificationList>
        )}
      </StyledPopover>
    </NotificationContainer>
  );
};

export default NotificationsButton;
