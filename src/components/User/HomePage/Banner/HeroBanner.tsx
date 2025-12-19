import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Box, Button, Grid, Overlay, Paper, Stack, Text, Title } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const banners = [
  {
    id: 1,
    title: 'Khuyến mãi mùa hè',
    description: 'Giảm đến 50% cho các sản phẩm thời trang mùa hè',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1170',
    buttonText: 'Mua ngay',
    url: '/promotions/summer',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Thiết bị điện tử mới',
    description: 'Khám phá những thiết bị công nghệ mới nhất',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170',
    buttonText: 'Khám phá',
    url: '/category/electronics',
    color: 'gray'
  },
  {
    id: 3,
    title: 'Thời trang thu đông',
    description: 'Bộ sưu tập thu đông mới nhất đã về',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170',
    buttonText: 'Xem bộ sưu tập',
    url: '/category/winter-fashion',
    color: 'red'
  }
];

const staticBanners = [
  {
    id: 1,
    title: 'Thời trang nam',
    subtitle: 'Bộ sưu tập mới',
    image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=600',
    url: '/category/men-fashion'
  },
  {
    id: 2,
    title: 'Phụ kiện',
    subtitle: 'Giảm giá 30%',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600',
    url: '/category/accessories'
  }
];

const HeroBanner = () => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  return (
    <Grid gutter="md" >
      {/* Banner động chiếm 70% chiều rộng */}
      <Grid.Col span={{ base: 12, md: 9 }}>
        <Carousel
          withIndicators
          height={400}
          slideSize="100%"
          slideGap="md"
          loop
          plugins={[autoplay.current]}
          onMouseEnter={() => autoplay.current?.stop()}
onMouseLeave={() => autoplay.current?.reset()}
          className="rounded-md overflow-hidden"
          withControls={false}
            styles={{
              indicator: {
                width: 12,
                height: 4,
                transition: 'width 250ms ease',
                '&[data-active]': {
                  width: 40,
                },
              },
            }}
            
          >
          {banners.map((banner) => (
            <Carousel.Slide key={banner.id}>
              <Paper
                radius="md"
                className="h-full flex items-center relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <Box
                  p="xl"
                  className="max-w-lg z-10 text-white"
                >
                  <Title order={1} className="mb-4 font-bold">{banner.title}</Title>
                  <Text size="xl" className="mb-8">{banner.description}</Text>
                  <Button
                    component={Link}
                    to={banner.url}
                    size="lg"
                    radius="md"
                    className="bg-primary hover:bg-primary-dark transition-colors"
                  >
                    {banner.buttonText}
                  </Button>
                </Box>
              </Paper>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Grid.Col>

      {/* Banner tĩnh chiếm 30% chiều rộng, chia thành 2 banner xếp dọc */}
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Stack gap="md" style={{ height: '400px' }}>
          {staticBanners.map((banner) => (
            <Paper
              key={banner.id}
              radius="md"
              className="overflow-hidden relative flex-1 shadow-md group"
            >
              <Link to={banner.url} className="block h-full">
                <Box
                  className="h-full w-full relative transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${banner.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay với gradient đẹp hơn */}
                  <Overlay
                    gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 90%)"
                    opacity={1}
                    zIndex={1}
                    className="transition-opacity duration-300 group-hover:opacity-90"
                  />

                  {/* Content container */}
                  <Box className="absolute inset-0 p-5 flex flex-col justify-end z-10">
                    {/* Badge-like component cho subtitle */}
                    <Text
                      className=" font-medium text-sx mb-2 !text-white bg-opacity-80 
                               inline-block py-1 px-3 rounded-full self-start"
                    >
                      {banner.subtitle}
                    </Text>

                    {/* Tiêu đề với hiệu ứng hover */}
                    <Title
                      order={4}
                      className="text-white mb-3 transition-transform duration-300"
                    >
                      {banner.title}
                    </Title>
                  </Box>
                </Box>
              </Link>
            </Paper>
          ))}
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default HeroBanner;