import Footer from '../_sections/Footer';

type Props = React.PropsWithChildren & {};

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col h-full min-h-[100svh]'>
      {children}
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  );
}
