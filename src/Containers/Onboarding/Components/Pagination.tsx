import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme/ThemeContext';

type Props = {
  total: number;
  activeIndex: number;
};

export default function Pagination({ total, activeIndex }: Props): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === activeIndex ? theme.primary : theme.border,
              width: index === activeIndex ? 20 : 8,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});