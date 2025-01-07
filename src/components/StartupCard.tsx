import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import React from 'react';

export type StartupCardType = {
  _createdAt: Date;
  views: number;
  author: { _id: number; name: string };
  description: string;
  image: string;
  category: string;
  title: string;
  _id: number;
};

export const StartupCard = ({
  _createdAt,
  views,

  description,
  category,
  image,
  title,
  _id
}: StartupCardType) => {
  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p>Created At: {formatDate(_createdAt.toString())}</p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className=''>{views}</span>
        </div>
      </div>
    </li>
  );
};
