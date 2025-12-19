
import { Box, Text } from '@mantine/core';
import type { IconType } from 'react-icons'; 
interface AddMediaButtonProps {
  label: string;
  icon: IconType;
  onClick: () => void;
}

const AddMediaButton = ({ label, icon: Icon, onClick }: AddMediaButtonProps) => {
  return (
    <Box
      className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 flex-shrink-0"
      w={80}
      h={80}
      onClick={onClick}
    >
      <Icon size={20} className="text-gray-400" />
      <Text size="xs" c="dimmed" ta="center">
        {label}
      </Text>
    </Box>
  );
};

export default AddMediaButton;