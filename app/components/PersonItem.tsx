import Image from 'next/image';

type Props = {
  person: Person;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default function PersonItem({ person }: Props) {
  return (
    <div className="flex group flex-col gap-4 bg-slate-300 text-slate-900 rounded-md overflow-clip cursor-pointer">
      <div className="relative w-full aspect-[1/1.3]">
        <Image
          fill
          alt=""
          src={`${imagesBaseUrl}${person.profile_path}`}
          sizes="(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)"
          className="object-fill group-hover:scale-105 duration-200"
        />
      </div>
      <div className="mx-4 mb-4">
        <p>{person.name}</p>
        <p>{person.known_for_department}</p>
      </div>
    </div>
  );
}
