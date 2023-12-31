import Back from '@/app/_components/Back';
import ExternalLinks from '@/app/_components/ExternalLinks';
import get from '@/lib/api/get';
import { API_KEY } from '@/lib/constants';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import type {
  ExtendedMovieDetails,
  MovieDetails as MovieDetailsType,
} from '@/types';
import { Metadata } from 'next';
import Cast from '../../_sections/Cast';
import MovieDetails from '../../_sections/MovieDetails';
import Reviews from '../../_sections/Reviews';
import Stats from '../../_sections/Stats';

type Props = {
  params: { movieId: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { movieId } = props.params;
  const movie = await get<MovieDetailsType>(`movie/${movieId}`);

  return {
    title: movie ? movie.title : 'Movie',
    description: movie && `Details page for ${movie.title} movie`,
  };
}

export const dynamicParams = true;

export default async function MoviePage(props: Props) {
  const { movieId } = props.params;
  const movie = await get<ExtendedMovieDetails>(
    `movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
  );

  if (!movie) {
    throw new Error('Sorry, unable to find requested data');
  }

  const videos = movie?.videos.results;
  const crew = movie?.credits.crew;

  const imagePaths = {
    backdrop: generateImageUrlByFilename(movie.backdrop_path),
    poster: generateImageUrlByFilename(movie.poster_path),
  };

  const trailer = videos?.find((video) => video.type === 'Trailer');

  const creators = crew
    .filter((person) => /^(Director|Screenplay)$/.test(person.job))
    .map((person) => ({
      name: person.name,
      role: person.job,
    }));

  return (
    <>
      <aside>
        <Back classes='text-primary-100 absolute left-2 top-2 z-50' />
      </aside>

      <main className='space-y-10 mb-10'>
        <MovieDetails
          creators={creators}
          title={movie.title}
          tagline={movie.tagline}
          overview={movie.overview}
          posterPath={imagePaths.poster}
          trailerVideoKey={trailer?.key}
          releaseDate={movie.release_date}
          backdropPath={imagePaths.backdrop}
        />

        <div className='horizontal-m space-y-10 [&_h2]:text-xl [&_h2]:font-bold'>
          <section className='flex flex-col md:flex-row gap-10 justify-between'>
            <div className='space-y-10 overflow-hidden order-last md:order-first'>
              <h2>Cast</h2>
              <Cast forPath={`movie/${movieId}/credits`} />
            </div>
          </section>

          <Stats
            status={movie.status}
            budget={movie.budget}
            genres={movie.genres}
            revenue={movie.budget}
            popularity={movie.popularity}
            originalLanguage={movie.original_language}
          />

          <Reviews movieId={movieId} />

          <section className='space-y-4'>
            <h2>External links</h2>

            <ExternalLinks
              path={`movie/${movieId}/external_ids`}
              axis='horizontal'
            />
          </section>
        </div>
      </main>
    </>
  );
}
