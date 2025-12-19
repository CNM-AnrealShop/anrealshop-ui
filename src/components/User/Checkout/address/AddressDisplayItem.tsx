 import {
    Badge,
    Box,
    Button,
    Group,
    Paper,
    Radio,
    Text
} from '@mantine/core';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import type { AddressDto } from '../../../../types/AddressType';


interface AddressDisplayItemProps {
  address: AddressDto;
  isSelected: boolean;
  isInSelectionMode: boolean;
  onAddressClick: (address: AddressDto) => void;
  onEditAddress: (event: React.MouseEvent, address: AddressDto) => void;
}

const AddressDisplayItem: React.FC<AddressDisplayItemProps> = ({
  address,
  isSelected,
  isInSelectionMode,
  onAddressClick,
  onEditAddress,
}) => {

  return (
    <Paper
      key={`${address.receiverOrSenderName}-${address.phoneNumber}`}
      shadow="xs"
      px="md"
      py="xs"
      radius="md"
      className={`transition-all cursor-pointer ${isInSelectionMode
        ? (isSelected
          ? 'border-2 border-primary bg-picton-blue-50'
          : 'border-2 border-transparent hover:bg-gray-50'
        )
        : 'hover:bg-gray-50 border-gray-200'
        }`}
      onClick={() => onAddressClick(address)}
    >
      <Group justify="space-between" align="start">
        <Radio
          size='xs'
          checked={isSelected}
          onChange={() => onAddressClick(address)}
          label={
            <Group wrap="nowrap" align="center">
              <Text fw={600} size="sm" className="text-slate-800">
                {address.receiverOrSenderName}
              </Text>
              {address.primary && (
                <Badge variant="outline" color="blue" size="xs">
                  Mặc định
                </Badge>
              )}
            </Group>
          }
          classNames={{
            root: "flex items-center",
            body: "flex items-center",
          }}
        />

        {/* Nút chỉnh sửa địa chỉ */}
        <Button
          variant="subtle"
          color="blue"
          size="xs" 
          onClick={(e) => onEditAddress(e, address)}
        >
          <FiEdit size={14} />
        </Button>
      </Group>

      <Box ml={30} className="text-contentText">
        <Group gap="xs">
          <Text size="sm">{address.phoneNumber}</Text>
          <Box className="w-1 h-1 bg-gray-400 rounded-full"></Box>
          <Text size="sm" className="mt-2">
            {address.detailAddress + ", " + address.wardName + ", " + address.districtName + ", " + address.provinceName}
          </Text>
        </Group>
      </Box>
    </Paper>
  );
};

export default AddressDisplayItem;
