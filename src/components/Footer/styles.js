import styled from 'styled-components';


export const FooterBase = styled.footer`
  background: var(--black);
  border-top: 0.5px solid var(--primary);
  font-size: 10px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: var(--white);
  text-align: center;
  @media (max-width: 800px) {
    margin-bottom: 50px;
  }
`;
