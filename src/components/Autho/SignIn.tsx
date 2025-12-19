import {
  Anchor,
  Button,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { APP_ROUTES, GOOGLE_LOGIN_URL } from '../../constant';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { loginUser } from '../../store/authSlice';
import type { LoginRequest } from '../../types/AuthType';
import type { UserDto } from '../../types/UserType';
import { validateEmail, validatePassword } from '../../untils/ValidateInput';
import showErrorNotification from '../Toast/NotificationError';
import showSuccessNotification from '../Toast/NotificationSuccess';
import ResetPassword from './ResetPasswrod';
import { motion } from 'framer-motion';

interface SignInFormValues { 
  email: string;
  password: string;
}

export function SignIn() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('redirect') || '/';

  const dispatch = useAppDispatch();
  const { status, isAuthenticated } = useAppSelector((state) => state.auth);
  const isLoading = status === 'loading';
  const [opened, { open, close }] = useDisclosure(false);

  const hasNotifiedRef = useRef(false);

  const form = useForm<SignInFormValues>({
    initialValues: {
      email: 'botgiatv2@gmail.com',
      password: 'Abc123456@',
    },
    validate: {
      email: (value) => { return validateEmail(value); },
      password: (value) => { return validatePassword(value); },
    },
  });
  const handleSubmit = async (values: SignInFormValues) => {
    form.clearErrors();
    const loginData: LoginRequest = {
      username: values.email,
      password: values.password,
    };

    try {
      const resultAction = await dispatch(loginUser(loginData)).unwrap();
      const user: UserDto = resultAction.user;

      showSuccessNotification('Đăng nhập thành công!', `Chào mừng ${user.fullName || user.username} trở lại!`);
      navigate(returnUrl);
      if (returnUrl === '/' && user.role === 'ADMIN') {
        navigate(APP_ROUTES.ADMIN.DASHBOARD);
      }
    } catch (err: any) {
      let notificationMessage = err.message || 'Email hoặc mật khẩu không chính xác.';

      if (err.statusCode === 400 && err.details && Array.isArray(err.details)) {
        err.details.forEach((itemError: { field: string; message: string }) => {
          const formField = itemError.field === 'username' ? 'email' : itemError.field;
          if (form.values.hasOwnProperty(formField)) {
            form.setFieldError(formField, itemError.message);
          }
        });
        notificationMessage = err.message || 'Dữ liệu nhập vào không hợp lệ.';
      } else {
        notificationMessage = err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
      }

      showErrorNotification('Đăng nhập thất bại', notificationMessage);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(returnUrl);
    }

    const handleOAuthLogin = async () => {
      if (hasNotifiedRef.current) return;

      const params = new URLSearchParams(location.search);
      const successMessage = params.get('success');
      const errorMessage = params.get('error');

      hasNotifiedRef.current = true;
      if (successMessage) {
        showSuccessNotification('Đăng nhập thành công!', `Chào mừng bạn đến với hệ thống!`);
        navigate(returnUrl);
      } else if (errorMessage) {
        const timeoutId = setTimeout(() => {
          params.delete('error');
          navigate({ pathname: '/login', search: params.toString() }, { replace: true });
          showErrorNotification('Đăng nhập thất bại', errorMessage);
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    };

    handleOAuthLogin();
  }, []);

  return (
    <motion.div
      className="w-1/2 bg-white flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Title order={1} className="text-3xl font-bold mb-6 text-center text-slate-800">
          Đăng nhập
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps('email')}
              size="md"
            />

            <PasswordInput
              label="Mật khẩu"
              placeholder="Mật khẩu của bạn"
              required
              {...form.getInputProps('password')}
              size="md"
            />

            <Group justify="apart">
              <Anchor size="sm" component="button" type="button" className="text-primary" onClick={open}>
                Quên mật khẩu?
              </Anchor>
            </Group>

            <Button
              fullWidth
              type="submit"
              loading={isLoading}
              className="bg-primary hover:bg-primary/90 mt-4"
              size="md"
            >
              Đăng nhập
            </Button>
          </Stack>
        </form>

        <Divider label="Hoặc đăng nhập với" labelPosition="center" my="lg" />

        <Group grow>

          <Button
            leftSection={<FaGoogle size={16} />}
            variant="outline"
            className="border-gray-300"
            onClick={() => handleGoogleLogin()}
          >
            Google
          </Button>
          <Button
            leftSection={<FaFacebook size={16} />}
            variant="outline"
            className="border-gray-300"
            onClick={() => showSuccessNotification('Chức năng đang phát triển', 'Đăng ký bằng Facebook sẽ sớm được ra mắt!')}
          >
            Facebook
          </Button>
        </Group>

        <Text className="!mt-6 text-center !text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Đăng ký ngay
          </Link>
        </Text>
        {opened && <ResetPassword opened={opened} close={close} />}
      </motion.div>
    </motion.div>
  );
}