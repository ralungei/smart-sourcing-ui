"use client";
import { Box, Pagination, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  "& .MuiPaginationItem-page:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  background: "rgba(0, 0, 0, 0.25)",
  borderRadius: "12px",
  backdropFilter: "blur(5px)",
}));

const PaginationInfo = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.6)",
  fontSize: "0.85rem",
  marginTop: theme.spacing(1),
}));

const PaginationControls = ({
  page,
  count,
  onChange,
  itemsPerPage = 10,
  totalItems = 0,
  showItemCount = true,
  size = "large",
}) => {
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <PaginationContainer>
      <StyledPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        size={size}
      />

      {showItemCount && totalItems > 0 && (
        <PaginationInfo>
          Showing {startItem}-{endItem} of {totalItems} items
        </PaginationInfo>
      )}
    </PaginationContainer>
  );
};

export default PaginationControls;
