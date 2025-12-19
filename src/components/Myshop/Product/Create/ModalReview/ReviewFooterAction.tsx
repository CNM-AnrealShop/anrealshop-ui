// import { Button, Group } from '@mantine/core';
// import { FiEdit3, FiSend } from 'react-icons/fi';

// interface ReviewFooterActionProps {
//   onBack: () => void;
//   onSubmit: () => void;
//   isPreview?: boolean;
// }

// const ReviewFooterAction = ({ onBack, onSubmit, isPreview = false }: ReviewFooterActionProps) => {
//   if (isPreview) return null;

//   return (
//     <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 shadow-lg">
//       <Group justify="center" gap="md">
//         <Button 
//           variant="outline" 
//           onClick={onBack}
//           leftSection={<FiEdit3 size={16} />}
//           size="lg"
//           radius="xl"
//           className="px-8"
//         >
//           Quay lại chỉnh sửa
//         </Button>
//         <Button 
//           onClick={onSubmit}
//           leftSection={<FiSend size={16} />}
//           size="lg"
//           radius="xl"
//           className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8"
//         >
//           Đăng sản phẩm
//         </Button>
//       </Group>
//     </div>
//   );
// };

// export default ReviewFooterAction;
