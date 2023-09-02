import Footer from '../_components/Footer';

type Props = React.PropsWithChildren & {};

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
