export async function fetchProfile(profileName: string) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not logged in');
  }

  try {
    const response = await fetch(`http://localhost:5000/users?profileName=${encodeURIComponent(profileName)}`, {
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