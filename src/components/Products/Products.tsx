'use client';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Product } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CgMenuGridR } from 'react-icons/cg';
import { TfiMenuAlt } from 'react-icons/tfi';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
import Cart from '../Cart/Cart';

const Products = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

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
		const newCartItem = { ...product, cartItemId: uuidv4() }
		const newCart = [...cart, newCartItem];
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};

	const removeFromCart = (cartItemId: string) => {
		const newCart = cart.filter((item) => item.cartItemId !== cartItemId);
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};

	const totalAmount = cart.reduce((total, product) => total + product.price, 0)

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
		setCart(storedCart)
	}, [])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					'https://fakestoreapi.com/products'
				);
				setProducts(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data', error.message);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);


	return (
		<div className="py-[60px]">
			<div className="custom-container">
				<div className="w-[700px] sm:w-full pb-[48px]">
					<div className="flex justify-between items-center pb-7 sm:pb-6">
						<h3 className="capitalize">Our all products</h3>
						<div className="flex items-center gap-3">
							<CgMenuGridR className="text-[30px]" />
							<TfiMenuAlt className="text-[26px]" />
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

				<div className='flex gap-6'>
					<div className="w-[732px]">
						{loading ? (
							<p>Loading Products...</p>
						) : (
							<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
								{currentProducts.map((product) => (
									<div
										key={product.id}
										className="border rounded-[8px] bg-[#F7F8F8]"
									>
										<Image
											src={product.image}
											alt={product.title}
											width={200}
											height={200}
											className="w-full h-48 "
										/>
										<div className="p-4">
											<h2 className="text-sm font-bold overflow-hidden line-clamp-1">
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

											<div className="flex justify-between align-items mt-4">
												<p className="text-[18px] font-bold leading-[27px] text-[#F2415A]">
													${product.price}
												</p>
												<button className="bg-primary text-white py-[6px] px-[10px] rounded hover:bg-blue-700 font-normal font-primary text-[16px] leading-[24px]" onClick={() => addToCart(product)}>
													Add to Cart
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}

						<div className="join flex justify-end !bg-transparent pt-[39.5px]">
							<button
								className="join-item btn"
								onClick={() => paginate(1)}
							>
								«
							</button>
							<button
								className="join-item btn"
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
									className={`join-item btn ${pageNumber === currentPage
										? 'bg-blue-500 text-white border-none'
										: ''
										}`}
									onClick={() => paginate(pageNumber)}
								>
									{pageNumber}
								</button>
							))}

							<button className="join-item btn">
								<RiArrowRightSLine />
							</button>
							<button className="join-item btn">»</button>
						</div>
					</div>

					{/* <Cart /> */}

					<div className='w-[444px] block sm:hidden md:hidden'>
						<div className="cart-container border rounded px-2 py-3">
							<p className="text-[12px] font-primary font-bold leading-[20px] tracking-[2px] w-full bg-[#212529] uppercase text-white py-[10px] rounded-[5px] text-center">Selected Products</p>
							<div className="flex flex-col space-y-2">
								{cart.map((item) => (
									<div key={item.id} className="flex items-center border rounded bg-[#F7F8F8] h-[161px]">
										<div className='w-[163px] h-[159px] overflow-hidden'>
											<Image
												src={item.image}
												alt={item.title}
												width={200}
												height={159}
												className="rounded w-full h-full"
											/>
										</div>
										<div className="flex-grow pl-4 pr-8 py-[10px]">
											<h3 className="text-[16px] font-primary leading-[24px] font-normal pb-4">{item.title}</h3>
											<div className="text-yellow-500">
												{Array(Math.round(item.rating.rate)).fill(0).map((_, i) => (
													<span key={i}>★</span>
												))}
											</div>
											<p className="text-xs text-gray-500 pb-[9px]">({item.rating.count} Review)</p>
											<p className="text-[18px] font-bold leading-[27xp] font-primary text-red-500">${item.price.toFixed(2)}</p>
										</div>
										<button
											className="text-red-500 hover:text-red-700 pr-2"
											onClick={() => removeFromCart(item.cartItemId)}
										>
											<FaTrashAlt />
										</button>
									</div>
								))}
							</div>
							<div className="mt-4">
								<p className="text-lg font-semibold text-end">Total: ${totalAmount.toFixed(2)}</p>
								<div className="mt-2">
									<label className="inline-flex items-center">
										<input type="checkbox" className="form-checkbox" />
										<span className="ml-[40px] text-[12px] font-normal font-primary leading-[20px] tracking-[2px] ">
											I've read and agree to the{' '}
											<a href="#" className=" underline">
												terms and conditions
											</a>
											,{' '}
											<a href="#" className=" underline">
												refund policy
											</a>{' '}
											&{' '}
											<a href="#" className=" underline">
												privacy policy
											</a>
										</span>
									</label>
								</div>
								<div className='flex justify-end'>
									<button className="mt-6 bg-[#212529] text-white p-[10px] rounded-[5px] hover:bg-gray-800 text-[12px] font-primary font-bold leading-[20px] tracking-[2px] uppercase">
										Checkout
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
