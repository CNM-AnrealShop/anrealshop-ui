import { Box, Button, Group, Paper, Text, Tooltip, TypographyStylesProvider } from '@mantine/core';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFileText } from 'react-icons/fi';

interface ProductDescriptionProps {
  description: string;
  sortDescription?: string;
}

const ProductDescription = ({ description, sortDescription }: ProductDescriptionProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!description) return null;

  return (
    <Box className="mb-4">
      <Paper withBorder p="md" radius="md" className="bg-gray-50">
        <Group justify="apart" className="mb-2">
          <Group>
            <FiFileText size={16} className="text-primary" />
            <Text fw={500} size="md">Mô tả sản phẩm</Text>
          </Group>
          {description.length > 150 && showFullDescription && (
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          )}
        </Group>

        {showFullDescription || description.length <= 150 ? (
          <Box className="text-gray-700">
            {description.includes('<') ? (
              <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </TypographyStylesProvider>
            ) : (
              <Text>{description}</Text>
            )}
          </Box>
        ) : (
          <Box className="text-gray-700">
            <Text>{sortDescription || description.substring(0, 150) + '...'}</Text>
          </Box>
        )}
        <div className="w-full text-center mt-2">
          <Tooltip label={showFullDescription ? 'Thu gọn' : `Xem thêm `}>
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary "
            >
              {showFullDescription ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </Button>
          </Tooltip>
        </div>
      </Paper>
    </Box>
  );
};

export default ProductDescription;