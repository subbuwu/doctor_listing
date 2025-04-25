import axios from 'axios';
import { Doctor } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await axios.get<Doctor[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};