"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#111111] text-white shadow-md font-Prompt">
      <div className={isOpen ? 'border-none' : 'border-b-2 border-red-600'}>
        <div className="max-w-7xl mx-auto lg:px-8">
          <div className="flex justify-center items-center py-2 pt-3 lg:justify-between">
            <button onClick={toggleMenu} className="text-white absolute left-[40px] lg:hidden">
              {isOpen ? <IoMdClose size={25} /> : <HiOutlineBars3BottomLeft size={25} />}
            </button>
            <div>
              <Link href="/">
                <img src="/images/logoNav.svg" alt="logoNav" className="h-[5rem]" />
              </Link>
            </div>
            <div className="hidden lg:flex space-x-6">
              <Link href="/">
                <p className="border-2 border-white text-white px-6 py-1 rounded-sm opacity-70 hover:text-opacity-100 hover:opacity-100 hover:bg-white hover:bg-opacity-50 transition">
                  Rank</p>
              </Link>
              <Link href="/">
                <p className="border-2 border-white text-white px-6 py-1 rounded-sm opacity-70 hover:text-opacity-100 hover:opacity-100 hover:bg-white hover:bg-opacity-50 transition">
                  Match</p>
              </Link>
            </div>
          </div>

          {isOpen && (
            <div className="bg-[#111111] flex flex-col items-center pt-4 border-t-2 border-red-600">
              <Link href="/" className="flex items-center justify-center gap-1 py-4 hover:bg-opacity-50 hover:bg-white w-screen">
                <img src="/images/rankIcon.png" alt="rankIcon" width={15} height={15} />
                <p className="text-sm">Rank</p>
              </Link>
              <hr className="w-[85%] border-white" />
              <Link href="/" className="flex items-center justify-center gap-2 py-4 hover:bg-opacity-50 hover:bg-white w-screen">
                <img src="/images/matchIcon.png" alt="match" width={15} height={15} />
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
