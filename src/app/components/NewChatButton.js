"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledNewChatButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  color: "white",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
  },
  "&:active": {
    transform: "translateY(1px)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
});

const NewChatButton = ({ onClick }) => {
  return (
    <StyledNewChatButton onClick={onClick}>
      <Box sx={{ mr: 1 }}>+</Box>
      New request
    </StyledNewChatButton>
  );
};

export default NewChatButton;
