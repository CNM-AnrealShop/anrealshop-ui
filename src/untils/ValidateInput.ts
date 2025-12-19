export const validatePassword = (value: string): string | null => {
  if (!value) return 'Mật khẩu là bắt buộc';
  if (value.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự';
  if (!/[a-z]/.test(value)) return 'Mật khẩu phải chứa ít nhất một chữ thường';
  if (!/[A-Z]/.test(value)) return 'Mật khẩu phải chứa ít nhất một chữ hoa';
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`]/.test(value)) return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt';
  return null;
};

export const validateEmail = (value: string): string | null => {
  if (!value) return 'Email là bắt buộc';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Email không hợp lệ';
  return null;
};

export const validateUsername = (value: string): string | null => {
  if (!value) return 'Tên đăng nhập là bắt buộc';
  if (value.length < 4) return 'Tên đăng nhập phải có ít nhất 4 ký tự';
  return null;
};


export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return 'Vui lòng xác nhận mật khẩu';
  if (password !== confirmPassword) return 'Mật khẩu xác nhận không khớp';
  return null;
};

export const validateAgreeTerms = (value: boolean): string | null => {
  if (!value) return 'Bạn phải đồng ý với điều khoản sử dụng';
  return null;
};