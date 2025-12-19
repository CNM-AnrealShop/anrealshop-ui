import { Box, Divider, Group, Paper, Text, Title } from '@mantine/core';
import React from 'react';
import { FiMapPin, FiPhone, FiUser } from 'react-icons/fi';
import { ButtonCopy } from '../../../common/ButtonCopy';

interface AddressInfoProps {
    name: string;
    phone: string;
    address: string;
    title?: string;
    shippingCarrier?: string;
    trackingNumber?: string;
}

const AddressInfo: React.FC<AddressInfoProps> = ({
    name,
    phone,
    address,
    title = 'Thông tin giao hàng',
    shippingCarrier,
    trackingNumber
}) => {
    return (
        <Paper withBorder p="md" radius="md" className='min-h-[276px]'>
            <Title order={4} mb="md">{title}</Title>

            <Box mb="md">
                <Group gap="xs" mb="xs">
                    <FiUser size={16} className="text-gray-500" />
                    <Text size="sm" fw={500}>{name}</Text>
                </Group>

                <Group gap="xs" mb="xs" >
                    <FiPhone size={16} className="text-gray-500" />
                    <Text size="sm">{phone}</Text>
                </Group>

                <Group className='!flex !flex-nowrap gap-3' >
                    <FiMapPin size={20} className="text-gray-500 self-start" />
                    <Text size="sm">
                        {address}
                    </Text>
                </Group>
            </Box>

            <Divider my="md" />
            {trackingNumber ? (
                <Box>
                        {shippingCarrier && (
                            <Group mb="sm">
                                <Text size="sm" fw={500}>Đơn vị vận chuyển:</Text>
                                <Text size="sm">{shippingCarrier}</Text>
                            </Group>
                        )}

                        {trackingNumber && (
                            <Group >
                                <Group>
                                    <Text size="sm" fw={500}>Mã vận đơn:</Text>
                                    <ButtonCopy id={trackingNumber} />
                                </Group>
                                <Text size="sm" className='hover:underline cursor-pointer'>{trackingNumber}</Text>
                            </Group>
                        )}
                    </Box>
            ) : (
                <Text size="sm" color="dimmed">Chưa có thông tin vận đơn.</Text>
            )}
        </Paper>
    );
};

export default AddressInfo;
