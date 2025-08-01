import { useEffect, useRef, useState } from "react";
import {
  Container,
  ContentWrapper,
  DocumentContainer,
  ChatWrapper,
  MessagesContainer,
  QuestionInputContainer,
} from "./style";
import NavBar from "../../components/Navbar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import Message from "../../components/Message";
import { LoadingContainer } from "../../components/ProgressBar/style";
import Button from "../../components/Buttom";

interface JwtPayload {
  id: string;
  name?: string;
  email?: string;
  iat?: number;
  exp?: number;
}

interface Document {
  id: string;
  documentUrl: string;
  title?: string;
  createdAt: string;
}

interface Interaction {
  interactionId: string;
  question: string;
  answer: string;
}

const DocumentView = () => {
  const [document, setDocument] = useState<Document | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const documentId = location.state?.documentId || searchParams.get("id");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      alert("Usuário não autenticado.");
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      setUserId(decoded.id);
      setToken(storedToken);
    } catch {
      alert("Token inválido. Faça login novamente.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) {
        alert("Documento não especificado.");
        navigate("/");
        return;
      }

      setIsLoading(true);

      try {
        const response = await api.get(`/documents/${documentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocument(response.data.document);
        setInteractions(response.data.interactions || []);
      } catch (error) {
        console.error("Erro ao carregar documento:", error);
        alert("Erro ao carregar o documento.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchDocument();
    }
  }, [documentId, navigate, token]);

  const handleSendQuestion = async () => {
    console.log("CLICOU NO BOTÃO");
    console.log("newQuestion:", newQuestion);
    console.log("documentId:", documentId);
    console.log("userId:", userId);
    console.log("isSending:", isSending);

    if (!newQuestion.trim() || !document?.id || !userId || isSending) return;

    setIsSending(true);

    try {
      const response = await api.post(
        `/llm/${documentId}`,
        {
          question: newQuestion,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newInteraction: Interaction = {
        interactionId: response.data.interactionId,
        question: newQuestion,
        answer: response.data.answer,
      };

      setInteractions((prev) => [...prev, newInteraction]);
      setNewQuestion("");
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);

      const errorInteraction: Interaction = {
        interactionId: `error-${Date.now()}`,
        question: newQuestion,
        answer:
          "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.",
      };

      setInteractions((prev) => [...prev, errorInteraction]);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <NavBar />
        <LoadingContainer>Carregando documento...</LoadingContainer>
      </Container>
    );
  }

  if (!document) {
    return (
      <Container>
        <NavBar />
        <LoadingContainer>Documento não encontrado.</LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <NavBar />

      <ContentWrapper>
        <DocumentContainer>
          <img
            src={document.documentUrl}
            alt={document.title || "Documento escaneado"}
          />
        </DocumentContainer>

        <ChatWrapper>
          <MessagesContainer>
            <h3>Conversa sobre o documento</h3>

            <div
              className="messages-list"
              style={{ flex: 1, paddingRight: "8px" }}
            >
              {interactions.map((interaction) => (
                <div key={interaction.interactionId}>
                  <Message
                    text={interaction.question}
                    isUser={true}
                    timestamp={new Date().toISOString()}
                  />
                  <Message
                    text={interaction.answer}
                    isUser={false}
                    timestamp={new Date().toISOString()}
                  />
                </div>
              ))}

              {isSending && (
                <Message
                  key="thinking"
                  text="Processando sua pergunta..."
                  isUser={false}
                  timestamp={new Date().toISOString()}
                />
              )}

              <div ref={messagesEndRef} />
            </div>
          </MessagesContainer>

          <QuestionInputContainer>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Digite sua pergunta sobre o documento..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendQuestion();
                }
              }}
              disabled={isSending}
              style={{
                fontSize: "14px",
                padding: "8px",
                flex: 1,
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <Button
              onClick={handleSendQuestion}
              name=">"
              width="2.5rem"
              height="2.5rem"
              fontSize="14px"
            />
          </QuestionInputContainer>
        </ChatWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default DocumentView;
