import { Modal, Table, Button, Text, Paper, ScrollArea, Group } from '@mantine/core';
import { FiDownload, FiFile } from 'react-icons/fi';
import { useState, useEffect } from 'react';

interface ExportHistoryItem {
  id: string;
  filename: string;
  dateCreated: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
}

interface HistoryExportProps {
  opened: boolean;
  onClose: () => void;
}

const HistoryExport = ({ opened, onClose }: HistoryExportProps) => {
  const [exportHistory, setExportHistory] = useState<ExportHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (opened) {
      // Fetch export history when modal opens
      fetchExportHistory();
    }
  }, [opened]);

  const fetchExportHistory = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await api.getExportHistory();
      // setExportHistory(response.data);
      
      // Dummy data for demonstration
      setTimeout(() => {
        setExportHistory([
          {
            id: '1',
            filename: 'orders_export_20250901.xlsx',
            dateCreated: '01/09/2025 14:30',
            status: 'completed',
            downloadUrl: '#'
          },
          {
            id: '2',
            filename: 'orders_export_20250825.xlsx',
            dateCreated: '25/08/2025 09:15',
            status: 'completed',
            downloadUrl: '#'
          },
          {
            id: '3',
            filename: 'orders_export_20250820.xlsx',
            dateCreated: '20/08/2025 11:45',
            status: 'completed',
            downloadUrl: '#'
          }
        ]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Failed to fetch export history:', error);
      setLoading(false);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    // Logic to download the file
    console.log(`Downloading ${filename} from ${url}`);
    // Actual download logic would go here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'processing':
        return 'blue';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Lịch sử xuất dữ liệu" size="lg" centered>
      <ScrollArea h={400}>
        {loading ? (
          <Text ta="center" py="xl">Đang tải dữ liệu...</Text>
        ) : exportHistory.length === 0 ? (
          <Paper p="xl" withBorder>
            <Text ta="center">Không có lịch sử xuất nào.</Text>
          </Paper>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Tên file</Table.Th>
                <Table.Th>Ngày tạo</Table.Th>
                <Table.Th>Trạng thái</Table.Th>
                <Table.Th>Tải xuống</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {exportHistory.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <div className="flex items-center gap-2">
                      <FiFile size={16} />
                      {item.filename}
                    </div>
                  </Table.Td>
                  <Table.Td>{item.dateCreated}</Table.Td>
                  <Table.Td>
                    <Text c={getStatusColor(item.status)}>
                      {item.status === 'completed' && 'Hoàn thành'}
                      {item.status === 'processing' && 'Đang xử lý'}
                      {item.status === 'failed' && 'Thất bại'}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    {item.status === 'completed' && item.downloadUrl && (
                      <Button
                        variant="subtle"
                        size="xs"
                        leftSection={<FiDownload size={14} />}
                        onClick={() => handleDownload(item.downloadUrl!, item.filename)}
                      >
                        Tải xuống
                      </Button>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </ScrollArea>
      <Group justify="center" mt="md">
        <Button variant="outline" onClick={onClose}>Đóng</Button>
      </Group>
    </Modal>
  );
};

export default HistoryExport;