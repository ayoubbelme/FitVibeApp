import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎉 FitVibe is Working!</Text>
      <Text style={styles.subtitle}>welcome</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    marginTop: 15,
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default App;