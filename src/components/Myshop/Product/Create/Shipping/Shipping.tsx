import {
  ActionIcon,
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  type NumberInputProps
} from '@mantine/core';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface ShippingProps {
  weightProps: NumberInputProps,
  heightProps: NumberInputProps,
  widthProps: NumberInputProps,
  lengthProps: NumberInputProps
}

const Shipping = ({ weightProps, heightProps, widthProps, lengthProps }: ShippingProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSection = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Paper shadow="xs" p="md" mb="md" className="bg-white">
      {/* Header */}
      <Group justify="space-between" mb={collapsed ? 0 : "md"}>
        <Title order={5}>Thông tin vận chuyển</Title>
        <ActionIcon variant="subtle" onClick={toggleSection}>
          {collapsed ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
        </ActionIcon>
      </Group>

      {!collapsed && (
        <Stack gap="md">
          <div>
            <Text size="sm" fw={500} mb={5}>Cân nặng</Text>
            <NumberInput
              placeholder="Nhập cân nặng sản phẩm"
              min={0}
              step={10}
              // {...form.getInputProps('weight')}
              {...weightProps}
              rightSection={<Text size="sm" c="dimmed">gr</Text>}
              rightSectionWidth={40}
            />
          </div>

          <div>
            <Text size="sm" fw={500} mb={5}>Kích thước (Dài × Rộng × Cao)</Text>
            <SimpleGrid cols={3} spacing="xs">
              <NumberInput
                placeholder="Dài"
                min={0}
                {...lengthProps}
                rightSection={<Text size="sm" c="dimmed">cm</Text>}
                rightSectionWidth={40}
              />
              <NumberInput
                placeholder="Rộng"
                min={0}
                {...widthProps}
                rightSection={<Text size="sm" c="dimmed">cm</Text>}
                rightSectionWidth={40}
              />
              <NumberInput
                placeholder="Cao"
                min={0}
                rightSection={<Text size="sm" c="dimmed">cm</Text>}
                rightSectionWidth={40}
                {...heightProps}
              />
            </SimpleGrid>

            <Text size="xs" c="dimmed" mt={8}>
              Kích thước và cân nặng được sử dụng để tính phí vận chuyển
            </Text>
          </div>
        </Stack>
      )}
    </Paper>
  );
};

export default Shipping;