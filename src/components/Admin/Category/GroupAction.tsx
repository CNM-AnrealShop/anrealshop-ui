import { ActionIcon, Button, Divider, Group, Menu, SegmentedControl, Title, Tooltip } from '@mantine/core';
import { FiDownload, FiGitBranch, FiList, FiMoreVertical, FiPlus, FiUpload } from 'react-icons/fi';

type ViewMode = 'tree' | 'table';

interface GroupActionProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    onAddClick: () => void;
    onExportExcel?: () => void;
    onImportExcel?: () => void;
}

const GroupAction = ({ viewMode, onViewModeChange, onAddClick, onExportExcel, onImportExcel }: GroupActionProps) => {
    return (
        <Group justify="space-between" align="center">
            <Title order={4}>Quản lý danh mục</Title>
            <Group>
                <SegmentedControl
                    size="xs"
                    value={viewMode}
                    onChange={(value) => onViewModeChange(value as ViewMode)}
                    data={[
                        {
                            label: (
                                <Tooltip label="Cây danh mục">
                                    <FiGitBranch size={18} />
                                </Tooltip>
                            ),
                            value: 'tree'
                        },
                        {
                            label: (
                                <Tooltip label="Bảng">
                                    <FiList size={18} />
                                </Tooltip>
                            ),
                            value: 'table'
                        },
                    ]}
                />
                <Button size="xs" leftSection={<FiPlus size={16} />} onClick={onAddClick}>
                    Thêm danh mục
                </Button>

                <Divider orientation="vertical" size={"sm"} my={"6"} />

                <Menu position="bottom-end" withArrow withinPortal>
                    <Menu.Target>
                        <Tooltip label="Thêm tùy chọn">
                            <ActionIcon variant="light" size="md">
                                <FiMoreVertical size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<FiDownload size={16} />}
                            onClick={onExportExcel}
                        >
                            Xuất Excel
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<FiUpload size={16} />}
                            onClick={onImportExcel}
                        >
                            Nhập Excel
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
};

export default GroupAction;
