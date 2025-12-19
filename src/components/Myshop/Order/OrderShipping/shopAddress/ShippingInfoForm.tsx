import { Button, Card, Divider, Group, Select, Text, Textarea } from '@mantine/core';
import { useState } from 'react';
import { FiEdit, FiPackage } from 'react-icons/fi';
import type { PreparingStatus } from '../../../../../hooks/useOrder';
import type { AddressDto } from '../../../../../types/AddressType';
import { formatDateForBe } from '../../../../../untils/Untils';
import ModalAddress from '../../../../header/ModalAddress';


interface ShippingInfoFormProps {
    shopAddress: AddressDto | undefined;
    countOrderItems: number;
    isSubmitting: boolean;
    onSubmit: (note: string, pickupDate: string) => void;
    preparingStatus?: PreparingStatus;
}


const ShippingInfoForm = ({
    shopAddress,
    isSubmitting,
    onSubmit,
    countOrderItems,
    preparingStatus
}: ShippingInfoFormProps) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDateOption = (date: Date) => ({
        value: date.toISOString().split('T')[0],
        label: date === today ? 'Hôm nay' : 'Ngày mai'
    });

    const [pickupDate, setPickupDate] = useState(formatDateOption(today).value);
    const [note, setNote] = useState('');
    const [addressModalOpened, setAddressModalOpened] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<AddressDto | undefined>(shopAddress);

    const handleSubmit = () => {
        // if (!selectedAddress) {
        //     return;
        // }
        onSubmit(note, formatDateForBe(new Date(pickupDate)));
    };

    const handleApplyAddress = () => {

        setAddressModalOpened(false);
    };



    return (
        <Card shadow="xs" p="md" radius="md" withBorder >
            <Text fw={500} size="lg" mb="md">
                Thông tin vận chuyển
            </Text>
            <Text size="sm" c="dimmed" mb="md">
                <span className="font-bold text-blue-500">{countOrderItems}</span> đơn hàng đã chọn
            </Text>
            <div className="space-y-4">
                <Card withBorder px="md" py="sm" radius="md">
                    <Group justify="space-between" mb="xs">
                        <Text fw={500} size="sm">Địa chỉ lấy hàng</Text>
                        <Button
                            variant="subtle"
                            size="xs"
                            leftSection={<FiEdit size={14} />}
                            onClick={() => setAddressModalOpened(true)}
                        >
                            Đổi
                        </Button>
                    </Group>

                    <Group mb="xs" gap="xs">
                        <Text size="sm" fw={500}>{selectedAddress?.receiverOrSenderName ? selectedAddress.receiverOrSenderName : 'Chưa có thông tin'}</Text>
                        <Text size="sm">{selectedAddress?.phoneNumber ? selectedAddress.phoneNumber : 'Chưa có thông tin'}</Text>
                    </Group>

                    <Text size="sm">{selectedAddress?.detailAddress ? selectedAddress.detailAddress : 'Chưa có thông tin'}</Text>
                    <Text size="sm">{selectedAddress?.wardName ? selectedAddress.wardName : 'Chưa có thông tin'}</Text>
                    <Text size="sm">{selectedAddress?.districtName ? selectedAddress?.districtName : 'Chưa có thông tin'}</Text>
                    <Text size="sm" mb="md">{selectedAddress?.provinceName ? selectedAddress?.provinceName : 'Chưa có thông tin'}</Text>

                    <Divider my="xs" />

                    <Group justify="space-between">
                        <Text size="sm" fw={500}>Ngày lấy hàng:</Text>
                        <Select
                            value={pickupDate}
                            onChange={(value) => setPickupDate(value || formatDateOption(today).value)}
                            data={[
                                { value: new Date().toISOString().split('T')[0], label: 'Hôm nay' },
                                { value: new Date(Date.now() + 86400000).toISOString().split('T')[0], label: 'Ngày mai' }
                            ]}
                            size="xs"
                            style={{ width: 120 }}
                        />
                    </Group>
                </Card>

                <Textarea
                    label="Ghi chú"
                    placeholder="Nhập ghi chú cho đơn hàng (nếu có)"
                    value={note}
                    onChange={(e) => setNote(e.currentTarget.value)}
                    minRows={3}
                />

                <Divider my="md" />

                <Button
                    fullWidth
                    size="md"
                    leftSection={isSubmitting ? null : <FiPackage size={16} />}
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    disabled={
                        countOrderItems === 0 ||
                        isSubmitting || preparingStatus === 'preparing'
                    }
                >
                    {isSubmitting ? 'Đang xử lý...' : 'Tạo đơn giao hàng'}
                </Button>
            </div>

            {/* Address selection modal */}
            {selectedAddress && (
                <ModalAddress
                    opened={addressModalOpened}
                    onClose={() => setAddressModalOpened(false)}
                    selectedAddress={selectedAddress}
                    onSelectAddress={setSelectedAddress}
                    onApplyAddress={handleApplyAddress}
                />
            )}
        </Card>
    );
};

export default ShippingInfoForm;