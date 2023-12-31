import Back from '@/app/_components/Back';
import ExternalLinks from '@/app/_components/ExternalLinks';
import get from '@/lib/api/get';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import type { ResultType } from '@/lib/types';
import type { TVDetails, Video } from '@/types';
import { Metadata } from 'next';
import Cast from '../../_sections/Cast';
import MovieDetails from '../../_sections/MovieDetails';
import Reviews from '../../_sections/Reviews';
import Stats from '../../_sections/Stats';

type Props = {
  params: { tvId: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { tvId } = props.params;
  const movie = await get<TVDetails>(`tv/${tvId}`);

  return {
    title: movie ? movie.original_name : 'TV series',
    description: movie
      ? `Details page for ${movie.original_name} TV series`
      : '',
  };
}

export const dynamicParams = true;

export default async function TVPage(props: Props) {
  const { tvId } = props.params;
  const tv = await get<TVDetails>(`tv/${tvId}`);
  const videos = (await get<ResultType<Video>>(`tv/${tvId}/videos`))?.results;

  if (!tv) {
    throw new Error('Sorry, unable to find details');
  }

  const imagePaths = {
    backdrop: generateImageUrlByFilename(tv.backdrop_path),
    poster: generateImageUrlByFilename(tv.poster_path),
  };

  const trailer = videos?.find((video) => video.type === 'Trailer');
  const creators = tv.created_by.map((person) => ({
    name: person.name,
    role: '',
  }));

  return (
    <>
      <aside>
        <Back classes='text-primary-100 absolute left-2 top-2' title='TVs' />
      </aside>

      <section className='space-y-10 mb-10'>
        <MovieDetails
          title={tv.original_name}
          posterPath={imagePaths.poster}
          backdropPath={imagePaths.backdrop}
          releaseDate={tv.first_air_date}
          trailerVideoKey={trailer?.key}
          tagline={tv.tagline}
          overview={tv.overview}
          creators={creators}
        />

        <div className='page-space-m'>
          <section className='flex flex-col md:flex-row gap-10 justify-between'>
            <section className='space-y-10 overflow-hidden order-last md:order-first'>
              <h2 className='text-xl font-bold'>Cast</h2>
              <Cast forPath={`tv/${tvId}/credits`} />
            </section>
            <aside className='order-first md:order-last'>
              <ExternalLinks path={`tv/${tvId}/external_ids`} />
            </aside>
          </section>

          <Stats
            status={tv.status}
            genres={tv.genres}
            popularity={tv.popularity}
            originalLanguage={tv.original_language}
          />

          <Reviews tvId={tvId} />
        </div>
      </section>
    </>
  );
}
