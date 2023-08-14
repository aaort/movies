import get from '@/lib/api/get';
import Link from 'next/link';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsWikipedia,
} from 'react-icons/bs';
import { SiImdb } from 'react-icons/si';

type Axis = 'horizontal' | 'vertical';

type Props = {
  path: string;
  axis?: Axis;
};

export default async function ExternalLinks({
  path,
  axis = 'vertical',
}: Props) {
  const externalIds = await get<ExternalIds>(path);

  // Remove "id" itself
  const externalLinks = [];
  for (let [key, value] of Object.entries(externalIds ?? []).slice(1)) {
    externalLinks.push({
      [key.slice(0, key.lastIndexOf('_'))]: value,
    });
  }

  const links = getLinks(externalLinks);

  const flexDirection = `${
    axis === 'horizontal' ? 'md:flex-row' : 'md:flex-col'
  }`;

  return (
    <div className={`flex flex-row ${flexDirection} gap-10`}>
      {Object.keys(links).map((key) => (
        <Link
          key={links[key].url}
          href={`${links[key].url}`}
          target='_blank'
          className='[&>svg]:w-7 [&>svg]:h-7'
        >
          {links[key].icon}
        </Link>
      ))}
    </div>
  );
}

type ResultType = {
  [key: string]: {
    url: string;
    icon: React.ReactNode;
  };
};

const getLinks = (
  externalLinks: { [key: string]: string | number }[]
): ResultType => {
  //@ts-ignore
  return externalLinks.reduce((total, link) => {
    switch (Object.keys(link)[0]) {
      case 'imdb':
        return {
          ...total,
          imdb: {
            url: `https://www.imdb.com/title/${Object.values(link)[0]}/`,
            icon: <SiImdb />,
          },
        };
      case 'wikidata':
        return {
          ...total,
          wikidata: {
            url: `https://www.wikidata.org/wiki/${Object.values(link)[0]}`,
            icon: <BsWikipedia />,
          },
        };
      case 'facebook':
        return {
          ...total,
          facebook: {
            url: `https://www.facebook.com/${Object.values(link)[0]}/`,
            icon: <BsFacebook />,
          },
        };
      case 'instagram':
        return {
          ...total,
          instagram: {
            url: `https://www.instagram.com/${Object.values(link)[0]}/`,
            icon: <BsInstagram />,
          },
        };
      case 'twitter':
        return {
          ...total,
          twitter: {
            url: `https://twitter.com/${Object.values(link)[0]}/`,
            icon: <BsTwitter />,
          },
        };
      default:
        return total;
    }
  }, {});
};
