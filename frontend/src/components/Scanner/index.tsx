import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { HiddenInput, ScannerContainer, UploadBox } from "./style";
import Button from "../Buttom";
import { jwtDecode } from "jwt-decode";
import Loading from "../ProgressBar";
import { FaCheckCircle } from "react-icons/fa";
import PopupMessage from "../PopupMessage";

interface JwtPayload {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
}

const Scanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMensagem, setPopupMensagem] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setPopupMensagem("Por favor, selecione uma imagem.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setPopupMensagem("Usuário não autenticado.");
      return;
    }

    const decoded = jwtDecode<JwtPayload>(token);
    const userId = decoded.sub;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("userId", userId);

    setIsLoading(true);

    try {
      const response = await api.post("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Documento criado:", response.data);

      setPopupMensagem("DOCUMENTO ESCANEADO");

      setTimeout(() => {
        navigate("/DocumentView", {
          state: {
            documentId: response.data.id,
            userId: response.data.userId,
          },
        });
      }, 1000);
    } catch (error) {
      console.error("Erro ao escanear imagem:", error);
      setPopupMensagem("FALHA AO ESCANEAR. TENTE NOVAMENTE.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScannerContainer>
      <UploadBox>
        SELECIONE A IMAGEM PARA ESCANEAR
        <HiddenInput type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <FaCheckCircle
            style={{ color: "green", marginTop: "8px" }}
            size={24}
          />
        )}
      </UploadBox>

      <Button onClick={handleScan} name="ESCANEAR" />

      {popupMensagem && (
        <PopupMessage
          message={popupMensagem}
          onClose={() => setPopupMensagem(null)}
          duration={3000}
        />
      )}

      <Loading isLoading={isLoading} />
    </ScannerContainer>
  );
};

export default Scanner;
