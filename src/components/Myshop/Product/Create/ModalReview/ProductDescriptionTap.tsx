// import { Divider, Group, Paper, Stack, Tabs, Text } from '@mantine/core';
// import { FiCheck, FiTruck } from 'react-icons/fi';
// import type { ProductCreateRequest } from '../../../../../types/ProductType';

// interface ProductDescriptionTabProps {
//   form: { values: ProductCreateRequest };
// }

// const ProductDescriptionTab = ({ form }: ProductDescriptionTabProps) => {
//   return (
//     <Tabs defaultValue="description" mt={40} radius="md">
//       <Tabs.List className="border-b-2 border-gray-100">
//         <Tabs.Tab value="description" fw={600} className="text-lg">
//           Mô tả sản phẩm
//         </Tabs.Tab>
//         <Tabs.Tab value="specifications" fw={600} className="text-lg">
//           Thông số kỹ thuật
//         </Tabs.Tab>
//         <Tabs.Tab value="shipping" fw={600} className="text-lg">
//           Vận chuyển & Bảo hành
//         </Tabs.Tab>
//       </Tabs.List>

//       <Paper p="xl" mt="md" radius="lg" className="bg-white border border-gray-100" shadow="sm">
//         <Tabs.Panel value="description" pt="md">
//           {form.values.description ? (
//             <div
//               className="prose prose-lg max-w-none"
//               dangerouslySetInnerHTML={{ __html: form.values.description }}
//               style={{ lineHeight: 1.8 }}
//             />
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">📝</div>
//               <Text c="dimmed" fs="italic" size="lg">
//                 Chưa có mô tả chi tiết cho sản phẩm này
//               </Text>
//             </div>
//           )}
//         </Tabs.Panel>

//         <Tabs.Panel value="specifications" pt="md">
//           <Stack gap="md">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <Group justify="apart" className="py-3">
//                 <Text fw={600} size="md">Thương hiệu</Text>
//                 <Text size="md" className="text-blue-600 font-semibold">Anreal Shop</Text>
//               </Group>
//               <Divider />

//               <Group justify="apart" className="py-3">
//                 <Text fw={600} size="md">Xuất xứ</Text>
//                 <Text size="md">Việt Nam</Text>
//               </Group>
//               <Divider />

//               {form.values.weight > 0 && (
//                 <>
//                   <Group justify="apart" className="py-3">
//                     <Text fw={600} size="md">Cân nặng</Text>
//                     <Text size="md">{form.values.weight} gram</Text>
//                   </Group>
//                   <Divider />
//                 </>
//               )}

//               {form.values.length > 0 && form.values.width > 0 && form.values.hight > 0 && (
//                 <>
//                   <Group justify="apart" className="py-3">
//                     <Text fw={600} size="md">Kích thước (D×R×C)</Text>
//                     <Text size="md" className="font-mono">
//                       {form.values.length} × {form.values.width} × {form.values.hight} cm
//                     </Text>
//                   </Group>
//                   <Divider />
//                 </>
//               )}

//               {form.values.attributes && form.values.attributes.length > 0 && (
//                 form.values.attributes.map((attr, index) => (
//                   <div key={attr.attributeKeyName}>
//                     <Group justify="apart" className="py-3">
//                       <Text fw={600} size="md" tt="capitalize">
//                         {attr.attributeKeyName.replace(/_/g, ' ')}
//                       </Text>
//                       <Text size="md">{attr.value.join(', ')}</Text>
//                     </Group>
//                     {index < form.values.attributes.length - 1 && <Divider />}
//                   </div>
//                 ))
//               )}
//             </div>
//           </Stack>
//         </Tabs.Panel>

//         <Tabs.Panel value="shipping" pt="md">
//           <Stack gap="xl">
//             <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
//               <Group>
//                 <div className="p-3 bg-blue-500 rounded-full">
//                   <FiTruck size={28} className="text-white" />
//                 </div>
//                 <div>
//                   <Text fw={700} size="lg" className="text-blue-800">
//                     Giao hàng miễn phí
//                   </Text>
//                   <Text size="md" c="dimmed" mt={2}>
//                     Miễn phí giao hàng cho đơn từ 299.000đ trong nội thành
//                   </Text>
//                   <Text size="sm" c="dimmed">
//                     Thời gian: 2-5 ngày làm việc
//                   </Text>
//                 </div>
//               </Group>
//             </div>

//             <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
//               <Group>
//                 <div className="p-3 bg-green-500 rounded-full">
//                   <FiCheck size={28} className="text-white" />
//                 </div>
//                 <div>
//                   <Text fw={700} size="lg" className="text-green-800">
//                     Đổi trả dễ dàng
//                   </Text>
//                   <Text size="md" c="dimmed" mt={2}>
//                     Đổi trả miễn phí trong vòng 15 ngày
//                   </Text>
//                   <Text size="sm" c="dimmed">
//                     Áp dụng cho sản phẩm chưa sử dụng, còn nguyên tem mác
//                   </Text>
//                 </div>
//               </Group>
//             </div>

//             <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
//               <Group>
//                 <div className="p-3 bg-yellow-500 rounded-full">
//                   <Text fw={700} className="text-white">⭐</Text>
//                 </div>
//                 <div>
//                   <Text fw={700} size="lg" className="text-yellow-800">
//                     Bảo hành chính hãng
//                   </Text>
//                   <Text size="md" c="dimmed" mt={2}>
//                     Bảo hành 12 tháng với các lỗi do nhà sản xuất
//                   </Text>
//                   <Text size="sm" c="dimmed">
//                     Hỗ trợ kỹ thuật 24/7 qua hotline và email
//                   </Text>
//                 </div>
//               </Group>
//             </div>
//           </Stack>
//         </Tabs.Panel>
//       </Paper>
//     </Tabs>
//   );
// };

// export default ProductDescriptionTab;
