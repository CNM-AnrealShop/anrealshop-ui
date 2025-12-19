// import { Button, Group, Stack, Text, Card } from '@mantine/core';
// import { useMemo } from 'react';
// import type { ProductSkuRequest } from '../../../../../types/ProductType';

// interface ProductVariantProps {
//   productSkus: ProductSkuRequest[];
//   selectedVariant: ProductSkuRequest | null;
//   onVariantChange: (variant: ProductSkuRequest) => void;
// }

// const ProductVariant = ({ productSkus, selectedVariant, onVariantChange }: ProductVariantProps) => {
  
//   // Get unique attribute names from all SKUs
//   const getAttributeNames = useMemo(() => {
//     const attributeNames = new Set<string>();
//     productSkus.forEach(sku => {
//       sku.attributes?.forEach(attr => {
//         attributeNames.add(attr.attributeKeyName);
//       });
//     });
//     return Array.from(attributeNames);
//   }, [productSkus]);

//   // Get unique attribute values for a given attribute name
//   const getAttributeValues = (attrName: string) => {
//     const values = new Set<string>();
//     productSkus.forEach(sku => {
//       const attr = sku.attributes?.find(a => a.attributeKeyName === attrName);
//       if (attr) {
//         values.add(attr.value);
//       }
//     });
//     return Array.from(values);
//   };

//   // Handle attribute selection
//   const handleAttributeSelect = (attrName: string, value: string) => {
//     if (!selectedVariant) return;

//     // Create current selections map
//     const currentSelections: Record<string, string> = {};
//     selectedVariant.attributes?.forEach(attr => {
//       currentSelections[attr.attributeKeyName] = attr.value;
//     });

//     // Update with new selection
//     currentSelections[attrName] = value;

//     // Find matching SKU
//     const newVariant = productSkus.find(sku => {
//       return Object.entries(currentSelections).every(([key, val]) => {
//         return sku.attributes?.some(attr => 
//           attr.attributeKeyName === key && attr.value === val
//         );
//       });
//     });

//     if (newVariant) {
//       onVariantChange(newVariant);
//     }
//   };

//   // Check if variant is available (has stock)
//   const isVariantAvailable = (attrName: string, value: string) => {
//     if (!selectedVariant) return true;

//     const currentSelections: Record<string, string> = {};
//     selectedVariant.attributes?.forEach(attr => {
//       currentSelections[attr.attributeKeyName] = attr.value;
//     });
//     currentSelections[attrName] = value;

//     const variant = productSkus.find(sku => {
//       return Object.entries(currentSelections).every(([key, val]) => {
//         return sku.attributes?.some(attr => 
//           attr.attributeKeyName === key && attr.value === val
//         );
//       });
//     });

//     return variant && variant.quantity > 0;
//   };

//   if (productSkus.length <= 1 || getAttributeNames.length === 0) {
//     return null;
//   }

//   return (
//     <Card className="border border-gray-200 bg-gray-50" radius="lg" p="lg">
//       <Text fw={600} mb="lg" size="lg" className="text-gray-800">
//         Chọn phân loại sản phẩm
//       </Text>
      
//       <Stack gap="lg">
//         {getAttributeNames.map((attrName: string) => (
//           <div key={attrName}>
//             <Text fw={600} mb="md" size="md" tt="capitalize" className="text-gray-700">
//               {attrName.replace(/_/g, ' ')}
//             </Text>
//             <Group gap="sm">
//               {getAttributeValues(attrName).map((value: string) => {
//                 const isSelected = selectedVariant?.attributes?.some(attr => 
//                   attr.attributeKeyName === attrName && attr.value === value
//                 );
//                 const isAvailable = isVariantAvailable(attrName, value);
                
//                 return (
//                   <Button
//                     key={value}
//                     variant={isSelected ? 'filled' : 'outline'}
//                     color={isSelected ? 'blue' : 'gray'}
//                     onClick={() => handleAttributeSelect(attrName, value)}
//                     size="md"
//                     radius="lg"
//                     disabled={!isAvailable}
//                     style={{
//                       minWidth: '80px',
//                       height: '42px',
//                       fontWeight: isSelected ? 600 : 500,
//                       opacity: !isAvailable ? 0.5 : 1,
//                       position: 'relative'
//                     }}
//                   >
//                     {value}
//                     {!isAvailable && (
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
//                       </div>
//                     )}
//                   </Button>
//                 );
//               })}
//             </Group>
//             {getAttributeValues(attrName).every(value => !isVariantAvailable(attrName, value)) && (
//               <Text size="xs" c="red" mt="xs">
//                 Tất cả các lựa chọn của {attrName.replace(/_/g, ' ')} đã hết hàng
//               </Text>
//             )}
//           </div>
//         ))}
//       </Stack>

//       {/* Show selected variant summary */}
//       {selectedVariant && (
//         <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//           <Text size="sm" fw={600} c="blue" mb={8}>Phân loại đã chọn:</Text>
//           <Group gap="xs">
//             {selectedVariant.attributes?.map(attr => (
//               <Text key={attr.attributeKeyName} size="sm" fw={500}>
//                 {attr.attributeKeyName.replace(/_/g, ' ')}: <span className="font-semibold">{attr.value}</span>
//               </Text>
//             )) || []}
//           </Group>
//           <Text size="xs" c="dimmed" mt={8}>
//             Còn lại: {selectedVariant.quantity} sản phẩm
//           </Text>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default ProductVariant;
