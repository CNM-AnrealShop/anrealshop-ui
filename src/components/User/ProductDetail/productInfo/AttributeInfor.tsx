import {
    Button,
    Divider,
    Group,
    Paper,
    Table,
    Text,
    Tooltip
} from '@mantine/core';
import { useState } from 'react';
import {
    FiChevronDown,
    FiChevronUp,
    FiInfo
} from 'react-icons/fi';
import type { ProductAttribute } from '../../../../types/AttributeType';

interface AttributeInforProps {
    attributes: ProductAttribute[];
    selectedAttributes: Record<string, string>;
    groupedAttributes: ProductAttribute[];
}

export const AttributeInfor = ({ attributes, selectedAttributes, groupedAttributes }: AttributeInforProps) => {
    const [showAllAttributes, setShowAllAttributes] = useState(false);

    // Display only the first 3 attributes when not expanded
    const displayedAttributes = showAllAttributes
        ? attributes
        : attributes.slice(0, 3);

    if (!attributes || attributes.length === 0) {
        return null;
    }

    return (
        <Paper withBorder pt="md" px="md" radius="md" className="mb-6">
            <Group className="mb-3" align="center">
                <FiInfo size={18} className="text-primary" />
                <Text fw={600} size="md">Thông tin sản phẩm</Text>
            </Group>

            <Divider className="mb-3" />

            <Table>
                <Table.Tbody>
                    {/* Display limited or all attributes based on showAllAttributes state */}
                    {displayedAttributes.map((attr, idx) => (
                        <Table.Tr key={`attr-${attr.attributeKeyName}-${idx}`}>
                            <Table.Td className="bg-gray-50 font-medium w-1/3">{attr.attributeKeyDisplay}</Table.Td>
                            <Table.Td>{Array.isArray(attr.values) ? attr.values.join(', ') : attr.values}</Table.Td>
                        </Table.Tr>
                    ))}

                    {/* Show "See More" button if there are more than 3 attributes */}
                    {attributes.length > 3 && (
                        <Table.Tr>
                            <Table.Td colSpan={2} className="!text-center !py-2">
                                <Tooltip label={showAllAttributes ? 'Thu gọn' : `Xem thêm `}>
                                    <Button
                                        variant="subtle"
                                        size="xs"
                                        onClick={() => setShowAllAttributes(!showAllAttributes)}
                                        className="text-primary "
                                    >
                                        {showAllAttributes ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                    </Button>
                                </Tooltip>
                            </Table.Td>
                        </Table.Tr>
                    )}

                    {/* Selected options section */}
                    {Object.keys(selectedAttributes).length > 0 && (
                        <>
                            <Table.Tr>
                                <Table.Td colSpan={2} className="!font-bold !bg-gray-100">
                                    Tùy chọn đã chọn
                                </Table.Td>
                            </Table.Tr>
                            {groupedAttributes.map(group => (
                                selectedAttributes[group.attributeKeyName] && (
                                    <Table.Tr key={`selected-${group.attributeKeyName}`}>
                                        <Table.Td className="bg-gray-50 font-medium">{group.attributeKeyDisplay}</Table.Td>
                                        <Table.Td>{selectedAttributes[group.attributeKeyName]}</Table.Td>
                                    </Table.Tr>
                                )
                            ))}
                        </>
                    )}
                </Table.Tbody>
            </Table>
        </Paper>
    );
};