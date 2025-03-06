"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  const pathname = usePathname();


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
    else {
      router.push(`/#${id}`);
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <nav className={`${isScrolled ? "fixed" : "absolute"} top-0 left-0 w-full z-50 bg-[#111111] text-white shadow-md font-Prompt`}>
      <div className={isOpen ? 'border-none' : 'border-b-2 border-red-600'}>
        <div className="max-w-7xl mx-auto lg:px-8">
          <div className="flex justify-center items-center py-2 pt-3 lg:justify-between">
            <button onClick={toggleMenu} className="text-white absolute left-[40px] lg:hidden">
              {isOpen ? <IoMdClose size={25} /> : <HiOutlineBars3BottomLeft size={25} />}
            </button>
            <div>
              <Link href="/">
                <Image
                  src="/images/logoNav.svg"
                  alt="logoNav"
                  width={200}
                  height={80}
                  className="h-[5rem] w-auto"
                />
              </Link>
            </div>
            <div className="hidden lg:flex space-x-6">
              <Link href="/" onClick={(e) => scrollToSection(e, "Podium")}>
                <p className="border-2 border-white text-white px-6 py-1 rounded-sm opacity-70 hover:text-opacity-100 hover:opacity-100 hover:bg-white hover:bg-opacity-50 transition">
                  Rank</p>
              </Link>
              <Link href="/" onClick={(e) => scrollToSection(e, "match")}>
                <p className="border-2 border-white text-white px-6 py-1 rounded-sm opacity-70 hover:text-opacity-100 hover:opacity-100 hover:bg-white hover:bg-opacity-50 transition">
                  Match</p>
              </Link>
            </div>
          </div>

          {isOpen && (
            <div className="bg-[#111111] flex flex-col items-center pt-4 border-t-2 border-red-600">
              <Link href="/" onClick={(e) => scrollToSection(e, "Podium")} className="flex items-center justify-center gap-1 py-4 hover:bg-opacity-50 hover:bg-white w-screen">
                <Image src="/images/rankIcon.png" alt="rankIcon" width={15} height={15} />
                <p className="text-sm">Rank</p>
              </Link>
              <hr className="w-[85%] border-white" />
              <Link href="/" onClick={(e) => scrollToSection(e, "match")} className="flex items-center justify-center gap-2 py-4 hover:bg-opacity-50 hover:bg-white w-screen">
                <Image src="/images/matchIcon.png" alt="match" width={15} height={15} />
                <p className="text-sm">Match</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
