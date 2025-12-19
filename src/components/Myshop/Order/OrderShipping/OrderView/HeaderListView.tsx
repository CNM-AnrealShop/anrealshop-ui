import { Box, Card, Checkbox, Group, Text } from '@mantine/core';

type HeaderListViewProps = {
    selectAll: boolean;
    onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const Header = ({ selectAll, onSelectAll }: HeaderListViewProps) => {
    return (
        <Card withBorder p={0} className="!bg-gray-50 mb-3" radius="md">
            <Box className="px-4 py-3">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5">
                        <Group gap="sm">
                            <Checkbox
                                checked={selectAll}
                                onChange={onSelectAll}
                            />
                            <Text size="sm" fw={500}>
                                Sản phẩm
                            </Text>
                        </Group>
                    </div>
                    <div className="col-span-3">
                        <Text size="sm" fw={500}>
                            Đơn vị vận chuyển
                        </Text>
                    </div>
                    <div className="col-span-2">
                        <Text size="sm" fw={500}>
                            Thời gian xác nhận
                        </Text>
                    </div>
                    <div className="col-span-2" >
                        <Text size="sm" fw={500} ta="center">
                            Trạng thái
                        </Text>
                    </div>

                </div>
            </Box>
        </Card>
    );
};

export default Header;