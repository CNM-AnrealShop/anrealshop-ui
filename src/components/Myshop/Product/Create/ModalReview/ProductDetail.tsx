// import { Badge, Group, Stack, Text, Title } from '@mantine/core';
// import { FiBox, FiPackage, FiTag } from 'react-icons/fi';
// import type { ProductCreateRequest, ProductSkuRequest } from '../../../../../types/ProductType';

// interface ProductDetailProps {
//   form: { values: ProductCreateRequest };
//   selectedVariant: ProductSkuRequest | null;
// }

// const ProductDetail = ({ form, selectedVariant }: ProductDetailProps) => {
//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: 'VND',
//       maximumFractionDigits: 0
//     }).format(price);
//   };

//   const calculateDiscount = () => {
//     const currentPrice = selectedVariant?.price || form.values.price;
//     const comparePrice = form.values.discountPrice;
    
//     if (!comparePrice || comparePrice <= currentPrice) return null;
    
//     const discount = ((comparePrice - currentPrice) / comparePrice) * 100;
//     return Math.round(discount);
//   };

//   const discount = calculateDiscount();
//   const currentPrice = selectedVariant?.price || form.values.price;
//   const currentStock = selectedVariant?.quantity || form.values.quantity;

//   return (
//     <Stack gap="lg">
//       {/* Product Title */}
//       <div>
//         <Title 
//           order={1} 
//           size="h2" 
//           className="mb-3 text-gray-800 leading-tight" 
//           style={{ lineHeight: 1.3 }}
//         >
//           {form.values.name || 'Tên sản phẩm'}
//         </Title>

//         {/* Product Attributes as Tags */}
//         {form.values.attributes && form.values.attributes.length > 0 && (
//           <Group mt="xs" gap="xs">
//             {form.values.attributes.slice(0, 4).map((attr) => (
//               <Badge 
//                 key={attr.attributeKeyName} 
//                 variant="light" 
//                 color="blue" 
//                 radius="sm"
//                 size="sm"
//                 leftSection={<FiTag size={12} />}
//               >
//                 {attr.attributeKeyName.replace(/_/g, ' ')}: {attr.value.slice(0, 2).join(', ')}
//                 {attr.value.length > 2 && '...'}
//               </Badge>
//             ))}
//             {form.values.attributes.length > 4 && (
//               <Badge variant="outline" color="gray" size="sm">
//                 +{form.values.attributes.length - 4} thuộc tính khác
//               </Badge>
//             )}
//           </Group>
//         )}
//       </div>

//       {/* Price Section */}
//       <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-100">
//         <Group align="center" gap="lg">
//           <div>
//             <Text 
//               size="xl" 
//               fw={700} 
//               className="text-red-600" 
//               style={{ fontSize: '2.2rem' }}
//             >
//               {formatPrice(currentPrice)}
//             </Text>
//             <Text size="xs" c="dimmed" mt={2}>
//               {selectedVariant ? 'Giá phân loại' : 'Giá cơ bản'}
//             </Text>
//           </div>

//           {form.values.discountPrice > currentPrice && (
//             <>
//               <div className="border-l border-gray-300 pl-4">
//                 <Text 
//                   size="lg" 
//                   td="line-through" 
//                   c="dimmed"
//                   fw={500}
//                 >
//                   {formatPrice(form.values.discountPrice)}
//                 </Text>
//                 <Text size="xs" c="dimmed">Giá gốc</Text>
//               </div>

//               {discount && (
//                 <Badge 
//                   color="red" 
//                   size="xl" 
//                   radius="lg" 
//                   variant="filled"
//                   style={{ fontSize: '1rem', fontWeight: 700, padding: '8px 16px' }}
//                 >
//                   -{discount}%
//                 </Badge>
//               )}
//             </>
//           )}
//         </Group>
//       </div>

//       {/* Short Description */}
//       {form.values.sortDescription && (
//         <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
//           <Text size="sm" c="blue" fw={600} mb={8}>Mô tả ngắn</Text>
//           <Text className="text-gray-700 leading-relaxed" size="md">
//             {form.values.sortDescription}
//           </Text>
//         </div>
//       )}

//       {/* Product Meta Info Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Stock Info */}
//         <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//           <Group>
//             <div className="p-2 bg-green-500 rounded-lg">
//               <FiBox size={20} className="text-white" />
//             </div>
//             <div>
//               <Text size="sm" c="green" fw={600}>Tồn kho</Text>
//               <Text fw={700} size="lg">
//                 {currentStock} sản phẩm
//               </Text>
//             </div>
//           </Group>
//         </div>

//         {/* SKU Info */}
//         <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
//           <Group>
//             <div className="p-2 bg-purple-500 rounded-lg">
//               <FiPackage size={20} className="text-white" />
//             </div>
//             <div>
//               <Text size="sm" c="purple" fw={600}>Mã SKU</Text>
//               <Text fw={700} size="lg" className="font-mono">
//                 {selectedVariant ? selectedVariant.sku : 'Chưa có SKU'}
//               </Text>
//             </div>
//           </Group>
//         </div>
//       </div>

//       {/* Physical Properties */}
//       {(form.values.weight > 0 || (form.values.length && form.values.width && form.values.hight)) && (
//         <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//           <Text size="sm" c="yellow.8" fw={600} mb={12}>Thông số vật lý</Text>
//           <div className="grid grid-cols-2 gap-4">
//             {form.values.weight > 0 && (
//               <div>
//                 <Text size="xs" c="dimmed" fw={500}>Trọng lượng</Text>
//                 <Text fw={600}>{form.values.weight}g</Text>
//               </div>
//             )}
//             {form.values.length && form.values.width && form.values.hight && (
//               <div>
//                 <Text size="xs" c="dimmed" fw={500}>Kích thước (D×R×C)</Text>
//                 <Text fw={600} className="font-mono">
//                   {form.values.length}×{form.values.width}×{form.values.hight} cm
//                 </Text>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Variant Info */}
//       {selectedVariant && selectedVariant.attributes && selectedVariant.attributes.length > 0 && (
//         <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//           <Text size="sm" c="blue" fw={600} mb={12}>Phân loại được chọn</Text>
//           <Group gap="xs">
//             {selectedVariant.attributes.map((attr) => (
//               <Badge
//                 key={attr.attributeKeyName}
//                 variant="filled"
//                 color="blue"
//                 size="md"
//               >
//                 {attr.attributeKeyName.replace(/_/g, ' ')}: {attr.value}
//               </Badge>
//             ))}
//           </Group>
//         </div>
//       )}
//     </Stack>
//   );
// };

// export default ProductDetail;
