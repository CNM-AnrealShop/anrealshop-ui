import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppRedux";
import { fetchCurrentUser } from "../../store/authSlice";
import showSuccessNotification from "../Toast/NotificationSuccess";
import showErrorNotification from "../Toast/NotificationError";
import { Container, Loader, Text } from "@mantine/core";

export default function OAuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    if (error) {
      showErrorNotification("Đăng nhập thất bại", error);
      navigate("/login");
      return;
    }

    if (success === "true") {
      dispatch(fetchCurrentUser())
        .unwrap()
        .then((user) => {
          showSuccessNotification(
            "Đăng nhập thành công!",
            `Chào mừng ${user.fullName}!`
          );
          navigate("/");
        })
        .catch((err) => {
          console.error("Fetch user error:", err);
          showErrorNotification("Lỗi", "Không thể tải thông tin người dùng");
          navigate("/login");
        });
    } else {
      showErrorNotification("Lỗi", "Thông tin đăng nhập không hợp lệ");
      navigate("/login");
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen">
      <Loader size="lg" />
      <Text className="mt-4">Đang xử lý đăng nhập...</Text>
    </Container>
  );
}
