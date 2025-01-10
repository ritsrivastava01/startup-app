/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { auth } from '../../auth';
import { parseServerActionResponse } from './utils';
import slugify from 'slugify';

import { writeClient } from '@/sanity/lib/write-client';

export const createPitch = async (
  state: any,
  formData: FormData,
  pitch: string
) => {
  const session = await auth();

  const { title, description, category, link } = Object.fromEntries(
    Array.from(formData).filter(([key]) => key !== 'pitch')
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug
      },
      author: {
        _type: 'reference',
        _ref: session?.id
      },
      pitch
    };

    const result = await writeClient.create({ _type: 'startup', ...startup });
    return parseServerActionResponse({
      ...result,
      status: 'SUCCESS',
      error: ''
    });
  } catch (e) {
    console.log(e);
    return parseServerActionResponse({
      error: e,
      status: 'ERROR'
    });
  }
  if (!session) {
    return parseServerActionResponse({
      error: 'Not Signed in',
      status: 'ERROR'
    });
  }
};
