"use client";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpRounded from "@mui/icons-material/KeyboardArrowUpRounded";

export default function ScrollToTopFab() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 240 });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={scrollToTop}
        aria-label="Sayfa başına dön"
        size="medium"
        sx={{
          position: "fixed",
          right: { xs: 16, sm: 28 },
          bottom: { xs: 16, sm: 28 },
          zIndex: 50,
          bgcolor: "#174f47",
          color: "#fff",
          "&:hover": { bgcolor: "#0f3f38" },
        }}
      >
        <KeyboardArrowUpRounded />
      </Fab>
    </Zoom>
  );
}
