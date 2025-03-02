import Image from "next/image";

const HeroMain = () => {
    const props = {
        title: 'โครงการกีฬาสานสัมพันธ์ไอทีสามพระจอมครั้งที่ 19',
        description: 'At King Mongkut\'s University of Technology Thonburi',
        bg: '/images/HeroMainBg.svg',
        logo1: '/images/logoHero.svg',
        logo2: '/images/logoTextHero.svg'
    }

    return (
        <div className="h-[700px] sm:h-[900px] w-full bg-black font-Prompt">
            <div
                className="h-[700px] sm:h-[900px] w-full flex flex-col justify-center items-center relative bg-[#000000]"
            >
                <div className="absolute inset-0 opacity-90 z-0 bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${props.bg})`, backgroundPosition: "50% 0%" }}
                />

                <div className="relative z-10 flex flex-col justify-center items-center mb-28">
                    <div className="relative mb-[6rem] sm:mb-[7rem] flex justify-center items-center">
                        <Image
                            src={props.logo1}
                            alt="logoNav"
                            width={1920}
                            height={320}
                            className="w-full h-[200px] md:h-[260px] lg:h-[320px]"
                            priority
                        />

                        <Image
                            src={props.logo2}
                            alt="logoNav"
                            width={1920}
                            height={320}
                            className="absolute w-full h-[60%] top-[11rem] md:top-[15rem] lg:top-[17rem]"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center text-center px-4">
                        <h1 className="text-[#C3C3C3] font-bold text-sm sm:textxl md:text-2xl lg:text-3xl mb-4">{props.title}</h1>
                        <p className="font-bold text-sm sm:textxl md:text-2xl lg:text-3xl text-[#9B0303]">{props.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HeroMain;
