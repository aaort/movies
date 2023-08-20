import Link from 'next/link';

export default async function NotFound() {
  return (
    <main className='grid place-items-center h-[100svh]'>
      <div className='flex flex-col items-center gap-10'>
        <h1 className='text-red-500'>Page does not exist</h1>
        <Link className='button text-xl' href='/general'>
          Home
        </Link>
      </div>
    </main>
  );
}
