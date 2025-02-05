import { I18nManager, View } from 'react-native';
import { useEffect } from 'react';
import React = require('react');

// Force RTL layout
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export function RTLProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure RTL is enabled
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, []);

  return <View style={{ flex: 1, direction: 'rtl' }}>{children}</View>;
} 