import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../../Theme/theme';

type Props = {
  label: string;
  theme: Theme;
};

export default function FeatureBadge({ label, theme }: Props): React.JSX.Element {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderRadius: theme.radius.pill,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.xs,
          marginBottom: theme.spacing.sm,
        },
      ]}
    >
      <Text style={[theme.typography.caption, { color: theme.primary, fontWeight: '600' }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    gap: 6,
  },
 
});