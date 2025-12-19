import {
  Box,
  Button,
  Collapse,
  Group,
  Paper,
  Radio,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiCreditCard } from "react-icons/fi";
import type { PaymentMethodInfo } from "../../../data/CheckoutData";
import type { PaymentGatewayType } from "../../../types/CheckoutType";

interface PaymentMethodProps {
  paymentMethods: PaymentMethodInfo[];
  selectedPaymentMethod: PaymentGatewayType;
  setSelectedPaymentMethod: (id: PaymentGatewayType) => void;
}

const PaymentMethod = ({
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: PaymentMethodProps) => {
  const [expanded, setExpanded] = useState(false);

  const selectedMethod = paymentMethods.find(
    (method) => method.id === selectedPaymentMethod
  );

  const getIconBgColor = (methodId: PaymentGatewayType) => {
    switch (methodId) {
      case "cash_on_delivery":
        return "bg-amber-100";
      case "vnpay":
        return "bg-blue-50";
      case "momo":
        return "bg-pink-100";
      case "credit_card":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <Paper radius="md" shadow="sm" p="md" className="bg-white">
      <Group justify="space-between" className="mb-2">
        <Text fw={600} size="md" className="text-slate-800 flex items-center">
          <FiCreditCard className="inline-block mr-2" size={18} />
          Phương thức thanh toán
        </Text>

        {/* Nút ẩn/hiện */}
        <Button
          variant="subtle"
          color="gray"
          size="xs"
          onClick={() => setExpanded(!expanded)}
          rightSection={
            expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />
          }
        >
          {expanded ? "Thu gọn" : "Xem tất cả"}
        </Button>
      </Group>

      {/* Hiển thị phương thức đã chọn khi đang thu gọn */}
      {!expanded && selectedMethod && (
        <Paper
          shadow="xs"
          p="sm"
          py="xs"
          radius="md"
          className="border-2 border-transparent cursor-pointer transition-all hover:!bg-gray-50"
          onClick={() => setExpanded(true)}
        >
          <Group gap={10}>
            <Radio size="xs" checked={true} readOnly className="!mr-1" />
            <Box
              className={`w-10 h-10 flex items-center justify-center rounded-md ${getIconBgColor(
                selectedMethod.id
              )}`}
            >
              {selectedMethod.icon}
            </Box>
            <Box>
              <Text fw={600} size="sm" className="text-slate-800">
                {selectedMethod.name}
              </Text>
              <Text size="sm" c="dimmed">
                {selectedMethod.description}
              </Text>
            </Box>
          </Group>
        </Paper>
      )}

      {/* Danh sách đầy đủ các phương thức thanh toán */}
      <Collapse in={expanded}>
        <Stack gap="md" mt={expanded ? 3 : 0}>
          {paymentMethods.map((method) => (
            <Paper
              key={method.id}
              shadow="xs"
              p="sm"
              py="xs"
              radius="md"
              className={`transition-all cursor-pointer border-2 ${
                selectedPaymentMethod === method.id
                  ? "border-primary bg-picton-blue-50"
                  : "border-transparent hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedPaymentMethod(method.id);
                setExpanded(false);
              }}
            >
              <Group gap={10}>
                <Radio
                  checked={selectedPaymentMethod === method.id}
                  onChange={() => setSelectedPaymentMethod(method.id)}
                  className="!mr-1"
                />
                <Box
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${getIconBgColor(
                    method.id
                  )}`}
                >
                  {method.icon}
                </Box>
                <Box>
                  <Text fw={600} size="sm" className="text-slate-800">
                    {method.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {method.description}
                  </Text>
                </Box>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Collapse>
    </Paper>
  );
};

export default PaymentMethod;
