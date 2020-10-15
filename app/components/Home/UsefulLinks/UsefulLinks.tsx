import { shell } from 'electron';

import React, { memo, MouseEvent } from 'react';
import { useTranslation } from 'hooks/useTranslation';

import * as Styled from './UsefulLinks.style';

export const UsefulLinks = memo(() => {
  const { translate } = useTranslation();

  return (
    <Styled.Wrapper>
      <Styled.WorkshopLinks>
        <p>
          <a
            href="https://steamworkshopdownloader.io/"
            onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              shell.openExternal('https://steamworkshopdownloader.io/');
            }}
          >
            {translate('WORSKHOP_DOWNLOAD_LINK_LABEL')}
          </a>
        </p>
        <p>
          <a
            href="https://steamcommunity.com/app/252950/workshop/"
            onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              shell.openExternal(
                'https://steamcommunity.com/app/252950/workshop/'
              );
            }}
          >
            {translate('WORKSHOP_LINK_LABEL')}
          </a>
        </p>
      </Styled.WorkshopLinks>
    </Styled.Wrapper>
  );
});
