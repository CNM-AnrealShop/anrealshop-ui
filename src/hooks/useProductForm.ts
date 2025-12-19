import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import showErrorNotification from '../components/Toast/NotificationError';
import showSuccessNotification from '../components/Toast/NotificationSuccess';
import { defaultProductDescriptionHtml } from '../data/InitData';
import ProductsService from '../service/ProductsService';
import type { ProductCreateRequest } from '../types/ProductType';


const defaultInitialValues: ProductCreateRequest = {
    name: '',
    description: defaultProductDescriptionHtml,
    sortDescription: '',
    price: 0,
    discountPrice: 0,
    quantity: 0,
    categoryId: '',
    categoryPath: '',
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
    attributes: [],
    productSkus: [],
    media: []
};

export const useProductForm = (isEditMode = false) => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProductCreateRequest>({
        initialValues: defaultInitialValues,
        validate: {
            name: (value) => {
                if (!value.trim()) return 'Tên sản phẩm không được để trống';
                if (value.trim().length > 255 || value.trim().length < 50) return 'Tên sản phẩm không được nhỏ hơn 50 và vượt quá 255 ký tự';
                return null;
            },
            description: (value) => {
                if (!value.trim()) return 'Mô tả sản phẩm không được để trống';
                return null;
            },
            sortDescription: (value) => {
                if (!value.trim()) return 'Mô tả ngắn không được để trống';
                if (value.trim().length > 500) return 'Mô tả ngắn không được vượt quá 500 ký tự';
                return null;
            },
            price: (value) => {
                if (value === null || value === undefined) return 'Giá sản phẩm không được để trống';
                if (value <= 0) return 'Giá sản phẩm phải lớn hơn 0';
                return null;
            },
            discountPrice: (value, values) => {
                if (value === null || value === undefined) return 'Giá khuyến mãi không được để trống';
                if (value < 0) return 'Giá khuyến mãi không hợp lệ';
                if (value > 0 && value >= values.price) return 'Giá khuyến mãi phải nhỏ hơn giá gốc';
                return null;
            },
            quantity: (value) => {
                if (value === null || value === undefined) return 'Số lượng không được để trống';
                if (value < 0) return 'Số lượng không hợp lệ';// Optional product ID for edit mode
                return null;
            },
            categoryId: (value) => {
                if (!value) return 'Vui lòng chọn danh mục';
                return null;
            },
            weight: (value) => {
                if (value === null || value === undefined) return 'Cân nặng không được để trống';
                if (value <= 0) return 'Cân nặng không hợp lệ';
                return null;
            },
            height: (value) => {
                if (value === null || value === undefined) return 'Chiều cao không được để trống';
                if (value <= 0) return 'Chiều cao không hợp lệ';
                return null;
            },
            length: (value) => {
                if (value === null || value === undefined) return 'Chiều dài không được để trống';
                if (value <= 0) return 'Chiều dài không hợp lệ';
                return null;
            },
            width: (value) => {
                if (value === null || value === undefined) return 'Chiều rộng không được để trống';
                if (value <= 0) return 'Chiều rộng không hợp lệ';
                return null;
            },
            productSkus: (value) => {
                if (!value || value.length === 0) return null;
                for (const sku of value) {
                    if (!sku.sku.trim()) return 'Mã SKU không được để trống';
                    if (sku.price === null || sku.price === undefined || sku.price <= 0) return 'Giá SKU phải lớn hơn 0';
                    if (sku.quantity === null || sku.quantity === undefined || sku.quantity < 0) return 'Số lượng SKU không hợp lệ';
                }
                return null;
            },
            media: (value) => {
                if (!value || value.length === 0) return 'Sản phẩm phải có ít nhất một hình ảnh';
                return null;
            },
            attributes: (value) => {
                if (!value) return 'Thuộc tính sản phẩm không hợp lệ';
                for (const attribute of value) {
                    if (!attribute.attributeKeyName.trim()) return 'Tên thuộc tính không được để trống';
                    if (!attribute.attributeKeyDisplay.trim()) return 'Tên hiển thị thuộc tính không được để trống';
                    if (!attribute.values || attribute.values.size === 0) return 'Thuộc tính phải có ít nhất một giá trị';
                }
                return null;
            }
        },
        validateInputOnChange: ['name'],
    });



    // Fetch product data if in edit mode
    useEffect(() => {
        const fetchProductData = async () => {
            if (!isEditMode || !id) return;

            try {
                const product: ProductCreateRequest = await ProductsService.getMyShopProductById(id);
                console.log('Fetched product data:', product);
                form.setValues(product);
            } catch (error: any) {
                showErrorNotification(
                    'Lỗi tải dữ liệu',
                    error.message || 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.'
                );
            }
        }

        fetchProductData();
    }, [isEditMode, id]);


    const clearForm = () => {
        form.setValues(defaultInitialValues);
        form.reset();
    };

    const handleSubmit = async () => {
        form.validate();
        if (!form.isValid()) {
            showErrorNotification('Thông báo', 'Vui lòng nhập đầy đủ thông tin sản phẩm và kiểm tra các lỗi.');
            return;
        }

        if (form.values.productSkus.length > 0) {
            const quantity = form.values.productSkus.reduce((total, sku) => total + (sku.quantity || 0), 0);
            form.values.quantity = quantity;
        }

        setIsLoading(true);

        try {
            if (isEditMode && id) {
                await ProductsService.update(id, form.values);
                showSuccessNotification('Thành công', 'Sản phẩm đã được cập nhật thành công.');
            } else {
                await ProductsService.create(form.values);
                showSuccessNotification('Thành công', 'Sản phẩm đã được tạo thành công.');
                // clearForm();
            }
        } catch (err: any) {
            let notificationMessage = err.message || 'Có trường chưa được nhập.';

            if (err.statusCode === 400 && err.details && Array.isArray(err.details)) {
                notificationMessage = err.message || 'Dữ liệu nhập vào không hợp lệ.';
            } else {
                notificationMessage = err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
            }

            showErrorNotification(
                isEditMode ? 'Cập nhật sản phẩm thất bại' : 'Tạo sản phẩm thất bại',
                notificationMessage
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        handleSubmit,
        clearForm,
        isLoading,
        isEditMode
    };
};