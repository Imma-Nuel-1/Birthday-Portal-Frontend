import styled from "styled-components";

interface ButtonStyleProps {
  bg?: string;
  color?: string;
  width?: string;
  borderColor?: string;
  height?: string;
}

interface ButtonProps {
  text: string;
  onClick?: () => void;
  bg?: string;
  color?: string;
  width?: string;
  borderColor?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Wrapper = styled.button<ButtonStyleProps>`
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.bg || "#f2c94c"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  padding: 12px 24px;
  border-radius: 8px;
  border: ${(props) => `1px solid ${props.borderColor ?? "none"}`};
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s, transform 0.2s; /* Smooth transitions for hover effects */

  &:hover {
    background-color: ${(props) =>
      props.borderColor || "#5a4dbc"}; /* Darken background on hover */
    transform: scale(1.05); /* Slightly increase button size on hover */
  }

  &:disabled {
    background-color: #ccc; /* Grey background for disabled state */
    color: #666; /* Grey text for disabled state */
    cursor: not-allowed; /* Change cursor to not-allowed when disabled */
  }
`;

const Button = ({
  text,
  onClick,
  bg,
  color,
  width,
  borderColor,
  height,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <Wrapper
      bg={bg}
      color={color}
      width={width}
      borderColor={borderColor}
      height={height}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </Wrapper>
  );
};

export default Button;
