import { useState } from 'react';
import { Container, Group, UnstyledButton, Text, Menu, Divider } from '@mantine/core';
import { FaFacebook, FaInstagram, FaGithub, FaStore, FaHeadset } from 'react-icons/fa';
import { HiTranslate } from 'react-icons/hi';

export function TopHeader() {
  const [language, setLanguage] = useState('Tiếng Việt');

  return (
    <div className="bg-primary text-white py-1.5">
      <Container size="xl">
        <div className="flex items-center justify-between">
          {/* Left side links */}
          <Group gap="lg">
            {/* Seller channel */}
            <UnstyledButton className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <FaStore size={14} />
              <Text size="sm">Kênh người bán</Text>
            </UnstyledButton>
            
            {/* Social connections */}
            <div className="flex items-center gap-2">
              <Text size="sm">Kết nối</Text>
              <div className="flex items-center gap-2">
                <UnstyledButton className="hover:opacity-80 transition-opacity">
                  <FaFacebook size={14} />
                </UnstyledButton>
                <UnstyledButton className="hover:opacity-80 transition-opacity">
                  <FaInstagram size={14} />
                </UnstyledButton>
                <UnstyledButton className="hover:opacity-80 transition-opacity">
                  <FaGithub size={14} />
                </UnstyledButton>
              </div>
            </div>
          </Group>
          
          {/* Right side options */}
          <Group gap="lg">
            {/* Support */}
            <Menu position="bottom-end" withArrow shadow="md">
              <Menu.Target>
                <UnstyledButton className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  <FaHeadset size={14} />
                  <Text size="sm">Hỗ trợ</Text>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Text size="sm">Trung tâm trợ giúp</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text size="sm">Hỗ trợ khách hàng</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text size="sm">Hướng dẫn mua hàng</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text size="sm">Câu hỏi thường gặp</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            
            <Divider orientation="vertical" className="h-4 bg-white/30" />
            
            {/* Language selector */}
            <Menu position="bottom-end" withArrow shadow="md">
              <Menu.Target>
                <UnstyledButton className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  <HiTranslate size={16} />
                  <Text size="sm">{language}</Text>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => setLanguage('Tiếng Việt')}>
                  <Text size="sm">Tiếng Việt</Text>
                </Menu.Item>
                <Menu.Item onClick={() => setLanguage('English')}>
                  <Text size="sm">English</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
      </Container>
    </div>
  );
}