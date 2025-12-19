import React from 'react';
import {
    Box,
    Text,
    Group,
    TextInput,
    Button,
    Textarea,
    Stack,
    Title,
    Divider,
    FileInput,
    Avatar
} from '@mantine/core';
import { FiUpload } from 'react-icons/fi';

interface ProfileData {
    fullName: string;
    email: string;
    phone: string;
    avatar: File | null;
    bio: string;
}

interface AboutProps {
    profileData: ProfileData;
    avatarPreview: string | null;
    saving: boolean;
    handleProfileChange: (field: keyof ProfileData, value: any) => void;
    handleAvatarChange: (file: File | null) => void;
    saveSettings: () => void;
    resetSettings: () => void;
}

const About: React.FC<AboutProps> = ({
    profileData,
    avatarPreview,
    saving,
    handleProfileChange,
    handleAvatarChange,
    saveSettings,
    resetSettings
}) => {
    return (
        <>
            <Title order={3} mb="md">Thông tin cá nhân</Title>
            <Divider mb="md" />
            
            <Group align="flex-start" mb="xl">
                <Stack style={{ flex: 1 }}>
                    <TextInput
                        label="Họ và tên"
                        placeholder="Nguyễn Văn A"
                        value={profileData.fullName}
                        onChange={(e) => handleProfileChange('fullName', e.target.value)}
                        required
                    />
                    
                    <TextInput
                        label="Email"
                        placeholder="example@email.com"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        required
                    />
                    
                    <TextInput
                        label="Số điện thoại"
                        placeholder="0912345678"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                    />
                    
                    <Textarea
                        label="Giới thiệu"
                        placeholder="Hãy viết vài điều về bản thân..."
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        autosize
                        minRows={3}
                        maxRows={5}
                    />
                </Stack>
                
                <Box>
                    <Text size="sm" fw={500} mb="xs">Ảnh đại diện</Text>
                    <Stack align="center" gap="xs">
                        <Avatar
                            src={avatarPreview}
                            size={120}
                            radius={60}
                        />
                        <FileInput
                            placeholder="Tải ảnh lên"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleAvatarChange}
                            leftSection={<FiUpload size={14} />}
                            size="xs"
                        />
                    </Stack>
                </Box>
            </Group>
            
            <Group justify="flex-end" mt="md">
                <Button variant="outline" onClick={resetSettings}>
                    Đặt lại
                </Button>
                <Button onClick={saveSettings} loading={saving}>
                    Lưu thay đổi
                </Button>
            </Group>
        </>
    );
};

export default About;