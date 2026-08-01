import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';

export default function LoginContainer(): React.JSX.Element {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[theme.typography.title, { color: theme.text }]}>Login Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});