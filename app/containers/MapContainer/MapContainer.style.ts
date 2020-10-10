// import { TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import { Flipper } from 'react-flip-toolkit';

// import { animated } from 'react-spring';

export const MapContainer = styled(Flipper)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: auto;
`;
// export const MapContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   max-width: 1000px;
//   margin: auto;
// `;
export const Wrapper = styled.div`
  position: relative;
  padding: 1rem;

  color: white;

  & h2 {
    text-align: center;
  }
`;

export const AnimatedMapItem = styled.div``;
// export const AnimatedMapItem = styled(animated.div)`
//   max-width: 333px;
//   display: flex;
//   justify-content: center;
// `;
