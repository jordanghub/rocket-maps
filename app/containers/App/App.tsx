import React, { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { clearFlashMessagesAction } from 'store/features';
import { IState } from 'store/features/interface';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

import * as Styled from './App.style';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;

  const dispatch = useDispatch();

  const { flashMessages } = useSelector((state: IState) => state.app);

  const clearFlashMessages = useCallback(
    () => dispatch(clearFlashMessagesAction()),
    [dispatch]
  );
  useEffect(() => {
    flashMessages.forEach((messageData: any) => {
      toast(messageData.message, messageData.config);

      if (flashMessages.length > 0) {
        clearFlashMessages();
      }
    });
  }, [flashMessages, clearFlashMessages]);

  return (
    <Styled.Wrapper>
      <ToastContainer position="top-left" />
      {children}
    </Styled.Wrapper>
  );
}
