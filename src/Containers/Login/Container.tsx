import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { useAuth } from '../../Auth/AuthContext';

export default function LoginContainer(): React.JSX.Element {
  const { theme } = useTheme();
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setIsSubmitting(true);
    const result = await signIn(username, password);
    setIsSubmitting(false);
    if (!result.success) {
      setError(result.message ?? 'Something went wrong');
    }
    // Navigation to Home happens automatically once `user` is set,
    // if RootNavigator switches stacks based on auth state (see note below).
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[theme.typography.title, { color: theme.text, marginBottom: theme.spacing.lg }]}>
        Sign In
      </Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={theme.subtitle}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={[styles.input, { borderColor: theme.border, color: theme.text }]}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.subtitle}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { borderColor: theme.border, color: theme.text }]}
      />

      {error && <Text style={{ color: 'red', marginBottom: theme.spacing.sm }}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary, borderRadius: theme.radius.md }]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={[theme.typography.button, { color: theme.buttonText }]}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
});