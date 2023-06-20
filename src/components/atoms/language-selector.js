import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CustomHeader} from '../molecules/header/header-1x';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'fr', label: 'Français'},
];
const Selector = () => {
  const {t, i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={t('common:languageSelector')} allowBackBtn />
      {LANGUAGES.map(language => {
        const selectedLanguage = language.code === selectedLanguageCode;

        return (
          <Pressable
            key={language.code}
            style={styles.buttonContainer}
            disabled={selectedLanguage}
            onPress={() => setLanguage(language.code)}>
            <Text
              style={[selectedLanguage ? styles.selectedText : styles.text]}>
              {language.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.background,
  },
  title: {
    color: '#444',
    fontSize: 28,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
    paddingHorizontal: mvs(23),
  },
  text: {
    fontSize: 18,
    color: colors.white,
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: mvs(18),
    fontWeight: '600',
    color: colors.primary,
    paddingVertical: 4,
  },
});

export default Selector;
