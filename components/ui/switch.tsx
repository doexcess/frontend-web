'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Light mode colors
      'data-[state=unchecked]:bg-gray-300 data-[state=checked]:bg-primary',
      // Dark mode colors with better contrast
      'dark:data-[state=unchecked]:bg-gray-600 dark:data-[state=checked]:bg-primary',
      // Smooth transition
      'transition-colors duration-200 ease-in-out',
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform',
        // Thumb colors for both modes
        'bg-white dark:bg-gray-100',
        // Border for better visibility
        'border border-gray-200 dark:border-gray-400',
        // Smooth sliding animation
        'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        'transition-transform duration-200 ease-in-out'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
