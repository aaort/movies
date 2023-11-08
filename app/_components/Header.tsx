import Drawer from './Drawer';
import Navbar from './Navbar';

type Props = {
  leftComponent?: React.ReactNode;
};

export default async function Header({ leftComponent }: Props) {
  const classes = `hidden lg:flex gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 items-center`;

  return (
    <header className='flex justify-between gap-4 items-center horizontal-p py-8 bg-primary-100'>
      {leftComponent}
      <nav>
        <div className='block lg:hidden'>
          <Drawer>
            <Navbar className='relative w-[30%] min-w-[200px] right-0 h-full bg-primary-100 flex flex-col gap-8 z-[100] px-10 py-4 items-start' />
          </Drawer>
        </div>
        <Navbar className={classes} />
      </nav>
    </header>
  );
}
