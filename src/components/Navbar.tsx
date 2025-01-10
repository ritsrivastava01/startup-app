import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth, signIn, signOut } from '../../auth';
import { BadgePlus, LogOut, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

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
                <span className='mr-5 hidden md:block'>Create</span>
                <BadgePlus className='size-6 md:hidden' />
              </Link>
              <form
                className='mt-1'
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}>
                <button type='submit'>
                  <span className='hidden md:block'>Sign Out</span>
                  <LogOut className='size-6 md:hidden text-red-500' />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className='size-10'>
                  <AvatarImage
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || ''}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
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
