import { Badge, Box, Button, Collapse, Group, Paper, Radio, Stack, Text } from '@mantine/core';
import { FiClock, FiChevronDown, FiChevronUp, FiTruck } from 'react-icons/fi';
import { useState } from 'react';
import { formatPrice } from '../../../untils/Untils';

// Interface cho phương thức vận chuyển
interface ShippingMethod {
    id: string;
    name: string;
    price: number;
    estimatedDelivery: string;
    icon: React.ReactNode;
    description: string;
    badge?: string;
    badgeColor?: string;
}

interface TransportProps {
    shippingMethods: ShippingMethod[];
    selectedShippingMethod: string;
    setSelectedShippingMethod: (id: string) => void;
}

const Transport = ({
    shippingMethods,
    selectedShippingMethod,
    setSelectedShippingMethod
}: TransportProps) => {
    // State để quản lý trạng thái hiển thị của danh sách phương thức vận chuyển
    const [expanded, setExpanded] = useState(false);
    
    // Tìm phương thức vận chuyển hiện tại được chọn để hiển thị khi thu gọn
    const selectedMethod = shippingMethods.find(method => method.id === selectedShippingMethod);
    
    return (
        <Paper
            radius="md"
            shadow="sm"
            p="md"
            className="bg-white mb-6"
        >
            <Group justify="space-between" className="mb-3">
                <Text fw={600} size="md" className="text-slate-800 flex items-center">
                    <FiTruck className="inline-block mr-2" size={18} />
                    Phương thức vận chuyển
                </Text>
                
                {/* Nút ẩn/hiện */}
                <Button
                    variant="subtle"
                    color="gray"
                    size="xs"
                    onClick={() => setExpanded(!expanded)}
                    rightSection={expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                >
                    {expanded ? "Thu gọn" : "Xem tất cả"}
                </Button>
            </Group>

            {/* Hiển thị phương thức đã chọn khi đang thu gọn */}
            {!expanded && selectedMethod && (
                <Paper
                    shadow="xs"
                    px="md"
                    py="sm"
                    radius="md"
                    className="border-2 border-transparent  cursor-pointer transition-all hover:!bg-gray-50"
                    onClick={() => setExpanded(true)}
                >
                    <Group justify="space-between" align="flex-start">
                        <Group gap="md">
                            <Radio
                                size='xs'
                                checked={true}
                                readOnly
                                classNames={{
                                    root: "flex items-center",
                                    body: "flex items-center",
                                }}
                            />
                            
                            <Box className={`bg-${selectedMethod.id === 'express' ? 'amber' : selectedMethod.id === 'same_day' ? 'green' : 'picton-blue'}-50 p-2 rounded-full flex-shrink-0`}>
                                {selectedMethod.icon}
                            </Box>
                            
                            <Box>
                                <Group wrap="nowrap" gap="xs">
                                    <Text fw={600} size="sm" className="text-slate-800">
                                        {selectedMethod.name}
                                    </Text>
                                    {selectedMethod.badge && (
                                        <Badge color={selectedMethod.badgeColor} variant="light" size="xs">
                                            {selectedMethod.badge}
                                        </Badge>
                                    )}
                                </Group>
                                <Text size="xs" c="dimmed" mt={4}>
                                    {selectedMethod.description}
                                </Text>
                            </Box>
                        </Group>
                        
                        <Box className="text-right">
                            <Text fw={600} size='sm' className="!text-primary">
                                {formatPrice(selectedMethod.price)}
                            </Text>
                            <Text size="xs" c="dimmed">
                                <FiClock className="inline-block mr-1" size={10} />
                                {selectedMethod.estimatedDelivery}
                            </Text>
                        </Box>
                    </Group>
                </Paper>
            )}

            {/* Danh sách đầy đủ các phương thức vận chuyển */}
            <Collapse in={expanded}>
                <Stack gap="md" mt={expanded ? 3 : 0}>
                    {shippingMethods.map((method) => (
                        <Paper
                            key={method.id}
                            shadow="xs"
                            p="md"
                            radius="md"
                            className={`transition-all cursor-pointer border-2 ${selectedShippingMethod === method.id
                                    ? 'border-primary bg-picton-blue-50'
                                    : 'border-transparent hover:bg-gray-50'
                                }`}
                            onClick={() => {setSelectedShippingMethod(method.id); setExpanded(false);}}
                        >
                            <Group justify="space-between" align="flex-start">
                                <Group gap="md">
                                    {/* Radio (Checkbox) đầu tiên */}
                                    <Radio
                                    size='xs'
                                        classNames={{
                                            root: "flex items-center",
                                            body: "flex items-center",
                                        }}
                                        checked={selectedShippingMethod === method.id}
                                        onChange={() => {setSelectedShippingMethod(method.id)}}
                                    />
                                    
                                    {/* Icon thứ hai */}
                                    <Box className={`bg-${method.id === 'express' ? 'amber' : method.id === 'same_day' ? 'green' : 'picton-blue'}-50 p-2 rounded-full flex-shrink-0`}>
                                        {method.icon}
                                    </Box>
                                    
                                    {/* Nội dung thứ ba */}
                                    <Box>
                                        <Group wrap="nowrap" gap="xs">
                                            <Text fw={600} size="sm" className="text-slate-800">
                                                {method.name}
                                            </Text>
                                            {method.badge && (
                                                <Badge color={method.badgeColor} variant="light" size="sm">
                                                    {method.badge}
                                                </Badge>
                                            )}
                                        </Group>
                                        <Text size="xs" color="dimmed" mt={4}>
                                            {method.description}
                                        </Text>
                                    </Box>
                                </Group>
                                
                                {/* Giá và thời gian giao hàng */}
                                <Box className="text-right">
                                    <Text fw={600} size='sm' className="!text-primary">
                                        {formatPrice(method.price)}
                                    </Text>
                                    <Text size="xs" color="dimmed">
                                        <FiClock className="inline-block mr-1" size={10} />
                                        {method.estimatedDelivery}
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>
                    ))}
                </Stack>
            </Collapse>
        </Paper>
    );
};

export default Transport;