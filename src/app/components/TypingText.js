"use client";
import React, { useState, useEffect, useRef } from "react";

const TypingText = ({
  text = "",
  speed = 50,
  glowColor = "rgba(255, 255, 255, 0.7)",
  blurEffect = true,
  ...rest
}) => {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!text) return;

    setDisplayed("");
    indexRef.current = 0;
    setIsTyping(true);

    const animate = (timestamp) => {
      if (!lastUpdateRef.current) lastUpdateRef.current = timestamp;

      const elapsed = timestamp - lastUpdateRef.current;

      if (elapsed >= speed) {
        lastUpdateRef.current = timestamp;

        if (indexRef.current < text.length) {
          setDisplayed(text.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          setIsTyping(false);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [text, speed]);

  const containerStyle = {
    display: "inline-block",
    position: "relative",
    ...(blurEffect &&
      isTyping && {
        filter: "blur(0.5px)",
        transition: "filter 0.3s ease",
      }),
  };

  const textStyle = {
    position: "relative",
    ...(isTyping && {
      textShadow: `0 0 8px ${glowColor}`,
    }),
  };

  const cursorStyle = {
    display: isTyping ? "inline-block" : "none",
    marginLeft: "2px",
    width: "2px",
    height: "1em",
    backgroundColor: "currentColor",
    verticalAlign: "text-bottom",
    animation: "blink 0.8s infinite",
  };

  return (
    <span ref={containerRef} style={containerStyle} {...rest}>
      <span style={textStyle}>{displayed}</span>
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
      <span style={cursorStyle}></span>
    </span>
  );
};

export default TypingText;
