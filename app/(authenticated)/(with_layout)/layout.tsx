import Header from '@/app/_components/Header';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

type Props = React.PropsWithChildren & {};

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col h-full justify-between'>
      <Header leftComponent={<SearchButton />} />
      <main className='px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 mb-10'>
        {children}
      </main>
      <footer></footer>
    </div>
  );
}

function SearchButton() {
  return (
    <Link href='/search' className='inline-block align-middle group'>
      Search
      <BsArrowRightShort className='inline-block w-5 h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 duration-300' />
    </Link>
  );
}
