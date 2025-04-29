"use client";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRequests } from "../context/RequestsContext";
import NotificationsButton from "./NotificationsButton";
import RequestCard from "./RequestCard";

const RequestsList = ({ onNewRequest }) => {
  const {
    requests,
    filteredRequests,
    loading,
    error,
    hasMore,
    activeFilter,
    counts,
    initialLoad,
    fetchRequests,
    refreshRequests,
    handleFilterChange,
    handleNotificationRead,
  } = useRequests();

  const [mounted, setMounted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const observer = useRef();
  const initialFetchDone = useRef(false);

  const lastRequestElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            fetchRequests();
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchRequests]
  );

  const handleRefreshClick = async () => {
    if (refreshing) return;

    setRefreshing(true);
    try {
      await refreshRequests();
    } finally {
      setTimeout(() => setRefreshing(false), 600);
    }
  };

  useEffect(() => {
    setMounted(true);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (mounted && !initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchRequests();
    }
  }, [mounted, fetchRequests]);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        mb: 0,
        pb: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h1"
            sx={{ textShadow: "0px 1px 4px rgba(0, 0, 0, 0.6)" }}
          >
            Purchase Requests
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ flexWrap: "wrap", gap: 1, flexGrow: 1 }}
        >
          <Chip
            label={`All (${counts.ALL || 0})`}
            clickable
            onClick={() => handleFilterChange("ALL")}
            color={activeFilter === "ALL" ? "default" : "default"}
            variant="filled"
            sx={{
              backdropFilter: "blur(10px)",
              ...(activeFilter === "ALL" && {
                bgcolor: "rgba(255, 255, 255, 1)",
                color: "black",
              }),
            }}
          />
          <Chip
            label={`Pending (${counts.PENDING || 0})`}
            clickable
            onClick={() => handleFilterChange("PENDING")}
            color={activeFilter === "PENDING" ? "warning" : "default"}
            variant="filled"
            sx={{
              backdropFilter: "blur(4px)",
            }}
          />
          <Chip
            label={`Completed (${counts.COMPLETED || 0})`}
            clickable
            onClick={() => handleFilterChange("COMPLETED")}
            color={activeFilter === "COMPLETED" ? "success" : "default"}
            variant="filled"
            sx={{
              backdropFilter: "blur(4px)",
            }}
          />
          <Chip
            label={`Failed (${counts.FAILED || 0})`}
            clickable
            onClick={() => handleFilterChange("FAILED")}
            color={activeFilter === "FAILED" ? "error" : "default"}
            variant="filled"
            sx={{
              backdropFilter: "blur(4px)",
            }}
          />
        </Stack>
        <Stack direction="row" alignItems={"center"} spacing={2.5}>
          <Button
            variant="contained"
            size="small"
            onClick={onNewRequest}
            startIcon={<Plus size={16} />}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              textTransform: "none",
              fontWeight: 600,
              height: "36px",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              },
            }}
          >
            New
          </Button>

          <IconButton
            aria-label="refresh"
            onClick={handleRefreshClick}
            disabled={refreshing}
            sx={{
              animation: refreshing ? "spin 1s linear infinite" : "none",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          >
            <RefreshCcw size={20} />
          </IconButton>

          <NotificationsButton onNotificationRead={handleNotificationRead} />
        </Stack>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255, 255, 255, 0.08)",
          width: "100%",
        }}
      />

      <Box
        id="requests-scrollable-container"
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: 0,
          overflowY: "auto",
          pr: 4,
          py: 2,
          mb: 0,
          mr: -1,
          borderRadius: "12px",
        }}
      >
        {loading && initialLoad ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box p={4}>
            <Typography color="error" variant="h6">
              Error loading requests
            </Typography>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : filteredRequests && filteredRequests.length > 0 ? (
          <>
            {filteredRequests.map((request, index) => {
              if (index === filteredRequests.length - 1) {
                return (
                  <Box key={request.request_id} ref={lastRequestElementRef}>
                    <RequestCard
                      request={request}
                      onNotificationRead={handleNotificationRead}
                    />
                  </Box>
                );
              } else {
                return (
                  <RequestCard
                    key={request.request_id}
                    request={request}
                    onNotificationRead={handleNotificationRead}
                  />
                );
              }
            })}

            {loading && !initialLoad && !refreshing && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <CircularProgress size={30} />
              </Box>
            )}

            {!hasMore && filteredRequests.length > 0 && (
              <Box sx={{ textAlign: "center", px: 1, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    my: 2,
                  }}
                >
                  <Divider
                    sx={{
                      flexGrow: 1,
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: 2,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {" "}
                  </Box>
                  <Divider
                    sx={{
                      flexGrow: 1,
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  />
                </Box>
              </Box>
            )}
          </>
        ) : (
          <Box textAlign="center" p={4}>
            <Typography variant="h6">No requests found</Typography>
            {activeFilter !== "ALL" && (
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "rgba(255, 255, 255, 0.6)" }}
              >
                Try changing your filter
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RequestsList;
