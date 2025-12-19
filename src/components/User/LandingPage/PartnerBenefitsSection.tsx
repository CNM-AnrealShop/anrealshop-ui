import { Button, Container, List, ThemeIcon } from "@mantine/core";
import { motion } from "framer-motion";
import {
  FaBoxes,
  FaChartLine,
  FaMoneyBillWave,
  FaShoppingBag,
  FaStar,
  FaStore,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constant";
import { useAppSelector } from "../../../hooks/useAppRedux";
import showErrorNotification from "../../Toast/NotificationError";

interface PartnerBenefitsSectionProps {
  id?: string;
}

const PartnerBenefitsSection = ({ id }: PartnerBenefitsSectionProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const benefits = [
    {
      icon: <FaStore />,
      text: "Tiếp cận hàng triệu khách hàng tiềm năng",
    },
    {
      icon: <FaChartLine />,
      text: "Công cụ marketing hiệu quả",
    },
    {
      icon: <FaBoxes />,
      text: "Quản lý kho hàng thông minh",
    },
    {
      icon: <FaTruck />,
      text: "Hỗ trợ vận chuyển toàn quốc",
    },
  ];

  const stats = [
    {
      icon: <FaUsers className="text-blue-500" />,
      value: "10K+",
      label: "Người theo dõi",
      position: "top-0 -left-10 md:top-10 md:left-8",
    },
    {
      icon: <FaMoneyBillWave className="text-green-500" />,
      value: "50Tr+",
      label: "Doanh thu TB",
      position: "top-1/4 -right-8 md:top-1/4 md:right-11",
    },
    {
      icon: <FaStar className="text-yellow-500" />,
      value: "4.8",
      label: "Đánh giá",
      position: "top-3/4 -left-12 md:top-2/3 md:left-14",
    },
    {
      icon: <FaShoppingBag className="text-purple-500" />,
      value: "500+",
      label: "Đơn hàng/tháng",
      position: "bottom-10 -right-10 md:bottom-20 md:right-20",
    },
  ];

  const handlOpenRegisterShop = () => {
    if (isAuthenticated) {
      navigate(APP_ROUTES.SHOP_REGISTER);
    } else {
      showErrorNotification("Thông báo", "Đăng nhập trước khi mở shop nhé.");
      return;
    }
  };

  return (
    <section id={id} className="py-12 md:py-16 bg-white scroll-mt-24">
      <Container size="xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          Ưu đãi đối tác
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 items-center justify-center px-4 md:px-10 lg:px-20">
          {/* Image Section with floating stat elements */}
          <motion.div
            className="w-full md:w-1/2 relative order-1 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg mx-auto relative max-w-md md:max-w-none">
              <img
                src="/images/lovely-teenage-girl-with-curly-hair-posing-yellow-tshirt-min 1.png"
                alt="Partner Benefits"
                className="w-full h-auto object-contain"
                style={{ maxHeight: "400px" }}
              />

              {/* Floating stat elements - Hidden on mobile, visible on tablet+ */}
              <div className="hidden sm:block">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${stat.position} bg-white bg-opacity-60 backdrop-blur-xs rounded-lg p-2 shadow-lg z-10`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-base md:text-xl">{stat.icon}</div>
                      <div>
                        <div className="font-bold text-xs md:text-sm">
                          {stat.value}
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile stats grid - Visible only on mobile */}
              <div className="grid grid-cols-2 gap-3 mt-6 sm:hidden">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-lg">{stat.icon}</div>
                      <div>
                        <div className="font-bold text-sm">{stat.value}</div>
                        <div className="text-xs text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content Section - Right side on desktop, below on mobile */}
          <motion.div
            className="w-full md:w-1/2 order-2 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
              Trở thành đối tác của chúng tôi
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Mở cửa hàng trực tuyến và tiếp cận hàng triệu khách hàng tiềm
              năng. Nền tảng toàn diện giúp phát triển kinh doanh hiệu quả.
            </p>

            <List spacing="sm" size="sm" className="!mb-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  viewport={{ once: true }}
                >
                  <List.Item
                    icon={
                      <ThemeIcon
                        color="blue"
                        size={18}
                        radius="xl"
                        className="md:text-base"
                      >
                        {benefit.icon}
                      </ThemeIcon>
                    }
                    className="text-gray-700 text-sm md:text-base mb-3"
                  >
                    {benefit.text}
                  </List.Item>
                </motion.div>
              ))}
            </List>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handlOpenRegisterShop}
                size="sm"
                radius="md"
                className="w-full sm:w-auto"
              >
                Đăng ký mở shop
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PartnerBenefitsSection;
