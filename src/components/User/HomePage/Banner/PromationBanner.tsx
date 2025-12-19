import { Paper, Title, Text, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

const PromotionBanner = () => {
  return (
    <Paper
      radius="md"
      p="xl"
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=1031)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary bg-opacity-50" />
      
      <div className="relative z-10">
        <Title order={2} className="mb-4 font-bold">Giảm giá đặc biệt tháng 6</Title>
        <Text size="xl" className="mb-8 max-w-2xl">
          Mua sắm ngay để nhận ưu đãi lên đến 50% cho tất cả sản phẩm thời trang, điện tử và gia dụng.
        </Text>
        <Group>
          <Button 
            component={Link}
            to="/promotions/summer"
            size="lg"
            variant="filled"
            radius="md"
            className="bg-white hover:bg-gray-100 text-primary transition-colors"
          >
            Mua ngay
          </Button>
          <Button 
            component={Link}
            to="/promotions"
            size="lg"
            variant="outline"
            radius="md"
            className="!border-white !text-white !hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            Xem thêm ưu đãi
          </Button>
        </Group>
      </div>
    </Paper>
  );
};

export default PromotionBanner;