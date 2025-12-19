// import {
//     Anchor,
//     Box,
//     Breadcrumbs,
//     Button,
//     Group,
//     Loader,
//     Paper,
//     Text,
//     Title
// } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import {
//     FiArrowLeft,
//     FiChevronRight,
//     FiPackage
// } from 'react-icons/fi';
// import { useNavigate, useParams } from 'react-router-dom';
// import Customer from './OrderDetails/Customer';
// import FinancialDetail from './OrderDetails/FinancialDetail';
// import Option from './OrderDetails/Option';
// import OrderHistory from './OrderDetails/OrderHistory';
// import OrderInfo from './OrderDetails/OrderInfo';
// import type { OrderDetailDto } from '../../../types/OrderType';


// const OrderDetailPage = () => {
//     const { orderId } = useParams<{ orderId: string }>();
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [order, setOrder] = useState<OrderDetailDto | null>(null);
//     const [rejectModalOpen, setRejectModalOpen] = useState(false);
//     const [showShippingDetail, setShowShippingDetail] = useState(false);
//     const [selectedShipping, setSelectedShipping] = useState<any>(null);

//     // Handle going back to previous page
//     const handleGoBack = () => {
//         navigate('/myshop/orders');
//     };

//     // Handle order approval
//     const handleApproveOrder = () => {
//         // Implement approval logic
//     };

//     // Handle order rejection
//     const handleRejectOrder = (reason: string) => {
//         // Implement rejection logic
//         setRejectModalOpen(false);
//     };

//     // Handle print order
//     const handlePrintOrder = () => {
//         window.print();
//     };

//     useEffect(() => {
//         // Simulate loading order details from API
//         const loadOrderData = async () => {
//             setIsLoading(true);
//             try {
//                 // In a real app, fetch order from API using orderId
//                 // For now, use sample data
//                 setTimeout(() => {
//                     setOrder(SampleOrderDetail);
//                     setIsLoading(false);
//                 }, 800);
//             } catch (error) {
//                 console.error('Failed to load order details:', error);
//                 setIsLoading(false);
//             }
//         };

//         loadOrderData();
//     }, [orderId]);
    
//     // Add breadcrumb items
//     const breadcrumbItems = [
//         { title: 'Trang chủ', href: '/myshop' },
//         { title: 'Quản lý đơn hàng', href: '/myshop/orders' },
//         { title: `Đơn hàng #${order?.orderId || orderId}`, href: '#' },
//     ].map((item, index) => (
//         <Anchor href={item.href} key={index} size="sm" onClick={(e) => {
//             if (item.href !== '#') {
//                 e.preventDefault();
//                 navigate(item.href);
//             }
//         }}>
//             {item.title}
//         </Anchor>
//     ));

//     if (isLoading) {
//         return (
//             <div className="p-8 flex justify-center items-center min-h-[400px]">
//                 <Loader />
//                 <Text ml="md">Đang tải thông tin đơn hàng...</Text>
//             </div>
//         );
//     }

//     if (!order) {
//         return (
//             <div className="p-8 flex flex-col justify-center items-center min-h-[400px]">
//                 <FiArrowLeft size={48} className="text-red-500 mb-4" />
//                 <Text size="lg" fw={500}>Không tìm thấy thông tin đơn hàng</Text>
//                 <Button variant="outline" leftSection={<FiArrowLeft size={16} />} onClick={handleGoBack} mt="md">
//                     Quay lại
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 relative">
//             {/* Breadcrumb navigation */}
//             <Paper
//                 shadow="xs"
//                 p="md"
//                 mb="md"
//                 radius="md"
//                 className="border-b border-gray-200"
//             >
//                 <Box mb="xs">
//                     <Breadcrumbs separator={<FiChevronRight size={14} />}>
//                         {breadcrumbItems}
//                     </Breadcrumbs>
//                 </Box>

//                 <Group justify="space-between" align="center">
//                     <Group>
//                         <FiPackage size={24} className="text-primary" />
//                         <Title order={2} size="h3">Chi tiết đơn hàng</Title>
//                     </Group>
//                     <Text c="dimmed" size="sm">
//                         Xem và quản lý tất cả đơn hàng của cửa hàng
//                     </Text>
//                 </Group>
//             </Paper>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Left column - Main order information */}
//                 <div className="lg:col-span-2 space-y-6">
//                     {/* Order header */}
//                     <Option 
//                         orderNumber={order.orderId}
//                         onPrint={handlePrintOrder}
//                     />

//                     {/* <OrderStatus 
//                     /> */}

//                     {/* Customer information */}
//                     <Customer  
//                         customerName={order.customerName}
//                         customerPhone={order.customerPhone}
//                     />

//                     <OrderInfo 
//                         items={order.items}
//                         customerName={order.customerName}
//                         customerPhone={order.customerPhone}
//                         customerAddress={order.customerAddress}
//                         shippingStatus={order.orderStatus}
//                     />
                    
//                     {/* Order history */}
//                     <OrderHistory 
//                         orderHistory={order.orderHistory}
//                     />
//                 </div>

//                 {/* Right column - Financial details */}
//                 <div className="space-y-6">
//                     <FinancialDetail
//                         orderData={{
//                             totalProductCost: order.totalProductCost,
//                             totalShippingCost: order.totalShippingCost,
//                             shippingFee: order.shippingFee,
//                             shippingDiscount: order.shippingDiscount,
//                             FixedFeeRate: order.FixedFeeRate,
//                             serviceFeeRate: order.serviceFeeRate,
//                             PaymentFeeRate: order.PaymentFeeRate,
//                             revenue: order.revenue
//                         }}
//                     />
//                 </div>
//             </div>

//             {/* Shipping Detail Modal */}
//             {/* <Modal
//                 opened={showShippingDetail}
//                 onClose={() => setShowShippingDetail(false)}
//                 title={
//                     <Group>
//                         <FiTruck size={20} />
//                         <Text fw={600}>Chi tiết vận chuyển</Text>
//                     </Group>
//                 }
//                 size="lg"
//             >
//                 {selectedShipping && (
//                     <ShippingTracker
//                         recipientInfo={selectedShipping.recipientInfo}
//                         contactPhone={selectedShipping.contactPhone}
//                         recipientAddress={selectedShipping.recipientAddress}
//                         packages={selectedShipping.packages}
//                     />
//                 )}
//             </Modal> */}

//             {/* Reject Order Modal */}
//             {/* <RejectOrder
//                 opened={rejectModalOpen}
//                 onClose={() => setRejectModalOpen(false)}
//                 onConfirm={handleRejectOrder}
//                 orderId={order.id}
//             /> */}
//         </div>
//     );
// };

// export default OrderDetailPage;