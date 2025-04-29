"use client";
import { Box } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";
import NewChatButton from "./NewChatButton";
import TypingText from "./TypingText";

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const GlassHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => ({
  color: "white",
  fontWeight: 600,
  marginBottom: "20px",
  position: "relative",
  zIndex: 2,
  letterSpacing: "0.5px",
  display: "flex",
  alignItems: "center",
  "&::before": {
    content: '""',
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "10px",
    transition: "background-color 0.5s ease, box-shadow 0.5s ease",
    animation: status === "active" ? `${pulseAnimation} 2s infinite` : "none",
    backgroundColor:
      status === "active"
        ? "rgba(0, 255, 200, 0.8)"
        : status === "error"
        ? "rgba(255, 87, 87, 0.8)"
        : "rgba(255, 255, 255, 0.5)",
    boxShadow:
      status === "active"
        ? "0 0 10px rgba(0, 255, 200, 0.5)"
        : status === "error"
        ? "0 0 10px rgba(255, 87, 87, 0.5)"
        : "none",
  },
}));

const ChatHeader = ({ onNewChat, requestId, error }) => {
  const getStatus = () => {
    if (error) return "error";
    if (requestId) return "active";
    return "inactive";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <GlassHeader sx={{ typography: "h6", m: 0 }} status={getStatus()}>
        {requestId ? (
          <TypingText text={`Ref #${requestId}`} speed={14} />
        ) : (
          "Chat"
        )}
      </GlassHeader>
      <NewChatButton onClick={onNewChat} />
    </Box>
  );
};

export default ChatHeader;
