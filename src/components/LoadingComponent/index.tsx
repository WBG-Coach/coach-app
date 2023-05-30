import React from 'react';
import animationData from './data';
import LottieView from 'lottie-react-native';

const LoadingComponent = () => {
  return <LottieView autoPlay loop autoSize source={animationData} />;
};

export default LoadingComponent;
