import { lazy, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/header/Header";
import showErrorNotification from "../../components/Toast/NotificationError";
import LandingPage from "../../components/User/LandingPage/LandingPage";
import { ProductsPage } from "../../components/User/Products/ProductsPage";
import { APP_ROUTES } from "../../constant";
import { useAppSelector } from "../../hooks/useAppRedux";

const CartPage = lazy(() => import("../../components/User/Cart/CartPage"));
// const CategoryPage = lazy(() => import('../../components/User/CategoryPage/CategoryPage'));
const CheckoutPage = lazy(
  () => import("../../components/User/Checkout/CheckoutPage")
);
// const FilterProductPage = lazy(() => import('../../components/User/Products/FilterProductPage'));
// const HomePage = lazy(() => import('../../components/User/HomePage/HomePage'));
// const ListProduct = lazy(() => import('../../components/User/HomePage/Products/ListProduct'));
const ProductDetailPage = lazy(
  () => import("../../components/User/ProductDetail/ProductDetailPage")
);
const SettingPage = lazy(
  () => import("../../components/User/Setting.tsx/SettingPage")
);
const ShopPage = lazy(() => import("../../components/User/Shop/ShopPage"));
const PaymentResultPage = lazy(
  () => import("../../components/User/paymentResult/PaymentResultPage")
);

const UserRoute = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (isAuthenticated && user?.role === "ADMIN") {
    showErrorNotification(
      "Quyền truy cập bị từ chối",
      "Bạn sẽ được chuyển đến trang quản trị."
    );
    navigate(APP_ROUTES.ADMIN.BASE);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname !== APP_ROUTES.HOME && <Header />}
      <div className="flex-1 bg-gray-50">
        <Routes>
          <Route index element={<LandingPage />} />
          {/* <Route path={APP_ROUTES.HOME} element={<HomePage />} /> */}
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path={APP_ROUTES.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route path={APP_ROUTES.CHECKOUT} element={<CheckoutPage />} />
          <Route path={APP_ROUTES.CART} element={<CartPage />} />
          <Route path={APP_ROUTES.USER_SETTINGS} element={<SettingPage />} />
          {/* <Route path="/search" element={<FilterProductPage />} /> */}
          <Route path="/shop/:slug" element={<ShopPage />} />
          <Route
            path={APP_ROUTES.PAYMENT_RESULT(":orderId")}
            element={<PaymentResultPage />}
          />

          <Route path="*" element={<Navigate to={APP_ROUTES.HOME} replace />} />
        </Routes>
      </div>
      {location.pathname !== APP_ROUTES.USER_SETTINGS && <Footer />}
    </div>
  );
};

export default UserRoute;
