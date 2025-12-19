// import { useState, useEffect } from 'react';
// import { Box, Container, Grid, Title, Text, Button, Card, Group, Badge, Image, SimpleGrid, Skeleton, Center, Stack } from '@mantine/core';
// import { useNavigate } from 'react-router-dom';
// import { FiArrowRight, FiStar, FiHeart, FiShoppingCart, FiTrendingUp, FiEye } from 'react-icons/fi';
// import { mockCategories, mockFeaturedProducts, mockNewArrivals, mockTrendingProducts, type Category, type Product } from '../../data/UserData';

// // Định nghĩa kiểu dữ liệu


// const HomePageIntro = () => {
//   const navigate = useNavigate();
//   const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
//   const [newArrivals, setNewArrivals] = useState<Product[]>([]);
//   const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
//   const [popularCategories, setPopularCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch dữ liệu
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         // Trong thực tế, đây sẽ là API call
//         // Hiện tại chỉ sử dụng dữ liệu giả
//         setTimeout(() => {
//           setFeaturedProducts(mockFeaturedProducts);
//           setNewArrivals(mockNewArrivals);
//           setTrendingProducts(mockTrendingProducts);
//           setPopularCategories(mockCategories);
//           setIsLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Định dạng giá tiền
//   const formatPrice = (price: number) => {
//     return price.toLocaleString('vi-VN') + '₫';
//   };

//   return (
//     <Box>
//       {/* Hero Banner */}
//       <Box
//         style={(theme) => ({
//           background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
//           color: 'white',
//           padding: parseFloat(theme.spacing.xl) * 2,
//           borderRadius: theme.radius.md,
//           marginBottom: theme.spacing.xl,
//           position: 'relative',
//           overflow: 'hidden'
//         })}
//       >
//         <Container size="lg">
//           <Grid>
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <Box pt={50}>
//                 <Text fw={700} fz={50} mb={20}>
//                   Sàn thương mại điện tử
//                   <Text span fw={900} fz={55} c="yellow">
//                     {' '}AnrealShop
//                   </Text>
//                 </Text>
//                 <Text fz="xl" mb={30} maw={500} fw={500}>
//                   Thỏa sức mua sắm với hàng ngàn sản phẩm đa dạng từ các thương hiệu uy tín.
//                 </Text>
//                 <Group>
//                   <Button size="lg" radius="md" onClick={() => navigate('/products')}>
//                     Mua sắm ngay
//                   </Button>
//                   <Button size="lg" radius="md" variant="outline" color="white">
//                     Khám phá thêm
//                   </Button>
//                 </Group>
//               </Box>
//             </Grid.Col>
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <Center>
//                 <Image
//                   src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=870"
//                   radius="md"
//                   alt="Shopping"
//                   maw={500}
//                   style={{ maxHeight: '400px', objectFit: 'contain' }}
//                 />
//               </Center>
//             </Grid.Col>
//           </Grid>
//         </Container>
//       </Box>

//       <Container size="lg">
//         {/* Danh mục phổ biến */}
//         <Title order={2} ta="center" mb="xl">
//           Danh mục phổ biến
//         </Title>

//         <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing="md" mb={50}>
//           {isLoading
//             ? Array.from({ length: 6 }).map((_, index) => (
//                 <Skeleton key={index} height={160} radius="md" />
//               ))
//             : popularCategories.map((category) => (
//                 <Card
//                   key={category.id}
//                   padding="md"
//                   radius="md"
//                   withBorder
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => navigate(`/category/${category.id}`)}
//                 >
//                   <Card.Section>
//                     <Image
//                       src={category.image}
//                       height={100}
//                       alt={category.name}
//                       style={{ objectFit: 'cover' }}
//                     />
//                   </Card.Section>
//                   <Text fw={500} fz="md" mt="md" ta="center">
//                     {category.name}
//                   </Text>
//                   <Text fz="xs" c="dimmed" ta="center">
//                     {category.productCount} sản phẩm
//                   </Text>
//                 </Card>
//               ))}
//         </SimpleGrid>

//         {/* Sản phẩm nổi bật */}
//         <Box mb={50}>
//           <Group justify="space-between" mb="md">
//             <Title order={2}>Sản phẩm nổi bật</Title>
//             <Button
//               variant="subtle"
//               rightSection={<FiArrowRight size={16} />}
//               onClick={() => navigate('/products?featured=true')}
//             >
//               Xem tất cả
//             </Button>
//           </Group>

//           <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
//             {isLoading
//               ? Array.from({ length: 4 }).map((_, index) => (
//                   <Skeleton key={index} height={400} radius="md" />
//                 ))
//               : featuredProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
//                 ))}
//           </SimpleGrid>
//         </Box>

//         {/* Banner quảng cáo */}
//         <Box
//           style={(theme) => ({
//             background: 'linear-gradient(45deg, #16a34a, #22c55e)',
//             color: 'white',
//             padding: theme.spacing.xl,
//             borderRadius: theme.radius.md,
//             marginBottom: parseFloat(theme.spacing.xl) * 2,
//           })}
//         >
//           <Grid>
//             <Grid.Col span={{ base: 12, md: 8 }}>
//               <Text fw={700} fz={28} mb={10}>
//                 Khuyến mãi đặc biệt cho khách hàng mới
//               </Text>
//               <Text fz="lg" mb={20} maw={600}>
//                 Đăng ký ngay hôm nay và nhận mã giảm giá 10% cho đơn hàng đầu tiên
//               </Text>
//               <Button size="md" color="white" radius="md" variant="white" c="dark">
//                 Đăng ký ngay
//               </Button>
//             </Grid.Col>
//             <Grid.Col span={{ base: 12, md: 4 }}>
//               <Center h="100%">
//                 <Text fw={900} fz={40}>
//                   GIẢM 10%
//                 </Text>
//               </Center>
//             </Grid.Col>
//           </Grid>
//         </Box>

