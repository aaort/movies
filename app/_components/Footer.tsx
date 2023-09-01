import Link from 'next/link';
import { AiOutlineLinkedin, AiFillGithub } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className='bg-primary-700 horizontal-p py-10 text-primary-100 [&_a]:text-primary-100 [&_a]:underline'>
      <div className='flex justify-between items-center text-sm'>
        <span>© {new Date().getFullYear()} Artashes Sanoyan</span>
        <span>
          Maintained by{' '}
          <Link
            href='https://github.com/aaort'
            className='hover:text-primary-100/40'
          >
            aaort
          </Link>
        </span>
        <div className='flex gap-4 [&_svg]:h-6 [&_svg]:w-6'>
          <Link
            href='https://www.linkedin.com/in/artashes-sanoyan-b0a168258/'
            className='hover:text-primary-100/40'
          >
            <AiOutlineLinkedin className='text-lg' />
          </Link>
          <Link
            href='https://github.com/aaort'
            className='hover:text-primary-100/40'
          >
            <AiFillGithub className='text-lg' />
          </Link>
        </div>
      </div>
    </footer>
  );
}
