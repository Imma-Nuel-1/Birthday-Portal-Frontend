import { colors } from "../../utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100px;
  border-bottom: 1px solid #ccc;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, ${colors.join(", ")});
  color: #fff;
`;

const AppHeader = () => {
  return (
    <Wrapper>
      <h1>Happy Birthday Ardaiy</h1>
    </Wrapper>
  );
};

export default AppHeader;
