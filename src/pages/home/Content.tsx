import styled from "styled-components";
import UserCard from "./UserCard";

const Wrapper = styled.div`
  padding: 24px;
`;

// Define the Post type
interface Post {
  _id: string;
  username: string;
  postDescription: string;
  postImage: string;
  email: string;
}

// Define the props type for Content component
interface ContentProps {
  posts: Post[];
}

const Content: React.FC<ContentProps> = ({ posts }) => {
  return (
    <Wrapper>
      {posts.length > 0 ? (
        posts.map((post) => (
          <UserCard
            key={post._id}
            username={post.username}
            postDescription={post.postDescription}
            postImage={post.postImage}
            email={post.email}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </Wrapper>
  );
};

export default Content;

