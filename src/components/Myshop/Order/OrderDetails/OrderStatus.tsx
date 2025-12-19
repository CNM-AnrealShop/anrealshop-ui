// import { Badge, Button, Card, Group, Paper, Text } from '@mantine/core';
// import { FiCalendar, FiCheckCircle, FiAlertCircle, FiTruck, FiFileText } from 'react-icons/fi';
// import { formatDate } from '../../../../untils/Untils';

// interface OrderStatusProps {
//   status: string;
//   statusColor: string;
//   statusLabel: string;
//   orderDate: string;
//   note?: string;
//   cancelReason?: string;
//   isPendingConfirmation: boolean;
//   isAwaitingShipment: boolean;
//   onApprove: () => void;
//   onReject: () => void;
// }

// const OrderStatus = ({
//   status,
//   statusColor,
//   statusLabel,
//   orderDate,
//   note,
//   cancelReason,
//   isPendingConfirmation,
//   isAwaitingShipment,
//   onApprove,
//   onReject
// }: OrderStatusProps) => {
//   return (
//     <Card withBorder p="md">
//       <Group justify="space-between" mb="md">
//         <Group>
//           <Badge size="lg" color={statusColor} variant="light">
//             {statusLabel}
//           </Badge>
//           <Text size="sm" c="dimmed">
//             <FiCalendar size={14} className="inline mr-1" />
//             Ngày đặt: {formatDate(new Date(orderDate))}
//           </Text>
//         </Group>

//         {isPendingConfirmation && (
//           <Group>
//             <Button
//               variant="outline"
//               color="red"
//               leftSection={<FiAlertCircle size={16} />}
//               onClick={onReject}
//             >
//               Từ chối
//             </Button>
//             <Button
//               color="green"
//               leftSection={<FiCheckCircle size={16} />}
//               onClick={onApprove}
//             >
//               Xác nhận đơn hàng
//             </Button>
//           </Group>
//         )}

//         {isAwaitingShipment && (
//           <Button
//             color="blue"
//             leftSection={<FiTruck size={16} />}
//           >
//             Cập nhật trạng thái giao hàng
//           </Button>
//         )}
//       </Group>

//       {cancelReason && (
//         <Paper p="sm" withBorder bg="red.0" mb="md">
//           <Group gap="xs">
//             <FiAlertCircle size={16} className="text-red-500" />
//             <Text size="sm" fw={500}>Lý do hủy: {cancelReason}</Text>
//           </Group>
//         </Paper>
//       )}

//       {note && (
//         <Paper p="sm" withBorder bg="yellow.0">
//           <Group gap="xs">
//             <FiFileText size={16} className="text-yellow-500" />
//             <Text size="sm">Ghi chú khách hàng: {note}</Text>
//           </Group>
//         </Paper>
//       )}
//     </Card>
//   );
// };

// export default OrderStatus;
