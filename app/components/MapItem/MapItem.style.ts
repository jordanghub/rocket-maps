import styled, { css } from 'styled-components';

interface IWrapperProps {
  selected: boolean;
}


export const Wrapper = styled.div<IWrapperProps>`
  padding: 1rem;
  width: 100%;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 333px;

  & h3 {
    margin-top: 0;
    text-align: center;
  }


  ${props => props.selected && css`
    background: rgba(255,255,255,0.2);
  `}

  &:hover {
    cursor: pointer;
    background: rgba(255,255,255,0.2);
  }

  

  @media screen and (min-width: 1000px) {

    width: 33.33%;
  }
`

export const ThumbnailContainer = styled.div`
  width: 300px;
  height: 300px;

  & img {
    width: 100%;
    height: 100%;
  }
`

export const NoThumbnail = styled.div`
  width: 100%;
  background: rgba(255,255,255,0.6);
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`