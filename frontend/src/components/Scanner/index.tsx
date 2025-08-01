import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { HiddenInput, ScannerContainer, UploadBox } from "./style";
import Button from "../Buttom";
import { jwtDecode } from "jwt-decode";
import Loading from "../ProgressBar";

interface JwtPayload {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
}

const Scanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return alert("Por favor, selecione uma imagem.");

    const token = localStorage.getItem("token");
    if (!token) return alert("Usuário não autenticado.");

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

      navigate("/DocumentView", {
        state: { documentId: response.data.id, userId: response.data.userId },
      });
    } catch (error) {
      console.error("Erro ao escanear imagem:", error);
      alert("Erro ao escanear imagem. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScannerContainer>
      <UploadBox>
        SELECIONE A IMAGEM PARA ESCANEAR
        <HiddenInput type="file" accept="image/*" onChange={handleFileChange} />
      </UploadBox>

      <Button onClick={handleScan} name="ESCANEAR" />

      <Loading isLoading={isLoading} />
    </ScannerContainer>
  );
};

export default Scanner;
