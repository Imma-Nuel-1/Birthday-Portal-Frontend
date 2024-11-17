import styled from "styled-components";

// Define the prop types
interface UserCardProps {
  username: string;
  postDescription: string;
  postImage: string;
}

const Wrapper = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 24px;
  height: 400px;
  display: flex;
  flex-direction: column;

  .profilePicture {
    height: 60%;
    width: 100%;
    border-radius: 8px 8px 0 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px 8px 0 0;
      object-fit: cover;
      cursor: pointer;
    }
  }

  .content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .contentItem {
      display: flex;
      gap: 8px;

      .username {
        font-size: 20px;
        font-style: italic;
        font-weight: bold;
      }
    }

    .liked {
      width: 30px;
      height: 20px;

      svg {
        width: 100%;
        height: 100%;
      }
    }
`;

const UserCard: React.FC<UserCardProps> = ({
  username,
  postDescription,
  postImage,
}) => {
  return (
    <Wrapper>
      <div className="profilePicture">
        <img src={postImage} alt={username} />
      </div>

      <div className="content">
        <div className="contentItem">
          <p className="username">{username}</p>
        </div>


        <div className="contentItem">
          <p className="description">{postDescription}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserCard;
