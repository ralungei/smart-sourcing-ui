"use client";
import { Box, Typography } from "@mui/material";
import {
  Award,
  Calendar,
  GitPullRequest,
  Hash,
  Mail,
  MapPin,
  Search,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

const WelcomeScreen = () => {
  const updateXarrow = useXarrow();
  const partNumberRef = useRef(null);
  const unitsRef = useRef(null);
  const deadlineRef = useRef(null);
  const locationRef = useRef(null);
  const analysisEngineRef = useRef(null);
  const bestSupplierRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const renderInputItem = (ref, IconComponent, label) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box
        ref={ref}
        sx={{
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: "12px",
          p: 1.5,
          mb: 1,
          position: "relative",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconComponent size={28} />
      </Box>
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          fontWeight: 500,
          letterSpacing: "0.2px",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        p: "20px",
        color: "rgba(255, 255, 255, 0.9)",
        position: "relative",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          right: "-50%",
          bottom: "-50%",
          zIndex: -1,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.10)",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
          mb: 3,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          position: "relative",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-10px",
            left: "-10px",
            right: "-10px",
            bottom: "-10px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            animation: "spin 20s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          },
        }}
      >
        <Truck size={42} style={{ color: "rgba(255, 255, 255, 0.9)" }} />
      </Box>
      <Typography
        variant="h5"
        sx={{
          color: "rgba(255, 255, 255, 0.95)",
          fontWeight: 600,
          mb: 1,
          textAlign: "center",
          letterSpacing: "0.5px",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        Trucks Smart Sourcing
      </Typography>
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mb: 3,
          maxWidth: "400px",
          color: "rgba(255, 255, 255, 0.87)",
          fontWeight: 300,
          lineHeight: 1.5,
        }}
      >
        AI-powered precision matching for critical truck parts when and where
        you need them
      </Typography>
      <Xwrapper>
        <Box
          sx={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "24px",
            py: "10px",
            px: "16px",
            maxWidth: "800px",
            width: "100%",
            mb: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              py: 3,
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                width: "25%",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box>{renderInputItem(partNumberRef, Wrench, "Part Name")}</Box>

              <Box>{renderInputItem(unitsRef, Hash, "Units")}</Box>

              <Box>
                {renderInputItem(deadlineRef, Calendar, "Delivery Deadline")}
              </Box>

              <Box>
                {renderInputItem(locationRef, MapPin, "Delivery Location")}
              </Box>
            </Box>

            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                ref={analysisEngineRef}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "24px",
                  p: 3,
                  width: "100%",
                  position: "relative",
                  transition: "box-shadow 0.6s ease-in-out",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    mb: 2,
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: "64px",
                      height: "64px",
                      background: "rgba(38, 132, 255, 0.1)",
                      borderRadius: "50%",
                      animation: "gentlePulse 2.5s ease-in-out infinite",
                      "@keyframes gentlePulse": {
                        "0%": { opacity: 0.4, transform: "scale(0.95)" },
                        "50%": { opacity: 0.8, transform: "scale(1.05)" },
                        "100%": { opacity: 0.4, transform: "scale(0.95)" },
                      },
                    },
                  }}
                >
                  <Sparkles
                    size={42}
                    style={{
                      color: "#3E95FF",
                      filter: "drop-shadow(0 0 8px rgba(38, 132, 255, 0.5))",
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    mb: 1,
                    letterSpacing: "0.5px",
                    color: "#3E95FF",
                    textShadow: "0 0 10px rgba(38, 132, 255, 0.3)",
                  }}
                >
                  AI Analysis Engine
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.75rem",
                    mb: 2,
                  }}
                >
                  Evaluating top suppliers
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      animation: "floatSmooth 3s ease-in-out infinite",
                      "@keyframes floatSmooth": {
                        "0%": { transform: "translateY(0)", opacity: 0.6 },
                        "50%": { transform: "translateY(-4px)", opacity: 1 },
                        "100%": { transform: "translateY(0)", opacity: 0.6 },
                      },
                    }}
                  >
                    <GitPullRequest
                      size={18}
                      style={{ color: "rgba(255, 255, 255, 0.8)" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      animation: "floatSmooth 3s ease-in-out infinite 0.5s",
                      "@keyframes floatSmooth": {
                        "0%": { transform: "translateY(0)", opacity: 0.6 },
                        "50%": { transform: "translateY(-4px)", opacity: 1 },
                        "100%": { transform: "translateY(0)", opacity: 0.6 },
                      },
                    }}
                  >
                    <Mail
                      size={18}
                      style={{ color: "rgba(255, 255, 255, 0.8)" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      animation: "floatSmooth 3s ease-in-out infinite 1s",
                      "@keyframes floatSmooth": {
                        "0%": { transform: "translateY(0)", opacity: 0.6 },
                        "50%": { transform: "translateY(-4px)", opacity: 1 },
                        "100%": { transform: "translateY(0)", opacity: 0.6 },
                      },
                    }}
                  >
                    <Search
                      size={18}
                      style={{ color: "rgba(255, 255, 255, 0.8)" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                width: "25%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                ref={bestSupplierRef}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "24px",
                  p: 3,
                  width: "90%",
                  position: "relative",
                  transition: "box-shadow 0.6s ease-in-out",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: "64px",
                      height: "64px",
                      background: "rgba(240, 178, 68, 0.1)",
                      borderRadius: "50%",
                      animation: "gentleGlow 2.5s ease-in-out infinite",
                      "@keyframes gentleGlow": {
                        "0%": { opacity: 0.4, transform: "scale(0.95)" },
                        "50%": { opacity: 0.8, transform: "scale(1.05)" },
                        "100%": { opacity: 0.4, transform: "scale(0.95)" },
                      },
                    },
                  }}
                >
                  <Award
                    size={42}
                    style={{
                      color: "#F0B244",
                      filter: "drop-shadow(0 0 8px rgba(240, 178, 68, 0.5))",
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    mb: 1,
                    mt: 1,
                    letterSpacing: "0.5px",
                    textShadow: "0 0 10px rgba(240, 178, 68, 0.3)",
                  }}
                >
                  Optimal Supplier
                </Typography>
              </Box>
            </Box>
          </Box>

          <Xarrow
            start={partNumberRef}
            end={analysisEngineRef}
            color="rgba(255, 255, 255, 0.25)"
            strokeWidth={2}
            headSize={6}
            path="curve"
            startAnchor="right"
            endAnchor={{ position: "left", offset: { x: 0, y: -50 } }}
            gridBreak="50%"
            zIndex={0}
            dashness={{
              animation: 0.8,
              strokeLen: 5,
              nonStrokeLen: 5,
            }}
          />
          <Xarrow
            start={unitsRef}
            end={analysisEngineRef}
            color="rgba(255, 255, 255, 0.25)"
            strokeWidth={2}
            headSize={6}
            path="curve"
            startAnchor="right"
            endAnchor={{ position: "left", offset: { x: 0, y: -25 } }}
            gridBreak="50%"
            zIndex={0}
            dashness={{
              animation: 0.8,
              strokeLen: 5,
              nonStrokeLen: 5,
            }}
          />
          <Xarrow
            start={deadlineRef}
            end={analysisEngineRef}
            color="rgba(255, 255, 255, 0.25)"
            strokeWidth={2}
            headSize={6}
            path="curve"
            gridBreak="50%"
            startAnchor="right"
            endAnchor={{ position: "left", offset: { x: 0, y: 0 } }}
            zIndex={0}
            dashness={{
              animation: 0.8,
              strokeLen: 5,
              nonStrokeLen: 5,
            }}
          />
          <Xarrow
            start={locationRef}
            end={analysisEngineRef}
            color="rgba(255, 255, 255, 0.25)"
            strokeWidth={2}
            headSize={6}
            path="curve"
            startAnchor="right"
            endAnchor={{ position: "left", offset: { x: 0, y: 25 } }}
            zIndex={0}
            dashness={{
              animation: 0.8,
              strokeLen: 5,
              nonStrokeLen: 5,
            }}
          />

          <Xarrow
            start={analysisEngineRef}
            end={bestSupplierRef}
            color="rgba(255, 255, 255, 0.25)"
            strokeWidth={2}
            headSize={6}
            path="straight"
            startAnchor="right"
            endAnchor="left"
            zIndex={0}
            dashness={{
              animation: 0.8,
              strokeLen: 5,
              nonStrokeLen: 5,
            }}
          />
        </Box>
      </Xwrapper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 6,
          mt: 3,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 150,
            height: 80,
            opacity: 0.8,
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <Image
            src="/oracle_logo.png"
            alt="Oracle"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: 160,
            height: 80,
            opacity: 0.8,
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <Image
            src="/volvo_logo.png"
            alt="Volvo"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
