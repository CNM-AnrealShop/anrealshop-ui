import { API_ENDPOINTS } from "../constant";
import type { MailType } from "../types/MailType";
import { axiosNoWithCredInstance } from "./AxiosInstant";

const getOtp = async (email: string, type: MailType): Promise<void> => {
    const response = await axiosNoWithCredInstance.post(
        `${API_ENDPOINTS.OTP.GET_OTP}/${email}?type=${type}`
    )
    return response.data;
}

const verifyOtp = async (email: string, code: string): Promise<void> => {
    const response = await axiosNoWithCredInstance.post(
        API_ENDPOINTS.OTP.VERIFY_OTP,
        { email, code }
    )
    return response.data;
}


const OtpService = {
    getOtp,
    verifyOtp,
};
export default OtpService;