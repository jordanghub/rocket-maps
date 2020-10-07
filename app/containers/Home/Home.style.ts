import styled from 'styled-components';
import { getAssetPath } from 'appConst/path';

export const Wrapper = styled.div`
  padding: 0 1rem;
  min-height: 100vh;
  /* background-size: 100% 100%; */
  /* background-image: url(${getAssetPath('images', 'bg.jpg')}); */
  /* background-attachment: fixed; */
  position: relative;
  background-attachment: fixed;
  background: rgb(80, 80, 80);
  background: radial-gradient(
    circle,
    rgba(80, 80, 80, 1) 0%,
    rgba(57, 57, 64, 1) 100%
  );

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
