import {
    Alert,
    Button,
    Container,
    Group,
    Paper
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { FiAlertTriangle, FiHome, FiPackage } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { CheckoutService } from '../../../service/CheckoutService';
import type { PaymentResultData } from '../../../types/PaymentResultType';
import { getErrorMessage } from '../../../untils/ErrorUntils';
import showErrorNotification from '../../Toast/NotificationError';
import PaymentFailureView from './Error';
import PaymentPendingView from './Pending';
import { PaymentResultSkeleton } from './Skeleton';
import PaymentSuccessView from './Success';
import { LOCAL_STORAGE_KEYS } from '../../../constant';


const PaymentResultPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [loading, setLoading] = useState(true);
    const [paymentResult, setPaymentResult] = useState<PaymentResultData | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (orderId) {
            setLoading(true);

            CheckoutService.getOrderResult(orderId)
                .then(data => {
                    setPaymentResult(data);
                    localStorage.removeItem(LOCAL_STORAGE_KEYS.ORDER_ITEM_IDS);
                })
                .catch(err => {
                    setError(true);
                    showErrorNotification("Lỗi lấy thông tin thanh toán", getErrorMessage(err));
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [orderId]);

    if (loading) {
        return <PaymentResultSkeleton />;
    }

    if (error || !paymentResult) {
        return (
            <>
                <Container size="md" className="py-12">
                    <Paper radius="md" shadow="md" p="xl">
                        <Alert
                            icon={<FiAlertTriangle size={20} />}
                            title="Có lỗi xảy ra"
                            color="red"
                            className="mb-6"
                        >
                            {error || "Không thể tải thông tin thanh toán. Vui lòng thử lại sau."}
                        </Alert>

                        <Group justify="center" mt="xl">
                            <Button
                                component={Link}
                                to="/"
                                leftSection={<FiHome size={16} />}
                                variant="outline"
                                color="gray"
                            >
                                Về trang chủ
                            </Button>
                            <Button
                                component={Link}
                                to="/settings/orders"
                                leftSection={<FiPackage size={16} />}
                                color="blue"
                                className="bg-primary"
                            >
                                Kiểm tra đơn hàng
                            </Button>
                        </Group>
                    </Paper>
                </Container>
            </>
        );
    }

    if (paymentResult.paymentStatus === 'COMPLETED') {
        return <PaymentSuccessView paymentResult={paymentResult} />;
    } else if (paymentResult.paymentStatus === 'COD' || paymentResult.paymentMethod === 'cash_on_delivery') {
        return <PaymentPendingView paymentResult={paymentResult} />;
    } else {
        return <PaymentFailureView paymentResult={paymentResult} />;
    }
};

export default PaymentResultPage;