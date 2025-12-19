import { ActionIcon, Anchor, Container, Grid, Group, Text, TextInput, Title, UnstyledButton } from '@mantine/core';
import { motion, type Variants } from 'framer-motion';
import { FaCcMastercard, FaCcVisa, FaCreditCard, FaFacebook, FaInstagram, FaPaypal, FaTwitter } from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.footer
      className="bg-slate-50 border-t border-t-slate-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Main footer content */}
      <Container size="xl" className="py-10">
        <motion.div variants={containerVariants}>
          <Grid>
            {/* Company info */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <motion.div className="mb-6" variants={itemVariants}>
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/images/logo.jfif" alt="AnrealShop" className="h-8 w-auto" />
                  <div className="text-xl font-bold">
                    <span className="text-primary">Anreal</span>
                    <span className="text-contentText">Shop</span>
                  </div>
                </motion.div>
                <Text size="sm" className="!text-gray-500 !mb-2">
                  AnrealShop - Điểm đến mua sắm trực tuyến đáng tin cậy của bạn với các sản phẩm chất lượng và giá cả phải chăng.
                </Text>
                <div className="flex flex-col gap-2">
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMapPin className="!text-gray-500 group-hover:text-primary" size={16} />
                    <Text size="sm" className="!text-gray-500">
                      123 Đường Chính, Thành Phố, Quốc Gia
                    </Text>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiPhone className="!text-gray-500 group-hover:text-primary" size={16} />
                    <Text size="sm" className="!text-gray-500">
                      +84 (234) 567-890
                    </Text>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMail className="!text-gray-500 group-hover:text-primary" size={16} />
                    <Text size="sm" className="!text-gray-500">
                      lienhe@anrealshop.com
                    </Text>
                  </motion.div>
                </div>
              </motion.div>
            </Grid.Col>

            {/* Quick links */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }} >
              <motion.div variants={itemVariants}>
                <Title order={4} className="!mb-4 text-gray-700">Liên Kết Nhanh</Title>
                <div className="flex flex-col gap-2">
                  {[
                    'Trang Chủ',
                    'Cửa Hàng',
                    'Về Chúng Tôi',
                    'Liên Hệ',
                    'Câu Hỏi Thường Gặp'
                  ].map((link, index) => (
                    <motion.div
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Anchor
                        component="a"
                        href="#"
                        underline="never"
                        className="!text-gray-500 hover:!text-primary hover:!ml-1 transition-all duration-200 !text-sm"
                      >
                        {link}
                      </Anchor>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Grid.Col>

            {/* Customer service */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Title order={4} className="!mb-4 text-gray-700">Dịch Vụ Khách Hàng</Title>
                <div className="flex flex-col gap-2">
                  {[
                    'Tài Khoản Của Tôi',
                    'Theo Dõi Đơn Hàng',
                    'Danh Sách Yêu Thích',
                    'Chính Sách Đổi Trả',
                    'Điều Khoản & Điều Kiện'
                  ].map((link, index) => (
                    <motion.div
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Anchor
                        component="a"
                        href="#"
                        underline="never"
                        className="!text-gray-500 hover:!text-primary hover:!ml-1 transition-all duration-200 !text-sm"
                      >
                        {link}
                      </Anchor>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Grid.Col>

            {/* Newsletter */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Title order={4} className="!mb-4 text-gray-700">Bản Tin</Title>
                <Text size="sm" className="!text-gray-500 mb-4">
                  Đăng ký nhận bản tin của chúng tôi để cập nhật những ưu đãi mới nhất!
                </Text>
                <motion.div
                  className="flex mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <TextInput
                    placeholder="Nhập email của bạn"
                    size="sm"
                    rightSection={
                      <ActionIcon
                        variant="filled"
                        color="primary"
                        size="md"
                        radius="sm"
                        className="!bg-primary hover:!bg-primary/80"
                      >
                        <FiSend size={16} />
                      </ActionIcon>
                    }
                  />
                </motion.div>

                {/* Payment methods */}
                <Title order={5} className="mb-2 text-gray-700">Phương Thức Thanh Toán</Title>
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {[FaCreditCard, FaPaypal, FaCcVisa, FaCcMastercard].map((Icon, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={24} className="!text-gray-500 hover:text-primary transition-colors" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </Grid.Col>
          </Grid>
        </motion.div>
      </Container>

      {/* Bottom bar */}
      <motion.div
        className="bg-slate-100 py-4 border-t border-t-slate-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Container size="xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text size="sm" className="!text-gray-500 ">
              © {currentYear} AnrealShop. Tất cả các quyền được bảo lưu.
            </Text>

            {/* Social links */}
            <Group gap="md">
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <UnstyledButton className="!text-gray-500 hover:text-primary transition-colors">
                    <Icon size={18} />
                  </UnstyledButton>
                </motion.div>
              ))}
            </Group>
          </div>
        </Container>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;