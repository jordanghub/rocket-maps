import styled from 'styled-components';
import { getAssetPath } from 'constants/path';

export const Wrapper = styled.div`
  min-height: 100vh;
  background-size: 100% 100%;
  background-image: url(${getAssetPath('images', 'bg.jpg')});
  background-attachment: fixed;
  position: relative;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const SettingsButton = styled.div`
  color: white;
  position: relative;
  text-align: right;
  padding: 1rem;

  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
  }
`;
