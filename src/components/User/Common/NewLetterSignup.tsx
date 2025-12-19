import { Box, Button, Paper, Text, TextInput, Title } from '@mantine/core';
import { FiMail, FiSend } from 'react-icons/fi';

const NewsletterSignup = () => {
  return (
    <Paper
      radius="md"
      withBorder
      p={{ base: "md", sm: "xl" }}
      className=" bg-gray-50"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
          <FiMail size={30} className="text-primary" />
        </div>
        
        <Title order={3} className="!mb-4 text-slate-900">Đăng ký nhận tin</Title>
        
        <Text size="md" className="!mb-8 !max-w-lg !mx-auto text-gray-600">
          Đăng ký để nhận thông tin về sản phẩm mới, khuyến mãi và ưu đãi đặc biệt từ AnrealShop.
        </Text>
        
        <Box className="max-w-xl mx-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-3">
              <TextInput
                placeholder="Nhập email của bạn"
                size="md"
                radius="md"
                required
                className="flex-grow"
                styles={{
                  root: { flexGrow: 1 },
                  input: {
                    borderColor: '#e2e8f0',
                    '&:focus': {
                      borderColor: '#3182ce'
                    },
                    height: '42px'
                  }
                }}
              />
              <Button 
                type="submit" 
                size="md"
                radius="md"
                rightSection={<FiSend size={16} />}
                className="bg-primary hover:bg-blue-700 transition-colors"
                style={{ width: '120px' }}
              >
                Đăng ký
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </Paper>
  );
};

export default NewsletterSignup;