import { Box, Button, Divider, Group, Select, Stack, Switch, Text, Title } from '@mantine/core';
import { FiSave } from 'react-icons/fi';

const Preferences = () => {
    return (
        <>
            <Title order={4} className="mb-4 text-slate-800">Tùy chọn người dùng</Title>

            <Box>
                <Text size="sm" fw={600} className="mb-3 text-slate-700">
                    Ngôn ngữ và khu vực
                </Text>

                <Group grow className="mb-4">
                    <Select
                        label="Ngôn ngữ"
                        placeholder="Chọn ngôn ngữ"
                        data={[
                            { value: 'vi', label: 'Tiếng Việt' },
                            { value: 'en', label: 'English' },
                        ]}
                        defaultValue="vi"
                    />

                    <Select
                        label="Múi giờ"
                        placeholder="Chọn múi giờ"
                        data={[
                            { value: 'Asia/Ho_Chi_Minh', label: '(GMT+7) Hồ Chí Minh' },
                            { value: 'Asia/Bangkok', label: '(GMT+7) Bangkok' },
                            { value: 'Asia/Singapore', label: '(GMT+8) Singapore' },
                            { value: 'Asia/Tokyo', label: '(GMT+9) Tokyo' },
                        ]}
                        defaultValue="Asia/Ho_Chi_Minh"
                    />
                </Group>

                <Divider className="my-4" />

                <Text size="sm" fw={600} className="mb-3 text-slate-700">
                    Hiển thị
                </Text>

                <Stack gap="xs" className="mb-4">
                    <Group justify="apart">
                        <Text size="sm">Chế độ tối</Text>
                        <Switch />
                    </Group>

                    <Group justify="apart">
                        <Text size="sm">Hiệu ứng chuyển động</Text>
                        <Switch defaultChecked />
                    </Group>

                    <Group justify="apart">
                        <Text size="sm">Hiển thị giá có VAT</Text>
                        <Switch defaultChecked />
                    </Group>
                </Stack>

                <Button
                    className="mt-2 bg-primary hover:bg-picton-blue-600"
                    leftSection={<FiSave size={16} />}
                >
                    Lưu cài đặt
                </Button>
            </Box>
        </>
    );
};

export default Preferences;