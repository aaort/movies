import getTrendingMovies from '@/lib/getTrendingMovies';

export default async function Home() {
  const data = await getTrendingMovies();

  return (
    <main>
      {data.results.map((movie) => (
        <p key={movie.title}>{movie.title}</p>
      ))}
    </main>
  );
}
