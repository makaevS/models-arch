import React from 'react';
import './Modal.css';

const Modal: React.FC = ({ children }) => {
  return <section className='modal'>{children}</section>;
}

export default Modal; 