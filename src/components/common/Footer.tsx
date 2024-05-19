import Image from 'next/image';
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="py-[80px] md:py-[60px] md:px-[40px] sm:px-4 bg-[#212529] text-[#F9F9F9]">
			<div className="custom-container">
				<div className="flex justify-between sm:flex-wrap md:flex-wrap md:gap-12 sm:gap-12">
					<aside className='w-[210px]'>
						<Image
							src="assets/images/logo.svg"
							alt="footer logo"
							width={185}
							height={50.96}
							className='mb-4'
						/>
						<p className="text-[#F9F9F9] text-[16px] font-normal font-primary leading-[24px] mb-4">
							Got Question? Call us 24/7
						</p>
						<h6 className="text-[#F9F9F9] text-[18px] font-bold font-primary leading-[27px] mb-4">+02 055 4156 </h6>
						<p className="text-[#F9F9F9] text-[16px] font-normal font-primary leading-[24px] mb-4">
							Register now & get you 10% offer from first order!
						</p>
						<h6 className="text-[#F9F9F9] text-[20px] font-medium leading-[18px]">Join US</h6>

						<div className='flex justify-between items-center mt-4'>
							<FaFacebookF className='text-[23px] text-[#F9F9F9]' />
							<FaTwitter className='text-[23px] text-[#F9F9F9]' />
							<FaLinkedinIn className='text-[23px] text-[#F9F9F9]' />
							<FaInstagram className='text-[23px] text-[#F9F9F9]' />
						</div>
					</aside>
					<nav className='capitalize'>
						<h6 className="text-[#F9F9F9] text-[20px] font-bold leading-[30px] font-primary mb-6">Company</h6>
						<li className="link link-hover text-[16px] font-normal leading-[24px] font-primary text-[#F9F9F9]">About Us</li>
						<li className="link link-hover">Career</li>
						<li className="link link-hover">Contact Us</li>
						<li className="link link-hover">Start Selling</li>
						<li className="link link-hover">Order History</li>
					</nav>
					<nav className='capitalize'>
						<h6 className="text-[#F9F9F9] text-[20px] font-bold leading-[30px] font-primary mb-6">My Account</h6>
						<li className="link link-hover">track my order</li>
						<li className="link link-hover">view cart</li>
						<li className="link link-hover">sign in</li>
						<li className="link link-hover">help</li>
						<li className="link link-hover">wishlist</li>
					</nav>
					<nav className='capitalize'>
						<h6 className="text-[#F9F9F9] text-[20px] font-bold leading-[30px] font-primary mb-6">Customer Service</h6>
						<li className="link link-hover">payment method</li>
						<li className="link link-hover">money return policy</li>
						<li className="link link-hover">product return</li>
						<li className="link link-hover">contact seller</li>
						<li className="link link-hover">terms &  conditions</li>
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
