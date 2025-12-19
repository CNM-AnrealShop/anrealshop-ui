import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import showErrorNotification from "../components/Toast/NotificationError";
import showSuccessNotification from "../components/Toast/NotificationSuccess";
import { APP_ROUTES } from "../constant";
import { logoutUser } from "../store/authSlice";
import { useAppDispatch } from "./useAppRedux";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            showSuccessNotification('Đăng xuất thành công!', 'Bạn đã đăng xuất khỏi tài khoản.');
            navigate(APP_ROUTES.HOME)
        } catch (error: any) {
            showErrorNotification('Đăng xuất thất bại!', error.message || 'Có lỗi xảy ra khi đăng xuất.');
        }
    }, [dispatch]);



    return {
        handleLogout,
    };
};