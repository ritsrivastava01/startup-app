import React from 'react';
import Form from 'next/form';
import { SearchFormRest } from './SearchFormRest';
import { Search } from 'lucide-react';

export const SearchForm = async ({ query }: { query?: string }) => {
  return (
    <Form action='/' scroll={false} className='search-form'>
      <input
        type='text'
        name='query'
        className='search-input'
        placeholder='Search Startup'
      />
      <div className='flex gap-2'>
        {query && <SearchFormRest />}

        <button className='search-btn  text-white'>
          <Search className='size-5' />
        </button>
      </div>
    </Form>
  );
};
