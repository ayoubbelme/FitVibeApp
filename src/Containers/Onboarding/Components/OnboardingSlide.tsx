import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../Theme/ThemeContext';
import { OnboardingSlideData } from '../../../Constants/onboardingData';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 380;

type Props = {
  slide: OnboardingSlideData;
};

export default function OnboardingSlide({ slide }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={{ width }}>
      <Image source={slide.image} style={styles.image} resizeMode="cover" />

      <View style={[styles.textContainer, { paddingHorizontal: theme.spacing.lg }]}>
        <Text
          style={[
            theme.typography.title,
            { color: theme.text, textAlign: 'center', marginBottom: theme.spacing.sm },
          ]}
        >
          {t(slide.titleKey)}
        </Text>
        <Text
          style={[
            theme.typography.subtitle,
            { color: theme.subtitle, textAlign: 'center', lineHeight: 22 },
          ]}
        >
          {t(slide.subtitleKey)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  textContainer: {
    marginTop: 24,
  },
});