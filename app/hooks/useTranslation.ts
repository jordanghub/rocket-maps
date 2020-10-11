import { MessagesLabelKey } from 'appConst/messages/index';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IState } from 'store/features/interface';

function getMessage(messages: any, key: string) {
  return messages[key] ? messages[key] : key;
}

export function useTranslation() {
  const { messages } = useSelector((state: IState) => state.app);

  const translate = useCallback(
    (key: keyof typeof MessagesLabelKey) => {
      return getMessage(messages, MessagesLabelKey[key]);
    },
    [messages]
  );

  return { translate };
}
