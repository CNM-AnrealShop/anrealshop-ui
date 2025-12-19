import { Modal, Text, Stack, Button, Group, FileInput } from '@mantine/core';
import { useState } from 'react';
import { FiDownload, FiUpload, FiFile } from 'react-icons/fi';

interface ImportModalProps {
  opened: boolean;
  onClose: () => void;
  onImport?: (file: File) => void;
  templateUrl?: string;
  title?: string;
  description?: string;
}

const ImportModal = ({ 
  opened, 
  onClose,
  onImport,
  templateUrl,
  title = "Nhập danh mục từ Excel",
  description = "Tải lên file Excel chứa thông tin danh mục của bạn."
}: ImportModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDownloadTemplate = () => {
    if (templateUrl) {
      window.open(templateUrl, '_blank');
    } else {
      console.log('Download template');
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      if (onImport) {
        await onImport(file);
      } else {
        // TODO: Implement default import logic
        console.log('Importing file:', file.name);
      }
      
      setFile(null);
      onClose();
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={title}
      centered
      size="lg"
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">{description}</Text>
        
        <Button
          variant="outline"
          leftSection={<FiDownload size={14} />}
          onClick={handleDownloadTemplate}
          className="mr-auto"
        >
          Tải mẫu Excel
        </Button>

        <FileInput
          placeholder="Chọn file Excel (.xlsx, .xls)"
          leftSection={<FiFile size={16} />}
          accept=".xlsx,.xls"
          value={file}
          onChange={setFile}
          clearable
        />

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button 
            leftSection={<FiUpload size={16} />}
            onClick={handleImport}
            disabled={!file}
            loading={isUploading}
          >
            Tải lên và nhập
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ImportModal;