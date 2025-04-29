"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RequestsProvider } from "../../context/RequestsContext";
import RequestsList from "../RequestsList";
import UserAvatarMenu from "../UserAvatarMenu";

const BackgroundContainer = styled(Box)({
  backgroundImage: 'url("/background.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.1))",
    zIndex: 0,
  },
});

const ContentContainer = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100%",
  position: "relative",
  gap: 42,
  zIndex: 1,
});

const LeftPanel = styled(Box)({
  width: "45%",
  flexShrink: 0,
  backgroundColor: "transparent",
  height: "100vh",
  padding: "40px 0 40px 40px",
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
});

const TitleSection = styled(Box)({
  marginBottom: 48,
  flexShrink: 0,
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

const RightPanel = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: 0,
  margin: "40px 0 40px 0px",
  marginRight: 0,
  height: "calc(100vh - 80px)",
  position: "relative",
  overflow: "hidden",
}));

const AnimatedGlassBox = motion(
  styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 20,
    borderRadius: "30px 0 0 30px",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  }))
);

const DecorativeLine = styled(Box)({
  position: "absolute",
  top: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "40%",
  height: "4px",
  background: "rgba(255, 255, 255, 0.25)",
  borderRadius: "4px",
  zIndex: 5,
});

const NavLink = styled(Link)(({ theme, active }) => ({
  color: "white",
  textDecoration: "none",
  padding: "8px 16px",
  marginRight: "16px",
  borderRadius: "8px",
  backgroundColor: active ? "rgba(255, 255, 255, 0.15)" : "transparent",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

export default function ChatLayout({ children }) {
  const pathname = usePathname();

  return (
    <RequestsProvider>
      <BackgroundContainer>
        <ContentContainer>
          <LeftPanel>
            <TitleSection>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    typography: "h2",
                    fontWeight: 600,
                    fontFamily: "Georgia",
                    textShadow: "0px 2px 6px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  AI Smart Sourcing: Optimal
                  <br /> Parts, Costs, and Delivery
                </Box>
              </Box>
              <UserAvatarMenu />
            </TitleSection>

            <ScrollableContent>
              <RequestsList />
            </ScrollableContent>
          </LeftPanel>

          <RightPanel>
            <AnimatedGlassBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
            >
              <DecorativeLine />
              {children}
            </AnimatedGlassBox>
          </RightPanel>
        </ContentContainer>
      </BackgroundContainer>
    </RequestsProvider>
  );
}
