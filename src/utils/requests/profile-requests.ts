export async function fetchProfile(profileName: string) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not logged in');
  }

  try {
    const response = await fetch(`https://streaming-service-backend-muow.onrender.com/profiles?profileName=${encodeURIComponent(profileName)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

export async function fetchProfiles() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not logged in');
  }

  try {
    const response = await fetch('https://streaming-service-backend-muow.onrender.com/profiles/get', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profiles');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
}

export const updateProfile = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not logged in');
  }

  try {
    const response = await fetch(`https://streaming-service-backend-muow.onrender.com/profiles/update/${encodeURIComponent(formData.get('profileName') as string)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export async function deleteProfile(profileName: string) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not logged in');
  }

  try {
    const response = await fetch(`https://streaming-service-backend-muow.onrender.com/profiles/delete/${encodeURIComponent(profileName)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
}