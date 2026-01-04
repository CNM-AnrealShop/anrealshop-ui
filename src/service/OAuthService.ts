import { axiosInstance } from "./AxiosInstant";
import { GOOGLE_LOGIN_URL, FACEBOOK_LOGIN_URL } from "../constant";
class OAuthService {
  async loginWithGoogle(): Promise<void> {
    const response = await axiosInstance.get<{ data: { url: string } }>(
      GOOGLE_LOGIN_URL
    );
    window.location.href = response.data.data.url;
  }

  async loginWithFacebook(): Promise<void> {
    const response = await axiosInstance.get<{ data: { url: string } }>(
      FACEBOOK_LOGIN_URL
    );
    window.location.href = response.data.data.url;
  }
}

export default new OAuthService();
