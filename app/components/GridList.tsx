type Props = React.PropsWithChildren & {};

export default function GridList({ children }: Props) {
  return (
    <ul className='grid gap-4 md:gap-10 lg:gap-14 xl:gap-16 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
      {children}
    </ul>
  );
}
