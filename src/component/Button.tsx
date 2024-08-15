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
  background-color: ${(props) => props.bg || "#ff6f61"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  padding: 12px 24px;
  border-radius: 8px;
  border: ${(props) => `1px solid ${props.borderColor ?? "none"}`};
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
