import Header from '@/app/_components/Header';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

type Props = React.PropsWithChildren & {};

export default function Layout({ children }: Props) {
  return (
    <div className='relative overflow-x-hidden flex flex-col h-full justify-between'>
      <Header leftComponent={<SearchButton />} />
      <main className='page-space-m'>{children}</main>
      <footer></footer>
    </div>
  );
}

function SearchButton() {
  return (
    <Link href='/search' className='inline-block group text-xl'>
      Search
      <BsArrowRightShort className='inline-block w-6 h-6 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 duration-300' />
    </Link>
  );
}
