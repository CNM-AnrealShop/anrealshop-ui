import { Card, Text, ThemeIcon } from '@mantine/core';
import { FiAlertTriangle, FiInfo, FiPrinter } from 'react-icons/fi';

const PrintInfoPage = () => {
    return (
        <Card shadow="xs" p="md" mt="md" radius="md" withBorder>
            <div className="flex items-center gap-2 mb-3">
                <ThemeIcon size="md" radius="xl" color="blue">
                    <FiInfo size={16} />
                </ThemeIcon>
                <Text fw={600} size="sm">Hướng dẫn in phiếu giao hàng</Text>
            </div>

            <Text size="xs" c="dimmed" mb="md">
                Tính năng in phiếu giao hàng giúp bạn in phiếu giao hàng cho đơn hàng đã chọn,
                tiết kiệm thời gian và công sức xử lý đơn hàng.
            </Text>



            <Text size="xs" fw={500} className="flex items-center gap-1 mb-1">
                <FiPrinter size={12} className="text-blue-500" />
                <span>Mẹo in phiếu:</span>
            </Text>
            <Text size="xs" c="dimmed" mb="md">
                Chọn khổ giấy phù hợp với máy in của bạn. Khổ A4 phù hợp cho các máy in văn phòng,
                K80 phù hợp cho máy in hóa đơn.
            </Text>

            <Text size="xs" fw={500} className="flex items-center gap-1">
                <FiAlertTriangle size={12} className="text-amber-500" />
                <span>Lưu ý: Kiểm tra kỹ thông tin trước khi in</span>
            </Text>
        </Card>
    );
};

export default PrintInfoPage;