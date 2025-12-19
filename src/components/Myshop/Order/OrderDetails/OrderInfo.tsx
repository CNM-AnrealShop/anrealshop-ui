// import { Accordion, Avatar, Badge, Card, Divider, Group, Image, SimpleGrid, Stack, Text, ThemeIcon, Timeline } from '@mantine/core';
// import { FiMapPin, FiPackage, FiShoppingBag, FiTruck, FiUser } from 'react-icons/fi';
// import { useOrderStatus } from '../../../../hooks/useOrderStatus';

// interface OrderItem {
//     id: string;
//     productImage: string;
//     productName: string;
//     productQuantity: number;
//     shippingId: string;
//     shippingMethod: string;
//     shippingBrand: string;
//     shipperName?: string;
//     shipperPhone?: string;
//     shippingHistory?: {
//         id: string;
//         status: string;
//         title: string;
//         timestamp: Date;
//     }[];
// }

// interface OrderInfoProps {
//     items?: OrderItem[];
//     customerName?: string;
//     customerPhone?: string;
//     customerAddress?: string;
//     shippingStatus?: string;
// }

// const OrderInfo = ({
//     items = SampleOrderDetail.items,
//     customerName = SampleOrderDetail.customerName,
//     customerPhone = SampleOrderDetail.customerPhone,
//     customerAddress = SampleOrderDetail.customerAddress,
//     shippingStatus = SampleOrderDetail.orderStatus
// }: OrderInfoProps) => {
//     const { getStatusColor, getStatusLabel } = useOrderStatus();

//     // Group items by shipping ID (items in the same package)
//     const groupItemsByShipping = () => {
//         const grouped: Record<string, OrderItem[]> = {};

//         if (items?.length) {
//             items.forEach(item => {
//                 if (!grouped[item.shippingId]) {
//                     grouped[item.shippingId] = [];
//                 }
//                 grouped[item.shippingId].push(item);
//             });
//         }

//         return grouped;
//     };

//     const groupedItems = groupItemsByShipping();

//     // Format date to a readable string
//     const formatDateTime = (date: Date) => {
//         return new Intl.DateTimeFormat('vi-VN', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: false
//         }).format(new Date(date));
//     };

//     return (
//         <Card withBorder p="md">
//             {/* Recipient Information Section */}
//             <Group mb="md">
//                 <FiUser size={18} />
//                 <Text fw={700} size="md">Đơn hàng</Text>
//             </Group>

//             <Group mb="md">
//                 <ThemeIcon size="lg" radius="xl" color="blue" variant="light">
//                     <FiMapPin size={18} />
//                 </ThemeIcon>
//                 <div className="">
//                     <Text fw={500} size="md">Thông tin vận chuyển</Text>
//                     <div>
//                         <Text size="sm" c="dimmed">{customerName}</Text>
//                         <Text size="sm" c="dimmed">{customerPhone} • {customerAddress}</Text>
//                     </div>
//                 </div>
//             </Group>

//             <Divider mb="md" />

//             {/* Shipping packages information */}
//             <Group mb="md">
//                 <ThemeIcon size="lg" radius="xl" color="blue" variant="light" className="">
//                     <FiTruck size={18} />
//                 </ThemeIcon>
//                 <div className="">
//                     <Text fw={500} size="md">Thông tin kiện hàng</Text>
//                     <div>
//                         {Object.entries(groupedItems).map(([shippingId, packageItems], packageIndex) => {
//                             const firstItem = packageItems[0];
//                             const totalItems = packageItems.reduce((sum, item) => sum + item.productQuantity, 0);

