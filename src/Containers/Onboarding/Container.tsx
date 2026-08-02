import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../Theme/ThemeContext';
import { onboardingSlides } from '../../Constants/onboardingData';
import { RootStackParamList } from '../../Navigation/types';
import OnboardingSlide from './Components/OnboardingSlide';

const { width } = Dimensions.get('window');
const AUTO_ADVANCE_INTERVAL = 4000;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export default function OnboardingContainer(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<Animated.FlatList<typeof onboardingSlides[0]>>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const startAutoAdvance = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % onboardingSlides.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, AUTO_ADVANCE_INTERVAL);
  }, []);

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoAdvance]);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const handleScrollBeginDrag = (): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleScrollEndDrag = (): void => {
    startAutoAdvance();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OnboardingSlide
            slide={item}
            index={index}
            scrollX={scrollX}
            total={onboardingSlides.length}
            activeIndex={activeIndex}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
      />

      <View
        style={[
          styles.footer,
          { paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xl },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.getStartedButton,
            {
              backgroundColor: theme.primary,
              borderRadius: theme.radius.md,
              paddingVertical: theme.spacing.md,
              marginBottom: theme.spacing.md,
            },
          ]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[theme.typography.button, { color: theme.buttonText }]}>
            {t('onboarding.getStarted')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signInButton, { borderRadius: theme.radius.md }]}
          onPress={() => navigation.navigate('Login')}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.4)"
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: theme.radius.md },
            ]}
          />
          <View
            style={[
              styles.signInContent,
              {
                paddingVertical: theme.spacing.md,
                borderRadius: theme.radius.md,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.5)',
              },
            ]}
          >
            <View style={styles.signInTextRow}>
              <Text style={[styles.alreadyRegisteredText, { color: theme.subtitle }]}>
                {t('onboarding.alreadyRegistered')}{' '}
              </Text>
              <Text style={[theme.typography.button, { color: theme.text }]}>
                {t('onboarding.signIn')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {},
  getStartedButton: {
    alignItems: 'center',
  },
  signInButton: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgb(182, 182, 182)',
  },
  signInContent: {
    alignItems: 'center',
  },
  signInTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyRegisteredText: {
    fontSize: 15,
    fontWeight: '400',
  },
});