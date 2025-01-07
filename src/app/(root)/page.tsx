import { SearchForm } from '@/components/SearchForm';
import { StartupCard } from '@/components/StartupCard';

const Home = async ({
  searchParams
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams)?.query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: 'John Doe' },
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      image:
        'https://images.unsplash.com/photo-1719937050446-a121748d4ba0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Technology',
      title: 'Startup 1',
      _id: 1
    }
  ];
  return (
    <>
      <section className='pink_container'>
        <div className='heading'>
          Pitch your startup <br /> connect with entrepreneurs
        </div>
        <p className='sub-heading @max-w-3xl'>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Startup by ${query}` : 'All Startups'}
        </p>
        <ul className='mt-7 card_grid'>
          {posts.length > 0 ? (
            posts.map((post) => (
              <StartupCard key={post._id} {...post}></StartupCard>
            ))
          ) : (
            <p className='no-results'>No Startup found</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default Home;
