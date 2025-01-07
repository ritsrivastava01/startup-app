import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth, signIn, signOut } from '../../auth';

export const NavBar = async () => {
  const session = await auth();
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
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
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}>
                <button type='submit'>Sign Out</button>
              </form>

              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}>
                <button type='submit'>Logout</button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';

                await signIn('github');
              }}>
              <button type='submit'>Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
