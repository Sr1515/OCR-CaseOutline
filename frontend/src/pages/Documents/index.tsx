import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, DocumentsGrid, DocumentCard, DocumentImage } from "./style";
import NavBar from "../../components/Navbar";
import { api } from "../../api/axios";
import Button from "../../components/Buttom";
import PopupMessage from "../../components/PopupMessage";

interface Document {
  id: string;
  userId: string;
  documentUrl: string;
  format: string;
  createdAt: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupMensagem, setPopupMensagem] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await api.get("/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(response.data);
      } catch (error) {
        console.error("Erro ao carregar documentos:", error);
        setPopupMensagem("Erro ao carregar documentos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleViewChat = (documentId: string) => {
    navigate("/documentView", { state: { documentId } });
  };

  const handleDownloadPDF = async (documentId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPopupMensagem("Usuário não autenticado.");
      return;
    }

    try {
      const response = await api.get(`/documents/download/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      if (!response || response.status !== 200) {
        throw new Error("Erro ao baixar PDF");
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `documento_${documentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setPopupMensagem("PDF BAIXADO");
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      setPopupMensagem("Erro ao baixar PDF.");
    }
  };

  if (isLoading) {
    return (
      <Container>
        <NavBar />
        <div>Carregando documentos...</div>
      </Container>
    );
  }

  return (
    <Container>
      <NavBar />
      <h1>Meus Documentos</h1>

      {popupMensagem && (
        <PopupMessage
          message={popupMensagem}
          onClose={() => setPopupMensagem(null)}
          duration={3000}
        />
      )}

      <DocumentsGrid>
        {documents.length === 0 && (
          <p>
            Nenhum documento encontrado. Comece escaneando seu primeiro
            documento.
          </p>
        )}

        {documents.map((document) => (
          <DocumentCard key={document.id}>
            <DocumentImage src={document.documentUrl} />

            <div style={{ paddingBottom: "12px" }}>
              <Button
                name="Ver Chat"
                height="3rem"
                width="100%"
                onClick={() => handleViewChat(document.id)}
              />
            </div>

            <Button
              name="Baixar PDF"
              height="3rem"
              width="100%"
              backgroundColor="green"
              onClick={() => handleDownloadPDF(document.id)}
            />
          </DocumentCard>
        ))}
      </DocumentsGrid>
    </Container>
  );
};

export default Documents;
