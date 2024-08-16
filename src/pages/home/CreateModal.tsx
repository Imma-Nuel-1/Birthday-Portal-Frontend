/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled from "styled-components";
import { MdCancel } from "react-icons/md";
import { useRef, useState } from "react";
import Button from "../../component/Button";
import axios from "axios";
import { IoPerson } from "react-icons/io5";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(Backdrop)`
  .container {
    background: #fff;
    border-radius: 8px;
    width: 500px;
    height: 500px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 24px;

      p {
        font-size: 24px;
        font-weight: 600;
      }
    }

    .content {
      padding: 24px;
      display: grid;
      gap: 24px;

      input {
        width: 100%;
        height: 50px;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #ccc;
      }

      textarea {
        width: 100%;
        height: 100px;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #ccc;
      }

      .formArea {
        display: grid;
        gap: 24px;
      }

      .profilePicture {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        border: 3px solid #ff6f61;
        cursor: pointer;

        .userImage {
          height: 100%;
          width: 100%;
          border-radius: 50%;
          object-fit: cover;
      }
    }
  }
`;

interface CreateModalProps {
  setOpenCreateModal: (value: boolean) => void;
}

const CreateModal = ({ setOpenCreateModal, fetchPosts }: CreateModalProps) => {
  const inputRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageClick = () => {
    //@ts-ignore
    inputRef.current.click();
  };

  const handleImageSave = (e: any) => {
    const file = e.target.files?.[0];

    if(file) {
      setImage(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

  const handleImageUpload = async () => {
    if (image){
      const formData = new FormData();
  
      formData.append("image", image);
  
      try {
        const res = await axios.post("http://localhost:4000/upload", formData);
        const imagePath = res?.data.url.path
        return imagePath
      } catch (error) {
        console.log("handleImageUpload::error", error);
      }
    }
  };

  const handleCreatePost = async () => {
    try {
      const imageURL = await handleImageUpload()
      await axios.post("http://localhost:4000/create-post", {
        username: userName,
        postDescription: postContent,
        postImage: imageURL,
      });

      fetchPosts();
      setOpenCreateModal(false);
    } catch (error) {
      console.log("handleCreatePost::error", error);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <p>Create post</p>
          <MdCancel color="#ff6f61" onClick={() => setOpenCreateModal(false)} />
        </div>

        <div className="content">
          <div>
            <div className="profilePicture" onClick={handleImageClick}>
              {previewUrl ? (
                <img className="userImage" src={previewUrl} alt="" />
              ) :  (
                <IoPerson className="userImage" />
              )}
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={(e) => handleImageSave(e)}
              accept=".jpeg, .jpg, .png, .gif"
            />
          </div>
          <div className="formArea">
            <textarea
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Whats on your mind?"
            />
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Whats your name"
            />

            <Button
              text="Create post"
              height="50px"
              disabled={!postContent && !image}
              onClick={handleCreatePost}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateModal;
