/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import { StartupCard } from './StartupCard';

export const UserStartups = async ({ id }: { id: string }) => {
  const startUps = await client.fetch(STARTUP_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startUps.length > 0 ? (
        startUps.map((startup: any) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className='no-results'>No Startup found</p>
      )}
    </>
  );
};
