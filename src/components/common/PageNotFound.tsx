import { Button, Container, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PageNotFoundProps {
    title?: string;
    description?: string;
    redirectLink?: string;
    redirectLabel?: string;
    imageUrl?: string;
}

const PageNotFound: React.FC<PageNotFoundProps> = ({
    title = 'Trang không tồn tại',
    description = 'Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.',
    redirectLink,
    redirectLabel = 'Về trang chủ',
    imageUrl = '/images/404.png'
}) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        if (redirectLink)
            navigate(redirectLink);
    };

    return (
        <Container size="md" className="py-6 ">
            <Stack align="center" gap={0} className="text-center min-h-[60vh] justify-center bg-white pb-6 rounded-md shadow-md overflow-hidden">
                <div className="w-full h-full object-fill max-w-2xl rounded-md overflow-hidden mb-4">
                    <img
                        src={imageUrl}
                        alt="404 Not Found"
                        className="w-full h-auto"
                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                    />
                </div>
                <Title order={5} className="text-xl md:text-md font-bold text-gray-800">
                    {title}
                </Title>
                <Text size="lg" className="text-gray-600 max-w-md">
                    {description}
                </Text>
                {redirectLink && <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 mt-2"
                    onClick={handleRedirect}
                >
                    {redirectLabel}
                </Button>}
            </Stack>
        </Container>
    );
};

export default PageNotFound;
