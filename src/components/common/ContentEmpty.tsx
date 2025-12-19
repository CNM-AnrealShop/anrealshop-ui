import { Button, Paper, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ContentEmptyProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    imageType?: 'boan_khoan' | 'order' | 'cart' | 'product';
    height?: string;
    onButtonClick?: () => void;
    showButton?: boolean;
}

export const ContentEmpty = ({
    title = "Không có dữ liệu",
    description = "Hiện tại chưa có nội dung nào để hiển thị",
    buttonText = "Quay lại trang chủ",
    buttonLink = "/",
    height = "h-[72vh]",
    onButtonClick,
    showButton = true
}: ContentEmptyProps) => {
    const randomImage = '/images/empty.png';

    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick();
        }
    };

    return (
        <Paper withBorder p="xl" radius="md" className={`text-center ${height}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center justify-center h-full"
            >
                <motion.img
                    src={randomImage}
                    alt="Empty content"
                    className="w-48 h-48 object-contain mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <Text size="lg" fw={600} mb="xs" className="text-gray-800">
                        {title}
                    </Text>
                    <Text size="sm" c="dimmed" mb="lg" className="max-w-md mx-auto">
                        {description}
                    </Text>

                    {showButton && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {onButtonClick ? (
                                <Button onClick={handleButtonClick} size="md">
                                    {buttonText}
                                </Button>
                            ) : (
                                <Button component={Link} to={buttonLink} size="md">
                                    {buttonText}
                                </Button>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </Paper>
    );
};
