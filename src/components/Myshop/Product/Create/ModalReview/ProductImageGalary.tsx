// import { Carousel } from '@mantine/carousel';
// import '@mantine/carousel/styles.css';
// import { Card, Image, useMantineTheme } from '@mantine/core';
// import { useState, useEffect } from 'react';

// interface MediaItem {
//   file?: File;
//   url: string;
//   id?: string;
//   type: 'image' | 'video';
// }

// interface ProductImageGalleryProps {
//   media: MediaItem[];
//   productName: string;
// }

// const ProductImageGallery = ({ media, productName }: ProductImageGalleryProps) => {
//   const theme = useMantineTheme();
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (media && media.length > 0) {
//       setSelectedImage(media[0].url);
//     }
//   }, [media]);

//   if (!media || media.length === 0) {
//     return (
//       <Card shadow="sm" padding={0} radius="md" withBorder>
//         <div className="bg-gray-100 flex justify-center items-center text-gray-400" style={{ height: '450px' }}>
//           <div className="text-center">
//             <div className="text-6xl mb-4">📷</div>
//             <div>Chưa có hình ảnh</div>
//           </div>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <Card shadow="sm" padding={0} radius="md" withBorder>
//       {/* Main Image Display */}
//       <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex justify-center items-center" style={{ height: '450px' }}>
//         <Image
//           src={selectedImage}
//           height={400}
//           fit="contain"
//           alt={productName}
//           className="rounded-lg shadow-lg"
//           style={{ maxWidth: '100%' }}
//         />
//       </div>

//       {/* Thumbnail Carousel */}
//       {media.length > 1 && (
//         <div className="p-4 bg-white border-t">
//           <Carousel
//             slideSize="20%"
//             slideGap="sm"
//             align="start"
//             slidesToScroll={Math.min(5, media.length)}
//             withControls={media.length > 5}
//             controlsOffset="xs"
//             styles={{
//               control: {
//                 backgroundColor: theme.white,
//                 border: `1px solid ${theme.colors.gray[3]}`,
//                 boxShadow: theme.shadows.sm,
//                 '&:hover': {
//                   backgroundColor: theme.colors.gray[0]
//                 }
//               }
//             }}
//           >
//             {media.map((item, index) => (
//               <Carousel.Slide key={index}>
//                 <div className="relative">
//                   <Image
//                     src={item.url}
//                     height={70}
//                     width={70}
//                     fit="cover"
//                     style={{
//                       border: selectedImage === item.url 
//                         ? `3px solid ${theme.colors.blue[6]}` 
//                         : `1px solid ${theme.colors.gray[3]}`,
//                       borderRadius: theme.radius.sm,
//                       cursor: 'pointer',
//                       transition: 'all 0.2s ease'
//                     }}
//                     onClick={() => setSelectedImage(item.url)}
//                     alt={`Hình ảnh sản phẩm ${index + 1}`}
//                     className="hover:shadow-md"
//                   />
//                   {selectedImage === item.url && (
//                     <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-sm" />
//                   )}
//                 </div>
//               </Carousel.Slide>
//             ))}
//           </Carousel>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default ProductImageGallery;
