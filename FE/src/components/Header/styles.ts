import styled from "styled-components";

export const Container = styled.header`
  background: #D73035;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 198px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: space-between;

  .page-details {
    h1 {
      color: white;
      font-size: 32px;
    }

    h2{
      color: white;
      font-weight: 400;
      font-size: 16px;
      margin-top: 6px;
      opacity: 0.9;
    }
  }
`
