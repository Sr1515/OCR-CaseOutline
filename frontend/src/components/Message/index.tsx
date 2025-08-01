import { MessageBubble, MessageContainer, Timestamp } from "./style";

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // Troque isUser por $isUser
    <MessageContainer $isUser={isUser}>
      <div>
        {/* Troque isUser por $isUser */}
        <MessageBubble $isUser={isUser}>{text}</MessageBubble>
        <Timestamp $isUser={isUser}>{formattedTime}</Timestamp>
      </div>
    </MessageContainer>
  );
};

export default Message;
