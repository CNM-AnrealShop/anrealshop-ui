// import { Box, Button, Group, SimpleGrid, Title } from '@mantine/core';
// import { FiChevronRight, FiStar } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import { mockFeaturedProducts } from '../../../../data/UserData';
// import ProductCard from '../../Common/ProductCard';

// const FeaturedProducts = () => {
//   return (
//     <Box>
//       <Group justify="space-between" className="mb-3">
//         <Title order={4} className="flex items-center gap-2 text-slate-900">
//           <FiStar size={24} className="text-yellow-500" />
//           <span>Sản phẩm nổi bật</span>
//         </Title>
//         <Button
//           component={Link}
//           to="/featured-products"
//           variant="subtle"
//           color="blue"
//           rightSection={<FiChevronRight size={16} />}
//           className="text-primary hover:bg-blue-50"
//         >
//           Xem tất cả
//         </Button>
//       </Group>

//       <SimpleGrid
//         cols={6}
//         spacing="md"
//       >
//         {mockFeaturedProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default FeaturedProducts;