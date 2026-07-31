import './src/Translation/i18n';
import React from 'react';
import { View, Text, Button, I18nManager, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { ThemeProvider, useTheme } from './src/Theme/ThemeContext';

type LanguageCode = 'en' | 'fr' | 'ar';

function AppContent(): React.JSX.Element {
  const { t, i18n } = useTranslation();
  const { theme, mode, toggleTheme } = useTheme();

  const changeLanguage = (lang: LanguageCode): void => {
    const isRTL = lang === 'ar';
    i18n.changeLanguage(lang);

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      RNRestart.Restart();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{t('home.title')}</Text>
      <Text style={{ color: theme.subtitle }}>{t('home.subtitle')}</Text>
      <Text style={{ color: theme.text }}>{t('greeting', { name: 'Sam' })}</Text>
      <Text style={{ color: theme.text }}>{t('itemCount', { count: 3 })}</Text>

      <View style={styles.buttons}>
        <Button title="English" onPress={() => changeLanguage('en')} />
        <Button title="Français" onPress={() => changeLanguage('fr')} />
        <Button title="العربية" onPress={() => changeLanguage('ar')} />
      </View>

      <View style={styles.buttons}>
        <Button
          title={mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          onPress={toggleTheme}
          color={theme.primary}
        />
      </View>
    </View>
  );
}

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
});