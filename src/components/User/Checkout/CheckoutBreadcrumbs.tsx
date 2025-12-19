import { Anchor, Text } from '@mantine/core'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const CheckoutBreadcrumbs = () => {
    return (
        <div className="flex items-center space-x-2 text-sm mb-4">
            <Anchor component={Link} to="/" className="text-gray-500 hover:text-primary no-underline">
                Trang chủ
            </Anchor>
            <FiChevronRight size={14} className="text-gray-400" />
            <Text className="text-gray-900">Thanh toán</Text>
        </div>
    )
}

export default CheckoutBreadcrumbs
