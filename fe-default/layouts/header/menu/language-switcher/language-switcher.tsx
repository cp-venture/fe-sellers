import React from 'react';
import { Box, SelectedItem, Flag, MenuItem } from './language-switcher.style';
import Popover from 'components/popover/popover';
import { FormattedMessage } from 'react-intl';
import { DEFlag } from 'assets/icons/DEFlag';
import { CNFlag } from 'assets/icons/CNFlag';
import { USFlag } from 'assets/icons/USFlag';
import { ILFlag } from 'assets/icons/ILFlag';
import { ESFlag } from 'assets/icons/ESFlag';
import { SAFlag } from 'assets/icons/SAFlag';
import { useLocale } from 'contexts/language/language.provider';

const LANGUAGES = [
  { id: 'ar', label: 'Arabic', intlLangName: 'intlArabic', icon: <SAFlag /> },
  { id: 'zh', label: 'Chinese', intlLangName: 'intlChinese', icon: <CNFlag /> },
  { id: 'en', label: 'English', intlLangName: 'intlEnglish', icon: <USFlag /> },
  { id: 'de', label: 'German', intlLangName: 'intlGerman', icon: <DEFlag /> },
  { id: 'he', label: 'Hebrew', intlLangName: 'intlHebrew', icon: <ILFlag /> },
  { id: 'es', label: 'Spanish', intlLangName: 'intlSpanish', icon: <ESFlag /> },
];

const LanguageMenu = ({ onClick }) => {
  return (
    <>
      {LANGUAGES.map((item) => (
        <MenuItem onClick={onClick} key={item.id} value={item.id}>
          <span>{item.icon}</span>
          <FormattedMessage
            id={item.intlLangName}
            defaultMessage={item.label}
          />
        </MenuItem>
      ))}
    </>
  );
};

const LanguageSwitcher: React.FC<{}> = () => {
  const { locale, changeLanguage } = useLocale();
  const selectedLanguage = LANGUAGES.find((x) => x.id === locale);
  const languageChangeHandler = (e) => {
    changeLanguage(e.target.value);
  };
  return (
    <Box>
      <Popover
        className="right"
        handler={
          <SelectedItem>
            <Flag>{selectedLanguage?.icon}</Flag>
            <span>
              <FormattedMessage
                id={selectedLanguage?.intlLangName}
                defaultMessage={selectedLanguage?.label}
              />
            </span>
          </SelectedItem>
        }
        content={<LanguageMenu onClick={languageChangeHandler} />}
      />
    </Box>
  );
};

export default LanguageSwitcher;
