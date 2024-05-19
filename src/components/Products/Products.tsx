'use client';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import { Product } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CgMenuGridR } from 'react-icons/cg';
import { TfiMenuAlt } from 'react-icons/tfi';
import Cart from '../Cart/Cart';

const Products = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	const [isGridLayout, setIsGridLayout] = useState(false);

	const handleGridLayout = () => setIsGridLayout(false);
	const handleRowLayout = () => setIsGridLayout(true);

	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 6;

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const addToCart = (product: Product) => {
		const newCartItem = { ...product, cartItemId: uuidv4() };
		const newCart = [...cart, newCartItem];
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};

	const removeFromCart = (cartItemId: string) => {
		const newCart = cart.filter((item) => item.cartItemId !== cartItemId);
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};


	useEffect(() => {
		const storedCart = JSON.parse(
			localStorage.getItem('cart') || '[]'
		) as Product[];
		setCart(storedCart);
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					'https://fakestoreapi.com/products'
				);
				setProducts(response.data);
				setLoading(false);
			} catch (error: any) {
				console.error('Error fetching data', error.message);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	return (
		<div className="py-[60px]">
			<div className="custom-container">
				<div className="w-[732px] sm:w-full pb-[48px]">
					<div className="flex justify-between items-center pb-7 sm:pb-6">
						<h3 className="capitalize">Our all products</h3>
						<div className="flex items-center gap-3">
							<CgMenuGridR onClick={handleGridLayout} className={`text-[30px] cursor-pointer ${isGridLayout ? 'text-black' : 'text-[#525CEB]'}`} />
							<TfiMenuAlt onClick={handleRowLayout} className={`text-[26px] cursor-pointer ${isGridLayout ? 'text-[#525CEB]' : 'text-black'}`} />
						</div>
					</div>
					<div className="relative">
						<input
							type="search"
							className="w-full border-[.5px] py-[7px] px-[10px] rounded-[50px] text-[16px] font-normal leading-[20.2px] pl-[40px] "
							placeholder="Search An Item"
						/>
						<Image
							className="absolute top-[28%] left-[2%]"
							src="assets/images/search-icon.svg"
							alt="search icon"
							width={14.25}
							height={14.25}
						/>
					</div>
				</div>

				<div className="flex gap-6">
					<div className="w-[732px] col-span-2">
						{loading ? (
							<div className='flex justify-center items-center'>
								<span className="loading loading-dots loading-lg text-[40px]"></span>
							</div>
						) : (
							isGridLayout ? (
								<div className="grid grid-cols-1 gap-3 w-full">
									{currentProducts.map((product) => (
										<div
											key={product.id}
											className="flex items-center border rounded-[5px] bg-[#F7F8F8]"
										>
											<Image
												src={product.image}
												alt={product.title}
												width={358}
												height={161}
												className="rounded-[5px] w-[358px] md:w-[324px] h-[159px] sm:w-[163px] sm:h-[175px]"
											/>
											<div className="px-4 sm:pl-4 sm:px-0 md:py-0 md:px-4 lg:px-4 flex-1">
												<h2 className="w-full text-sm font-bold overflow-hidden line-clamp-1 sm:line-clamp-2">
													{product.title}
												</h2>


												<div className="mt-4 sm:mt-0 md:mt-2">
													<span className="text-yellow-500 text-[20px]">
														{Array(
															Math.round(
																product.rating.rate
															)
														)
															.fill(0)
															.map((_, i) => (
																<span key={i}>
																	★
																</span>
															))}
													</span>
													<br />
													<span className="text-[14px] font-normal font-primary leading-[21px] text-[#ADB0B7]">
														({product.rating.count}{' '}
														Review)
													</span>

												</div>
												<div className="flex sm:flex-col justify-between items-center sm:items-start mt-4 sm:mt-0 md:mt-2 w-full">
													<div>
														<p className="text-[18px] font-bold leading-[27px] text-[#F2415A]">
															${product.price}
														</p>
													</div>
													<div>
														<button
															className="bg-primary text-white py-[6px] px-[10px] rounded hover:bg-blue-700 font-normal font-primary text-[16px] leading-[24px]"
															onClick={() =>
																addToCart(product)
															}
														>
															Add to Cart
														</button>
													</div>
												</div>
											</div>

										</div>
									))}
								</div>
							) : (
								<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3">
									{currentProducts.map((product) => (
										<div
											key={product.id}
											className="border rounded-[5px] bg-[#F7F8F8]"
										>
											<Image
												src={product.image}
												alt={product.title}
												width={200}
												height={200}
												className="rounded-[5px] w-full h-[180px]"
											/>
											<div className="p-4">
												<h2 className="text-sm font-bold overflow-hidden line-clamp-1 mb-2">
													{product.title}
												</h2>
												<p className="text-sm overflow-hidden line-clamp-2">
													{product.description}
												</p>

												<div className="mt-4">
													<span className="text-yellow-500 text-[16px]">
														{Array(
															Math.round(
																product.rating.rate
															)
														)
															.fill(0)
															.map((_, i) => (
																<span key={i}>
																	★
																</span>
															))}
													</span>
													<br />
													<span className="text-[14px] font-normal font-primary leading-[21px] text-[#ADB0B7]">
														({product.rating.count}{' '}
														Review)
													</span>
												</div>

												<div className="flex sm:flex-col justify-between items-center sm:items-start mt-4">
													<p className="text-[18px] sm:mb-4 font-bold leading-[27px] text-[#F2415A]">
														${product.price}
													</p>
													<button
														className="bg-primary text-white py-[6px] px-[10px] rounded hover:bg-blue-700 font-normal font-primary text-[16px] leading-[24px]"
														onClick={() =>
															addToCart(product)
														}
													>
														Add to Cart
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							)


						)}

						<div className="join flex justify-end sm:justify-center items-center !bg-transparent pt-[39.5px]">
							<button
								className="join-item py-[5px] px-[10px] mt-[4px]"
								onClick={() => paginate(1)}
							>
								<MdOutlineKeyboardDoubleArrowLeft />
							</button>
							<button
								className="join-item py-[5px] px-[12px] mt-[4px]"
								onClick={() => paginate(currentPage - 1)}
								disabled={currentPage === 1}
							>
								<RiArrowLeftSLine />
							</button>
							{Array.from(
								{
									length: Math.ceil(
										products.length / productsPerPage
									),
								},
								(_, i) => i + 1
							).map((pageNumber) => (
								<button
									key={pageNumber}
									className={`py-[5px] px-[12px] rounded-[4px] ${pageNumber === currentPage
										? 'bg-[#1C75CF] text-white  border-none'
										: ''
										}`}
									onClick={() => paginate(pageNumber)}
								>
									{pageNumber}
								</button>
							))}

							<button className="join-item py-[5px] px-[12px] mt-[4px]">
								<RiArrowRightSLine />
							</button>
							<button className="join-item py-[5px] px-[10px] mt-[4px]">
								<MdOutlineKeyboardDoubleArrowRight />
							</button>
						</div>
					</div>

					<div className="w-[444px] mt-[-60px] sm:hidden md:hidden lg:block">
						<Cart
							cart={cart}
							removeFromCart={removeFromCart}
							alignment="center"
						/>
					</div>
				</div>
			</div>
		</div >
	);
};

export default Products;
