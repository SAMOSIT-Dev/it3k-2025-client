import Link from "next/link";


type SponsorProps = {
  name?: string;
  logo: string;
}[];

const sponsors: SponsorProps = [
  { name: 'Sponsor 1', logo: 'images/KMITL_logo.png' },
  { name: 'Sponsor 2', logo: 'images/KMUTNB_logo.png' },
  { name: 'Sponsor 3', logo: 'images/KMUTT_logo.png' },
  { name: 'Sponsor 3', logo: 'images/KMUTT_logo.png' },
  { name: 'Sponsor 3', logo: 'images/KMUTT_logo.png' },
  { name: 'Sponsor 3', logo: 'images/KMUTT_logo.png' },
];

const Sponsor = () => {
  return (
<div className="bg-gradient-to-b from-[#A00606] via-black-300 to-[#000000] text-white text-center p-4">
<h1 className="text-xl font-medium">Sponsored by</h1>
<div className="border-[0.5px] border-[#868686] w-[80%] mx-auto mt-5 mb-3"></div>
      <div className="sm:flex grid grid-cols-3 sm:justify-center mt-4 gap-2 sm:gap-4">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href="/">
            <img src={sponsor.logo} alt={sponsor.name} className="mb-2 rounded-full w-16 h-16" />
            </Link>
            <span>{sponsor.name || ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsor;
