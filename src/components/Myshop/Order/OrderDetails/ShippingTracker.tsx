// import { Timeline, Text, Group, Badge, Paper, Title, Divider, Box, Accordion, Image, Avatar } from '@mantine/core';
// import { FiCircle, FiCheckCircle, FiMapPin, FiTruck, FiPackage, FiChevronDown, FiUser, FiPhone } from 'react-icons/fi';
// import { useState } from 'react';

// interface ShippingEvent {
//   status: string;
//   time: string;
//   location?: string;
// }

// interface ShippingPackage {
//   packageId: string;
//   trackingId: string;
//   carrier: string;
//   deliveryPerson?: string;
//   deliveryPersonPhone?: string;
//   events: ShippingEvent[];
//   products: {
//     name: string;
//     image: string;
//     quantity: number;
//   }[];
// }

// interface ShippingTrackerProps {
//   recipientInfo: string;
//   contactPhone: string;
//   recipientAddress: string;
//   packages: ShippingPackage[];
// }

// const ShippingTracker = ({ recipientInfo, contactPhone, recipientAddress, packages }: ShippingTrackerProps) => {
//   const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

//   // Function to format date display
//   const formatDateDisplay = (dateString: string) => {
//     const today = new Date().toLocaleDateString('vi-VN');
//     const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('vi-VN');
    
//     if (dateString === today) return 'Hôm nay';
//     if (dateString === yesterday) return 'Hôm qua';
//     return dateString;
//   };

//   // Function to group events by date for a package
//   const getGroupedEvents = (events: ShippingEvent[]) => {
//     const grouped: Record<string, ShippingEvent[]> = {};
    
//     events.forEach(event => {
//       // Extract date from time string (format: "HH:MM DD/MM/YYYY")
//       const parts = event.time.split(' ');
//       const date = parts.length > 1 ? parts[1] : 'Unknown';
      
//       if (!grouped[date]) {
//         grouped[date] = [];
//       }
//       grouped[date].push(event);
//     });
    
//     // Get unique dates in descending order
//     const dates = Object.keys(grouped).sort((a, b) => {
//       const [dayA, monthA, yearA] = a.split('/').map(Number);
//       const [dayB, monthB, yearB] = b.split('/').map(Number);
//       const dateA = new Date(yearA, monthA - 1, dayA);
//       const dateB = new Date(yearB, monthB - 1, dayB);
//       return dateB.getTime() - dateA.getTime();
//     });
    
//     return { grouped, dates };
//   };

//   // Function to get latest status for a package
//   const getLatestStatus = (events: ShippingEvent[]) => {
//     if (events.length === 0) return { status: "Không có thông tin", time: "" };
//     return events[0];
//   };

//   return (
//     <Box>
//       {/* Common Recipient Information Section */}
//       <Box mb="md">
//         <Title order={5} mb="sm">Người nhận</Title>
//         <Paper p="md" withBorder>
//           <Text fw={500}>{recipientInfo}</Text>
//           <Group spacing="xs" mb="xs">
//             <FiPhone size={14} />
//             <Text size="sm">{contactPhone}</Text>
//           </Group>
//           <Text size="sm" color="dimmed">{recipientAddress}</Text>
//         </Paper>
//       </Box>
      
//       {/* Packages List */}
//       <Title order={5} mb="md">Danh sách kiện hàng</Title>
      
//       {packages.map((pkg, index) => (
//         <Paper key={pkg.packageId} p="md" mb="md" withBorder>
//           {/* Package Header - Shipping Method + Tracking ID */}
//           <Box mb="md">
//             <Group spacing="xs">
//               <FiPackage size={18} />
//               <Text fw={500}>Kiện hàng {index + 1}: {pkg.carrier} | {pkg.trackingId}</Text>
//             </Group>
//           </Box>
          
//           {/* Delivery Person Info */}
//           {pkg.deliveryPerson && (
//             <Group mb="md">
//               <Avatar size="sm" radius="xl">
//                 <FiUser size={16} />
//               </Avatar>
//               <div>
//                 <Text size="sm" fw={500}>{pkg.deliveryPerson}</Text>
//                 {pkg.deliveryPersonPhone && (
//                   <Group spacing="xs">
//                     <FiPhone size={12} />
//                     <Text size="xs">{pkg.deliveryPersonPhone}</Text>
//                   </Group>
//                 )}
//               </div>
//             </Group>
//           )}
          
//           {/* Products in package */}
//           <Box mb="md">
//             {pkg.products.map((product, idx) => (
//               <Group key={idx} mb="xs" noWrap>
//                 <Image 
//                   src={product.image} 
//                   width={40} 
//                   height={40} 
//                   radius="sm"
//                   withPlaceholder
//                 />
//                 <Text size="sm" lineClamp={2}>
//                   {product.name} {product.quantity > 1 ? `x${product.quantity}` : ''}
//                 </Text>
//               </Group>
//             ))}
//           </Box>
          
//           {/* Shipping History Accordion */}
//           <Accordion 
//             variant="contained"
//             value={expandedPackage === pkg.packageId ? pkg.packageId : null}
//             onChange={(value) => setExpandedPackage(value === pkg.packageId ? pkg.packageId : null)}
//           >
//             <Accordion.Item value={pkg.packageId}>
//               <Accordion.Control icon={<FiTruck size={16} />}>
//                 Lịch sử vận chuyển
//               </Accordion.Control>
//               <Accordion.Panel>
//                 {pkg.events.length > 0 ? (
//                   (() => {
//                     const { grouped, dates } = getGroupedEvents(pkg.events);
//                     return dates.map(date => (
//                       <Box key={date} mb="xl">
//                         <Group mb="sm">
//                           <Badge size="sm" radius="sm">{formatDateDisplay(date)}</Badge>
//                         </Group>
                        
//                         <Timeline bulletSize={20} lineWidth={2}>
//                           {grouped[date].map((event, eventIdx) => (
//                             <Timeline.Item
//                               key={eventIdx}
//                               bullet={
//                                 eventIdx === 0 && date === dates[0] 
//                                   ? <FiCheckCircle size={14} /> 
//                                   : <FiCircle size={14} />
//                               }
//                               title={
//                                 <Group spacing="xs">
//                                   <Text size="sm" fw={500}>{event.status}</Text>
//                                   <Text size="xs" color="dimmed">{event.time.split(' ')[0]}</Text>
//                                 </Group>
//                               }
//                             >
//                               {event.location && (
//                                 <Group spacing="xs" mt={2}>
//                                   <FiMapPin size={12} />
//                                   <Text size="xs" color="dimmed">{event.location}</Text>
//                                 </Group>
//                               )}
//                             </Timeline.Item>
//                           ))}
//                         </Timeline>
//                       </Box>
//                     ));
//                   })()
//                 ) : (
//                   <Text color="dimmed" size="sm">Không có thông tin lịch sử vận chuyển</Text>
//                 )}
//               </Accordion.Panel>
//             </Accordion.Item>
//           </Accordion>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default ShippingTracker;