import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  display: flex;
  max-width: 1000px;
  margin: auto;
  justify-content: flex-end;

  & p:first-child {
    margin-right: 1rem;
  }
  & a {
    color: white;
    background: #202020;
    padding: 1rem;
    /* margin-top: 0.5rem; */
    display: inline-block;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: bold;
  }
`;

export const WorkshopLinks = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const HowItWorksContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
