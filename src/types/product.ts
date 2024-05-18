export interface Rating {
	rate: number;
	count: number;
}

interface CartItem extends Product {
	cartItemId: string;
}

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	cartItemId: string;
	rating: Rating;
}
