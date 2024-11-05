// File: src/components/AppHeader.tsx

import styled, { keyframes } from "styled-components"; // Import keyframes

// Keyframes for the bounce animation
const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// Styled Wrapper with enhanced styles
const Wrapper = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9955bb; /* Deeper purple background */
  color: #fff;
  font-size: 2rem; /* Increased font size for better visibility */
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #ffd700; /* Gold border for a celebratory feel */
  animation: ${bounceAnimation} 1s infinite; /* Bouncing animation */

  // Responsive font size
  @media (max-width: 768px) {
    font-size: 1.5rem; /* Decrease font size on smaller screens */
  }
`;

// Icon for added visual interest
const Emoji = styled.span`
  margin-right: 10px; // Space between the emoji and the text
`;

const AppHeader = () => {
  return (
    <Wrapper>
      <Emoji>🎉</Emoji>
      Happy Birthday, Imma~Nuel! Here’s to a year full of joy and success! 🎉
    </Wrapper>
  );
};

export default AppHeader;
