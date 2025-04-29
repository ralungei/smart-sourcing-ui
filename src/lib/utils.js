export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "PENDING":
      return "warning";
    case "FAILED":
      return "error";
    default:
      return "default";
  }
};

export const toTitleCase = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const generateSmartId = (request) => {
  if (!request || !request.input_state) return "";

  const itemRequested = request.input_state.item_requested || "";
  const location = request.input_state.delivery_location || "";
  const maxDeliveryDate = request.input_state.max_delivery_date || "";

  const itemPrefix = itemRequested
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 3);

  const locationCode = location.substring(0, 3).toUpperCase();

  let dateCode = "";
  if (maxDeliveryDate) {
    const date = new Date(maxDeliveryDate);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    dateCode = month + day;
  }

  return `${itemPrefix}-${locationCode}-${dateCode}`;
};
