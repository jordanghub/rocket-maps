import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 1rem;
  min-height: 100vh;
  position: relative;
  background: radial-gradient(
    circle,
    rgba(80, 80, 80, 1) 0%,
    rgba(57, 57, 64, 1) 100%
  );
  background-attachment: fixed;

  & > * {
    position: relative;
  }
`;

export const SettingsButton = styled.div`
  color: white;
  position: relative;
  text-align: right;
  padding: 1rem;

  & span:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const InfoMessage = styled.p`
  text-align: center;
`;

export const ActionsSidebar = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: auto;

  & button {
    color: white;
    background: #202020;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: inherit;

    &:hover {
      cursor: pointer;
    }
  }
`;
