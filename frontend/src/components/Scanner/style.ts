import styled from 'styled-components';

export const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
`;

export const UploadBox = styled.label`
  background-color: #1f3b5c;
  color: #d0d0d0;
  padding: 3rem 6rem;
  border-radius: 0.75rem;
  font-size: 1.5rem;
  cursor: pointer;
  text-align: center;
  margin-bottom: 2.5rem;
  transition: background 0.3s;
  min-width: 400px;

  &:hover {
    background-color: #2c4f77;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ScanButton = styled.button`
  background-color: #1f3b5c;
  color: #d0d0d0;
  font-size: 1.5rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #2c4f77;
  }
`;