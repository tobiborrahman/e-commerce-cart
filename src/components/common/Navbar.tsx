import Image from 'next/image';
import React from 'react';

const Navbar = () => {
	return (
		<header className="bg-[#212529] h-[78.96px]">
			<div className="custom-container">
				<div className="navbar text-white">
					<div className="navbar-start">
						<Image
							src="assets/images/logo.svg"
							alt="logo image"
							width={185}
							height={50.96}
						/>
					</div>
					<nav className="navbar-center md:flex">
						<ul className="menu menu-horizontal px-1">
							<li>
								<a className="nav-link-products font-primary font-bold text-[12px] leading-[20px] tracking-[2px] text-[#f9f9f9] uppercase">
									Products
								</a>
							</li>
							<li>
								<a className="nav-link-cart font-primary font-bold text-[12px] leading-[20px] tracking-[2px] text-[#f9f9f9] uppercase ">
									Cart
								</a>
							</li>
						</ul>
					</nav>
					<div className="navbar-end">
						<a className="button-primary">login</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
