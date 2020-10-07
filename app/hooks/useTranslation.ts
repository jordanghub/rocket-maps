import { IMessagesLabelKey } from 'appConst/messages/index';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IState } from 'store/features/interface';

function getMessage(messages: any, key: string) {
  return messages[key] ? messages[key] : key;
}

export function useTranslation() {
  const { messages } = useSelector((state: IState) => state.app);

  const translate = useCallback(
    (key: keyof typeof IMessagesLabelKey) => {
      return getMessage(messages, IMessagesLabelKey[key]);
    },
    [messages]
  );

  return { translate };
}
