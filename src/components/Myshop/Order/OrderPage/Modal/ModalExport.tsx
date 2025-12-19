import { Button, Group, Modal, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import { FiCalendar, FiDownload } from 'react-icons/fi';

interface ModalExportProps {
    opened: boolean;
    onClose: () => void;
}

const ModalExport = ({ opened, onClose }: ModalExportProps) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

    const handleExport = () => {
        console.log('Exporting data between:', dateRange[0], 'and', dateRange[1]);
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Xuất dữ liệu" size="md" centered >
            <div className="min-h-[40vh] relative">
                <Text size="sm" mb="md">Chọn khoảng thời gian để xuất dữ liệu đơn hàng</Text>


                <DatePickerInput
                    type="range"
                    placeholder="Chọn khoảng thời gian"
                    value={dateRange}
                    onChange={setDateRange}
                    clearable
                    valueFormat="DD/MM/YYYY"
                    locale="vi"
                    leftSection={<FiCalendar size={16} />}
                    // rightSection={!equalDateWithDefault() ? (
                    //     <ActionIcon size="sm" variant="subtle" onClick={() => onDateChange(getDefaultDateRange_Now_Yesterday())}>
                    //         <FiX size={14} />
                    //     </ActionIcon>
                    // ) : <></>}
                    style={{ minWidth: '300px' }}
                />

            </div>
            <Group justify="flex-end" mt="md">
                <Button variant="outline" onClick={onClose}>Hủy</Button>
                <Button
                    leftSection={<FiDownload size={16} />}
                    onClick={handleExport}
                    disabled={!dateRange[0] || !dateRange[1]}
                >
                    Xuất dữ liệu
                </Button>
            </Group>
        </Modal>
    );
};

export default ModalExport;