//         {/* Sản phẩm mới */}
//         <Box mb={50}>
//           <Group justify="space-between" mb="md">
//             <Title order={2}>Sản phẩm mới</Title>
//             <Button
//               variant="subtle"
//               rightSection={<FiArrowRight size={16} />}
//               onClick={() => navigate('/products?sort=newest')}
//             >
//               Xem tất cả
//             </Button>
//           </Group>

//           <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
//             {isLoading
//               ? Array.from({ length: 4 }).map((_, index) => (
//                   <Skeleton key={index} height={400} radius="md" />
//                 ))
//               : newArrivals.map((product) => (
//                   <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
//                 ))}
//           </SimpleGrid>
//         </Box>

//         {/* Xu hướng */}
//         <Box mb={50}>
//           <Group justify="space-between" mb="md">
//             <Group>
//               <FiTrendingUp size={24} />
//               <Title order={2}>Sản phẩm được tìm kiếm nhiều</Title>
//             </Group>
//             <Button
//               variant="subtle"
//               rightSection={<FiArrowRight size={16} />}
//               onClick={() => navigate('/products?sort=trending')}
//             >
//               Xem tất cả
//             </Button>
//           </Group>

//           <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
//             {isLoading
//               ? Array.from({ length: 4 }).map((_, index) => (
//                   <Skeleton key={index} height={400} radius="md" />
//                 ))
//               : trendingProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
//                 ))}
//           </SimpleGrid>
//         </Box>

//         {/* Đăng ký nhận tin */}
//         <Box mb={50}>
//           <Card withBorder radius="md" p="xl">
//             <Stack ta="center" gap="md">
//               <Title order={2}>Đăng ký nhận tin</Title>
//               <Text c="dimmed" maw={500} mx="auto">
//                 Đăng ký để nhận thông tin về các sản phẩm mới và khuyến mãi đặc biệt
//               </Text>
//               <Group justify="center" gap="md">
//                 <Button size="md" radius="xl">
//                   Đăng ký ngay
//                 </Button>
//               </Group>
//             </Stack>
//           </Card>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// // Component ProductCard
// interface ProductCardProps {
//   product: Product;
//   formatPrice: (price: number) => string;
// }

// const ProductCard = ({ product, formatPrice }: ProductCardProps) => {
//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Card
//       padding="md"
//       radius="md"
//       withBorder
//       style={{ cursor: 'pointer', position: 'relative' }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={() => navigate(`/product/${product.id}`)}
//     >
//       {product.isNew && (
//         <Badge color="green" variant="filled" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
//           Mới
//         </Badge>
//       )}
      
//       {product.discountPrice && (
//         <Badge color="red" variant="filled" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
//           -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
//         </Badge>
//       )}
      
//       <Card.Section pos="relative">
//         <Image
//           src={product.images[0]}
//           height={220}
//           alt={product.name}
//           style={{ objectFit: 'cover' }}
//         />
        
//         {isHovered && (
//           <Box
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               left: 0,
//               right: 0,
//               background: 'rgba(0,0,0,0.7)',
//               padding: '10px',
//               display: 'flex',
//               justifyContent: 'space-around',
//               transition: 'all 0.3s ease',
//             }}
//           >
//             <Button variant="subtle" color="white"  onClick={(e) => {
//               e.stopPropagation();
//               // Thêm vào giỏ hàng
//             }}>
//               <FiShoppingCart size={20} />
//             </Button>
//             <Button variant="subtle" color="white"  onClick={(e) => {
//               e.stopPropagation();
//               // Thêm vào yêu thích
//             }}>
//               <FiHeart size={20} />
//             </Button>
//             <Button variant="subtle" color="white"  onClick={(e) => {
//               e.stopPropagation();
//               navigate(`/product/${product.id}`);
//             }}>
//               <FiEye size={20} />
//             </Button>
//           </Box>
//         )}
//       </Card.Section>
      
//       <Box mt="md">
//         <Text size="sm" c="dimmed">
//           {product.category.name} • {product.shop.name}
//         </Text>
//         <Text fw={500} fz="lg" mt={5} lineClamp={1}>
//           {product.name}
//         </Text>
        
//         <Group justify="apart" mt={5}>
//           <Group>
//             {product.discountPrice ? (
//               <Group gap={5}>
//                 <Text fz="lg" fw={700} c="red">
//                   {formatPrice(product.discountPrice)}
//                 </Text>
//                 <Text fz="sm" td="line-through" c="dimmed">
//                   {formatPrice(product.price)}
//                 </Text>
//               </Group>
//             ) : (
//               <Text fz="lg" fw={700}>
//                 {formatPrice(product.price)}
//               </Text>
//             )}
//           </Group>
          
//           <Group gap={3}>
//             <FiStar size={16} style={{ color: '#f59e0b' }} />
//             <Text fz="sm">{product.rating}</Text>
//           </Group>
//         </Group>
//       </Box>
//     </Card>
//   );
// };

// // Dữ liệu mẫu


// export default HomePageIntro;