import { ActionIcon } from "@mantine/core";
import showSuccessNotification from "../Toast/NotificationSuccess";
import { FiCopy } from "react-icons/fi";

export const ButtonCopy = ( {id} : {id : string}) => {
    return (
        <ActionIcon
            size="sm"
            variant="transparent"
            onClick={() => {
                navigator.clipboard.writeText(id);
                showSuccessNotification('Thành công', 'Đã sao chép mã đơn hàng');
            }}
            title="Sao chép mã đơn hàng"
        >
            <FiCopy size={14} />
        </ActionIcon>
    )
}
