import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 16px;
  gap: 16px;

  max-width: 1200px;
  margin: 20px auto;

  height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DocumentContainer = styled.div`
  flex: 0 0 45%;
  max-width: 45%;
  height: 70%;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 8px;
  background: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 6px;
    display: block;
  }
`;

export const ChatWrapper = styled.div`
  flex: 0 0 45%;
  max-width: 45%;
  height: 70%;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  h3 {
    margin-bottom: 12px;
    text-align: center;
  }

  .messages-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 500px;
    overflow-y: auto;
    padding-right: 8px;
  }
`;

export const QuestionInputContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
