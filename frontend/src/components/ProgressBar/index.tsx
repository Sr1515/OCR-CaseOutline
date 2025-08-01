import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  Overlay,
} from "./style";

interface LoadingProps {
  isLoading: boolean;
  onComplete?: () => void;
  redirectTo?: string;
}

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  onComplete,
  redirectTo,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && redirectTo) {
      navigate(redirectTo);
      onComplete?.();
    }
  }, [isLoading, navigate, redirectTo, onComplete]);

  if (!isLoading) return null;

  return (
    <Overlay>
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Carregando...</LoadingText>
      </LoadingContainer>
    </Overlay>
  );
};

export default Loading;
