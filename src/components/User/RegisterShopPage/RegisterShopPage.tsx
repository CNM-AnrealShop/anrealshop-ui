import { Button, Container, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaChartLine, FaComment, FaStar, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constant';
import ShopService from '../../../service/ShopService';
import showErrorNotification from '../../Toast/NotificationError';
import showSuccessNotification from '../../Toast/NotificationSuccess';
import type { ShopCreateRequest } from '../../../types/ShopType';
import { getErrorMessage } from '../../../untils/ErrorUntils';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppRedux';
import { createShopForUser } from '../../../store/authSlice';
import { useEffect } from 'react';

const RegisterShopPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);
    
    useEffect(() => {
        let time: NodeJS.Timeout;
        if (user?.hasShop) {
            showSuccessNotification("Thông báo", "Bạn đã có cửa hàng. Đang chuyển hướng...");
            time = setTimeout(() => {
                navigate(APP_ROUTES.MYSHOP.BASE);
            }, 3000);
        }
        return () => clearTimeout(time);
    }, [user]);

    const form = useForm({
        initialValues: {
            shopName: '',
        },
        validate: {
            shopName: (value) =>
                value.trim().length < 5 ? '   Tên cửa hàng phải có ít nhất 5 ký tự' : null,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        if (!form.isValid()) {
            return;
        }
        const data: ShopCreateRequest = {
            name: values.shopName
        }
        ShopService.createShop(data).then((response) => {
            showSuccessNotification("Thành công", "Đăng ký cửa hàng thành công! Đang chuyển hướng...");
            dispatch(createShopForUser(response));
            setTimeout(() => {
                navigate(APP_ROUTES.MYSHOP.BASE);
            }, 3000);
        }).catch((err) => {
            showErrorNotification("Thông báo", getErrorMessage(err));
        })

    };

    const handleBack = () => {
        navigate(APP_ROUTES.HOME);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
            {/* Wave Background */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
                    <motion.path
                        fill="rgba(59, 130, 246, 0.1)"
                        d="M0,400 C480,500 960,300 1440,400 L1440,800 L0,800 Z"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.path
                        fill="rgba(59, 130, 246, 0.05)"
                        d="M0,500 C480,600 960,400 1440,500 L1440,800 L0,800 Z"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                    />
                </svg>
            </motion.div>

            <Container size="lg" className="w-full relative z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper shadow="md" radius="md" className="overflow-hidden backdrop-blur-sm bg-white/50">
                        <div className="grid md:grid-cols-2 min-h-[600px]">
                            {/* Left side - Form */}
                            <motion.div
                                className="p-8 md:p-12 md:px-20 flex flex-col "
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    leftSection={<FaArrowLeft size={16} />}
                                    onClick={handleBack}
                                    className="mb-6 w-fit"
                                >
                                    Quay lại
                                </Button>

                                <div className="flex-1 flex flex-col justify-center">
                                    <motion.div
                                        className="mb-8"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <h1 className="text-4xl font-bold mb-4">
                                            <motion.span
                                                className="text-primary"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                            >
                                                Anreal
                                            </motion.span>
                                            <motion.span
                                                className="text-black"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.5 }}
                                            >
                                                Shop
                                            </motion.span>
                                        </h1>
                                        <Text size="lg" c="dimmed" className="mb-6">
                                            Đăng ký cửa hàng của bạn và bắt đầu kinh doanh ngay hôm nay
                                        </Text>
                                    </motion.div>

                                    <motion.form
                                        onSubmit={form.onSubmit(handleSubmit)}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        <Stack gap="md">
                                            <TextInput
                                                placeholder="Nhập tên cửa hàng của bạn"
                                                size="md"
                                                required
                                                radius="xl"
                                                {...form.getInputProps('shopName')}
                                            />

                                            <Button
                                                type="submit"
                                                size="md"
                                                fullWidth
                                                radius="xl"
                                                className="mt-4"
                                            >
                                                Đăng ký
                                            </Button>

                                            <Text size="sm" c="dimmed" className="text-center mt-2">
                                                Bạn chưa có tài khoản người dùng?{' '}
                                                <a href="/register" className="text-primary hover:underline font-medium">
                                                    Đăng ký
                                                </a>
                                            </Text>
                                        </Stack>
                                    </motion.form>
                                </div>
                            </motion.div>

                            {/* Right side - Image */}
                            <motion.div
                                className="hidden md:flex items-center justify-center p-8 relative"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {/* Floating Stats Cards */}
                                <motion.div
                                    className="absolute top-24 left-8 z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="bg-yellow-100 p-2 rounded-lg">
                                            <FaStar className="text-yellow-500" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Đánh giá</p>
                                            <p className="font-bold text-gray-800">4.8/5</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute top-1/3 right-8 z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <FaUsers className="text-blue-500" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Người theo dõi</p>
                                            <p className="font-bold text-gray-800">2.5K+</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute bottom-24 left-24 z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1.0 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="bg-green-100 p-2 rounded-lg">
                                            <FaComment className="text-green-500" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Nhận xét</p>
                                            <p className="font-bold text-gray-800">1.2K+</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute bottom-1/3 right-16 z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="bg-purple-100 p-2 rounded-lg">
                                            <FaChartLine className="text-purple-500" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Doanh số</p>
                                            <p className="font-bold text-gray-800">50M+</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute p-1 rounded-2xl bg-gradient-to-br z-40"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <img
                                        src="/images/register2.png"
                                        alt="Register Shop"
                                        className="max-w-[99%] max-h-[95%] object-contain rounded-xl"
                                    />
                                </motion.div>

                                {/* Random blurred circles */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <motion.div
                                        className="absolute top-10 right-0 w-32 h-32 bg-primary/90 rounded-full blur-3xl"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.9, 0.6, 0.9],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <motion.div
                                        className="absolute top-1/3 left-16 w-40 h-40 bg-blue-400/40 rounded-full blur-2xl"
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.4, 0.2, 0.4],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.5,
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-20 left-20 w-36 h-36 bg-blue-300/35 rounded-full blur-3xl"
                                        animate={{
                                            scale: [1, 1.25, 1],
                                            opacity: [0.35, 0.15, 0.35],
                                        }}
                                        transition={{
                                            duration: 4.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1,
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-primary/30 rounded-full blur-2xl"
                                        animate={{
                                            scale: [1, 1.4, 1],
                                            opacity: [0.3, 0.1, 0.3],
                                        }}
                                        transition={{
                                            duration: 3.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1.5,
                                        }}
                                    />
                                    <motion.div
                                        className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500/30 rounded-full blur-3xl"
                                        animate={{
                                            scale: [1, 1.35, 1],
                                            opacity: [0.3, 0.15, 0.3],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 2,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </Paper>
                </motion.div>
            </Container>
        </div>
    );
};

export default RegisterShopPage;
