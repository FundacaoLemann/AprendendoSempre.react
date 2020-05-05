import {useSafeArea} from 'react-native-safe-area-context';

function useBottomTabHeight() {
  const insets = useSafeArea();

  return insets.bottom + 50;
}

export default useBottomTabHeight;
