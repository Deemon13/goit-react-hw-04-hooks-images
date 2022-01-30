import React from 'react';

import { NotificationWrapper } from './Notification.styled';

export const Notification = ({ message }) => {
  return <NotificationWrapper>{message}</NotificationWrapper>;
};
