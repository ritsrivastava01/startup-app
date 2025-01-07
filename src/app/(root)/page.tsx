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
      description: 'Lorem ipsum dolor sit amet',
      image:
        'https://unsplash.com/photos/a-person-holding-a-camera-in-their-hands-aEXbfkTGoqM',
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
