import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin: 1rem auto;
  max-width: 1000px;
  width: 100%;

  & input {
    width: 100%;
    padding: 1rem;
  }

  & input::placeholder,
  & input {
    font-family: 'Montserrat', sans-serif;
  }
`;
