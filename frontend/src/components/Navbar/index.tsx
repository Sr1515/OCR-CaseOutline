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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container color={color} width={width} height={height}>
      <ButtonWrapper>
        <Button
          name="Escanear"
          height="5rem"
          width="13rem"
          onClick={handleBack}
        />
      </ButtonWrapper>

      <ButtonWrapper>
        <Button
          name="Documentos"
          height="5rem"
          width="15rem"
          onClick={handleBack}
        />
      </ButtonWrapper>

      <ButtonWrapper>
        <Button name="Sair" height="4rem" width="10rem" onClick={handleBack} />
      </ButtonWrapper>
    </Container>
  );
};

export default NavBar;
