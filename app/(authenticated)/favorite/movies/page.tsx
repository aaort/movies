import MovieItem from '@/app/components/MovieItem';
import getFavoriteMovies from '@/lib/getFavoriteMovies';

export default async function FavoriteMovies() {
  const movies = (await getFavoriteMovies()).results;

  return (
    <div className="grid gap-4 md:gap-10 lg:gap-14 xl:gap-16 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}
