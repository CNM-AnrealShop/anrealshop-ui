import { useState } from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { FiEdit2, FiCopy, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { useProductDelete } from '../../../../../hooks/useProduct';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';

interface ProductActionMenuProps {
  productId: string;
  disabled?: boolean;
  productName?: string;
  onRefresh?: () => void;
}

const ProductActionMenu = ({ 
  productId, 
  disabled = false,
  productName = 'Sản phẩm',
  onRefresh,
}: ProductActionMenuProps) => {
  const navigate = useNavigate();
  const { deleteProduct, isLoading } = useProductDelete();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const handleEdit = () => {
    navigate(`/myshop/products/edit/${productId}`);
  };
  
  const handleDuplicate = () => {
  };
  
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    await deleteProduct(productId)
    setIsDeleteModalOpen(false);
    onRefresh?.();
  };
  
  return (
    <>
      <Menu shadow="md" position="bottom-end" withArrow>
        <Menu.Target>
          <ActionIcon variant="subtle" disabled={disabled}>
            <FiMoreVertical size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item 
            leftSection={<FiEdit2 size={14} />}
            onClick={handleEdit}
          >
            Chỉnh sửa
          </Menu.Item>
          <Menu.Item 
            leftSection={<FiCopy size={14} />}
            onClick={handleDuplicate}
          >
            Nhân bản
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item 
            leftSection={<FiTrash2 size={14} />} 
            color="red"
            onClick={handleDeleteClick}
          >
            Xóa
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
        productName={productName}
        productId={productId}
        isMultiDelete={false}
      />
    </>
  );
};

export default ProductActionMenu;