import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalWrap } from './Modal.styled';

export function Modal({ children, closeModal }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <Overlay onClick={closeModal}>
      <ModalWrap>{children}</ModalWrap>
    </Overlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
