import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index:999;

  min-width: 300px;
  height: 100vh;
  width: 50%;
  max-width: 600px;
  position: fixed;
  right: 0;
  top: 0;
  background: rgba(0,0,0,0.9);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  & h3 {
    text-align: center;
  }
`

export const Actions = styled.div`


`

export const Button = styled.div`

  padding: 1rem;
  background: white;
  border-radius: 5px;
  color: black;
  margin-top: 1rem;

  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }

`