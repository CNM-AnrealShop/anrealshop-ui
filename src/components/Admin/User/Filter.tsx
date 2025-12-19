import { ActionIcon, Button, Group, Stack, Tabs, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { FiCalendar, FiCheck, FiRefreshCcw, FiSearch, FiX } from 'react-icons/fi';
import { useUserStatus } from '../../../hooks/useUserStatus';
import { equalDates, getDefaultDateRange_Now_Yesterday } from '../../../untils/Untils';

interface UserStatusDto {
    id: string;
    count: number;
}

interface FilterProps {
    date: [Date | null, Date | null];
    searchTerm: string;
    activeTab: string;
    userStatusData: UserStatusDto[];
    onDateChange: (date: [Date | null, Date | null]) => void;
    onSearchChange: (term: string) => void;
    onTabChange: (tab: string | null) => void;
    onResetFilters: () => void;
    onApplyFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
    date,
    searchTerm,
    activeTab,
    userStatusData,
    onDateChange,
    onSearchChange,
    onTabChange,
    onResetFilters,
    onApplyFilters
}) => {
    const { getStatusIcon, getStatusColor, getStatusLabel } = useUserStatus();

    const equalDateWithDefault = () => {
        const defaultRange = getDefaultDateRange_Now_Yesterday();
        return equalDates(date[0], defaultRange[0]) && equalDates(date[1], defaultRange[1]);
    };

    return (
        <>
            <Group justify="space-between" align="flex-start" mb="md">
                <Stack gap="xs">
                    <Title order={3} size="h4">Quản lý người dùng</Title>
                    <Text size="sm" c="dimmed">
                        Quản lý và xem thông tin người dùng trong hệ thống.
                    </Text>
                </Stack>

                <Stack gap="xs">
                    <Group>
                        <Tooltip label="Giá trị mặc định lấy ra người dùng đăng ký gần đây">
                            <DatePickerInput
                                type="range"
                                placeholder="Chọn khoảng thời gian"
                                value={date}
                                onChange={onDateChange}
                                clearable
                                valueFormat="DD/MM/YYYY"
                                locale="vi"
                                leftSection={<FiCalendar size={16} />}
                                rightSection={!equalDateWithDefault() ? (
                                    <ActionIcon size="sm" variant="subtle" onClick={() => onDateChange(getDefaultDateRange_Now_Yesterday())}>
                                        <FiX size={14} />
                                    </ActionIcon>
                                ) : <></>}
                                style={{ minWidth: '300px' }}
                            />
                        </Tooltip>
                        <TextInput
                            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.currentTarget.value)}
                            leftSection={<FiSearch size={16} />}
                            style={{ minWidth: '300px' }}
                        />

                        <Tooltip label="Áp dụng bộ lọc">
                            <Button
                                variant="light"
                                color="blue"
                                onClick={onApplyFilters}
                                rightSection={<FiCheck size={16} />}
                            >
                                Áp dụng
                            </Button>
                        </Tooltip>

                        <Tooltip label="Reset bộ lọc">
                            <ActionIcon
                                variant="light"
                                color="gray"
                                onClick={onResetFilters}
                            >
                                <FiRefreshCcw size={16} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Stack>
            </Group>

            <div className="pb-4">
                <Tabs
                    value={activeTab}
                    onChange={onTabChange}
                    classNames={{
                        list: "border-b-0",
                        tab: "px-4 py-2 font-medium data-[active]:bg-blue-50 data-[active]:text-blue-600 data-[active]:border-blue-200",
                        tabLabel: "flex items-center"
                    }}
                >
                    <Tabs.List>
                        {userStatusData.map((status) => {
                            const IconComponent = getStatusIcon(status.id);
                            const iconColor = getStatusColor(status.id);
                            const isActive = activeTab === status.id;
                            const label = getStatusLabel(status.id);

                            return (
                                <Tabs.Tab
                                    key={status.id}
                                    value={status.id}
                                    leftSection={<IconComponent size={16} style={{ color: iconColor }} />}
                                    className={`!py-3 !px-4 cursor-pointer transition-colors duration-200 ${isActive
                                            ? 'bg-primary !text-primary border-b-2 !border-primary'
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {label}
                                </Tabs.Tab>
                            );
                        })}
                    </Tabs.List>
                </Tabs>
            </div>
        </>
    );
};

export default Filter;
