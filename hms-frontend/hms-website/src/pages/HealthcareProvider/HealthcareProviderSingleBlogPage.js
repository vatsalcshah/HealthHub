import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HealthcareProviderSidebar from '../../components/HealthcareProviderSidebar'; 
import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons library

const PatientSingleBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState(null); // State to store current UserID

  useEffect(() => {
    fetchBlog();
    fetchComments();
    getCurrentUserId(); // Call function to get current UserID
  }, []);

  // Function to fetch blog by ID
  const fetchBlog = async () => {
    try {
      const response = await fetch(`https://example.com/api/fetchBlogs.php?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  // Function to fetch comments for the blog
  const fetchComments = async () => {
    try {
      const response = await fetch(`https://example.com/api/fetchComments.php?blogId=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Function to add a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://example.com/api/addComment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogId: id,
          userId: userId, // Pass current UserID to the API
          comment: comment,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Function to delete a comment
  const handleDelete = async (commentId) => {
    try {
      const response = await fetch('https://example.com/api/deleteComment.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId: commentId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Function to get the current UserID from sessionStorage
  const getCurrentUserId = () => {
    const storedUserId = sessionStorage.getItem('UserID');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert('UserID is not available.');
      sessionStorage.clear();
    }
  };


  return (
    <>
    <HealthcareProviderSidebar />
    <div style={{ textAlign: 'center', backgroundColor: '#007bff', minHeight: '100vh' }}>
      <div className="single-blog-page" style={{ padding: '50px' }}>
        {/* Blog details */}
        {blog ? (
          <div className="blog-details" style={{ maxWidth: '100%', margin: '0 auto', backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', paddingTop: '20px', paddingBottom: '60px', paddingRight: '60px', paddingLeft: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ color: '#007bff', marginBottom: '20px', fontWeight: 'bold' }}>{blog.Title}</h1>
            <p className="creator" style={{ width: '100%', textAlign: 'left', color: '#666', marginBottom: '10px' }}>Creator UserID: {blog.UserID}</p>
            <p className="creation-date" style={{ width: '100%', textAlign: 'left', color: '#666', marginBottom: '30px' }}>Creation Date: {blog.CreationDate}</p>
            <p className="description" style={{ color: '#333', fontSize: '1rem', lineHeight: '1.5', marginBottom: '10px', textAlign: 'left', width: '100%' }}>{blog.Content}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
  
        {/* Comment section */}
        <div className="comment-section" style={{ maxWidth: '100%', margin: '20px auto 0', backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', paddingTop: '20px', paddingBottom: '60px', paddingRight: '60px', paddingLeft: '60px' }}>
          <h2 style={{ color: '#007bff', marginBottom: '20px', fontWeight: 'bold' }}>Comments</h2>
          {/* Form to add a new comment */}
          <form onSubmit={handleSubmit} style={{ width: '100%', marginBottom: '10px' }}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add your comment..." style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'none' }} />
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Add Comment</button>
          </form>
          {/* Display comments */}
          <div className="comment-section" style={{ width: '100%', margin: '20px auto 0', backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ color: '#007bff', marginBottom: '20px', fontWeight: 'bold' }}>Comments</h2>
            {/* Display comments */}
            {comments.map((comment) => (
              <div key={comment.CommentID} className="comment" style={{ width: '100%', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <p style={{ marginBottom: '5px', textAlign: 'left' }}>UserID: {comment.UserID}</p>
                <p style={{ marginBottom: '5px', textAlign: 'left', maxWidth: '100%', wordWrap: 'break-word' }}>Comment: {comment.Comment}</p>
                {String(userId) === String(comment.UserID) && (
                  <button onClick={() => handleDelete(comment.CommentID)} style={{ backgroundColor: 'transparent', color: 'red', border: 'none', cursor: 'pointer', alignSelf: 'flex-end' }}>
                    <div style={{ alignSelf: 'flex-start' }}>
                    <FaTrash onClick={() => handleDelete(comment.CommentID)} style={{ backgroundColor: 'transparent', color: 'red', border: 'none', cursor: 'pointer' }} />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PatientSingleBlogPage;
