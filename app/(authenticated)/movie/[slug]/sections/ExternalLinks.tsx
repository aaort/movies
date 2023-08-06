import getExternalIds from '@/lib/api/getExternalIds';
import Link from 'next/link';

type Props = {
  movieId: string | number;
};

export default async function ExternalLinks({ movieId }: Props) {
  const externalIds = await getExternalIds(movieId);

  // Remove "id" itself
  const externalLinks = [];
  for (let [key, value] of Object.entries(externalIds).slice(1)) {
    externalLinks.push({
      [key.slice(0, key.lastIndexOf('_'))]: value,
    });
  }

  const links = getLinks(externalLinks);

  return (
    <div className='flex flex-col gap-2'>
      {Object.entries(links).map((entry) => (
        <Link key={entry['0']} href={`${entry['1']}`} target='_blank'>
          {entry['0']}
        </Link>
      ))}
    </div>
  );
}

const getLinks = (externalLinks: { [key: string]: string | number }[]) => {
  return externalLinks.reduce((total, link) => {
    switch (Object.keys(link)[0]) {
      case 'imdb':
        return {
          ...total,
          imdb: `https://www.imdb.com/title/${Object.values(link)[0]}/`,
        };
      case 'wikidata':
        return {
          ...total,
          wikidata: `https://www.wikidata.org/wiki/${Object.values(link)[0]}`,
        };
      case 'facebook':
        return {
          ...total,
          facebook: `https://www.facebook.com/${Object.values(link)[0]}/`,
        };
      case 'instagram':
        return {
          ...total,
          instagram: `https://www.instagram.com/${Object.values(link)[0]}/`,
        };
      case 'twitter':
        return {
          ...total,
          twitter: `https://twitter.com/${Object.values(link)[0]}/`,
        };
      default:
        return total;
    }
  }, {});
};
