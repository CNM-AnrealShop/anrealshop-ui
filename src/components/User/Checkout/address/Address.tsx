import {
  Box,
  Button,
  Collapse,
  Divider,
  Group,
  Paper,
  Stack,
  Text
} from '@mantine/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiCheck, FiChevronDown, FiMapPin, FiPlus, FiX } from 'react-icons/fi';
import { AddressService } from '../../../../service/AddressService';
import type { AddressDto } from '../../../../types/AddressType';
import { getErrorMessage } from '../../../../untils/ErrorUntils';
import showErrorNotification from '../../../Toast/NotificationError';
import AddressDisplayItem from './AddressDisplayItem';
import ModalFormAddress from './ModalFormAddress';
import { useAppSelector } from '../../../../hooks/useAppRedux';


interface AddressProps {
  selectedAddress: AddressDto | null;
  setSelectedAddress: (address: AddressDto) => void;
}

const Address: React.FC<AddressProps> = ({
  selectedAddress,
  setSelectedAddress,
}) => {
  const [addressList, setAddressList] = useState<AddressDto[] | []>([]);
  const [newAddressModalOpened, setNewAddressModalOpened] = useState(false);
  const [editAddressModalOpened, setEditAddressModalOpened] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<AddressDto | null>(null);
  const [showAddressSelection, setShowAddressSelection] = useState(false);

  const [tempSelectedAddress, setTempSelectedAddress] = useState<AddressDto | null>(null);
  const {user} = useAppSelector((state) => state.auth);

  const fetchAddresses = useCallback(() => {
    if (!user  || user.address === null || user.address === undefined) return;
    AddressService.getUserAddresses()
      .then((data) => {
          setAddressList(data);
      })
      .catch((error) => {
        showErrorNotification("Lỗi lấy thông tin địa chỉ", getErrorMessage(error));
      })
  }, [user?.address]);

  useEffect(() => {
    if (showAddressSelection && addressList.length === 0) {
      fetchAddresses();
    }
  }, [showAddressSelection]);

  const addressComponentRef = useRef<HTMLDivElement>(null);

  const confirmAddressSelection = () => {
    if (!tempSelectedAddress || (tempSelectedAddress && tempSelectedAddress === selectedAddress)) {
      setShowAddressSelection(false);
      return;
    }
    setSelectedAddress(tempSelectedAddress);
    setShowAddressSelection(false);

    setTimeout(() => {
      if (addressComponentRef.current) {
        const topPosition = addressComponentRef.current.getBoundingClientRect().top;
        const offsetPosition = topPosition + window.pageYOffset - 50;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 500);
  };


  const handleEditAddress = (event: React.MouseEvent, address: AddressDto) => {
    event.stopPropagation();
    setAddressToEdit(address);
    setEditAddressModalOpened(true);
  };

  const handleAddressClick = (address: AddressDto, isInSelectionMode: boolean) => {
    if (isInSelectionMode) {
      setTempSelectedAddress(address);
    }
  };

  const handleRefresh = () => {
    fetchAddresses();
  };

  return (
    <>
      <Paper
        radius="md"
        shadow="sm"
        p="md"
        className="bg-white mb-6"
        ref={addressComponentRef}
        id="address-component"
      >
        <Group justify="space-between" className="mb-3">
          <Text fw={600} size="md" className="text-slate-800 flex items-center">
            <FiMapPin className="inline-block mr-2" size={16} />
            Địa chỉ giao hàng
          </Text>

          <Group gap="xs">
            {!showAddressSelection && (
              <Button
                variant="subtle"
                color="gray"
                size="xs"
                onClick={() => setShowAddressSelection(true)}
                rightSection={<FiChevronDown size={14} />}
              >
                Xem thêm
              </Button>
            )}

            <Button
              variant="outline"
              color="blue"
              size="xs"
              onClick={() => setNewAddressModalOpened(true)}
              className="hover:bg-picton-blue-50"
              leftSection={<FiPlus size={14} />}
            >Thêm mới
            </Button>
          </Group>
        </Group>

        {!showAddressSelection && (
          <Stack gap="md" className="mb-1">
            {selectedAddress && (
              <AddressDisplayItem
                address={selectedAddress}
                isSelected={true}
                isInSelectionMode={false}
                onAddressClick={(address) => handleAddressClick(address, false)}
                onEditAddress={handleEditAddress}
              />
            )}
          </Stack>
        )}

        <Collapse in={showAddressSelection}>
          <Box className="p-0 rounded-lg">
            <Stack gap="md" className="mb-4">
              {addressList && addressList.map(address => {
                const isItemSelec = tempSelectedAddress ? (tempSelectedAddress.id === address.id) : address.primary;
                return (
                  <AddressDisplayItem
                    key={`${address.id}`}
                    address={address}
                    isSelected={isItemSelec}
                    isInSelectionMode={true}
                    onAddressClick={(address) => handleAddressClick(address, true)}
                    onEditAddress={handleEditAddress}
                  />)
              })}
            </Stack>

            <Divider my="md" />

            <Group justify="right" mt="md">
              <Button
                size="xs"
                variant="subtle"
                color="gray"
                onClick={() => setShowAddressSelection(false)}
                leftSection={<FiX size={16} />}
              >
                Hủy
              </Button>
              <Button
                size='xs'
                color="blue"
                onClick={confirmAddressSelection}
                leftSection={<FiCheck size={16} />}
                className="bg-primary hover:bg-picton-blue-600"
              >
                Xác nhận
              </Button>
            </Group>
          </Box>
        </Collapse>
      </Paper>

      <ModalFormAddress
        opened={newAddressModalOpened}
        onClose={() => setNewAddressModalOpened(false)}
        handleRefreshAll={handleRefresh}
      />

      <ModalFormAddress
        opened={editAddressModalOpened}
        onClose={() => setEditAddressModalOpened(false)}
        handleRefreshAll={handleRefresh}
        addressEdit={addressToEdit}
        editMode={true}
      />
    </>
  );
};

export default Address;