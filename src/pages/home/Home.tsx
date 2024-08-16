import styled from "styled-components";
import AppHeader from "./AppHeader";
import ActionCenter from "./ActionCenter";
import Content from "./Content";
import CreateModal from "./CreateModal";
import { useEffect, useState } from 'react';
import axios from "axios";

const Wrapper = styled.div`
  background: #fff;
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  overflow-y: scroll;

  .header {
    position: sticky;
    top: 0;
    background: #fff;
  }

  @media screen and (max-width: 768px) {
    width: 80vw;
  }
`;

const Home = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/posts');

      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
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
