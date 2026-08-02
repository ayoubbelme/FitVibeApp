import React from 'react';
import { View, Text, Image, Animated, StyleSheet, Dimensions, I18nManager } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../Theme/ThemeContext';
import { OnboardingSlideData } from '../../../Constants/onboardingData';
import Pagination from './Pagination';
import FeatureBadge from './FeatureBadge';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 380;
const FADE_HEIGHT = 120;

type Props = {
  slide: OnboardingSlideData;
  index: number;
  scrollX: Animated.Value;
  total: number;
  activeIndex: number;
};

export default function OnboardingSlide({
  slide,
  index,
  scrollX,
  total,
  activeIndex,
}: Props): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const textAlign = I18nManager.isRTL ? 'right' : 'left';
  const rowAlign = I18nManager.isRTL ? 'flex-end' : 'flex-start';

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  // Image: subtle scale + fade as it enters/leaves the screen
  const imageScale = scrollX.interpolate({
    inputRange,
    outputRange: [1.15, 1, 1.15],
    extrapolate: 'clamp',
  });
  const imageOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 1, 0.4],
    extrapolate: 'clamp',
  });

  // Text: fades in and slides up as the slide becomes active
  const textOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });
  const textTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [20, 0, 20],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ width }}>
      <View style={styles.imageWrapper}>
        <Animated.Image
          source={slide.image}
          style={[
            styles.image,
            { transform: [{ scale: imageScale }], opacity: imageOpacity },
          ]}
          resizeMode="cover"
        />

        <LinearGradient
          colors={['transparent', theme.background]}
          style={styles.fade}
          pointerEvents="none"
        />

        <View
          collapsable={false}
          style={[
            styles.paginationOverlay,
            { top: theme.spacing.lg, left: theme.spacing.lg },
          ]}
        >
          <Pagination total={total} activeIndex={activeIndex} theme={theme} />
        </View>
      </View>

      <Animated.View
        style={[
          styles.textContainer,
          {
            paddingHorizontal: theme.spacing.lg,
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        <View style={{ alignItems: rowAlign }}>
          <FeatureBadge
            label={t(slide.featureLabelKey)}
            theme={theme}
          />
        </View>

        <Text
          style={[
            theme.typography.title,
            { color: theme.text, textAlign, marginBottom: theme.spacing.sm },
          ]}
        >
          {t(slide.titleKey)}
        </Text>
        <Text
          style={[
            theme.typography.subtitle,
            { color: theme.subtitle, textAlign, lineHeight: 22 },
          ]}
        >
          {t(slide.subtitleKey)}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    width: '100%',
    height: IMAGE_HEIGHT,
    overflow: 'hidden', // clips the scaled image so it doesn't spill past the wrapper
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FADE_HEIGHT,
  },
  paginationOverlay: {
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
  },
  textContainer: {
    marginTop: 24,
  },
});