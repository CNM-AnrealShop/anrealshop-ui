import { API_ENDPOINTS } from "../constant";
import type { UserParams } from "../hooks/useUser";
import type { RejectRequest } from "../types/CommonType";
import type { ChangePasswordDto, forgotPwRequest } from "../types/UserType";
import { axiosInstance, axiosNoWithCredInstance } from "./AxiosInstant";

const forgotPassword = async (forgotPassword: forgotPwRequest) => {
    const response = await axiosNoWithCredInstance.post(
        `${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
        forgotPassword
    )
    return response.data;
}

const changePassword = async (changePassword: ChangePasswordDto) => {
    const response = await axiosInstance.post(
        `${API_ENDPOINTS.USERS.CHANGE_PASSWORD}`,
        changePassword
    )
    return response.data;
}

const getUserListForManager = async (params: UserParams) => {
    const response = await axiosInstance.get( API_ENDPOINTS.ADMIN.USER_LIST, { params })
    return response.data;
}

const disableUser = async (userId: string, rejectRequest: RejectRequest) => {
    const response = await axiosInstance.post(
        `${API_ENDPOINTS.ADMIN.USER_DISABLE(userId)}`,
        { rejectRequest }
    )
    return response.data;
}

const UserService = {
    forgotPassword,
    changePassword,
    getUserListForManager,
    disableUser,
};
export default UserService;