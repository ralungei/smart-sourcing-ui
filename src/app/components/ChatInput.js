"use client";
import { alpha, Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        marginTop: "auto",
        padding: "12px",
        background: alpha("#000", 0.5),
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        opacity: disabled ? 0.7 : 1,
        transition: "opacity 0.2s ease",
      }}
    >
      <Box
        component="input"
        sx={{
          flex: 1,
          color: "#ffffff",
          fontSize: "14px",
          background: "transparent",
          border: "none",
          outline: "none",
          padding: "10px",
          width: "100%",
          "&::placeholder": {
            color: "rgba(255, 255, 255, 0.5)",
          },
          "&:disabled": {
            cursor: "not-allowed",
          },
        }}
        placeholder="Request parts or components... (e.g. 'I need 5 proximity sensors for April delivery by 2 PM')"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        autoFocus
      />
      <Box
        sx={{
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: alpha("#fff", 0.2),
          color: "white",
          cursor: disabled ? "not-allowed" : "pointer",
          borderRadius: "12px",
          "&:hover": {
            background: disabled ? alpha("#fff", 0.2) : alpha("#fff", 0.3),
          },
          transition: "background 0.2s ease",
        }}
        onClick={disabled ? undefined : handleSendMessage}
      >
        <Icon
          icon="material-symbols:send-rounded"
          color={disabled ? alpha("#fff", 0.3) : "#fff"}
          width="18"
          style={{ opacity: disabled ? 0.5 : 1 }}
        />
      </Box>
    </Box>
  );
};

export default ChatInput;
