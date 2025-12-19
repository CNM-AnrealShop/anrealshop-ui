import {
  Button,
  Drawer,
  Group,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { memo, useState } from 'react';

interface CustomAttribute {
  attributeKeyName: string;
  attributeKeyDisplay: string;
  isMultiSelect: boolean;
  value: string[];
}

interface AttributeDrawerProps {
  opened: boolean;
  onClose: () => void;
  onAdd: (attribute: CustomAttribute) => void;
}

const AttributeDrawer = memo(({ opened, onClose, onAdd }: AttributeDrawerProps) => {
  const [values, setValues] = useState('');

  const form = useForm({
    initialValues: {
      attributeKeyDisplay: '',
      isMultiSelect: true
    },
    validate: {
      attributeKeyDisplay: (value) =>
        value.trim().length === 0 ? 'Tên thuộc tính không được để trống' : null
    }
  });

  const handleSubmit = () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    if (!values.trim()) {
      return;
    }

    const valueArray = values
      .split(/[\n,;.]+/) 
      .map(v => v.trim())
      .filter(v => v.length > 0);

    if (valueArray.length === 0) return;

    const attributeKeyName = form.values.attributeKeyDisplay
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    const newAttribute: CustomAttribute = {
      attributeKeyName,
      attributeKeyDisplay: form.values.attributeKeyDisplay,
      isMultiSelect: form.values.isMultiSelect,
      value: valueArray
    };

    onAdd(newAttribute);
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    setValues('');
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={
        <Group justify="space-between" w="100%">
          <Text fw={600}>Thêm thuộc tính mới</Text>
          <Button
            size="xs"
            variant="subtle"
            onClick={() => console.log('Clicked nút bên title')}
          >
            Trang quản lý
          </Button>
        </Group>
      }
      padding="md"
      position="right"
      size="md"
    >
      <Stack>
        <TextInput
          label="Tên thuộc tính"
          placeholder="Ví dụ: Màu sắc, Kích thước..."
          required
          {...form.getInputProps('attributeKeyDisplay')}
        />

        <Switch
          label="Cho phép chọn nhiều giá trị"
          description="Bật nếu người dùng có thể chọn nhiều giá trị cùng lúc"
          {...form.getInputProps('isMultiSelect', { type: 'checkbox' })}
        />

        <div>
          <Text size="sm" fw={500} mb={5}>
            Giá trị thuộc tính <span style={{ color: 'red' }}>*</span>
          </Text>
          <Textarea
            placeholder="Nhập các giá trị cách nhau bởi dấu phẩy, chấm phẩy, chấm hoặc xuống dòng&#10;Ví dụ:&#10;Đỏ, Xanh; Vàng. Cam&#10;hoặc&#10;Đỏ&#10;Xanh&#10;Vàng"
            value={values}
            onChange={(e) => setValues(e.currentTarget.value)}
            minRows={4}
            maxRows={8}
            required
          />
          <Text size="xs" c="dimmed" mt={5}>
            Các giá trị có thể cách nhau bởi dấu phẩy (,), chấm phẩy (;), chấm (.) hoặc xuống dòng
          </Text>
        </div>

        <Group justify="end" >


          <Button variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!form.values.attributeKeyDisplay.trim() || !values.trim()}
          >
            Thêm thuộc tính
          </Button>
        </Group>
      </Stack>
    </Drawer>
  );
});

export default AttributeDrawer;
