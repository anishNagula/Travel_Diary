// Home.jsx
import React, { useState, useEffect } from 'react';
import './home.css';
import MainNavbar from '../../layouts/Main_Navbar/MainNavbar.jsx';
import Sidebar from '../../layouts/Sidebar/Sidebar.jsx';
import postIcon from '../../assets/icon/sent-stroke-rounded.svg';
import imageIcon from '../../assets/icon/image-02-stroke-rounded.svg';
import clipIcon from '../../assets/icon/attachment-02-stroke-rounded.svg';
import ForumPost from '../../components/Post/Post.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]); // To hold the fetched posts
  const [newPost, setNewPost] = useState({ title: '', content: '' }); // For handling new post form data
  const [selectedImage, setSelectedImage] = useState(null); // To handle image upload for a new post

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts'); // Ensure the API endpoint is correct
        const data = await response.json();
        setPosts(data); // Store the fetched posts in state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Handle new post submission
  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      if (selectedImage) formData.append('image', selectedImage); // Attach selected image if available

      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newPostData = await response.json();
        setPosts((prevPosts) => [newPostData, ...prevPosts]); // Add the new post to the front of the list
        setNewPost({ title: '', content: '' }); // Clear input fields
        setSelectedImage(null); // Clear image selection
      } else {
        console.error('Error posting the new post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div>
      <MainNavbar />
      <Sidebar />
      <div className="forum-container">
        <main className="forum-feed">
          <div className="forum-feed-container">
            {/* Render the posts */}
            {posts.length > 0 ? (
              posts.map((postDetails) => (
                <ForumPost
                  key={postDetails._id} // Ensure each post has a unique key
                  postDetails={postDetails} // Pass post details as a prop to ForumPost component
                />
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
          <div className="forum-search-bar-forum">
            <input
              type="text"
              placeholder="Title..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Content..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <img className="forum-image-icon" src={imageIcon} alt="image icon" />
            </label>
            <img className="forum-clip-icon" src={clipIcon} alt="attachment icon" />
            <img
              className="forum-post-icon"
              src={postIcon}
              alt="post icon"
              onClick={handlePostSubmit} // Handle post submission when clicked
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
