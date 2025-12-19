import { Box, Card, Checkbox, Group, Text } from '@mantine/core';

type HeaderListViewProps = {
    selectAll: boolean;
    onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeaderListView = ({ selectAll, onSelectAll }: HeaderListViewProps) => {
    return (
        <Card withBorder p={0} className="!bg-gray-50 mb-3" radius="md">
            <Box className="px-2 py-3">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                        <Group gap="sm">
                            <Checkbox
                                checked={selectAll}
                                onChange={onSelectAll}
                            />
                            <Text size="sm" fw={500}>
                                Sản phẩm / Mã đơn
                            </Text>
                        </Group>
                    </div>
                    <div className="col-span-2">
                        <Text size="sm" fw={500}>
                            Người mua
                        </Text>
                    </div>
                    <div className="col-span-2">
                        <Text size="sm" fw={500}>
                            Đơn vị vận chuyển
                        </Text>
                    </div>
                    <div className="col-span-2">
                        <Text size="sm" fw={500}>
                            Mã vận đơn
                        </Text>
                    </div>
                    <div className="col-span-2">
                        <Text size="sm" fw={500}>
                            Thời gian xác nhận
                        </Text>
                    </div>
                    <div className="col-span-1">
                        <Text size="sm" fw={500} ta="center">
                            Đã in
                        </Text>
                    </div>
                </div>
            </Box>
        </Card>
    );
};

export default HeaderListView;