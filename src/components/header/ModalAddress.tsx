import {
    Box,
    Button,
    Group,
    Modal,
    Radio,
    Stack,
    Text,
    UnstyledButton
} from '@mantine/core';
import React, { useState } from 'react';
import { FiCheck, FiEdit, FiPlus } from 'react-icons/fi';
import { useAppSelector } from '../../hooks/useAppRedux';
import type { AddressDto } from '../../types/AddressType';
import showSuccessNotification from '../Toast/NotificationSuccess';


interface ModalAddressProps {
    opened: boolean;
    onClose: () => void;
    selectedAddress: AddressDto;
    onSelectAddress: (addressDto: AddressDto) => void;
    onApplyAddress: () => void;
}

const ModalAddress: React.FC<ModalAddressProps> = ({
    opened,
    onClose,
    selectedAddress,
    onSelectAddress,
    onApplyAddress
}) => {

    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [addresses, setAddresses] = useState<AddressDto[]>([])
    const handleClick = () => {
        showSuccessNotification('Thông báo', "Chức năng thêm địa chỉ mới chưa được triển khai");
        setAddresses([...addresses]);   // fix  no nhe 
    }

    const selectedAddressId = selectedAddress.id;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Chọn địa chỉ giao hàng"
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >

            <Stack>
                {addresses.map((address) => (
                    <Box
                        key={address.id}
                        className={`border rounded-md p-4 ${selectedAddressId === address.id ? 'border-primary bg-blue-50' : 'border-gray-300'}`}
                        onClick={() => onSelectAddress(address)}
                    >
                        <Group justify="space-between">
                            <Group>
                                <Radio
                                    checked={selectedAddressId === address.id}
                                    onChange={() => onSelectAddress(address)}
                                    size="sm"
                                />
                                <div>
                                    <Group gap="xs">
                                        <Text size="sm" fw={600}>{address.receiverOrSenderName}</Text>
                                        <Text size="sm" color="dimmed">{address.phoneNumber}</Text>
                                        {address.primary && (
                                            <Text size="xs" className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Mặc định</Text>
                                        )}
                                    </Group>
                                    <Text size="sm" className="mt-1 max-w-[400px]">{address.detailAddress + ", " + address.wardName + ", " + address.districtName + ", " + address.provinceName}</Text>
                                </div>
                            </Group>
                            <UnstyledButton className="text-primary hover:underline">
                                <Group gap="xs">
                                    <FiEdit size={14} />
                                    <Text size="sm">Sửa</Text>
                                </Group>
                            </UnstyledButton>
                        </Group>
                    </Box>
                ))}

                {isAuthenticated && (
                    <Button
                        variant="outline"
                        leftSection={<FiPlus size={16} />}
                        onClick={() => handleClick()}
                        className="mt-2"
                    >
                        Thêm địa chỉ mới
                    </Button>
                )}
            </Stack>

            <Group justify="flex-end" mt="xl">
                <Button variant="outline" onClick={onClose}>
                    Hủy
                </Button>
                <Button onClick={onApplyAddress} leftSection={<FiCheck size={16} />}>
                    Xác nhận
                </Button>
            </Group>
        </Modal>
    );
};

export default ModalAddress;