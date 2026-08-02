import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../../Theme/theme';

type Props = {
  total: number;
  activeIndex: number;
  theme: Theme;
};

export default function Pagination({ total, activeIndex, theme }: Props): React.JSX.Element {
  return (
    <View style={styles.pill}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === activeIndex ? theme.primary : 'rgb(169, 169, 169)',
              width: index === activeIndex ? 20 : 8,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});