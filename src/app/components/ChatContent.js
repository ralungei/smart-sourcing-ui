"use client";
import { chatApi } from "@/lib/chatApi";
import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useRequests } from "../context/RequestsContext";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import RequestSummaryCard from "./RequestSummaryCard";
import WelcomeScreen from "./WelcomeScreen";

const COMPLETION_MESSAGE =
  "Thanks for your request! We're on it and will let you know as soon as it's ready.";

const GlassContent = styled(Box)({
  color: "rgba(255, 255, 255, 0.9)",
  fontWeight: 400,
  letterSpacing: "0.3px",
  position: "relative",
  zIndex: 2,
  height: "100%",
});

const LoadingIndicator = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
});

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const messagesEndRef = useRef(null);
  const { refreshRequests } = useRequests();

  const handleSendMessage = async (message) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setLoading(true);
    setError(null);

    try {
      let response;
      let result;

      if (!requestId) {
        result = await chatApi.sendFirstMessage(message);
        const { request_id, llm_answer } = result;
        setRequestId(request_id);
        response = llm_answer;
      } else {
        result = await chatApi.sendFollowUpMessage(requestId, message);
        response = result.llm_answer;
      }

      if (response === COMPLETION_MESSAGE) {
        setIsCompleted(true);
        setRequestData(result);

        setTimeout(() => refreshRequests(), 5000);
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error processing your request. Please try again.",
          isUser: false,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setRequestId(null);
    setError(null);
    setRequestData(null);
    setIsCompleted(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isCompleted]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ChatHeader
        requestId={requestId}
        onNewChat={handleNewChat}
        error={error}
      />

      <GlassContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          background: "rgba(0, 0, 0, 0.05)",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            m: 2,
          }}
        >
          {messages.length > 0 ? (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isUser={message.isUser}
                  isError={message.isError}
                />
              ))}

              {isCompleted && requestData && (
                <RequestSummaryCard requestData={requestData} />
              )}

              {loading && (
                <LoadingIndicator>
                  <CircularProgress
                    size={24}
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  />
                </LoadingIndicator>
              )}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <WelcomeScreen />
          )}
        </Box>

        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </GlassContent>
    </Box>
  );
};

export default ChatContent;
