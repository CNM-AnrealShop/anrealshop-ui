import { useForm } from "@mantine/form";
import type { AddressDto, AddressRequestDto, SingleAddressDto } from "../types/AddressType";
import { useEffect, useState } from "react";
import { AddressService } from "../service/AddressService";
import showErrorNotification from "../components/Toast/NotificationError";
import { getErrorMessage } from "../untils/ErrorUntils";
import type { TypeMode } from "../constant";
import type { ComboboxItem } from "@mantine/core";
import showSuccessNotification from "../components/Toast/NotificationSuccess";


const initValue = {
    id: '',
    fullName: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    streetAddress: '',
    isPrimary: true,
}
export const useAddress = (mode: TypeMode = 'user') => {

    const [isLoading, setIsLoading] = useState(false);
    const [provinces, setProvinces] = useState<SingleAddressDto[]>([]);
    const [districts, setDistricts] = useState<SingleAddressDto[]>([]);
    const [wards, setWards] = useState<SingleAddressDto[]>([]);

    const addressForm = useForm({
        initialValues: initValue,
        validate: {
            fullName: (value) => (value.trim() === '' ? 'Họ tên không được để trống' : null),
            phone: (value) => (/^[0-9]{10}$/.test(value) ? null : 'Số điện thoại không hợp lệ'),
            province: (value) => (value ? null : 'Vui lòng chọn Tỉnh/Thành phố'),
            district: (value) => (value ? null : 'Vui lòng chọn Quận/Huyện'),
            ward: (value) => (value ? null : 'Vui lòng chọn Phường/Xã'),
            streetAddress: (value) => (value.trim() === '' ? 'Địa chỉ không được để trống' : null),
        },
    });

    const clearForm = () => {
        addressForm.reset();
        setDistricts([]);
        setWards([]);
    };

    useEffect(() => {
        AddressService.getProvinceList()
            .then((data) => {
                setProvinces(data);
            })
            .catch(error => {
                console.log(error)
                showErrorNotification("Tải danh sách tỉnh thất bại!", getErrorMessage(error));
            })
    }, [])

    useEffect(() => {
        if (addressForm.values.province && provinces.length > 0) {
            AddressService.getDistrictList(addressForm.values.province)
                .then((data) => {
                    setDistricts(data);
                })
                .catch(error => {
                    showErrorNotification("Tải danh sách quận thất bại!", getErrorMessage(error));
                });
        }
    }, [addressForm.values.province]);

    useEffect(() => {
        if (addressForm.values.district && districts.length > 0) {
            AddressService.getWardList(addressForm.values.district)
                .then((data) => {
                    setWards(data);
                })
                .catch(error => {
                    showErrorNotification("Tải danh sách phường thất bại!", getErrorMessage(error));
                });
        } 
    }, [addressForm.values.district]);

    const updateInitValue = (address: AddressDto) => {
        addressForm.setValues({
            id: address.id,
            fullName: address.receiverOrSenderName,
            phone: address.phoneNumber,
            province: address.provinceId,
            district: address.districtId,
            ward: address.wardId,
            streetAddress: address.detailAddress,
            isPrimary: address.primary,
        });
    };

    const addAddress = async () => {
        addressForm.validate();
        if (!addressForm.isValid()) {
            showErrorNotification('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const addressRequestDto: AddressRequestDto = {
            receiverOrSenderName: addressForm.values.fullName,
            phoneNumber: addressForm.values.phone,
            detailAddress: addressForm.values.streetAddress,
            wardId: addressForm.values.ward,
            isPrimary: addressForm.values.isPrimary,
        };
        setIsLoading(true);
        try {
            var data;
            if (mode === 'user') {
                data = await AddressService.createUserAddress(addressRequestDto);
            } else {
                data = await AddressService.createShopAddress(addressRequestDto);
            }
            showSuccessNotification('Thông báo', 'Thêm địa chỉ thành công');
            return data;
        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorNotification('Thông báo', getErrorMessage(error));
            return null;
        } finally {
            setIsLoading(false);9203489203920
        }
    }

    const updateAddress = async () => {
        addressForm.validate();
        if (!addressForm.isValid()) {
            showErrorNotification('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const addressRequestDto: AddressRequestDto = {
            receiverOrSenderName: addressForm.values.fullName,
            phoneNumber: addressForm.values.phone,
            detailAddress: addressForm.values.streetAddress,
            wardId: addressForm.values.ward,
            isPrimary: addressForm.values.isPrimary,
        };
        setIsLoading(true);
        try {
            var data;
            if (mode === 'user') {
                data = await AddressService.updateUserAddress(addressForm.values.id, addressRequestDto);
            } else {
                data = await AddressService.updateShopAddress(addressForm.values.id, addressRequestDto);
            }
            showSuccessNotification('Thông báo', 'Cập nhật địa chỉ thành công');
            return data;
        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorNotification('Thông báo', getErrorMessage(error));
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteAddress = async () => {
        setIsLoading(true);
        try {
            var data;
            if (mode === 'user') {
                data = await AddressService.deleteUserAddress(addressForm.values.id);
            } else {
                data = await AddressService.deleteShopAddress(addressForm.values.id);
            }
            showSuccessNotification('Thông báo', 'Xóa địa chỉ thành công');
            return data;
        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorNotification('Thông báo', getErrorMessage(error));
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const convertHelper = (singleValues: SingleAddressDto[]): ComboboxItem[] => {
        if (!singleValues || singleValues.length === 0) {
            return [];
        }
        return singleValues.map(item => ({
            value: String(item.id),
            label: item.nameDisplay,
        }));
    }

    return {
        addressForm,
        clearForm,
        isLoading,
        addAddress,
        updateAddress,
        deleteAddress,
        updateInitValue,
        provinces,
        districts,
        wards,

        convertHelper,
    }

}
