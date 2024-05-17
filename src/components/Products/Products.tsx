import Image from 'next/image';

import { CgMenuGridR } from 'react-icons/cg';
import { TfiMenuAlt } from 'react-icons/tfi';

const Products = () => {
	return (
		<div>
			<div className="custom-container">
				<div className="w-[732px] py-[60px]">
					<div className="flex justify-between items-center pb-7">
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
			</div>
		</div>
	);
};

export default Products;
