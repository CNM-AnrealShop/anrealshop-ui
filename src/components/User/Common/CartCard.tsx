import { Badge, Box, Button, Checkbox, Group, Image, NumberInput, Text, Tooltip } from '@mantine/core';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { CartItemDto } from '../../../types/CartType';
import { formatPrice } from '../../../untils/Untils';

export interface CartCardProps {
	item: CartItemDto;
	onSelect: (itemId: string, checked: boolean) => void;
	onUpdateQuantity: (itemId: string, quantity: number) => void;
	onRemove: (itemId: string) => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, onSelect, onUpdateQuantity, onRemove }) => {
	const inStock = item.quantity !== undefined ? item.quantity : true; // preserve original logic
	const maxQuantity = item.maxQuantity || 100;
	return (
		<Box className="my-4">
			<Group wrap="nowrap" align="flex-start">
				<Box className="flex items-center h-full pt-2">
					{inStock ? (
						<Checkbox
							checked={Boolean(item.isSelected)}
							onChange={(e) => onSelect(item.id, e.currentTarget.checked)}
						/>
					) : (
						<Tooltip label="Sản phẩm hết hàng">
							<Box>
								<Checkbox disabled />
							</Box>
						</Tooltip>
					)}
				</Box>

				<Link to={`/products/${item.urlSlug || item.productId}`}>
					<Box className="w-28 h-28 flex-shrink-0">
						<Image
							src={item.thumbnailUrl}
							alt={item.name || 'Product Image'}
							radius="md"
							className="w-full h-full object-cover border border-gray-200"
						/>
					</Box>
				</Link>

				<Box style={{ flex: 1 }}>
					<Group justify="space-between" align="flex-start">
						<Box style={{ flex: 1 }}>
							<Text component={Link} to={`/products/${item.productId}`} lineClamp={2} fw={500} className="text-slate-800 hover:text-primary h-11" >
								{item.name || 'N/A'}
							</Text>

							{item.attributeString && (
								<Text size="sm" c="dimmed" mt={4}>
									{item.attributeString}
								</Text>
							)}

							{!inStock && (
								<Badge color="red" variant="light" size="sm" mt={4}>
									Hết hàng
								</Badge>
							)}

							<Box className="md:hidden mt-3">
								<Text fw={600} className="text-primary">
									{formatPrice(item.price)}
								</Text>
							</Box>
						</Box>

						<Box className="hidden md:block text-right min-w-[120px]">
							<Text fw={600} className="text-primary">
								{formatPrice(item.price)}
							</Text>
						</Box>
					</Group>

					<Group justify="space-between" className="mt-1 md:mt-2" align="flex-end">
						<NumberInput
							value={typeof item.quantity === 'number' && !Number.isNaN(item.quantity) ? item.quantity : 1}
							onChange={(val) => {
								if (typeof val === 'number' && !Number.isNaN(val)) {
									onUpdateQuantity(item.id, val);
								}
							}}
							min={1}
							max={maxQuantity}
							disabled={!inStock}
							style={{ width: '120px' }}
							size="sm"
						/>

						<Group className="hidden md:flex">
							<Button
								variant="subtle"
								color="red"
								size="xs"
								leftSection={<FiTrash2 size={14} />}
								onClick={() => onRemove(item.id)}
							>
								Xóa
							</Button>
						</Group>
					</Group>
				</Box>
			</Group>
		</Box>
	);
};

export default CartCard;

