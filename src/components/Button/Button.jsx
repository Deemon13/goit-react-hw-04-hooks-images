import React from 'react';
import PropTypes from 'prop-types';

import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onButtonClick }) => {
  return (
    <ButtonLoadMore type="button" onClick={onButtonClick}>
      Load more
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onClickButton: PropTypes.func,
};
