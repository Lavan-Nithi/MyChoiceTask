import axios from 'axios';
import type { Item } from './types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getItems = () => api.get<Item[]>('items/');
export const getItem = (id: number) => api.get<Item>(`items/${id}/`);
export const createItem = (data: Omit<Item, 'id' | 'created_at' | 'updated_at'>) =>
  api.post<Item>('items/', data);
export const updateItem = (id: number, data: Partial<Item>) =>
  api.patch<Item>(`items/${id}/`, data);

export default api;