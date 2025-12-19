import React from 'react';
import { Box, Table, Text } from '@mantine/core';
import { formatPrice } from '../../../../untils/Untils';
import { convertToTextPaymentMethod } from '../../../../hooks/usePayment';
import type { PaymentMethodId } from '../../../../types/ShipmentType';

interface PaymentInfoProps {
    totalProductCost: number;
    shippingFee: number;
    shippingDiscount: number;
    voucherDiscount?: number;
    totalCost: number;
    paymentMethod: PaymentMethodId;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
    totalProductCost,
    shippingFee,
    shippingDiscount,
    voucherDiscount = 0, 
    totalCost,
    paymentMethod,
}) => {
    return (
        <Box>
            <Table verticalSpacing="xs" horizontalSpacing="lg" style={{ tableLayout: 'fixed' }}>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td style={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderBottom: 'none',
                            borderRight: '1px solid #eaeaea',
                            padding: '8px 8px 8px 0',
                            textAlign: 'right'
                        }}>
                            <Text size="sm">Tổng tiền hàng</Text>
                        </Table.Td>
                        <Table.Td style={{
                            width: '20vh',
                            textAlign: 'right',
                            border: 'none',
                            padding: '8px 0'
                        }}>
                            <Text size="sm">{formatPrice(totalProductCost)}</Text>
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td style={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderBottom: 'none',
                            borderRight: '1px solid #eaeaea',
                            padding: '8px 8px 8px 0',
                            textAlign: 'right'
                        }}>
                            <Text size="sm">Phí vận chuyển</Text>
                        </Table.Td>
                        <Table.Td style={{
                            width: '20vh',
                            textAlign: 'right',
                            border: 'none',
                            padding: '8px 0'
                        }}>
                            <Text size="sm">{formatPrice(shippingFee)}</Text>
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td style={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderBottom: 'none',
                            borderRight: '1px solid #eaeaea',
                            padding: '8px 8px 8px 0',
                            textAlign: 'right'
                        }}>
                            <Text size="sm">Giảm giá phí vận chuyển</Text>
                        </Table.Td>
                        <Table.Td style={{
                            width: '20vh',
                            textAlign: 'right',
                            border: 'none',
                            padding: '8px 0'
                        }}>
                            <Text size="sm" color="green">-{formatPrice(shippingDiscount)}</Text>
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td style={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderBottom: 'none',
                            borderRight: '1px solid #eaeaea',
                            padding: '8px 8px 8px 0',
                            textAlign: 'right'
                        }}>
                            <Text size="sm">Voucher từ Shopee</Text>
                        </Table.Td>
                        <Table.Td style={{
                            width: '20vh',
                            textAlign: 'right',
                            border: 'none',
                            padding: '8px 0'
                        }}>
                            <Text size="sm" color="green">{formatPrice(-voucherDiscount)}</Text>
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td style={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderBottom: 'none',
                            borderRight: '1px solid #eaeaea',
                            padding: '8px 8px 8px 0',
                            textAlign: 'right'
                        }}>
                            <Text fw={500}>Thành tiền</Text>
                        </Table.Td>
                        <Table.Td style={{
                            width: '20vh',
                            textAlign: 'right',
                            border: 'none',
                            padding: '8px 0'
                        }}>
                            <Text size="lg" fw={700} color="red">{formatPrice(totalCost)}</Text>
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td style={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderBottom: 'none',
                            borderRight: '1px solid #eaeaea',
                            padding: '16px 8px 8px 0',
                            textAlign: 'right'
                        }}>
                            <Text size="sm" fw={500}>Phương thức Thanh toán</Text>
                        </Table.Td>
                        <Table.Td style={{
                            width: '20vh',
                            textAlign: 'right',
                            border: 'none',
                            paddingTop: '16px',
                            paddingRight: '0',
                        }}>
                            <Text size="sm">{convertToTextPaymentMethod(paymentMethod)}</Text>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Box>
    );
};

export default PaymentInfo;
