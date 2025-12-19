import { Divider, Group } from '@mantine/core';
import React from 'react';
import ChangePassword from './ChangePassword';
import HistoryLogin from './HistoryLogin';

const Security: React.FC = () => {
  return (
    <Group align="flex-start">
      <ChangePassword />
      <Divider orientation="vertical" mx="lg" />
      <HistoryLogin />
    </Group>
  );
};

export default Security;