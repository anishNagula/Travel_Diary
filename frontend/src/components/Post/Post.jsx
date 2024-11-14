import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import '../../pages/Home/home.css';
import like from '../../assets/icon/Like1-Linear-32px.svg';
import dislike from '../../assets/icon/Dislike-Linear-32px.svg';
import comment from '../../assets/icon/bubble-chat-stroke-rounded.svg';
import share from '../../assets/icon/share-01-stroke-rounded.svg';
import reply from '../../assets/icon/arrow-move-up-left-stroke-rounded.svg';
import reply_next from '../../assets/icon/arrow-move-down-right-stroke-rounded.svg';
import deleteIcon from '../../assets/icon/delete-02-stroke-rounded.svg';

const ForumPost = ({ postDetails }) => {
  console.log(postDetails); // Log the post data
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(postDetails.comments);
  const [replyInput, setReplyInput] = useState({});
  
  const toggleComments = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { user: 'You', text: newComment, replies: [] }]);
      setNewComment('');
    }
  };

  const handleReplyIconClick = (index) => {
    setReplyInput((prev) => ({
      ...prev,
      [index]: prev[index] === undefined ? '' : undefined  // Toggles between open and closed
    }));
  };

  const handleReplyInputChange = (index, value) => {
    setReplyInput({ ...replyInput, [index]: value });
  };

  const handleAddReply = (index) => {
    if (replyInput[index]?.trim() !== '') {
      const updatedComments = comments.map((comment, i) => 
        i === index ? { ...comment, replies: [...(comment.replies || []), { user: 'You', text: replyInput[index] }] } : comment
      );
      setComments(updatedComments);
      setReplyInput({ ...replyInput, [index]: undefined });  // Close reply field after replying
    }
  };

  const handleDeleteReply = (commentIndex, replyIndex) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === commentIndex) {
        const updatedReplies = comment.replies.filter((_, rIndex) => rIndex !== replyIndex);
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="forum_post">
      <div className="forum_post_details">
        <img src={postDetails.profilePic} alt="post_profile_pic" />
        <p>{postDetails.username}</p>
      </div>
      <h4>{postDetails.title}</h4>
      <p>{postDetails.content}</p>
      {postDetails.image && <img src={postDetails.image} alt="Post image" />}
      <div className="forum_post_bottom">
        <div className="forum_post_bottom_like">
          <img src={like} alt="like" />
          <p>{postDetails.likes}</p>
        </div>
        <img src={dislike} alt="dislike" />
        <img src={comment} alt="comment" onClick={toggleComments} />
        <img src={share} alt="share" />
      </div>
      {isExpanded && (
        <div className="forum_comments_section">
          <h4>Comments:</h4>
          {comments.map((comment, index) => (
            <div className="forum_comments_section_inner">
              <div key={index} className="forum_comment">
              <div className="forum_comment_user">
                <strong>{comment.user}:</strong>
                <p>{comment.text}</p>
              </div>
              <div className="forum_comment_right">
                <img 
                  src={reply} 
                  alt="reply" 
                  onClick={() => handleReplyIconClick(index)}
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                />
                <p>reply</p>
              </div>
            </div>
            <div className="reply-container">
                {replyInput[index] !== undefined && (
                  <div className="reply-input">
                    <input
                      type="text"
                      placeholder="Reply..."
                      value={replyInput[index]}
                      onChange={(e) => handleReplyInputChange(index, e.target.value)}
                    />
                    <button onClick={() => handleAddReply(index)}>Reply</button>
                  </div>
                )}
                {comment.replies && comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className="forum_reply">
                    <img src={reply_next} alt="arrow" />
                    <strong>{reply.user}:</strong> <p>{reply.text}</p>
                    <img 
                      src={deleteIcon} 
                      alt="delete" 
                      onClick={() => handleDeleteReply(index, replyIndex)}
                      style={{ cursor: 'pointer', marginLeft: '8px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="user_comment_container">
            <input
              type="text"
              placeholder="Add a comment..."
              className="forum_add_comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="comment_button" onClick={handleAddComment}>
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPost;