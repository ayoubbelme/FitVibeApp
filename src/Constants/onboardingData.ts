import { ImageSourcePropType } from 'react-native';

export type OnboardingSlideData = {
  id: string;
  image: ImageSourcePropType;
  titleKey: string;
  subtitleKey: string;
};

export const onboardingSlides: OnboardingSlideData[] = [
  {
    id: '1',
    image: require('../Assets/Images/onboarding-1.jpg'),
    titleKey: 'onboarding.slide1.title',
    subtitleKey: 'onboarding.slide1.subtitle',
  },
  {
    id: '2',
    image: require('../Assets/Images/onboarding-2.jpg'),
    titleKey: 'onboarding.slide2.title',
    subtitleKey: 'onboarding.slide2.subtitle',
  },
  {
    id: '3',
    image: require('../Assets/Images/onboarding-3.jpg'),
    titleKey: 'onboarding.slide3.title',
    subtitleKey: 'onboarding.slide3.subtitle',
  },
];