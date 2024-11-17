import styled from "styled-components";
import AppHeader from "./AppHeader";
import ActionCenter from "./ActionCenter";
import Content from "./Content";
import CreateModal from "./CreateModal";
import { useEffect, useState } from "react";
import axios from "axios";

// Wrapper styled component with a purple-inspired theme
const Wrapper = styled.div`
  background: #f5f3ff;
  min-height: 100vh;
  padding: 15px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }

  .header {
    margin-bottom: 20px;
  }
`;

const Home = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/posts", {
        headers: {
          "user-email": sessionStorage.getItem("userEmail")
        }
      });
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      <div className="header">
        <AppHeader />
        <ActionCenter setOpenCreateModal={setOpenCreateModal} />
      </div>
      <Content posts={posts} />
      {openCreateModal && (
        <CreateModal
          setOpenCreateModal={setOpenCreateModal}
          fetchPosts={fetchPosts}
        />
      )}
    </Wrapper>
  );
};

export default Home;
