// src/api.js
export const fetchData = async () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
  
    try {
      const response = await fetch(`${apiUrl}/api/endpoint`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  