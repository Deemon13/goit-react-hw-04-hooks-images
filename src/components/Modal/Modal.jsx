import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalWrap } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const { children, closeModal } = this.props;
    return (
      <Overlay onClick={closeModal}>
        <ModalWrap>{children}</ModalWrap>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
