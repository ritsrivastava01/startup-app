import React from 'react';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

const StartupSkeleton = () => {
  return [0, 1, 2, 3, 4].map((_, index) => (
    <li key={cn('skeleton', index)}>
      <Skeleton className='startup-card_skeleton' />
    </li>
  ));
};

export default StartupSkeleton;
