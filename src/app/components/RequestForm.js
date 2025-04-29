"use client";
import { formDropdownApi } from "@/lib/formDropdownApi";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { Calendar, Hash, MapPin, Package, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const RequestForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    partName: "",
    quantity: "",
    deliveryLocation: "",
    maxDeliveryDate: "",
  });
  const [partOptions, setPartOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoading, setIsLoading] = useState({
    parts: true,
    locations: true,
  });
  const [error, setError] = useState(null);

  console.log("formValues: ", formValues);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { locations, parts } = await formDropdownApi.getFormOptions();

        const processedLocations = locations.map((location) => {
          if (typeof location === "string") return location;

          return {
            id: location.id || location.location_id,
            label:
              location.name ||
              location.location_name ||
              location.city ||
              JSON.stringify(location),
            ...location,
          };
        });

        const processedParts = parts.map((part) => {
          if (typeof part === "string") return part;

          return {
            id: part.id || part.part_id,
            label: part.name || part.part_name || JSON.stringify(part),
            ...part,
          };
        });

        setLocationOptions(processedLocations);
        setPartOptions(processedParts);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
        setError("Failed to load form options");
      } finally {
        setIsLoading({
          parts: false,
          locations: false,
        });
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (name, value) => {
    const processedValue =
      value && typeof value === "object" && value.label ? value.label : value;

    setFormValues((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const getOptionLabel = (option) => {
    if (typeof option === "string") return option;
    return option.label || JSON.stringify(option);
  };

  const visionProStyles = {
    formContainer: {
      maxWidth: "1200px",
      width: "100%",
      height: "100%",
      mx: "auto",
      p: 6,
      display: "flex",
      flexDirection: "column",
    },
    heading: {
      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
      fontWeight: 500,
      mb: { xs: 3, sm: 4, md: 6 },
      textAlign: "center",
      letterSpacing: "-0.5px",
      background: "linear-gradient(135deg, #FFFFFF 0%, #C0C0C0 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      pb: 1,
    },
    inputField: {
      "& .MuiOutlinedInput-root": {
        height: "70px",
        borderRadius: "16px",
        backgroundColor: alpha("#ffffff", 0.03),
        backdropFilter: "blur(5px)",
        fontSize: "1.1rem",
        border: `1px solid ${alpha("#ffffff", 0.1)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: alpha("#ffffff", 0.05),
          border: `1px solid ${alpha("#ffffff", 0.2)}`,
        },
        "&.Mui-focused": {
          boxShadow: `0 0 0 2px ${alpha("#ffffff", 0.2)}`,
          backgroundColor: alpha("#ffffff", 0.07),
        },
      },
      "& .MuiFormLabel-root": {
        fontSize: "1.1rem",
        fontWeight: "400",
      },
      "& .MuiInputAdornment-root": {
        mx: 1,
      },
    },
    button: {
      height: "70px",
      borderRadius: "16px",
      fontSize: "1.1rem",
      fontWeight: "500",
      textTransform: "none",
      backgroundColor: "#ffffff",
      color: "#000000",
      boxShadow: "0 8px 16px rgba(255, 255, 255, 0.2)",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#f0f0f0",
        boxShadow: "0 8px 20px rgba(255, 255, 255, 0.4)",
        transform: "translateY(-2px)",
      },
      "&:disabled": {
        backgroundColor: "#f0f0f0",
        color: "#999999",
        opacity: 0.7,
      },
      mt: "auto",
      mb: 0,
    },
    dropdownPaper: {
      backgroundColor: alpha("#000000", 0.8),
      backdropFilter: "blur(10px)",
      color: "#ffffff",
      borderRadius: "16px",
      border: `1px solid ${alpha("#ffffff", 0.1)}`,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
    icon: {
      color: alpha("#ffffff", 0.7),
    },
    grid: {
      gap: 3,
    },
  };

  if (error) {
    return (
      <Box
        sx={{
          ...visionProStyles.formContainer,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Typography sx={{ mt: 2, color: "rgba(255, 255, 255, 0.7)" }}>
          Please refresh the page or try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={visionProStyles.formContainer}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography variant="h4" sx={visionProStyles.heading}>
          New Request
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "2fr 1fr",
            },
            gap: 3,
            mb: 3,
            ...visionProStyles.grid,
          }}
        >
          <Autocomplete
            fullWidth
            options={partOptions}
            freeSolo
            value={formValues.partName || null}
            onChange={(e, v) => handleAutocompleteChange("partName", v)}
            getOptionLabel={getOptionLabel}
            loading={isLoading.parts}
            isOptionEqualToValue={(option, value) => {
              if (typeof option === "string" && typeof value === "string") {
                return option === value;
              }
              if (typeof option === "object" && typeof value === "object") {
                return option.label === value.label;
              }
              if (typeof option === "object" && typeof value === "string") {
                return option.label === value;
              }
              if (typeof option === "string" && typeof value === "object") {
                return option === value.label;
              }
              return false;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Part Name"
                name="partName"
                placeholder="e.g. Oxygen Sensor"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Package
                        size={24}
                        style={{ color: alpha("#ffffff", 0.7) }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {isLoading.parts ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={visionProStyles.inputField}
              />
            )}
            componentsProps={{
              paper: {
                sx: visionProStyles.dropdownPaper,
              },
            }}
          />

          <TextField
            required
            label="Quantity"
            name="quantity"
            type="number"
            value={formValues.quantity}
            onChange={handleChange}
            placeholder="Qty"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Hash size={24} style={{ color: alpha("#ffffff", 0.7) }} />
                </InputAdornment>
              ),
            }}
            sx={{ ...visionProStyles.inputField, minWidth: "130px" }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "2fr 1.5fr",
              lg: "2fr 1.5fr",
            },
            gap: 3,
            mb: 3,
            ...visionProStyles.grid,
          }}
        >
          <Autocomplete
            fullWidth
            options={locationOptions}
            freeSolo
            value={formValues.deliveryLocation || null}
            onChange={(e, v) => handleAutocompleteChange("deliveryLocation", v)}
            getOptionLabel={getOptionLabel}
            loading={isLoading.locations}
            isOptionEqualToValue={(option, value) => {
              if (typeof option === "string" && typeof value === "string") {
                return option === value;
              }
              if (typeof option === "object" && typeof value === "object") {
                return option.label === value.label;
              }
              if (typeof option === "object" && typeof value === "string") {
                return option.label === value;
              }
              if (typeof option === "string" && typeof value === "object") {
                return option === value.label;
              }
              return false;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Delivery Location"
                name="deliveryLocation"
                placeholder="e.g. Madrid"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapPin
                        size={24}
                        style={{ color: alpha("#ffffff", 0.7) }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {isLoading.locations ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={visionProStyles.inputField}
              />
            )}
            componentsProps={{
              paper: {
                sx: visionProStyles.dropdownPaper,
              },
            }}
          />
          <TextField
            required
            label="Delivery Date"
            name="maxDeliveryDate"
            type="date"
            value={formValues.maxDeliveryDate}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar
                    size={24}
                    style={{ color: alpha("#ffffff", 0.7) }}
                  />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split("T")[0],
            }}
            sx={visionProStyles.inputField}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={visionProStyles.button}
          disabled={
            !formValues.partName ||
            !formValues.quantity ||
            !formValues.deliveryLocation ||
            !formValues.maxDeliveryDate
          }
          endIcon={<Plus size={22} style={{ color: "currentColor" }} />}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default RequestForm;
