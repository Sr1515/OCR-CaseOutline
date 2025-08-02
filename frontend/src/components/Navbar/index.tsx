import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonWrapper, Container } from "./style";
import Button from "../Buttom";
import PopupMessage from "../PopupMessage";

type TitleProps = {
  color?: string;
  height?: string;
  width?: string;
};

const NavBar: React.FC<TitleProps> = ({
  color = "#2F3542",
  width = "100%",
  height = "6rem",
}) => {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPopupMessage("Você está saindo");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <Container color={color} width={width} height={height}>
        <ButtonWrapper>
          <Button
            name="Escanear"
            height="5rem"
            width="13rem"
            onClick={() => handleNavigate("/home")}
          />
        </ButtonWrapper>

        <ButtonWrapper>
          <Button
            name="Documentos"
            height="5rem"
            width="15rem"
            onClick={() => handleNavigate("/documents")}
          />
        </ButtonWrapper>

        <ButtonWrapper>
          <Button
            name="Sair"
            height="5rem"
            width="15rem"
            onClick={handleLogout}
          />
        </ButtonWrapper>
      </Container>

      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
          duration={3000}
        />
      )}
    </>
  );
};

export default NavBar;
