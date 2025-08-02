import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    color: #333;
    margin-bottom: 32px;
    font-size: 2rem;
  }
`;

export const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;

export const DocumentCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
  cursor: pointer;
  gap: 1rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const DocumentImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #f0f0f0;
`;

export const DocumentInfo = styled.div`
  padding: 16px;

  h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: inline-block;
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 12px;
  }

  p {
    margin: 0;
    color: #757575;
    font-size: 0.8rem;
  }
`;
