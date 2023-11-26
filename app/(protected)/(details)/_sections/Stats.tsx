import { MovieDetails } from '@/types';

type Props = Partial<
  Pick<
    MovieDetails,
    'status' | 'genres' | 'popularity' | 'budget' | 'revenue'
  > & { originalLanguage: MovieDetails['original_language'] }
>;

export default function Stats(props: Props) {
  const { status, genres, budget, originalLanguage, revenue, popularity } =
    props;
  return (
    <section className='space-y-10'>
      <h2 className='mb-4 inline-block'>General information</h2>
      <dl className='flex flex-wrap gap-[10%] gap-y-1 justify-between'>
        {status && (
          <div className='space-y-2'>
            <dt>Status</dt>
            <dd className='text-primary-500 text-sm'>{status}</dd>
          </div>
        )}

        {originalLanguage && (
          <div className='space-y-2'>
            <dt>Original Language</dt>
            <dd className='text-primary-500 text-sm'>{originalLanguage}</dd>
          </div>
        )}

        {genres && (
          <div className='space-y-2'>
            <dt>Genres</dt>
            <dd className='text-primary-500 text-sm'>
              <ul className='space-y-2'>
                {genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}

        {popularity && (
          <div className='space-y-2'>
            <dt>Popularity</dt>
            <dd className='text-primary-500 text-sm'>{popularity}</dd>
          </div>
        )}

        {budget && (
          <div className='space-y-2'>
            <dt>Budget</dt>
            <dd className='text-primary-500 text-sm'>{budget}</dd>
          </div>
        )}

        {revenue && (
          <div className='space-y-2'>
            <dt>Revenue</dt>
            <dd className='text-primary-500 text-sm'>{revenue}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
