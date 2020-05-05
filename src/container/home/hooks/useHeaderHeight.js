import {useSafeArea} from 'react-native-safe-area-context';

function useHeaderHeight() {
  const insets = useSafeArea();
  const height = 240;

  return insets.top + height;
}

export default useHeaderHeight;
