import Header from '@/app/components/Header';

type Props = React.PropsWithChildren & {};

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col h-full justify-between'>
      <Header />
      <main className='px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 mb-10'>
        {children}
      </main>
      <footer></footer>
    </div>
  );
}
