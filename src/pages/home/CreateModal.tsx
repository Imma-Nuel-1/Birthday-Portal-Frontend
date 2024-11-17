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

const Wrapper = styled(Backdrop)<{ previewUrl: string | null }>`
  .container {
    background: #fff;
    border-radius: 8px;
    width: 500px;
    height: auto;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 24px;

      p {
        font-size: 24px;
        font-weight: 600;
        color: #800080; /* Purple color */
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
        position: relative;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        border: 3px solid #800080; /* Purple color */
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .userImage {
          height: 100%;
          width: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        &::before {
          content: "+";
          color: white;
          font-size: 36px;
          position: absolute;
          text-align: center;
          line-height: 100px;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          opacity: ${({ previewUrl }) => (previewUrl ? 0 : 1)};
        }
      }
    }
  }
`;

interface CreateModalProps {
  setOpenCreateModal: (value: boolean) => void;
  fetchPosts: () => Promise<void>;
}

const CreateModal = ({ setOpenCreateModal, fetchPosts }: CreateModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track button state
  
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const res = await axios.post("http://localhost:4000/upload", formData);
        return res?.data.url.path;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleCreatePost = async () => {
    setIsButtonDisabled(true); // Disable the button on click
    try {
      const imageURL = await handleImageUpload();
      await axios.post("http://localhost:4000/create-post", {
        username: userName,
        postDescription: postContent,
        postImage: imageURL,
        email: email,
      });

      sessionStorage.setItem('userEmail', email);
      fetchPosts();
      setOpenCreateModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsButtonDisabled(false); // Re-enable the button after the action is complete
    }
  };

  return (
    <Wrapper previewUrl={previewUrl}>
      <div className="container">
        <div className="header">
          <p>Create post</p>
          <MdCancel color="#800080" onClick={() => setOpenCreateModal(false)} />
        </div>

        <div className="content">
          <div>
            <div className="profilePicture" onClick={handleImageClick}>
              {previewUrl ? (
                <img className="userImage" src={previewUrl} alt="Profile" />
              ) : (
                <IoPerson className="userImage" />
              )}
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleImageSave}
              accept="image/*, video/*" // Allowing image and video uploads
              capture="environment" // Prompt to use camera
            />
          </div>
          <div className="formArea">
            <textarea
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What do you want to say?"
            />
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="What's your name?"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="What's your email?"
            />
            <Button
              text={isButtonDisabled ? "Creating..." : "Create post"}
              height="50px"
              disabled={isButtonDisabled || (!postContent && !image)} // Disable if button is disabled or content is empty
              onClick={handleCreatePost}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateModal;
