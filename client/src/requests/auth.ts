import axios from 'axios'
import { UserInfo } from '../types';

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const login = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, {username, password})
  return response.data as UserInfo
}

const getCurrentUser = () => {
 const userInfo = localStorage.getItem('currentUser') 
 if (!userInfo) {
  return null
 }
 return JSON.parse(userInfo) as UserInfo
}

export {login, getCurrentUser}