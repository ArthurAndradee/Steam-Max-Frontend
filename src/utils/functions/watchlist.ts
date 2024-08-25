import { Movie } from "../interfaces/objects";

export async function fetchWatchlist(profileId: string) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('User not logged in');
  }

  try {
    const response = await fetch(`http://localhost:5000/watchlist/${profileId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return data.watchlist;
  } catch (error) {
    console.error('Failed to fetch watchlist:', error);
    throw error;
  }
}

export async function addToWatchlist(profileId: string, movie: Movie) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('User not logged in');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/watchlist/${profileId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ movie }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Movie added to watchlist:', data.watchlist);
    } else {
      console.error('Failed to add movie to watchlist:', data.message);
    }
  } catch (error) {
    console.error('Error adding movie to watchlist:', error);
  }
}

export async function removeFromWatchlist(profileName: string, movieId: string) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('User not logged in');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/watchlist/${profileName}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Movie removed from watchlist:', data.watchlist);
    } else {
      console.error('Failed to remove movie from watchlist:', data.message);
    }
  } catch (error) {
    console.error('Error removing movie from watchlist:', error);
  }
}