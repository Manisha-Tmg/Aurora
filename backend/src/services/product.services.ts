// createProduct
// readAllProduct
// updateProduct
// deleteProduct

import Product from "../database/model/product.model";

export const createProductService = async (
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  status: boolean,
  images: string,
) => {
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    status,
    images,
  });
  
};
