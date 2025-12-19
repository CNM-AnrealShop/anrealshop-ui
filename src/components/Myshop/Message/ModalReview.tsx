import { Image, Modal } from '@mantine/core';
import React from 'react';

interface ModalReviewProps {
    opened: boolean;
    onClose: () => void;
    url: string;
    type: 'image' | 'video';
}

const ModalReview: React.FC<ModalReviewProps> = ({ opened, onClose, url, type }) => {
    return (
        <Modal opened={opened} onClose={onClose} size="xl" centered>
            <div>
                {type === 'image' && (
                    <Image 
                        src={url} 
                        alt="Preview" 
                        radius="md"
                        fit="contain"
                    />
                )}
                {type === 'video' && (
                    <video
                        src={url}
                        controls
                        className="w-full rounded-md"
                        style={{ maxHeight: '70vh' }}
                        autoPlay
                    />
                )}
            </div>
        </Modal>
    );
};

export default ModalReview;