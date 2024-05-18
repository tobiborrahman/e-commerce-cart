// import Image from 'next/image';
// import React from 'react';

// const Navbar = () => {
// 	return (
// 		<header className="bg-[#212529] h-[78.96px]">
// 			<div className="custom-container">
// 				<div className="navbar text-white">
// 					<div className="navbar-start">
// 						<Image
// 							src="assets/images/logo.svg"
// 							alt="logo image"
// 							width={185}
// 							height={50.96}
// 						/>
// 					</div>
// 					<nav className="navbar-center md:flex">
// 						<ul className="menu menu-horizontal px-1">

// 							<li>
// 								<a href='/products' className="nav-link-products font-primary font-bold text-[12px] leading-[20px] tracking-[2px] text-[#f9f9f9] uppercase">
// 									Products
// 								</a>
// 							</li>

// 							<li>
// 								<a href='/cart' className="nav-link-cart font-primary font-bold text-[12px] leading-[20px] tracking-[2px] text-[#f9f9f9] uppercase ">
// 									Cart
// 								</a>
// 							</li>
// 						</ul>
// 					</nav>
// 					<div className="navbar-end">
// 						<a className="button-primary">login</a>
// 					</div>
// 				</div>
// 			</div>
// 		</header>
// 	);
// };

// export default Navbar;

'use client';
import Image from 'next/image';
import { useState } from 'react';

import { RiCloseFill, RiMenu4Fill } from "react-icons/ri";


const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className="shadow-[rgba(0,0,15,0.5)_0px_4px_40px_0px] bg-[#212529]">
			<div className="custom-container">
				<nav className="flex justify-between items-center h-[78.96px]">
					<div>
						<Image
							src="/assets/images/logo.svg"
							alt="logo image"
							width={185}
							height={50.96}
						/>
					</div>

					{/* Desktop Navigation Links */}
					<div className="sm:hidden md:hidden flex items-center gap-[52px]">
						<ul className={`flex items-center gap-[42px]`}>
							<li>
								<a href='/products' className="nav-link-item font-primary font-bold text-[12px] leading-[20px] tracking-[2px] text-[#f9f9f9] uppercase">
									Products
								</a>
							</li>
							<li>
								<a href='/cart' className="nav-link-item font-primary font-bold text-[12px] leading-[20px] tracking-[2px] text-[#f9f9f9] uppercase ">
									Cart
								</a>
							</li>
						</ul>
					</div>

					<div className='sm:hidden md:hidden'>
						<button className='button-primary'>Login</button>
					</div>

					{/* Mobile Navigation Menu */}
					{isOpen && (
						<div
							className={`absolute top-0 left-0 w-full bg-black shadow-md py-10 duration-1000 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-x-full'
								}`}
						>
							<ul className={`flex flex-col items-center gap-4`}>
								<li>
									<a href='/products' className="nav-link-products font-primary font-bold text-[12px] leading-[20px] tracking-[2px] text-[#f9f9f9] uppercase">
										Products
									</a>
								</li>

								<li>
									<a href='/cart' className="nav-link-cart font-primary font-bold text-[12px] leading-[20px] tracking-[2px] text-[#f9f9f9] uppercase ">
										Cart
									</a>
								</li>
								<li>
									<button className='button-primary'>Login</button>
								</li>
							</ul>
						</div>
					)}

					{/* Mobile Hamburger Menu Button */}
					<div className="hidden sm:block md:block z-[9999]">
						<button onClick={toggleMenu}>
							{isOpen ? (
								<RiCloseFill className='text-white text-[35px]' />

							) : (
								<RiMenu4Fill className='text-white text-[35px]' />
							)}
						</button>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
