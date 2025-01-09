import { StartupCardType } from '@/components/StartupCard';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/View';

export const experimental_ppr = true;
const md = new markdownit();
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;
  const post = await client.fetch<StartupCardType | null>(STARTUP_BY_ID_QUERY, {
    id
  });

  if (!post) return notFound();

  const parsedMarkdown = md.render(post?.pitch ?? '');
  console.log(post.title);

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post._createdAt)}</p>

        <h1 className='heading'>{post.title} </h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
      </section>
      <section className='section_container'>
        <img
          src={post.image}
          alt='post image'
          className='w-full h-auto rounded-lg'
        />
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link
              href={`/user/${post.author?._id}`}
              className='flex gap-2 items-center mb-3'>
              {post.author?.image && (
                <Image
                  src={post.author?.image}
                  alt='author image'
                  width={64}
                  height={64}
                  className='rounded-full drop-shadow-lg '
                />
              )}
              <div>
                <p className='text-20-medium'>{post.author?.name}</p>
                <p className='text-16-medium'>@{post.author?.userName}</p>
              </div>
            </Link>
            <p className='category-tag'>{post.category}</p>
          </div>
          <h3 className='text-30-bold'>Pitch Details</h3>
          {parsedMarkdown ? (
            <article
              className='prose max-w-4xl font-work-sans break-all'
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}></article>
          ) : (
            <p className='no-result'>No details provided</p>
          )}
        </div>
        <hr className='divider' />

        <Suspense fallback={<Skeleton className='view-skeleton'></Skeleton>}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};
export default Page;
