import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../Theme/ThemeContext';
import { onboardingSlides } from '../../Constants/onboardingData';
import { RootStackParamList } from '../../Navigation/types';
import OnboardingSlide from './Components/OnboardingSlide';
import Pagination from './Components/Pagination';

const { width } = Dimensions.get('window');
const AUTO_ADVANCE_INTERVAL = 4000; // ms between slides

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export default function OnboardingContainer(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  // If the user manually swipes, restart the auto-advance timer so it doesn't
  // jump forward right after their own swipe
  const handleScrollBeginDrag = (): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleScrollEndDrag = (): void => {
    startAutoAdvance();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OnboardingSlide slide={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <Pagination total={onboardingSlides.length} activeIndex={activeIndex} />

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

        <View style={styles.signInRow}>
          <Text style={[theme.typography.body, { color: theme.subtitle }]}>
            {t('onboarding.alreadyRegistered')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[theme.typography.body, { color: theme.primary, fontWeight: '600' }]}>
              {t('onboarding.signIn')}
            </Text>
          </TouchableOpacity>
        </View>
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
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});