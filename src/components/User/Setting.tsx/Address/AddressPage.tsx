import {
    Badge,
    Box,
    Button,
    Divider,
    Group,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
    UnstyledButton
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useAppDispatch } from '../../../../hooks/useAppRedux';
import { AddressService } from '../../../../service/AddressService';
import { fetchCurrentUser } from '../../../../store/authSlice';
import type { AddressDto, AddressRequestDto } from '../../../../types/AddressType';
import { ConfirmDeleteModal } from '../../../common/ConfirmDeleteModal';
import { ContentEmpty } from '../../../common/ContentEmpty';
import showErrorNotification from '../../../Toast/NotificationError';
import showSuccessNotification from '../../../Toast/NotificationSuccess';
import { AddressModal } from './AddressModal';
import { useURLParams } from '../../../../hooks/useURLParams';

export const AddressPage = () => {
    const [addresses, setAddresses] = useState<AddressDto[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressDto | null>(null);
    const [addressToDelete, setAddressToDelete] = useState<AddressDto | null>(null);
    const [loading, setLoading] = useState(false);

    const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
    const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

    const { redirectTo } = useURLParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        setLoading(true);
        AddressService.getUserAddresses()
            .then((data) => {
                setAddresses(data);
            })
            .catch(() => {
                showErrorNotification('Lỗi', 'Không thể tải danh sách địa chỉ');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleAddNew = () => {
        setSelectedAddress(null);
        openModal();
    };

    const handleEdit = (address: AddressDto) => {
        setSelectedAddress(address);
        openModal();
    };

    const handleDelete = (address: AddressDto) => {
        setAddressToDelete(address);
        openDeleteModal();
    };

    const handleSetDefault = async (addressId: string) => {
        const address = addresses.find(addr => addr.id === addressId);
        if (!address) return;

        const requestDto: AddressRequestDto = {
            receiverOrSenderName: address.receiverOrSenderName,
            phoneNumber: address.phoneNumber,
            detailAddress: address.detailAddress,
            wardId: address.wardId,
            isPrimary: true
        };

        AddressService.updateUserAddress(addressId, requestDto)
            .then(() => {
                setAddresses(addresses.map(addr => ({
                    ...addr,
                    primary: addr.id === addressId
                })));
                dispatch(fetchCurrentUser());
                showSuccessNotification('Thành công', 'Đã đặt làm địa chỉ mặc định');
            })
            .catch(() => {
                showErrorNotification('Thông báo', 'Không thể đặt làm địa chỉ mặc định');
            });
    };

    const handleSaveAddress = async (addressData: AddressRequestDto) => {
        try {
            if (selectedAddress) {
                await AddressService.updateUserAddress(selectedAddress.id, addressData);
                await fetchAddresses();
                if (addressData.isPrimary || selectedAddress.primary) {
                    dispatch(fetchCurrentUser());
                }
                showSuccessNotification('Thành công', 'Cập nhật địa chỉ thành công');
            } else {
                await AddressService.createUserAddress(addressData);
                await fetchAddresses();
                if (addressData.isPrimary || addresses.length === 0) {
                    dispatch(fetchCurrentUser());
                }
                showSuccessNotification('Thành công', 'Thêm địa chỉ mới thành công');
                redirectTo();
            }
            closeModal();
        } catch (error) {
            showErrorNotification('Lỗi', selectedAddress ? 'Không thể cập nhật địa chỉ' : 'Không thể thêm địa chỉ mới');
        }
    };

    const handleConfirmDelete = async () => {
        if (addressToDelete) {
            AddressService.deleteUserAddress(addressToDelete.id)
                .then(() => {
                    setAddresses(addresses.filter(addr => addr.id !== addressToDelete.id));
                    if (addressToDelete.primary) {
                        dispatch(fetchCurrentUser());
                    }
                    showSuccessNotification('Thành công', 'Xóa địa chỉ thành công');
                    setAddressToDelete(null);
                    closeDeleteModal();
                })
                .catch(() => {
                    showErrorNotification('Lỗi', 'Không thể xóa địa chỉ');
                });
        }
    };

    return (
        <div className='min-h-[70vh]'>
            <Group justify="space-between" mb="md">
                <div>
                    <Title order={4} mb={4}>Địa chỉ giao hàng</Title>
                    <Text size="sm" c="dimmed">
                        Quản lý địa chỉ giao hàng của bạn
                    </Text>
                </div>
                <Button
                    size="xs"
                    leftSection={<FiPlus size={14} />}
                    onClick={handleAddNew}
                >
                    Thêm địa chỉ mới
                </Button>
            </Group>

            {loading ? (
                <Stack gap="md">
                    {[1, 2, 3].map((index) => (
                        <Paper key={index} shadow="sm" p="md" radius="md" className="border-2 border-gray-200">
                            <Group justify="space-between" align="flex-start">
                                <Box style={{ flex: 1 }}>
                                    <Skeleton height={20} width="40%" mb="xs" />
                                    <Skeleton height={16} width="30%" mb="xs" />
                                    <Skeleton height={16} width="80%" />
                                </Box>
                                <Group gap="xs">
                                    <Skeleton height={32} width={60} />
                                    <Skeleton height={32} width={60} />
                                </Group>
                            </Group>
                        </Paper>
                    ))}
                </Stack>
            ) : addresses.length === 0 ? (
                <ContentEmpty
                    title="Chưa có địa chỉ nào"
                    description="Thêm địa chỉ giao hàng để thuận tiện cho việc mua sắm"
                    buttonText="Thêm địa chỉ đầu tiên"
                    onButtonClick={handleAddNew}
                    imageType="boan_khoan"
                    height="min-h-[60vh]"
                />
            ) : (
                <Stack gap="md">
                    {addresses.map((address) => (
                        <Paper
                            key={address.id}
                            shadow="sm"
                            p="md"
                            radius="md"
                            className={`border ${address.primary
                                ? 'border-primary bg-blue-50/30'
                                : 'border-gray-200'
                                }`}
                        >
                            <Group justify="space-between" align="flex-start">
                                <Box style={{ flex: 1 }}>
                                    <Group gap="xs" mb="xs">
                                        <Text size="md" fw={600}>
                                            {address.receiverOrSenderName}
                                        </Text>
                                        {address.primary && (
                                            <Badge color="blue" variant="light">
                                                Mặc định
                                            </Badge>
                                        )}
                                    </Group>

                                    <Group >
                                        <Text size="sm" c="dimmed" mb="">
                                            {address.phoneNumber}
                                        </Text>
                                        <Divider orientation="vertical" />
                                        <Text size="sm" className="max-w-[600px]">
                                            {address.detailAddress}, {address.wardName}, {address.districtName}, {address.provinceName}
                                        </Text>
                                    </Group>

                                    {!address.primary && (
                                        <UnstyledButton
                                            onClick={() => handleSetDefault(address.id)}
                                            className="text-primary hover:underline mt-3"
                                        >
                                            <Text size="sm">Đặt làm mặc định</Text>
                                        </UnstyledButton>
                                    )}
                                </Box>

                                <Group gap="xs">
                                    <Button
                                        variant="subtle"
                                        size="xs"
                                        leftSection={<FiEdit size={14} />}
                                        onClick={() => handleEdit(address)}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        variant="subtle"
                                        color="red"
                                        size="xs"
                                        leftSection={<FiTrash2 size={14} />}
                                        onClick={() => handleDelete(address)}
                                    >
                                        Xóa
                                    </Button>
                                </Group>
                            </Group>
                        </Paper>
                    ))}
                </Stack>
            )}

            <AddressModal
                opened={openedModal}
                onClose={closeModal}
                address={selectedAddress}
                onSave={handleSaveAddress}
            />

            <ConfirmDeleteModal
                opened={openedDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa địa chỉ"
                message="Bạn có chắc chắn muốn xóa địa chỉ này?"
                itemName={addressToDelete ? `${addressToDelete.receiverOrSenderName} - ${addressToDelete.phoneNumber}` : undefined}
                confirmText="Xóa địa chỉ"
                cancelText="Hủy"
            />
        </div>
    );
};
