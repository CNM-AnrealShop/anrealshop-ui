import { Button, Group, Modal, Radio, Stack, Text, Textarea } from '@mantine/core';
import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import type { ItemList } from '../../data/RejectData';

interface RejectModalProps {
  data: ItemList[];
  opened: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  orderId: string;
}

const RejectModal = ({ data, opened, onClose, onConfirm, orderId }: RejectModalProps) => {

  const [reason, setReason] = useState<string>(data[0].key);
  const [customReason, setCustomReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    const finalReason = reason === 'other' ? customReason : reason;
    onConfirm(finalReason);
    setIsSubmitting(false);
    onClose();
    setReason(data[0].key);
    setCustomReason('');
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Group gap="xs"><FiAlertCircle size={18} className="text-red-500" /> <Text>Từ chối đơn hàng</Text></Group>}
      centered
    >
      <Text size="sm" c="dimmed" mb="md">
        Vui lòng chọn lý do từ chối đơn hàng #{orderId.split('-')[0]}...
      </Text>

      <Stack>
        <Radio.Group
          value={reason}
          onChange={setReason}
          name="rejectReason"
          label="Lý do từ chối"
          withAsterisk
        >
          <Stack mt="xs">
            {data.map(option => (
              <Radio
                key={option.key}
                value={option.key}
                label={option.value}
              />
            ))}
          </Stack>
        </Radio.Group>

        {reason === 'other' && (
          <Textarea
            placeholder="Nhập lý do từ chối đơn hàng"
            label="Lý do cụ thể"
            value={customReason}
            onChange={(e) => setCustomReason(e.currentTarget.value)}
            required
            minRows={3}
            maxRows={5}
          />
        )}
      </Stack>

      <Group justify="flex-end" mt="xl">
        <Button variant="outline" onClick={onClose}>Hủy</Button>
        <Button
          color="red"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={reason === 'other' && !customReason.trim()}
        >
          Xác nhận từ chối
        </Button>
      </Group>
    </Modal>
  );
};

export default RejectModal;