import { Button, Checkbox, Group, Menu, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import { FiCopy, FiDownload, FiEye, FiEyeOff, FiMoreVertical, FiTrash2, FiUpload } from 'react-icons/fi';
import { useProductDelete } from '../../../../../hooks/useProduct';
import type { MyShopProductDto } from '../../../../../types/ProductType';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import ImportModal from '../../../../common/ImportModal';

interface CheckboxSelectedProps {
  selectedProductIds: string[];
  products: MyShopProductDto[];
  updateVisibilityMultible?: (ids: string[], visible: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onRefresh: () => void;
}

const CheckboxSelected = ({
  selectedProductIds,
  products,
  updateVisibilityMultible,
  onSelectAll,
  onRefresh
}: CheckboxSelectedProps) => {
  const totalCount = products.length;
  const selectedCount = selectedProductIds.length;

  const allSelected = selectedCount === totalCount && totalCount > 0;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  const { deleteProducts, isLoading } = useProductDelete();
  const [importModalOpened, { open: openImportModal, close: closeImportModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);

  const visibilityInfo = useMemo(() => {
    if (selectedCount === 0) return { canToggleVisibility: false, allHidden: false, allActive: false };

    const selectedProducts = products.filter(product =>
      selectedProductIds.includes(product.id)
    );

    const allHidden = selectedProducts.every(product => product.status === 'HIDDEN');
    const allActive = selectedProducts.every(product => product.status === 'ACTIVE');

    const toggleableProducts = selectedProducts.filter(
      product => product.status === 'HIDDEN' || product.status === 'ACTIVE'
    );

    const canToggleVisibility = allHidden || allActive;

    return {
      canToggleVisibility,
      allHidden,
      allActive,
      toggleableIds: toggleableProducts.map(p => p.id),
      toggleableCount: toggleableProducts.length
    };
  }, [selectedProductIds, products, selectedCount]);

  const handleBulkDelete = async () => {
    try {
      await deleteProducts(selectedProductIds);
      closeDeleteModal();
      onRefresh();
    } catch (error) {
      console.error('Failed to delete products:', error);
    }
  };

  const handleToggleVisibility = async () => {
    if (!updateVisibilityMultible || !visibilityInfo.canToggleVisibility) return;

    try {
      setIsUpdatingVisibility(true);
      const makeVisible = visibilityInfo.allHidden;
      if (!visibilityInfo.toggleableIds) return;
      await updateVisibilityMultible(visibilityInfo.toggleableIds, makeVisible);
      onRefresh();
    } catch (error) {
      console.error('Failed to update products visibility:', error);
    } finally {
      setIsUpdatingVisibility(false);
    }
  };

  // Determine the visibility action text
  const visibilityActionText = visibilityInfo.allHidden
    ? `Hiển thị ${visibilityInfo.toggleableCount} sản phẩm`
    : `Ẩn ${visibilityInfo.toggleableCount} sản phẩm`;

  return (
    <Group justify="space-between">
      <Group>
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onChange={(e) => onSelectAll(e.currentTarget.checked)}
          label={`Chọn tất cả (${totalCount})`}
        />
        {selectedCount > 0 && (
          <Text size="sm" fw={500} c="blue">
            Đã chọn {selectedCount} sản phẩm
          </Text>
        )}
      </Group>

      <Menu shadow="md" width={220} position="bottom-end">
        <Menu.Target>
          <Button
            rightSection={<FiMoreVertical size={16} />}
            variant="subtle"
            color="dark"
            size="xs"
            className={`${selectedCount === 0 ? '' : 'hover:!text-primary hover:!bg-primary/10 hover:!border-primary transition-colors duration-200'}`}
          >
            Tùy chọn
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<FiUpload size={14} />}
            onClick={openImportModal}
          >
            Nhập từ Excel/CSV
          </Menu.Item>
          <Menu.Item
            title={`${selectedCount === 0 ? 'Chọn sản phẩm để thực hiện chức năng' : `Xuất ${selectedCount} sản phẩm`}`}
            disabled={selectedCount === 0}
            leftSection={<FiDownload size={14} />}
          >
            Xuất ra Excel
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            title={`${selectedCount === 0 ? 'Chọn sản phẩm để thực hiện chức năng' : `Nhân bản ${selectedCount} sản phẩm`}`}
            leftSection={<FiCopy size={14} />}
            color="blue"
            disabled={selectedCount === 0}
          >
            Nhân bản sản phẩm
          </Menu.Item>
          <Menu.Item
              title={visibilityActionText}
              leftSection={visibilityInfo.allHidden ? <FiEye size={14} /> : <FiEyeOff size={14} />}
              color="blue"
              onClick={handleToggleVisibility}
              disabled={isUpdatingVisibility || !updateVisibilityMultible || !visibilityInfo.canToggleVisibility}
            >
              {visibilityInfo.allHidden ? "Hiển thị sản phẩm" : "Ẩn sản phẩm"}
            </Menu.Item>
          <Menu.Item
            title={`${selectedCount === 0 ? 'Chọn sản phẩm để thực hiện chức năng' : `Xóa ${selectedCount} sản phẩm`}`}
            leftSection={<FiTrash2 size={14} />}
            color="red"
            onClick={openDeleteModal}
            disabled={selectedCount === 0}
          >
            Xóa hàng loạt
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Modals */}
      <ImportModal
        opened={importModalOpened}
        onClose={closeImportModal}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpened}
        onClose={closeDeleteModal}
        onConfirm={handleBulkDelete}
        isLoading={isLoading}
        title="Xóa hàng loạt sản phẩm"
        isMultiDelete={true}
        itemCount={selectedCount}
      />
    </Group>
  );
};

export default CheckboxSelected;