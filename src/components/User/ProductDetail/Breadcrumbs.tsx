import { Anchor, Breadcrumbs as MantineBreadcrumbs, Text } from '@mantine/core';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatStringView } from '../../../untils/Untils';

interface BreadcrumbsProps {
  productName: string;
  categoryId?: string;
  categoryName?: string;
}

const Breadcrumbs = ({ productName, categoryId, categoryName }: BreadcrumbsProps) => {
  return (
    // <div className="w-full overflow-hidden">
      <MantineBreadcrumbs className="mb-4 w-full overflow-hidden" style={{ flexWrap: 'nowrap' }} separator={<FiChevronRight size={14} />}>
        <Anchor component={Link} to="/" className="!text-gray-500 hover:!text-primary no-underline">
          Trang chủ
        </Anchor>
        <Anchor component={Link} to="/products" className="!text-gray-500 hover:!text-primary no-underline">
          Sản phẩm
        </Anchor>
        {categoryId && categoryName && (
          <Anchor component={Link} to={`/category/${categoryId}`} className="!text-gray-500 hover:!text-primary no-underline">
            {formatStringView(categoryName)}
          </Anchor>
        )}
        <Text className="!text-gray-900 text-ellipsis w-1/1 !max-w-[400px] overflow-hidden" ml={1}>{formatStringView(productName)}</Text>
      </MantineBreadcrumbs>
    // </div>
  );
};

export default Breadcrumbs;