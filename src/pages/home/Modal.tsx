import React, { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 16px;
    font-size: 24px;
  }

  p {
    font-size: 18px;
    margin-bottom: 24px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff6f61;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const Modal: React.FC<ModalProps> = ({ message, isOpen, onClose }) => {
  // Disable scroll when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Backdrop>
      <ModalContent>
        <h2>Happy Birthday, Ardaiy! 🎉</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </Backdrop>
  );
};

export default Modal;
