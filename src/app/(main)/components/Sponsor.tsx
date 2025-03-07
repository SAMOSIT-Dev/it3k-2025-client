import Link from "next/link";
import Image from "next/image";


type SponsorProps = {
  name: string;
  logo: string;
  link?: string;
}[];

const sponsors: SponsorProps = [
  {
    name: 'kohkae',
    logo: '/images/sponsors/kohkae.png',
    link: 'https://www.kohkae.com/'
  },
  {
    name: 'jele',
    logo: '/images/sponsors/jele.png',
    link: 'https://jeledoubleice.com/'
  },
  {
    name: 'lactasoy',
    logo: '/images/sponsors/lactasoy.png',
    link: 'https://www.lactasoy.com/'
  }
]

const Sponsor = () => {
  const layoutSponsor = sponsors.length > 3 ? "grid grid-cols-3 place-items-center" : "flex";

  return (
    <div className="bg-gradient-to-b from-[#A00606] via-black-300 to-[#000000] text-white text-center p-4 font-Prompt mt-4">
      <h1 className="text-xl font-bold text-white">Sponsored by</h1>
      <div className="border-[0.5px] border-[#868686] w-[80%] mx-auto mt-5 mb-3"></div>
      <div className={`sm:flex ${layoutSponsor} justify-center mt-4 gap-3 sm:gap-6`}>
        {sponsors.map((sponsor, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href={sponsor.link || "#"}>
              <Image src={sponsor.logo} alt={sponsor.name} width={86} height={86} className="mb-2 rounded-full object-center"/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsor;
