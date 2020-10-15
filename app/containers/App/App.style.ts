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
