import { Button, Card, Divider, Group, Radio, Select, Stack, Tabs, Text, Textarea } from '@mantine/core';
import { useState } from 'react';
import { BsFileSpreadsheet } from 'react-icons/bs';
import { FiDownload, FiFileText, FiPrinter } from 'react-icons/fi';
import showSuccessNotification from '../../../Toast/NotificationSuccess';

interface PrintInfoFormProps {
    selectedShipping: string[];
    isPrinting?: boolean;
    onPrint?: () => void;
}

const PrintInfoForm = ({
    selectedShipping,
    isPrinting,
    // onPrint
}: PrintInfoFormProps) => {
    const [printType, setPrintType] = useState('shipping');
    const [paperSize, setPaperSize] = useState('a4');
    const [note, setNote] = useState('');
    const [exportType, setExportType] = useState('print');
    const [orientation, setOrientation] = useState('portrait');

    const countOrders = selectedShipping.length;
    const handleAction = () => {
        // if (onPrint) onPrint();
        showSuccessNotification("Thông báo hệ thống", 'Chức năng đang được phát triển!');
    };

    const getActionButtonText = () => {
        if (isPrinting) return 'Đang xử lý...';

        switch (exportType) {
            case 'print':
                return 'In phiếu giao hàng';
            case 'pdf':
                return 'Xuất file PDF';
            case 'excel':
                return 'Xuất file Excel';
            default:
                return 'Xử lý';
        }
    };

    const getActionButtonIcon = () => {
        if (isPrinting) return null;

        switch (exportType) {
            case 'print':
                return <FiPrinter size={16} />;
            case 'pdf':
                return <FiFileText size={16} />;
            case 'excel':
                return <BsFileSpreadsheet size={16} />;
            default:
                return <FiDownload size={16} />;
        }
    };

    return (
        <Card shadow="xs" p="md" radius="md" withBorder >
            <Text fw={500} size="lg" >
                Thông tin xuất phiếu
            </Text>
            <Text size="sm" c="dimmed" my={"sm"}>
                <span className="font-bold text-blue-500">{countOrders}</span> đơn hàng đã chọn
            </Text>
            <div className="space-y-4">
                <Tabs defaultValue="print">
                    <Tabs.List>
                        <Tabs.Tab
                            value="print"
                            leftSection={<FiPrinter size={16} />}
                            onClick={() => setExportType('print')}
                        >
                            In phiếu
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="export"
                            leftSection={<FiDownload size={16} />}
                            onClick={() => setExportType('pdf')}
                        >
                            Xuất file
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="print" pt="xs">
                        <Card withBorder px="md" py="sm" radius="md">
                            <Text fw={500} size="sm" mb={8}>
                                Tùy chọn in
                            </Text>

                            <Stack gap="xs">
                                <Group justify="space-between" align="center">
                                    <Text size="sm" fw={500}>Loại phiếu:</Text>
                                    <Select
                                        value={printType}
                                        onChange={(value) => setPrintType(value || 'shipping')}
                                        data={[
                                            { value: 'shipping', label: 'Phiếu giao hàng' },
                                            { value: 'invoice', label: 'Hóa đơn' },
                                            { value: 'receipt', label: 'Phiếu xuất kho' },
                                            { value: 'label', label: 'Nhãn sản phẩm' }
                                        ]}
                                        size="xs"
                                        style={{ width: 150 }}
                                    />
                                </Group>

                                <Group justify="space-between" align="center">
                                    <Text size="sm" fw={500}>Loại máy in:</Text>
                                    <Radio.Group
                                        value={paperSize}
                                        onChange={setPaperSize}
                                        size="xs"
                                    >
                                        <Group>
                                            <Radio value="regular" label="In thường" />
                                            <Radio value="thermal" label="In nhiệt" />
                                        </Group>
                                    </Radio.Group>
                                </Group>

                                <Group justify="space-between" align="center">
                                    <Text size="sm" fw={500}>Khổ giấy:</Text>
                                    <Select
                                        value={paperSize === 'thermal' ? 'k80' : 'a4'}
                                        onChange={(value) => {
                                            // Adjust paper size based on printer type
                                            if (value === 'k80' || value === 'k57') {
                                                setPaperSize('thermal');
                                            } else {
                                                setPaperSize('regular');
                                            }
                                        }}
                                        data={paperSize === 'thermal' ?
                                            [
                                                { value: 'k80', label: 'K80' },
                                                { value: 'k57', label: 'K57' }
                                            ] :
                                            [
                                                { value: 'a4', label: 'A4' },
                                                { value: 'a5', label: 'A5' },
                                                { value: 'a6', label: 'A6' }
                                            ]
                                        }
                                        size="xs"
                                        style={{ width: 150 }}
                                    />
                                </Group>

                                <Group justify="space-between" align="center">
                                    <Text size="sm" fw={500}>Hướng giấy:</Text>
                                    <Radio.Group
                                        value={orientation}
                                        onChange={setOrientation}
                                        size="xs"
                                    >
                                        <Group>
                                            <Radio value="portrait" label="Dọc" />
                                            <Radio value="landscape" label="Ngang" />
                                        </Group>
                                    </Radio.Group>
                                </Group>
                            </Stack>
                        </Card>
                    </Tabs.Panel>

                    <Tabs.Panel value="export" pt="xs">
                        <Card withBorder px="md" py="sm" radius="md">
                            <Text fw={500} size="sm" mb={8}>
                                Tùy chọn xuất file
                            </Text>

                            <Stack gap="xs">
                                <Group justify="space-between" align="center">
                                    <Text size="sm" fw={500}>Định dạng file:</Text>
                                    <Radio.Group
                                        value={exportType}
                                        onChange={setExportType}
                                        size="xs"
                                    >
                                        <Group>
                                            <Radio
                                                value="pdf"
                                                label={
                                                    <Group gap={5}>
                                                        <FiFileText size={14} />
                                                        <span>PDF</span>
                                                    </Group>
                                                }
                                            />
                                            <Radio
                                                value="excel"
                                                label={
                                                    <Group gap={5}>
                                                        <BsFileSpreadsheet size={14} />
                                                        <span>Excel</span>
                                                    </Group>
                                                }
                                            />
                                        </Group>
                                    </Radio.Group>
                                </Group>

                                <Group justify="space-between" align="center">
                                    <Text size="sm" fw={500}>Nội dung xuất:</Text>
                                    <Select
                                        value={printType}
                                        onChange={(value) => setPrintType(value || 'shipping')}
                                        data={[
                                            { value: 'shipping', label: 'Phiếu giao hàng' },
                                            { value: 'invoice', label: 'Hóa đơn' },
                                            { value: 'summary', label: 'Tổng hợp đơn hàng' },
                                            { value: 'details', label: 'Chi tiết sản phẩm' }
                                        ]}
                                        size="xs"
                                        style={{ width: 150 }}
                                    />
                                </Group>
                            </Stack>
                        </Card>
                    </Tabs.Panel>

                </Tabs>

                <Textarea
                    label="Ghi chú"
                    placeholder="Nhập ghi chú cho phiếu in (nếu có)"
                    minRows={2}
                    value={note}
                    onChange={(e) => setNote(e.currentTarget.value)}
                />

                <Divider my="md" />

                <Button
                    fullWidth
                    size="md"
                    leftSection={getActionButtonIcon()}
                    onClick={handleAction}
                    loading={isPrinting}
                    disabled={
                        countOrders === 0
                    }
                    color={exportType === 'print' ? 'blue' : exportType === 'pdf' ? 'red' : 'green'}
                >
                    {getActionButtonText()}
                </Button>
            </div>
        </Card>
    );
};

export default PrintInfoForm;