"use client";
import { authApi } from "@/lib/authApi";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.2s ease",
  backdropFilter: "blur(8px)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    minWidth: "180px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "10px 16px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
}));

const UserAvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await authApi.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <StyledAvatar>
            <User size={22} />
          </StyledAvatar>
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <StyledMenuItem disabled>
          <ListItemText
            primary="Admin"
            secondary="Administrator"
            primaryTypographyProps={{ color: "white" }}
            secondaryTypographyProps={{ color: "rgba(255, 255, 255, 0.6)" }}
          />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut size={18} color="white" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default UserAvatarMenu;
