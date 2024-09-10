import { useState } from 'react';
import { updateProfile } from '../../../utils/requests/profile-requests'; // Import the updateProfile function
import { ProfileEditFormProps } from '../../../utils/interfaces/components';
import './profile-update-form.css'

function ProfileEditForm({ currentName, currentPicture, onUpdateSuccess, onCancel }: ProfileEditFormProps) {
  const [name, setName] = useState(currentName);
  const [picture, setPicture] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to disable the button

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable the Save button after click

    try {
      const formData = new FormData();
      formData.append('profileName', currentName);
      formData.append('newName', name);

      if (picture) {
        const pictureBase64 = await convertToBase64(picture);
        formData.append('newPicture', pictureBase64);
      } else {
        formData.append('newPicture', currentPicture);
      }

      const updatedProfile = await updateProfile(formData);
      onUpdateSuccess(updatedProfile);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
      setIsSubmitting(false); // Re-enable the Save button if an error occurs
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="modal-container z-2 p-5">
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <h5 className="modal-title text-center">Edit Profile</h5>
        <div className="form-group d-flex flex-column my-2">
          <label htmlFor="profileNameInput" className='pb-1'>Name</label>
          <input 
            type="text" 
            className="profile-name-input" 
            id="profile-nameInput" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe"
            disabled={isSubmitting} // Disable input if submitting
          />
        </div>
        <div className="my-2 mb-4 d-flex flex-column">
          <label htmlFor="profilePictureInput" className="form-label">Profile Picture</label>
          <input 
            className="picture-input" 
            type="file" 
            id="profilePictureInput" 
            onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
            disabled={isSubmitting} // Disable input if submitting
          />
        </div>
        {error && <div className="text-danger text-center">{error}</div>}
        <div className="d-flex flex-row justify-content-between">
          <button className='button-save' disabled={isSubmitting}>Save</button>
          <button className='button-cancel' onClick={onCancel} disabled={isSubmitting}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditForm;