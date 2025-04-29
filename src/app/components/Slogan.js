import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search as MagnifyingGlass,
  Package,
  PackageCheck,
  PackageOpen,
  Star,
  Truck,
  Warehouse,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  background: "transparent",
  userSelect: "none",
});

const VisualizationArea = styled(Box)({
  position: "relative",
  width: "100%",
  height: "230px",
  maxWidth: "450px",
});

const FloatingSupplier = styled(motion(Paper))(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1.5),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "white",
  fontSize: "11px",
  fontWeight: "500",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  zIndex: 2,
  overflow: "hidden",
  width: "90px",
  height: "70px",
}));

const SupplierHeader = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const SupplierIcon = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SupplierName = styled(Box)({
  fontSize: "10px",
  lineHeight: 1.1,
  wordBreak: "break-word",
});

const MagnifyingGlassElement = styled(motion.div)({
  position: "absolute",
  zIndex: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
});

const GlassCircle = styled(motion.div)({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "2px solid rgba(255, 255, 255, 0.7)",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(8px)",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const WinnerOverlay = styled(motion.div)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "12px",
  background:
    "linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(56, 142, 60, 0.3))",
  zIndex: 0,
});

const WinnerBadge = styled(motion.div)({
  position: "absolute",
  top: "-8px",
  right: "-8px",
  background: "#2E7D32",
  color: "#FFF",
  borderRadius: "8px",
  width: "26px",
  height: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  zIndex: 10,
});

const Visual = () => {
  const [inspectingId, setInspectingId] = useState(null);
  const [winner, setWinner] = useState(null);
  const supplierRefs = useRef({});
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const getIconSize = () => 20;

  const suppliers = [
    {
      id: 1,
      name: "Supplier S-100",
      icon: <Warehouse size={getIconSize()} color="#FFFFFF" />,
      position: { top: "5%", left: "12%" },
      floatParams: { delay: 0, duration: 3 },
    },
    {
      id: 2,
      name: "Supplier S-200",
      icon: <Package size={getIconSize()} color="#FFFFFF" />,
      position: { top: "15%", left: "75%" },
      floatParams: { delay: 0.3, duration: 3.2 },
    },
    {
      id: 3,
      name: "Supplier S-300",
      icon: <Truck size={getIconSize()} color="#FFFFFF" />,
      position: { top: "68%", left: "15%" },
      floatParams: { delay: 0.5, duration: 2.9 },
    },
    {
      id: 4,
      name: "Supplier S-400",
      icon: <PackageOpen size={getIconSize()} color="#FFFFFF" />,
      position: { top: "65%", left: "70%" },
      floatParams: { delay: 0.2, duration: 3.5 },
    },
    {
      id: 5,
      name: "Supplier S-500",
      icon: <PackageCheck size={getIconSize()} color="#FFFFFF" />,
      position: { top: "38%", left: "43%" },
      floatParams: { delay: 0.4, duration: 2.8 },
    },
  ];

  const getSupplierCoordinates = (supplierId) => {
    const ref = supplierRefs.current[supplierId];
    if (!ref) return { x: 0, y: 0 };
    const rect = ref.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = rect.left - containerRect.left + rect.width / 2 - 25;
    const y = rect.top - containerRect.top + rect.height / 2 - 25;
    return { x, y };
  };

  useEffect(() => {
    const runAnimationSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const inspectionOrder = [1, 3, 4, 2, 5];
      const inspectionDuration = 500;
      for (const id of inspectionOrder) {
        setInspectingId(id);
        await new Promise((resolve) => setTimeout(resolve, inspectionDuration));
      }
      const winnerId = 4;
      setInspectingId(winnerId);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setWinner(winnerId);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setInspectingId(null);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setWinner(null);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      runAnimationSequence();
    };

    animationRef.current = setTimeout(() => {
      runAnimationSequence();
    }, 2600);

    return () => {
      clearTimeout(animationRef.current);
    };
  }, []);

  return (
    <Container>
      <VisualizationArea ref={containerRef}>
        {suppliers.map((supplier) => (
          <FloatingSupplier
            key={supplier.id}
            ref={(el) => (supplierRefs.current[supplier.id] = el)}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            whileHover={{
              scale: 1.1,
            }}
            animate={{
              opacity: 1,
              y: supplier.id === winner ? 0 : [0, -8, 0],
              scale: supplier.id === winner ? 1.05 : 1,
              zIndex: supplier.id === winner ? 25 : 5,
              boxShadow:
                supplier.id === winner
                  ? "0 0 15px rgba(76, 175, 80, 0.3)"
                  : "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: {
                opacity: { duration: 0.5, delay: supplier.floatParams.delay },
                y:
                  supplier.id === winner
                    ? { duration: 0 }
                    : {
                        delay: supplier.floatParams.delay,
                        duration: supplier.floatParams.duration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },
                scale: { duration: supplier.id === winner ? 0.1 : 0.1 },
                boxShadow: { duration: 0.2 },
              },
            }}
            style={supplier.position}
          >
            <SupplierHeader>
              <SupplierIcon>{supplier.icon}</SupplierIcon>
              <SupplierName>{supplier.name}</SupplierName>
            </SupplierHeader>

            <AnimatePresence>
              {supplier.id === winner && (
                <>
                  <WinnerOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <WinnerBadge
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <Star
                      size={7}
                      color="#FFF"
                      fill="#FFF"
                      style={{ marginTop: 8, marginRight: 7 }}
                    />
                  </WinnerBadge>
                </>
              )}
            </AnimatePresence>
          </FloatingSupplier>
        ))}
        <AnimatePresence>
          {inspectingId !== null && (
            <MagnifyingGlassElement
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                ...getSupplierCoordinates(inspectingId),
                transition: {
                  opacity: { duration: 0.3 },
                  x: { duration: 0.5, ease: "easeInOut" },
                  y: { duration: 0.5, ease: "easeInOut" },
                },
              }}
              exit={{ opacity: 0 }}
            >
              <GlassCircle
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                  },
                }}
              >
                <MagnifyingGlass size={24} color="rgba(255, 255, 255, 0.9)" />
              </GlassCircle>
            </MagnifyingGlassElement>
          )}
        </AnimatePresence>
      </VisualizationArea>
    </Container>
  );
};

export default Visual;
