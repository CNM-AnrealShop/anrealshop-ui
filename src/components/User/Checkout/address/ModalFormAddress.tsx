import {
  Button,
  Grid,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Switch,
  TextInput
} from '@mantine/core';
import React, { useEffect } from 'react';
import { FiCheck, FiMapPin } from 'react-icons/fi';
import { useAddress } from '../../../../hooks/useAddress';
import type { AddressDto } from '../../../../types/AddressType';

interface ModalFormAddressProps {
  opened: boolean;
  onClose: () => void;
  handleRefreshAll: () => void;
  addressEdit?: AddressDto | null;
  editMode?: boolean;
}

const ModalFormAddress: React.FC<ModalFormAddressProps> = ({
  opened,
  onClose,
  handleRefreshAll,
  addressEdit = null,
  editMode = false
}) => {
  const isEditMode = editMode;

  const { addressForm, clearForm, provinces, districts, wards, convertHelper, isLoading, addAddress, deleteAddress, updateAddress, updateInitValue } = useAddress();

  useEffect(() => {
    if (addressEdit) {
      updateInitValue(addressEdit);
    }
  }, [addressEdit])


  const handleSubmit = async () => {
    const newAddress = isEditMode ? await updateAddress() : await addAddress();
    if (newAddress) {
      handleRefreshAll();
      clearForm();
      onClose();
    }
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const handleDelete = async () => {
    const deletedAddress = await deleteAddress();
    if (deletedAddress) {
      handleRefreshAll();
      clearForm();
      onClose();
    }

  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div className="text-slate-800 flex items-center font-semibold text-xl">
          <FiMapPin className="inline-block mr-2" size={18} />
          {isEditMode ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
        </div>
      }
      size="lg"
      padding="xl"
      pb={0}
      radius="md"
      centered
    >
      <form >
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Họ và tên"
            required
            placeholder="Nhập họ và tên"
            radius="md"
            size="sm"
            {...addressForm.getInputProps('fullName')}
          />
          <TextInput
            label="Số điện thoại"
            type='number'
            required
            placeholder="Nhập số điện thoại"
            radius="md"
            size="sm"
            {...addressForm.getInputProps('phone')}
          />
        </SimpleGrid>

        <Grid grow mt="sm">
          <Grid.Col span={4}>
            <Select
              label="Tỉnh/Thành phố"
              required
              placeholder="Chọn Tỉnh/Thành phố"
              data={convertHelper(provinces)}
              {...addressForm.getInputProps('province')}
              searchable
              radius="md"
              size="sm"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Quận/Huyện"
              required
              placeholder="Chọn Quận/Huyện"
              data={convertHelper(districts)}
              {...addressForm.getInputProps('district')}
              disabled={!addressForm.values.province}
              searchable
              radius="md"
              size="sm"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Phường/Xã"
              required
              placeholder="Chọn Phường/Xã"
              data={convertHelper(wards)}
              {...addressForm.getInputProps('ward')}
              disabled={!addressForm.values.district}
              searchable
              radius="md"
              size="sm"
            />
          </Grid.Col>
        </Grid>

        <TextInput
          label="Địa chỉ cụ thể"
          required
          placeholder="Số nhà, tên đường, tòa nhà, ..."
          mt="md"
          radius="md"
          size="sm"
          {...addressForm.getInputProps('streetAddress')}
        />

        <Switch
          mt="lg"
          label="Đặt làm địa chỉ mặc định"
          checked={addressForm.values.isPrimary}
          onChange={(e) => addressForm.setFieldValue('isPrimary', e.currentTarget.checked)}
        />

        <Group justify={isEditMode ? 'space-between' : 'flex-end'} mt="xl">
          <Button
            variant="default"
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Group justify='right'>
            {isEditMode && (
              <Button variant="outline" color="red" onClick={handleDelete}>Xóa</Button>
            )}
            <Button
              color="blue"
              radius="md"
              leftSection={<FiCheck size={16} />}
              className="bg-primary hover:bg-picton-blue-600"
              onClick={handleSubmit}
              loading={isLoading}
            >
              {isEditMode ? 'Cập nhật địa chỉ' : 'Lưu địa chỉ'}
            </Button>
          </Group>
        </Group>
      </form>
    </Modal>
  );
};

export default ModalFormAddress;