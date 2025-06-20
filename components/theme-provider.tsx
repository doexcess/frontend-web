// components/theme-provider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }: any) {
  return (
    <NextThemesProvider {...(props as any)}>{children}</NextThemesProvider>
  );
}
