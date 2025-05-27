"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useState } from "react";
import { RequestsProvider } from "../../context/RequestsContext";
import RequestsList from "../RequestsList";
import UserAvatarMenu from "../UserAvatarMenu";

const BackgroundContainer = styled(Box)({
  backgroundImage: 'url("/background.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "fixed",
  inset: 0,
  display: "flex",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom right, rgba(0,0,0,0.75), rgba(0,0,0,0.4))",
    zIndex: 0,
  },
});

const ContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "100%",
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    gap: 20,
  },
}));

const LeftPanel = motion(
  styled(Box)(({ theme }) => ({
    flexShrink: 0,
    height: "100vh",
    padding: "40px 40px 0",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      padding: 20,
    },
  }))
);

const TitleSection = styled(Box)({
  marginBottom: 48,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ScrollableContent = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
});

const RightPanel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVertical",
})(({ isVertical }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  margin: isVertical ? 0 : "40px 0",
  position: isVertical ? "fixed" : "relative",
  bottom: isVertical ? 0 : "auto",
  left: isVertical ? 0 : "auto",
  width: isVertical ? "100%" : "50%",
  height: isVertical ? "100vh" : "calc(100vh - 80px)",
  overflow: "hidden",
  zIndex: isVertical ? 10 : 1,
}));

const AnimatedGlassBox = motion(
  styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 20,
    borderRadius: "30px 0 0 30px",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.15)",
    [theme.breakpoints.down("lg")]: {
      borderRadius: "0 0 30px 30px",
    },
  }))
);

const DecorativeLine = styled(Box)({
  position: "absolute",
  top: 10,
  left: "50%",
  transform: "translateX(-50%)",
  width: "40%",
  height: 4,
  background: "rgba(255,255,255,0.25)",
  borderRadius: 4,
  zIndex: 5,
});

const CloseButton = styled(Box)({
  position: "absolute",
  top: 20,
  right: 20,
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 10,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    width: 16,
    height: 2,
    backgroundColor: "white",
  },
  "&::before": {
    transform: "rotate(45deg)",
  },
  "&::after": {
    transform: "rotate(-45deg)",
  },
});

export default function FormLayout({ children }) {
  const [showRightPanel, setShowRightPanel] = useState(false);
  const theme = useTheme();
  const isVertical = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <RequestsProvider>
      <BackgroundContainer>
        <ContentContainer>
          <LeftPanel
            initial={false}
            animate={{
              width: !isVertical && showRightPanel ? "45%" : "100%",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <TitleSection>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    typography: "h2",
                    fontWeight: 600,
                    fontFamily: "Georgia",
                    textShadow: "0px 2px 6px rgba(0,0,0,0.9)",
                  }}
                >
                  AI Smart Sourcing: Parts
                  <br /> Booking Generator
                </Box>
              </Box>
              <UserAvatarMenu />
            </TitleSection>
            <ScrollableContent>
              <RequestsList onNewRequest={() => setShowRightPanel(true)} />
            </ScrollableContent>
          </LeftPanel>

          {showRightPanel && (
            <RightPanel isVertical={isVertical}>
              <AnimatedGlassBox
                initial={{
                  opacity: 0,
                  x: isVertical ? 0 : 50,
                  y: isVertical ? "100%" : 0,
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{
                  opacity: 0,
                  x: isVertical ? 0 : 50,
                  y: isVertical ? "100%" : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <CloseButton onClick={() => setShowRightPanel(false)} />
                <DecorativeLine />
                {children}
              </AnimatedGlassBox>
            </RightPanel>
          )}
        </ContentContainer>
      </BackgroundContainer>
    </RequestsProvider>
  );
}
