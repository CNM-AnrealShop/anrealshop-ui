import {
    Button,
    Group,
    Modal,
    Select,
    Stack,
    Switch,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { AddressService } from '../../../../service/AddressService';
import type { AddressDto, AddressRequestDto, SingleAddressDto } from '../../../../types/AddressType';
import showErrorNotification from '../../../Toast/NotificationError';

interface AddressModalProps {
    opened: boolean;
    onClose: () => void;
    address: AddressDto | null;
    onSave: (address: AddressRequestDto) => void;
}

export const AddressModal = ({ opened, onClose, address, onSave }: AddressModalProps) => {
    const [provinces, setProvinces] = useState<SingleAddressDto[]>([]);
    const [districts, setDistricts] = useState<SingleAddressDto[]>([]);
    const [wards, setWards] = useState<SingleAddressDto[]>([]);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            receiverOrSenderName: '',
            phoneNumber: '',
            provinceId: '',
            districtId: '',
            wardId: '',
            detailAddress: '',
            isPrimary: false,
        },
        validate: {
            receiverOrSenderName: (value) =>
                !value.trim() ? 'Vui lòng nhập tên người nhận' : null,
            phoneNumber: (value) =>
                !value.trim()
                    ? 'Vui lòng nhập số điện thoại'
                    : !/^[0-9]{10}$/.test(value)
                        ? 'Số điện thoại không hợp lệ'
                        : null,
            provinceId: (value) => !value ? 'Vui lòng chọn tỉnh/thành phố' : null,
            districtId: (value) => !value ? 'Vui lòng chọn quận/huyện' : null,
            wardId: (value) => !value ? 'Vui lòng chọn phường/xã' : null,
            detailAddress: (value) => !value.trim() ? 'Vui lòng nhập địa chỉ chi tiết' : null,
        },
    });

    useEffect(() => {
        if (opened && provinces.length === 0) {
            fetchProvinces();
        }
    }, [opened]);

    useEffect(() => {
        if (opened && address) {
            form.setValues({
                receiverOrSenderName: address.receiverOrSenderName,
                phoneNumber: address.phoneNumber,
                provinceId: address.provinceId,
                districtId: address.districtId,
                wardId: address.wardId,
                detailAddress: address.detailAddress,
                isPrimary: address.primary,
            });

            if (address.provinceId) {
                fetchDistricts(address.provinceId);
            }
            if (address.districtId) {
                fetchWards(address.districtId);
            }
        } else if (opened) {
            form.reset();
            setDistricts([]);
            setWards([]);
        }
    }, [opened, address]);

    const fetchProvinces = async () => {
        setLoading(true);
        AddressService.getProvinceList()
            .then((data) => {
                setProvinces(data);
            })
            .catch(() => {
                showErrorNotification('Lỗi', 'Không thể tải danh sách tỉnh/thành phố');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchDistricts = async (provinceId: string) => {
        setLoading(true);
        AddressService.getDistrictList(provinceId)
            .then((data) => {
                setDistricts(data);
            })
            .catch(() => {
                showErrorNotification('Lỗi', 'Không thể tải danh sách quận/huyện');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchWards = async (districtId: string) => {
        setLoading(true);
        AddressService.getWardList(districtId)
            .then((data) => {
                setWards(data);
            })
            .catch(() => {
                showErrorNotification('Lỗi', 'Không thể tải danh sách phường/xã');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleProvinceChange = (value: string | null) => {
        form.setFieldValue('provinceId', value || '');
        form.setFieldValue('districtId', '');
        form.setFieldValue('wardId', '');
        setDistricts([]);
        setWards([]);

        if (value) {
            fetchDistricts(value);
        }
    };

    const handleDistrictChange = (value: string | null) => {
        form.setFieldValue('districtId', value || '');
        form.setFieldValue('wardId', '');
        setWards([]);

        if (value) {
            fetchWards(value);
        }
    };

    const handleSubmit = (values: typeof form.values) => {
        const requestDto: AddressRequestDto = {
            receiverOrSenderName: values.receiverOrSenderName,
            phoneNumber: values.phoneNumber,
            detailAddress: values.detailAddress,
            wardId: values.wardId,
            isPrimary: values.isPrimary
        };

        onSave(requestDto);
        form.reset();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={address ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
            size="lg"
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <Group grow>
                        <TextInput
                            label="Họ và tên"
                            placeholder="Nhập họ và tên người nhận"
                            required
                            {...form.getInputProps('receiverOrSenderName')}
                        />

                        <TextInput
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            required
                            {...form.getInputProps('phoneNumber')}
                        />
                    </Group>

                    <Select
                        label="Tỉnh/Thành phố"
                        placeholder="Chọn tỉnh/thành phố"
                        data={provinces.map(p => ({ value: String(p.id), label: p.nameDisplay }))}
                        searchable
                        required
                        disabled={loading}
                        value={form.values.provinceId}
                        onChange={handleProvinceChange}
                        error={form.errors.provinceId}
                    />

                    <Select
                        label="Quận/Huyện"
                        placeholder="Chọn quận/huyện"
                        data={districts.map(d => ({ value: String(d.id), label: d.nameDisplay }))}
                        searchable
                        required
                        disabled={!form.values.provinceId || districts.length === 0}
                        value={form.values.districtId}
                        onChange={handleDistrictChange}
                        error={form.errors.districtId}
                    />

                    <Select
                        label="Phường/Xã"
                        placeholder="Chọn phường/xã"
                        data={wards.map(w => ({ value: String(w.id), label: w.nameDisplay }))}
                        searchable
                        required
                        disabled={!form.values.districtId || wards.length === 0}
                        {...form.getInputProps('wardId')}
                    />

                    <TextInput
                        label="Địa chỉ chi tiết"
                        placeholder="Số nhà, tên đường..."
                        required
                        {...form.getInputProps('detailAddress')}
                    />


                    <Switch
                        label="Đặt làm địa chỉ mặc định"
                        {...form.getInputProps('isPrimary', { type: 'checkbox' })}
                    />

                    <Group justify="flex-end" mt="sm">
                        <Button variant="outline" size='sm' onClick={onClose}>
                            Hủy
                        </Button>
                        <Button type="submit" size='sm'>
                            {address ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};
