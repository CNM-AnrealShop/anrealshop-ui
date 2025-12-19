import { Button, Group, Modal, Stack, Text, Textarea } from '@mantine/core';
import { FiCheck, FiEdit, FiX } from 'react-icons/fi';

interface RejectModalProps {
  opened: boolean;
  onClose: () => void;
  onReject: () => void;
  rejectionReason: string;
  onReasonChange: (reason: string) => void;
  existsProductReason: boolean;
  isViolation?: boolean;
  onApprove: () => void;
}

const RejectModal: React.FC<RejectModalProps> = ({
  opened,
  onClose,
  onReject,
  rejectionReason,
  onReasonChange,
  existsProductReason,
  isViolation = false,
  onApprove
}) => {
  const isEdit = existsProductReason && rejectionReason;
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Từ chối sản phẩm"
      centered
    >
      <Stack>
        <Text size="sm">Vui lòng cung cấp lý do từ chối sản phẩm:</Text>

        <Textarea
          placeholder="Nhập lý do từ chối..."
          minRows={4}
          value={rejectionReason}
          onChange={(e) => onReasonChange(e.currentTarget.value)}
          required
        />

        <Group justify="space-between" mt="md">
          {isEdit ? (
            // Edit mode buttons
            <>
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
              
              <Group>
                <Button
                    color="green"
                    leftSection={<FiCheck size={16} />}
                    onClick={()=> {
                      onApprove();
                      onClose();
                    }}
                  >
                    {isViolation ? 'Phê duyệt' : 'Duyệt lại'}
                  </Button>
                <Button
                  color="blue"
                  leftSection={<FiEdit size={16} />}
                  onClick={onReject}
                  disabled={rejectionReason.trim() ? false : true}
                >
                  Cập nhật
                </Button>
              </Group>
            </>
          ) : ( 
            <>
              <Button variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button
                color="red"
                leftSection={<FiX size={16} />}
                onClick={onReject}
                disabled={!rejectionReason.trim()}
              >
                Từ chối sản phẩm
              </Button>
            </>
          )}
        </Group>
      </Stack>
    </Modal>
  );
};

export default RejectModal;