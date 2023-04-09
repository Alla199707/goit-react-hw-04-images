import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalContent, ModalOverlay } from './Modal.styled';

function Modal({ onClose, image }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleClick}>
      <ModalContent>
        <img src={image} alt="" />
      </ModalContent>
    </ModalOverlay>
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};

export default Modal;
