import React, { memo } from 'react';
import { ILanguageProps, ILanguageItemProps } from './interface';

import * as Styled from './Language.style';

export const LanguageItem = memo(
  ({ flagCode, handleChange, isSelected }: ILanguageItemProps) => {
    return (
      <Styled.LanguageItem isSelected={isSelected} onClick={handleChange}>
        <img
          src={`https://www.countryflags.io/${flagCode}/flat/64.png`}
          alt={`flag ${flagCode}`}
        />
      </Styled.LanguageItem>
    );
  }
);

export const Language = memo(
  ({ selectedLocale, localeList, handleLocaleChange }: ILanguageProps) => {
    const handleFlagClick = (localeCode: string) => {
      return () => {
        handleLocaleChange({ localeCode });
      };
    };

    return (
      <Styled.LanguageWrapper>
        {localeList.map((locale) => (
          <LanguageItem
            key={locale.localeCode}
            flagCode={locale.flagCode}
            isSelected={selectedLocale === locale.localeCode}
            handleChange={handleFlagClick(locale.localeCode)}
          />
        ))}
      </Styled.LanguageWrapper>
    );
  }
);
