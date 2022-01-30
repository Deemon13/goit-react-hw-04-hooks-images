import React from 'react';
import { Rings } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Rings color="green" height={60} width={60} />
    </LoaderWrapper>
  );
};
