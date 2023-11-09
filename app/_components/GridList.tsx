type Props = React.PropsWithChildren & {};

export default function GridList({ children }: Props) {
  return (
    <ul className='grid gap-12 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
      {children}
    </ul>
  );
}
