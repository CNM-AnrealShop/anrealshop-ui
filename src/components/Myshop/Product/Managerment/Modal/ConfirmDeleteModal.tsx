import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  Stack,
  Text
} from '@mantine/core';
import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  productName?: string;
  productId?: string;
  isMultiDelete?: boolean;
  itemCount?: number;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'Xóa sản phẩm',
  productName,
  productId,
  isMultiDelete = false,
  itemCount = 0
}: ConfirmDeleteModalProps) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmChange = (checked: boolean) => {
    setConfirmed(checked);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    setConfirmed(false);
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={<Text fz="lg" fw={600}>{title}</Text>}
      centered
      withCloseButton
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
      size="md"
    >
      <Stack>
        <Alert
          icon={<FiAlertTriangle size={16} />}
          title="Cảnh báo quan trọng!"
          color="red"
          variant="light"
        >
          {isMultiDelete ? (
            <Text size="sm">
              Bạn đang chuẩn bị xóa <strong>{itemCount} sản phẩm</strong> đã chọn. Thao tác này không thể hoàn tác.
            </Text>
          ) : (
            <Text size="sm">
              Bạn đang chuẩn bị xóa sản phẩm <strong>{productName}</strong>. Thao tác này không thể hoàn tác.
            </Text>
          )}
        </Alert>

        <div className='px-4'>
          {isMultiDelete ? (
            <Text size="sm">
              Tất cả dữ liệu về các sản phẩm này sẽ bị xóa khỏi hệ thống, bao gồm hình ảnh, đánh giá và lịch sử bán hàng.
            </Text>
          ) : (
            <Stack gap="xs">
              <Text size="sm" fw={500}>Chi tiết sản phẩm:</Text>
              <Text size="sm">Tên: {productName}</Text>
              <Text size="sm">ID: {productId}</Text>
              <Text size="sm" mt="md">
                Tất cả dữ liệu về sản phẩm này sẽ bị xóa khỏi hệ thống, bao gồm hình ảnh, đánh giá và lịch sử bán hàng.
              </Text>
            </Stack>
          )}
        </div>

        <Divider my="sm" />

        <Checkbox
          checked={confirmed}
          onChange={(e) => handleConfirmChange(e.currentTarget.checked)}
          label="Tôi đã hiểu và chắc chắn muốn xóa sản phẩm này"
          disabled={isLoading}
          mx={"md"}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleClose} disabled={isLoading}>
            Hủy bỏ
          </Button>
          <Button
            color="red"
            onClick={handleConfirm}
            disabled={!confirmed || isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Đang xóa...' : 'Xác nhận xóa'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ConfirmDeleteModal;