import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PatientSidebar from '../../components/PatientSidebar'; 

const PatientMyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const imageSources = [
    "https://americancollege.edu.in/wp-content/uploads/2018/08/pexels-photo.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*",
    "https://www.myhealth.ph/wp-content/uploads/2023/08/shutterstock_238688131-scaled.jpg",
    "https://www.fda.gov/files/MDDT-homepage.jpg"
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://example.com/api/fetchBlogs.php');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      // Filter blogs for the current user
      const currentUserBlogs = data.filter(blog => blog.UserID === getCurrentUserId());
      setBlogs(currentUserBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Function to get the current UserID from sessionStorage
  const getCurrentUserId = () => {
    const storedUserId = sessionStorage.getItem('UserID');
    if (storedUserId) {
      return parseInt(storedUserId);
    } else {
      alert('UserID is not available.');
      sessionStorage.clear();
      return null;
    }
  };

// Function to handle deletion of a blog
const handleDelete = async (blogId) => {
  try {
    const response = await fetch(`https://example.com/api/deleteBlog.php?id=${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        blogId: blogId
      })
    });
    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }
    // Refetch blogs after deletion
    fetchBlogs();
  } catch (error) {
    console.error('Error deleting blog:', error);
  }
};


  return (
    <>
      <PatientSidebar />
      <div style={{ textAlign: 'center', backgroundColor: '#007bff', minHeight: '100vh' }}>
        <div className="blogs-page" style={{ padding: '20px' }}>
          <Link to="/PatientCommunity" className="create-blog-btn" style={{ marginBottom:'30px', textDecoration: 'none', color: '#28a745', backgroundColor: '#ffff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', marginTop: '30px', display: 'inline-block' }}>Go Back</Link>
          <h1  variant="h4" gutterBottom style={{ color: '#ffff', marginBottom: '20px', fontWeight: 'bold' }}>📖 My Blogs</h1>
          <Link to="/PatientAddBlog" className="create-blog-btn" style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#28a745', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>Create Blog</Link>
          <div className="blog-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
            {blogs.map((blog, index) => (
              <div key={blog.BlogID} className="blog-card" style={{ backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Link to={`/PatientSingleBlogPage/${blog.BlogID}`} style={{ textDecoration: 'none', color: '#333', width: '100%' }}>
                  <div style={{ width: '100%', maxHeight: '450px', overflow: 'hidden', borderRadius: '8px', marginBottom: '20px' }}>
                    <img src={imageSources[index % imageSources.length]} alt="Placeholder" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  </div>
                  <div style={{ textAlign: 'left', width: '100%', marginTop: 'auto' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{blog.Title}</h2>
                    <p className="creator" style={{ color: '#666', marginBottom: '10px', marginTop: '10px' }}>Creator UserID: {blog.UserID}</p>
                    <p className="creation-date" style={{ color: '#666', marginBottom: '10px' }}>Creation Date: {blog.CreationDate}</p>
                    <p className="description" style={{ color: '#555', fontSize: '1rem', lineHeight: '1.5', marginBottom: '10px' , marginTop:'30px'}}>{blog.Content}</p>
                  </div>
                </Link>
                <button onClick={() => handleDelete(blog.BlogID)} style={{ backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientMyBlogs;
