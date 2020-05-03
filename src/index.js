const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	let searchProducts = productsList.filter((item) => {
		return ids.includes(item.id)
	})
	let newProducts = [];
	for(let searchProduct of searchProducts){
		newProducts.push({ name: searchProduct.name, category: searchProduct.category })
	}

	let promotion = searchProducts.map((item) => item.category );
	verifyPromotion = () => {
		switch ([...new Set(promotion)].length) {
			case 1: return promotions[0];
			case 2: return promotions[1];
			case 3: return promotions[2];
			case 4: return promotions[3];
		}
	}
	promotion = verifyPromotion();
	
	let totalPrice = 0
	let firstTotal = 0;

	searchProducts.map((item) => {
		let proStatus = false;
		item.promotions.find((promo) => {
			if(promo.looks.includes(promotion)){
				totalPrice += promo.price
				proStatus = true;
			}
		});
		if(!proStatus){
			totalPrice += item.regularPrice
		}
		firstTotal += item.regularPrice;
	} );
	let discountValue = firstTotal - totalPrice;
	let discount = (100 * discountValue) / firstTotal;

	let result = {
		products: newProducts,
		promotion: promotion,
		totalPrice: totalPrice.toFixed(2),
		discountValue: discountValue.toFixed(2) ,
		discount: `${discount.toFixed(2)}%`
	}

	return result;
}

module.exports = { getShoppingCart };