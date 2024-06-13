import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://example.com/api/addBlog.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          userId: sessionStorage.getItem('UserID'),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setAlertMessage(data.message);
      setOpenAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setOpenAlert(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#007bff', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '20px' }}>Add Blog</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '20px', padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          placeholder="Content"
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: '20px', padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: '#28a745', color: '#fff', padding: '12px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
        >
          Save
        </button>
        <Link to="/PatientMyBlogs" style={{ color: '#28a745', textDecoration: 'none', marginTop: '10px' ,backgroundColor: '#ffff', padding: '12px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Go Back to My Blogs</Link>
      </div>
      {openAlert && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', maxWidth: '400px' }}>
          <div style={{ backgroundColor: '#f44336', color: '#fff', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
            {alertMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
