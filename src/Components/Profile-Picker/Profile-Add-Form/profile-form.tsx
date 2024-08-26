import React, { useState } from 'react';
import './profile-form.css';

function ProfileForm() {
  const [profileName, setProfileName] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileName(event.target.value);
  }; 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!profileName || !profilePicture) {
      alert('Please provide both a profile name and a picture.');
      return;
    }

    const formData = new FormData();
    formData.append('name', profileName);
    formData.append('picture', profilePicture);

    try {
      const response = await fetch('http://localhost:5000/profiles/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add profile');
      }

      alert('Profile added successfully!');
      window.location.reload()
    } catch (error) {
      console.error('Error adding profile:', error);
      alert('Error adding profile. Please try again.');
    }
  };

  return (
    <div className="modal-container z-2">
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <h5 className="modal-title m-4 text-center">New Profile</h5>
        <div className="form-group mx-5 my-2">
          <label htmlFor="profileName" className='pb-1'>Name</label>
          <input
            type="text"
            className="form-control"
            id="profileName"
            placeholder="John Doe"
            value={profileName}
            onChange={handleNameChange}
          />
        </div>
        <div className="mx-5 my-2 mb-4">
          <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
          <input
            className="form-control"
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className='btn btn-light m-auto mt-1 mb-4'
          style={{ width: '10rem' }}
        >
          Done
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
