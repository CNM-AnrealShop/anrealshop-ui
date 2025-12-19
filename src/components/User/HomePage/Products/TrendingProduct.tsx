// import { Box, Button, Group, SimpleGrid, Title } from '@mantine/core';
// import { FiChevronRight, FiTrendingUp } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import { mockTrendingProducts } from '../../../../data/UserData';
// import ProductCard from '../../Common/ProductCard';

// const TrendingProducts = () => {
//   return (
//     <Box className="">
//       <Group justify="space-between" className="mb-4">
//         <Title order={4} className="flex items-center gap-2 text-slate-900">
//           <FiTrendingUp size={24} className="text-red-500" />
//           <span>Xu hướng mua sắm</span>
//         </Title>
//         <Button
//           component={Link}
//           to="/trending"
//           variant="subtle"
//           color="blue"
//           rightSection={<FiChevronRight size={16} />}
//           className="text-primary hover:bg-blue-50"
//         >
//           Xem tất cả
//         </Button>
//       </Group>

//       <SimpleGrid
//         cols={5}
//         spacing="md"
//       >
//         {mockTrendingProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default TrendingProducts;