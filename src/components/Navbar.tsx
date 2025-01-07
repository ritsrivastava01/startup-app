import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth, signIn, signOut } from '../../auth';

export const NavBar = async () => {
  const session = await auth();
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-wonk-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo.png' alt='Logo' width={144} height={30} />
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {session?.user ? (
            <>
              <Link href={'/startup/create'}>
                <span className='mr-5'>Create</span>
              </Link>
              <button
                onClick={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}>
                Sign Out
              </button>
              <Link href={`/user/${session?.user?.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={async () => {
                'use server';
                await signIn();
              }}>
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
