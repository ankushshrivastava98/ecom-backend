function getUpdatedProductDataIfInStock(product, data) {
    const orderedSize = data.size;
    const orderedColor = data.color;
    const orderedQuantity = data.quantity;
    let inStock = false;
    product.stock.forEach(({ size, color, quantity }, index) => {
        if (size === orderedSize && color === orderedColor && orderedQuantity > 0 && quantity >= orderedQuantity) {
            inStock = true;
            product.stock[index].quantity = quantity - orderedQuantity;
        }
    });
    if (inStock) {
        return product;
    } else {
        return false
    }
}

module.exports = { getUpdatedProductDataIfInStock }