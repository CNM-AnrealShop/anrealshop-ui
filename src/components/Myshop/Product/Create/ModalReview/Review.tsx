// import { Box, Grid, ScrollArea, Text } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import type { ProductCreateRequest, ProductSkuRequest } from '../../../../../types/ProductType';
// import ProductAction from './ProductAction';
// import ProductDescriptionTab from './ProductDescriptionTap';
// import ProductDetail from './ProductDetail';
// import ProductImageGallery from './ProductImageGalary';
// import ProductVariant from './ProductVariant';
// import ReviewFooterAction from './ReviewFooterAction';

// interface ProductReviewProps {
//   form: { values: ProductCreateRequest };
//   media: Array<{
//     file?: File;
//     url: string;
//     id?: string;
//     type: 'image' | 'video';
//   }>;
//   onBack: () => void;
//   onSubmit: () => void;
//   isPreview?: boolean;
// }

// const Review = ({ form, media, onBack, onSubmit, isPreview = false }: ProductReviewProps) => {
//   const [selectedVariant, setSelectedVariant] = useState<ProductSkuRequest | null>(null);

//   useEffect(() => {
//     if (form?.values?.productSkus && form.values.productSkus.length > 0) {
//       setSelectedVariant(form.values.productSkus[0]);
//     }
//   }, [form?.values?.productSkus]);

//   if (!form || !form.values) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <div className="text-6xl mb-4">📦</div>
//           <Text size="lg" c="dimmed">Không có dữ liệu sản phẩm để xem trước</Text>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Box>
//       <ScrollArea h="calc(100vh - 120px)" offsetScrollbars>
//         <div className="px-6 py-8 bg-gradient-to-b from-gray-50 to-white min-h-full">
//           {/* Breadcrumb */}
//           <div className="mb-8">
//             <Text size="sm" c="dimmed" className="text-gray-500">
//               Trang chủ / Sản phẩm / {form.values.name || 'Xem trước sản phẩm'}
//             </Text>
//           </div>
          
//           <Grid gutter="xl">
//             {/* Product Images */}
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <ProductImageGallery 
//                 media={media} 
//                 productName={form.values.name || 'Sản phẩm'} 
//               />
//             </Grid.Col>

//             {/* Product Details */}
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <div className="space-y-6">
//                 <ProductDetail 
//                   form={form} 
//                   selectedVariant={selectedVariant} 
//                 />

//                 {/* Product Variants */}
//                 <ProductVariant
//                   productSkus={form.values.productSkus}
//                   selectedVariant={selectedVariant}
//                   onVariantChange={setSelectedVariant}
//                 />

//                 {/* Action Buttons */}
//                 <ProductAction />
//               </div>
//             </Grid.Col>
//           </Grid>

//           {/* Product Description Tabs */}
//           <ProductDescriptionTab form={form} />
//         </div>
//       </ScrollArea>

//       {/* Footer Actions */}
//       <ReviewFooterAction 
//         onBack={onBack}
//         onSubmit={onSubmit}
//         isPreview={isPreview}
//       />
//     </Box>
//   );
// };

// export default Review;