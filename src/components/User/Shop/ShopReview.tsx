import React from 'react';
import { Stack, Paper, Group, Avatar, Text, Rating, Image } from '@mantine/core';

export interface Review {
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    date: string;
    images?: string[];
}

interface ShopReviewsProps {
    reviews: Review[];
}

const ShopReviews: React.FC<ShopReviewsProps> = ({ reviews }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <Stack gap="md">
            {reviews.map((review) => (
                <Paper key={review.id} withBorder p="md">
                    <Group align="flex-start" mb="sm">
                        <Avatar src={review.userAvatar} size="md" />
                        <div style={{ flex: 1 }}>
                            <Text fw={500} size="sm">{review.userName}</Text>
                            <Group gap="xs" mb="xs">
                                <Rating value={review.rating} size="xs" readOnly />
                                <Text size="xs" color="dimmed">{formatDate(review.date)}</Text>
                            </Group>
                            <Text size="sm" mb="sm">{review.comment}</Text>
                            {review.images && (
                                <Group gap="xs">
                                    {review.images.map((img, index) => (
                                        <Image
                                            key={index}
                                            src={img}
                                            width={60}
                                            height={60}
                                            fit="cover"
                                            radius="sm"
                                        />
                                    ))}
                                </Group>
                            )}
                        </div>
                    </Group>
                </Paper>
            ))}
        </Stack>
    );
};

export default ShopReviews;