import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width <= 1024;
  const isDesktop = width > 1024;

  const getColumns = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 5;
  };

  return { isMobile, isTablet, isDesktop, columns: getColumns(), width };
};