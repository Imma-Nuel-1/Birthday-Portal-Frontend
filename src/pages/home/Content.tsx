import styled from "styled-components";
import UserCard from "./UserCard";
const Wrapper = styled.div`
  padding: 24px;
`;

const Content = ({posts}) => {

  return (
    <Wrapper>
      {posts.length > 0 ? (
        posts.map((post: any) => (
          <UserCard
            key={post._id}
            username={post.username}
            postDescription={post.postDescription}
            postImage={post.postImage}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </Wrapper>
  );
};

export default Content;
