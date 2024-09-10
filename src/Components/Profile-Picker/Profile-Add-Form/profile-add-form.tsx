import React, { useState } from 'react';
import { ProfileAddFormProps } from '../../../utils/interfaces/components';
import './profile-add-form.css';

function ProfileAddForm({ onCancel }: ProfileAddFormProps) {
  const [profileName, setProfileName] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

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
      console.log('Please provide both a profile name and a picture.');
      return;
    }

    setIsSubmitting(true); 

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
      
      window.location.reload();
    } catch (error) {
      console.error('Error adding profile:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-container z-2 p-5">
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <h5 className="modal-title text-center">New Profile</h5>
        <div className="form-group d-flex flex-column my-2">
          <label htmlFor="profileName" className='pb-1'>Name</label>
          <input 
            type="text" 
            className="profile-name-input" 
            id="profileName" 
            placeholder="John Doe" 
            value={profileName} 
            onChange={handleNameChange} 
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group d-flex flex-column my-2 mb-4">
          <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
          <input 
            className="picture-input" 
            type="file" 
            id="profilePicture" 
            onChange={handleFileChange} 
            disabled={isSubmitting} 
          />
        </div>
        <div className='d-flex flex-row justify-content-between'>
          <button type="submit" className='button-save' disabled={isSubmitting}>Done</button>
          <button className='button-cancel' onClick={onCancel} disabled={isSubmitting}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileAddForm