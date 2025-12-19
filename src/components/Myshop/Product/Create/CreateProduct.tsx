import { Button, Container, Group, LoadingOverlay, Modal, Paper, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { FiEye, FiSave } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Infor from './Infor';
import { useProductForm } from '../../../../hooks/useProductForm';
  
const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const { form, handleSubmit, isLoading } = useProductForm(isEditMode);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(form.isDirty());
  }, [form.values, form.isDirty]);

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  

  return (
    <Container fluid px="lg" py="md" style={{ position: 'relative' }}>
      <LoadingOverlay 
        visible={isLoading} 
        zIndex={1000}
        overlayProps={{ 
          radius: "sm", 
          blur: 2,
          backgroundOpacity: 0.5 
        }}
      />

      <Modal
        opened={isPreviewOpen}
        onClose={closePreview}
        size="90%"
        padding={0}
        centered
        styles={{
          header: { padding: '16px 24px', borderBottom: '1px solid #e9ecef' },
          body: { padding: 0 },
          content: {
            borderRadius: '8px',
            maxHeight: '95vh',
            display: 'flex',
            flexDirection: 'column'
          },
          inner: {
            padding: '20px'
          },
          title: {
            fontWeight: 600,
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          },
          close: {
            backgroundColor: '#f8f9fa',
            '&:hover': {
              backgroundColor: '#e9ecef'
            }
          }
        }}
        title={
          <Group>
            <FiEye size={20} className="text-primary" />
            <Text>Xem trước sản phẩm</Text>
          </Group>
        }
        transitionProps={{ transition: 'fade', duration: 300 }}
      >
        <div style={{
          overflow: 'auto',
          maxHeight: 'calc(95vh - 60px)',
          padding: '0'
        }}>
          {/* <Review
            form={form}
            media={media}
            onBack={closePreview}
            onSubmit={handleSubmit}
            isPreview={true}
          /> */}
        </div>
      </Modal>

      <Paper className="!bg-transparent mb-20">
        <Infor
          form={form}
          isEditMode={isEditMode}
        />
      </Paper>

      <Paper
        shadow="md"
        p="md"
        className="bg-white border-t fixed bottom-0 left-0 right-0 z-10"
        style={{ boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}
      >
        <Container fluid px="lg">
          <Group justify="space-between">
            <Text size="sm" c="dimmed" className="hidden md:block">
              {isLoading 
                ? (isEditMode ? 'Đang cập nhật sản phẩm...' : 'Đang tạo sản phẩm...') 
                : isDirty 
                  ? 'Sản phẩm có thay đổi chưa được lưu' 
                  : isEditMode 
                    ? 'Chỉnh sửa thông tin sản phẩm của bạn' 
                    : 'Tạo và quản lý thông tin sản phẩm của bạn'
              }
            </Text>
            <Group>
              <Button
                leftSection={<FiEye size={16} />}
                variant="outline"
                onClick={openPreview}
                radius="md"
                disabled={isLoading}
              >
                Xem trước
              </Button>
              <Button
                leftSection={<FiSave size={16} />}
                variant="default"
                radius="md"
                disabled={isLoading}
              >
                Lưu nháp
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={handleSubmit}
                disabled={!isDirty || isLoading}
                loading={isLoading}
                radius="md"
              >
                {isEditMode ? 'Cập nhật sản phẩm' : 'Đăng sản phẩm'}
              </Button>
            </Group>
          </Group>
        </Container>
      </Paper>
    </Container>
  );
};

export default ProductForm;