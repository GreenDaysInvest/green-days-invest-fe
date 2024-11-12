import axiosInstance from './api';

export const fetchScraperData = async () => {
  try {
    const response = await axiosInstance.get('/scraper-data');
    return response.data; // Returns the data from the response
  } catch (error) {
    console.error('Error fetching scraper data:', error);
    throw error;
  }
};
