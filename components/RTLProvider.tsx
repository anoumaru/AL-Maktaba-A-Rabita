import { I18nManager, View } from 'react-native';
import { useEffect } from 'react';

// Force RTL layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export function RTLProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure RTL is enabled
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, []);

  return <View style={{ flex: 1, direction: 'rtl' }}>{children}</View>;
} 