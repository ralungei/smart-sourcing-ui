"use client";
import { Box } from "@mui/material";

const ChatMessage = ({ message, isUser = false, isError = false }) => {
  return (
    <Box
      sx={{
        padding: "9px 18px",
        marginBottom: "18px",
        maxWidth: "85%",
        width: "fit-content",
        borderRadius: "30px",
        alignSelf: isUser ? "flex-end" : "flex-start",
        background: isError
          ? "rgba(199, 70, 52, 0.4)"
          : isUser
          ? "rgba(255, 255, 255, 1)"
          : "rgba(0, 0, 0, 0.4)",
        color: isUser ? "#000" : "rgba(255, 255, 255, 0.9)",
      }}
    >
      {message}
    </Box>
  );
};

export default ChatMessage;
