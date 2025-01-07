/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

export type StartupCardType = {
  _createdAt: string;
  views: number;
  author: { _id: number; name: string };
  description: string;
  image: string;
  category: string;
  title: string;
};

export const StartupCard = ({
  _createdAt,
  views,
  author: { _id: authorId, name },
  description,
  category,
  image,
  title,
  _id
}: StartupCardType) => {
  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p>Created At: {formatDate(_createdAt)}</p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${authorId}`}>
            <p className='text-16-medium line-clamp-1'>{name}</p>
          </Link>
          <Link href={`startup/${_id}`}>
            <h3 className='text-26-semibold line-clamp-2'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            src='https://placehold.co/48x48'
            alt='place holder'
            height={48}
            width={48}
            className='rounded-full'
          />
        </Link>
      </div>
      <Link href={`startup/${_id}`}>
        <p className='startup-card_docs'>{description}</p>
        <img src={image} alt='startup image' className='startup-card_img' />
      </Link>

      <div className='flex-between gap-4 mt-3'>
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
