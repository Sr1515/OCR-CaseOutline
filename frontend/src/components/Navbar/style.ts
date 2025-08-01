import styled from "styled-components";

export const Container = styled.div<{
  color: string;
  width: string;
  height: string;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ color }) => color};
  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
`;

export const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  &:first-child {
    justify-content: center;
  }

  &:last-child {
    justify-content: center;
  }
`;
