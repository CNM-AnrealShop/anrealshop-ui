import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import OverlayLoading from '../../components/common/OverlayLoading';
import showErrorNotification from '../../components/Toast/NotificationError';
import { APP_ROUTES } from '../../constant';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { fetchCurrentShop } from '../../store/authSlice';


const ShopAdminHeader = lazy(() => import('../../components/header/ShopAdminHeader'));
const MessagePage = lazy(() => import('../../components/Myshop/Message/MessagePage'));
// const OrderDetailComp = lazy(() => import('../../components/Myshop/Order/OrderDetailPage'));
const OrderPage = lazy(() => import('../../components/Myshop/Order/OrderPage'));
const CreateProduct = lazy(() => import('../../components/Myshop/Product/Create/CreateProduct'));
const ProductForm = lazy(() => import('../../components/Myshop/Product/Create/CreateProduct'));
const ProductPage = lazy(() => import('../../components/Myshop/Product/ProductPage'));
const Setting = lazy(() => import('../../components/Myshop/Setting/SettingPage'));
const OrderShippingPage = lazy(() => import('../../components/Myshop/Order/OrderShippingPage'));
const OrderPrintPage = lazy(() => import('../../components/Myshop/Order/OrderPrintPage'));

const MyshopPage = () => {
  const { isAuthenticated, shop, user, status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (!shop) {
        dispatch(fetchCurrentShop());
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated  && user && user.role !== 'ADMIN' && !shop  && status === 'succeeded') {
        if (!user?.hasShop) {
          navigate(APP_ROUTES.SHOP_REGISTER);
          showErrorNotification("Thông báo", "Bạn cần đăng ký cửa hàng trước khi truy cập.");
        }
      }
    }, 2000);
  }, [navigate, isAuthenticated]);

  if (!isAuthenticated) {
    return <OverlayLoading visible={true} />
  }

   if (isAuthenticated && user?.role === 'ADMIN') {
    showErrorNotification('Quyền truy cập bị từ chối', 'Bạn sẽ được chuyển đến trang quản trị.');
    navigate(APP_ROUTES.ADMIN.BASE);
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div></div>}>
        <ShopAdminHeader />
      </Suspense>

      <div className="flex-1 bg-gray-50">
        <Routes>
          <Route index element={<Navigate to={APP_ROUTES.MYSHOP.DASHBOARD} replace />} />
          <Route path={APP_ROUTES.MYSHOP.DASHBOARD} element={<div>Dashboard Content</div>} />
          <Route path="sale" element={<div>Sales Overview</div>} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="orders" element={<OrderPage />} />
          {/* <Route path="orders/:shopOrderId" element={<OrderDetailComp />} /> */}
          <Route path="orders/shipping" element={<OrderShippingPage />} />
          <Route path="orders/printing" element={<OrderPrintPage />} />
          <Route path="messages" element={<MessagePage />} />
          <Route path="settings" element={<Setting />} />

          <Route path="*" element={<Navigate to={APP_ROUTES.MYSHOP.DASHBOARD} replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyshopPage;