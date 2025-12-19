// import React from 'react';
// import { Grid } from '@mantine/core';
// import ProductCard from '../Common/ProductCard';
// import type { Product } from '../../../data/UserData';

// export interface ShopProduct {
//     id: string;
//     name: string;
//     image: string;
//     price: number;
//     originalPrice?: number;
//     rating: number;
//     sold: number;
//     discount?: number;
// }

// interface ProductListProps {
//     products: ShopProduct[];
//     shopName: string;
// }

// const ProductList: React.FC<ProductListProps> = ({ products, shopName }) => {
//     // Chuyển đổi ShopProduct thành Product để sử dụng với ProductCard
//     const convertToProduct = (shopProduct: ShopProduct): Product => {
//         return {
//             id: shopProduct.id,
//             // slug: shopProduct.id, 
//             name: shopProduct.name,
//             price: shopProduct.price,
//             discountPrice: shopProduct.originalPrice ? shopProduct.price : undefined,
//             images: [shopProduct.image],
//             rating: shopProduct.rating,
//             reviewCount: shopProduct.sold, 
//             shop: { name: shopName },
//             category: { name: 'Thời trang' },
//             isFeatured: false,
//             isNew: false
//         };
//     };

//     return (
//         <Grid>
//             {products.map((product) => (
//                 <Grid.Col key={product.id} span={{ base: 12, xs: 6, sm: 4, lg: 3 }}>
//                     <ProductCard 
//                         product={convertToProduct(product)} 
//                     />
//                 </Grid.Col>
//             ))}
//         </Grid>
//     );
// };

// export default ProductList;