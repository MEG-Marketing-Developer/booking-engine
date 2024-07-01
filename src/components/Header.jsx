
import React, { useEffect, useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

import logoImage from "../../public/images/mammut-logo.svg";


const Header = () => {
    const Links = [
        { name: "HOME", link: "/" },
        { name: "SERVICE", link: "/our-services" },
        { name: "ABOUT", link: "/about-us" },
        { name: "CONTACT", link: "/contact-us" },
    ];

    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    return (
        <header>
            <div className='header-top bg-[#031225] text-white flex justify-between py-4 md:px-20 px-7'>
                <div className='flex gap-3'>
                    <a className='flex items-center text-sm	' href="tel:+971222222222">
                        <PhoneIcon className='w-5' /> +971222222222
                    </a>
                    <a className='flex items-center text-sm	' href="mailto:email@email.com">
                        <EnvelopeIcon className='w-5' /> email@email.com
                    </a>
                </div>

            </div>
            <div className={`${scroll ? "fixed" : "relative"} w-full top-0 left-0 z-10`}>
                <div className='md:flex flex  items-center justify-between bg-white py-4 md:px-20 px-5'>
                    {/* logo section */}
                    <a href="/" className='cursor-pointer flex items-center gap-1'>
                        <img
                            src={logoImage}
                            alt="Mammut Logo"
                            width={248}
                            height={47}
                        />
                    </a>
                    {/* Menu icon */}
                    <div onClick={() => setOpen(!open)} className='cursor-pointer md:hidden w-7 h-7 z-20'>
                        {
                            open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                        }
                    </div>
                    {/* linke items */}
                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-10 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16' : 'top-[-490px]'}`}>
                        {
                            Links.map((link, index) => (
                                <li key={index} className='md:ml-8 md:my-0 my-7 font-bold text-2lx'>
                                    <a href={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</a>
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header