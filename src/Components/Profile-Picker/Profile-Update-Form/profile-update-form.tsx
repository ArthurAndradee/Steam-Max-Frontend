import { useState } from 'react';
import { updateProfile } from '../../../utils/functions/profile'

interface ProfileEditFormProps {
  currentName: string;
  currentPicture: string;
  onUpdateSuccess: (updatedProfile: { name: string; picture: string }) => void;
  onCancel: () => void;
}

function ProfileEditForm({ currentName, currentPicture, onUpdateSuccess, onCancel }: ProfileEditFormProps) {
  const [name, setName] = useState(currentName);
  const [picture, setPicture] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let pictureBase64 = currentPicture;
      if (picture) {
        const reader = new FileReader();
        reader.onloadend = () => {
          pictureBase64 = reader.result as string;
        };
        reader.readAsDataURL(picture);
      }

      const updatedProfile = await updateProfile(currentName, { newName: name, newPicture: pictureBase64 });
      onUpdateSuccess(updatedProfile);
      window.location.reload()
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="modal-container z-2">
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <h5 className="modal-title ms-5 mt-4">Edit Profile</h5>
        <div className="form-group mx-5 my-2">
          <label htmlFor="profileNameInput" className='pb-1'>Name</label>
          <input
            type="text"
            className="form-control"
            id="profileNameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="mx-5 my-2 mb-4">
          <label htmlFor="profilePictureInput" className="form-label">Profile Picture</label>
          <input
            className="form-control"
            type="file"
            id="profilePictureInput"
            onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        {error && <div className="text-danger text-center">{error}</div>}
        <div className="d-flex justify-content-between mx-5 mb-5">
          <button className='btn btn-light' style={{ width: '10rem' }}>Save</button>
          <button className='btn btn-secondary' style={{ width: '10rem' }} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditForm;
