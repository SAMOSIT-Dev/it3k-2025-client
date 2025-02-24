import Link from "next/link";


type SponsorProps = {
  name?: string;
  logo: string;
  link?: string;
}[];

const sponsors: SponsorProps = [
  { name: 'Sponsor 1', logo: 'images/KMITL_logo.png',link: '/'},
  { name: 'Sponsor 2', logo: 'images/KMUTNB_logo.png' ,link: '/'},
  { name: 'Sponsor 3', logo: 'images/KMUTT_logo.png' ,link: '/'},
  { name: 'Sponsor 4', logo: 'images/KMUTT_logo.png' ,link: '/'},
  { name: 'Sponsor 5', logo: 'images/KMUTT_logo.png' ,link: '/'},
  { name: 'Sponsor 6', logo: 'images/KMUTT_logo.png' },
];

const Sponsor = () => {
  return (
    <div className="bg-gradient-to-b from-[#A00606] via-black-300 to-[#000000] text-white text-center p-4 font-Prompt">
      <h1 className="text-xl font-bold">Sponsored by</h1>
      <div className="border-[0.5px] border-[#868686] w-[80%] mx-auto mt-5 mb-3"></div>
      <div className="sm:flex grid grid-cols-3 sm:justify-center mt-4 gap-3 sm:gap-6">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href={sponsor.link || "#"}>
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
