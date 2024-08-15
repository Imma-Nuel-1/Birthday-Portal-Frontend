// File: src/App.tsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Home from "./pages/home/Home";
import Modal from "./pages/home/Modal";

const Wrapper = styled.div`
  background-color: #ff6f61;
  width: 100vw;
  height: 100vh;
`;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Open the modal when the site is first loaded
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Home />
      <Modal
        message="Wishing you a day filled with joy, laughter, and all the things that make you smile. May this year bring you success, happiness, and countless wonderful memories. Enjoy every moment of your special day—you deserve it! Cheers to another year of adventures and achievements! 🥳🎂"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Wrapper>
  );
};

export default App;
