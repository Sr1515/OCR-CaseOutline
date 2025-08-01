import styled from "styled-components";

export const MessageContainer = styled.div<{ $isUser: boolean }>`
  /* Exemplo de uso: */
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  background-color: ${({ $isUser }) => ($isUser ? "#007bff" : "#e5e5ea")};
  color: ${({ $isUser }) => ($isUser ? "white" : "black")};
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 60%;
`;

export const Timestamp = styled.span<{ $isUser: boolean }>`
  font-size: 10px;
  color: gray;
  margin-top: 2px;
  display: block;
  text-align: ${({ $isUser }) => ($isUser ? "right" : "left")};
`;
