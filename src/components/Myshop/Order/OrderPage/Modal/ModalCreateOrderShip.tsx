import { Button, Group, Modal, Select, Text, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { FiPackage } from 'react-icons/fi';
import { formatDateForBe } from '../../../../../untils/Untils';

interface ModalCreateOrderShipProps {
    opened: boolean;
    orderId: string;
    onClose: () => void;
    onSubmit: (orderId: string, pickupDate: string, note: string) => void;
    isSubmitting?: boolean;
}

const ModalCreateOrderShip: React.FC<ModalCreateOrderShipProps> = ({
    opened,
    orderId,
    onClose,
    onSubmit,
    isSubmitting = false
}) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDateOption = (date: Date) => ({
        value: date.toISOString().split('T')[0],
        label: date === today ? 'Hôm nay' : 'Ngày mai'
    });

    const [pickupDate, setPickupDate] = useState(formatDateOption(today).value);
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        onSubmit(orderId, formatDateForBe(new Date(pickupDate)), note);
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Hẹn giao hàng"
            centered
            size="md"
        >
            <Text size="sm" color="dimmed" mb="md">
                Vui lòng chọn ngày lấy hàng và thêm ghi chú nếu cần
            </Text>

            <Select
                label="Ngày lấy hàng"
                required
                value={pickupDate}
                onChange={(value) => setPickupDate(value || formatDateOption(today).value)}
                data={[
                    formatDateOption(today),
                    formatDateOption(tomorrow)
                ]}
                mb="md"
            />

            <Textarea
                label="Ghi chú"
                placeholder="Nhập ghi chú cho đơn hàng (nếu có)"
                value={note}
                onChange={(e) => setNote(e.currentTarget.value)}
                minRows={3}
                mb="xl"
            />

            <Group justify="flex-end" mt="md">
                <Button variant="light" onClick={onClose}>
                    Hủy bỏ
                </Button>
                <Button
                    leftSection={<FiPackage size={16} />}
                    onClick={handleSubmit}
                    loading={isSubmitting}
                >
                    Xác nhận
                </Button>
            </Group>
        </Modal>
    );
};

export default ModalCreateOrderShip;