//                             return (
//                                 <Card key={shippingId}  mb="lg">
//                                     {/* Line 1: Package info */}
//                                     <Group justify="apart" mb="md">
//                                         <Group>
//                                             <Text size="sm" fw={500}>Kiện hàng {packageIndex + 1}</Text>
//                                             <Text size="sm">|</Text>
//                                             <Text size="sm" fw={500}>{firstItem.shippingBrand}</Text>
//                                             <Text size="sm">|</Text>
//                                             <Text size="sm">Mã vận đơn: <Text span fw={500}>{shippingId}</Text></Text>
//                                         </Group>
//                                         <Badge color={getStatusColor(shippingStatus)}>
//                                             {getStatusLabel(shippingStatus)}
//                                         </Badge>
//                                     </Group>

//                                     {/* Line 2: Shipper info */}
//                                     {firstItem.shipperName && (
//                                         <Group mb="md" p="xs" className="bg-gray-50 rounded-md">
//                                             <Avatar color="blue" radius="xl">
//                                                 {firstItem.shipperName.charAt(0)}
//                                             </Avatar>
//                                             <div>
//                                                 <Text size="sm" fw={500}>{firstItem.shipperName}</Text>
//                                                 <Text size="sm" c="dimmed">{firstItem.shipperPhone}</Text>
//                                             </div>
//                                             <Badge ml="auto" variant="outline" color="blue">
//                                                 {firstItem.shippingMethod}
//                                             </Badge>
//                                         </Group>
//                                     )}

//                                     {/* Line 3: Products summary */}
//                                     <Group p="xs" className="border border-gray-200 rounded-md">
//                                         <Group>
//                                             <ThemeIcon radius="xl" size="lg" color="gray" variant="light">
//                                                 <FiShoppingBag size={18} />
//                                             </ThemeIcon>
//                                             <Text size="sm">
//                                                 Tổng: <Text span fw={600}>{totalItems}</Text> sản phẩm
//                                             </Text>
//                                         </Group>

//                                         <SimpleGrid cols={Math.min(4, packageItems.length)} ml="auto">
//                                             {packageItems.map((item) => (
//                                                 <div key={item.id} style={{ width: 40, height: 40, objectFit: 'cover', textAlign: 'center' }}>
//                                                     <Image
//                                                         src={item.productImage}
//                                                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                                                         radius="md"
//                                                         alt={item.productName}
//                                                     />
//                                                 </div>
//                                             ))}
//                                         </SimpleGrid>
//                                     </Group>

//                                     {/* Shipping history with accordion - keep if needed */}
//                                     {firstItem.shippingHistory && firstItem.shippingHistory.length > 0 && (
//                                         <Accordion variant="contained" mt="xs">
//                                             <Accordion.Item value="shipping-history">
//                                                 <Accordion.Control icon={<FiTruck size={16} />}>
//                                                     Lịch sử vận chuyển
//                                                 </Accordion.Control>
//                                                 <Accordion.Panel>
//                                                     <Timeline active={firstItem.shippingHistory.length - 1} bulletSize={20} lineWidth={2}>
//                                                         {firstItem.shippingHistory.map((event) => (
//                                                             <Timeline.Item
//                                                                 key={event.id}
//                                                                 bullet={<FiTruck size={12} />}
//                                                                 title={
//                                                                     <Text size="sm" fw={500}>
//                                                                         {event.title}
//                                                                     </Text>
//                                                                 }
//                                                                 color={getStatusColor(event.status)}
//                                                             >
//                                                                 <Text size="xs" c="dimmed">{formatDateTime(event.timestamp)}</Text>
//                                                             </Timeline.Item>
//                                                         ))}
//                                                     </Timeline>
//                                                 </Accordion.Panel>
//                                             </Accordion.Item>
//                                         </Accordion>
//                                     )}
//                                 </Card>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </Group>



//             {/* Show message if no items */}
//             {!Object.keys(groupedItems).length && (
//                 <Stack align="center" my="xl" py="xl">
//                     <FiPackage size={48} color="#ddd" />
//                     <Text c="dimmed" ta="center">
//                         Không có thông tin về các kiện hàng
//                     </Text>
//                 </Stack>
//             )}
//         </Card>
//     );
// };

// export default OrderInfo;