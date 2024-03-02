// AdminPostManagement.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminPostManagement = () => {
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`/api/admin/posts/${postIdToDelete}`, {
        data: { adminKey },
      });

      console.log(response.data); // Successful deletion message
      // Handle UI updates or notifications if needed
    } catch (error) {
      console.error('Error deleting post:', error.response?.data || error.message);
      // Handle error and display appropriate message to the admin
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Post ID to delete"
        value={postIdToDelete}
        onChange={(e) => setPostIdToDelete(e.target.value)}
      />
      <input
        type="password"
        placeholder="Admin Key"
        value={adminKey}
        onChange={(e) => setAdminKey(e.target.value)}
      />
      <button onClick={handleDeletePost}>Delete Post</button>
    </div>
  );
};

export default AdminPostManagement;
