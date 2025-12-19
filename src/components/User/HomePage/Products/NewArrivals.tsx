// import { Box, Button, Group, SimpleGrid, Title } from '@mantine/core';
// import { FiChevronRight, FiPackage } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import { mockNewArrivals } from '../../../../data/UserData';
// import ProductCard from '../../Common/ProductCard';
// const NewArrivals = () => {
//   return (
//     <Box className="">
//       <Group justify="space-between" className="mb-4">
//         <Title order={4} className="flex items-center gap-2 text-slate-900">
//           <FiPackage size={24} className="text-green-500" />
//           <span>Hàng mới về</span>
//         </Title>
//         <Button
//           component={Link}
//           to="/new-arrivals"
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
//         {mockNewArrivals.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default NewArrivals;