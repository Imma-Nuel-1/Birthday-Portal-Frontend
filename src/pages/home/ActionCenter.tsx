import styled from "styled-components";
import Button from "../../component/Button";

const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  gap: 100px;
`;

interface ActionCenterProps {
  setOpenCreateModal: (value: boolean) => void;
}

const ActionCenter = ({ setOpenCreateModal }: ActionCenterProps) => {
  return (
    <Wrapper>
      <Button text="Create" onClick={() => setOpenCreateModal(true)} />
      <Button text="Refresh" />
    </Wrapper>
  );
};

export default ActionCenter;
