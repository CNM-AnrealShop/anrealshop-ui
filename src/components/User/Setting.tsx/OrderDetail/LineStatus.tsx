import { Stepper } from '@mantine/core';
import React from 'react';
import { FiCheck, FiCheckCircle, FiClock, FiShoppingBag, FiStar, FiTruck, FiX } from 'react-icons/fi';

interface LineStatusProps {
    activeStep: number;
}

const LineStatus: React.FC<LineStatusProps> = ({ activeStep }) => {
    return (
        <Stepper active={activeStep} color="blue" classNames={{
            stepLabel: 'flex flex-col items-center mt-4',
            step: '!flex !flex-col !items-center justify-center',
            steps: 'justify-center',
            separator: 'mx-0 -mt-12',
        }}>
            <Stepper.Step
                label="Đặt hàng"
                description="Đơn hàng đã đặt"
                icon={<FiClock size={18} />}
                completedIcon={<FiCheckCircle size={18} />}
            />
            <Stepper.Step
                label="Xác nhận"
                description="Đã thanh toán"
                icon={<FiCheckCircle size={18} />}
                completedIcon={<FiCheck size={18} />}
            />
            {activeStep < 5 && <Stepper.Step
                label="Vận chuyển"
                description="Đang giao hàng"
                icon={<FiTruck size={18} />}
                completedIcon={<FiCheckCircle size={18} />}
            />}
            {activeStep < 5 && <Stepper.Step
                label="Hoàn thành"
                description="Đã nhận hàng"
                icon={<FiShoppingBag size={18} />}
                completedIcon={<FiCheckCircle size={18} />}
            />}
            {activeStep < 5 && <Stepper.Step
                label="Đánh giá"
                description="Đánh giá sản phẩm"
                icon={<FiStar size={18} />}
                completedIcon={<FiCheckCircle size={18} />}
            />}
            {activeStep === 5 && <Stepper.Step
                label="Đóng đơn"
                description="Đơn hàng đã bị hủy"
                icon={<FiX size={18} />}
                completedIcon={<FiX size={18} />}
                color='red'
            />}
        </Stepper>
    );
};

export default LineStatus;
