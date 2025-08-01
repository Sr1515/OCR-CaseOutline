import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonWrapper, Container } from "./style";
import Button from "../Buttom";

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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
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
  );
};

export default NavBar;
