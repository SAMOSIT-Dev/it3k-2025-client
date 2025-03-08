import { useState, useEffect } from 'react';
import axios from 'axios';
import { loginFilter } from '../utils/loginFilter';

const API_URL = 'https://it3k.sit.kmutt.ac.th';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<{ id: number; username: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true); // เพิ่ม state เพื่อจัดการ loading

  // ฟังก์ชันดึง cookie
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  // ฟังก์ชันตั้งค่า cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};path=/;expires=${expires.toUTCString()}`;
  };

  // ฟังก์ชันลบ cookie
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;path=/;max-age=0`;
  };

  // ดึง token และ admin จาก cookie หรือ backend เมื่อเริ่มต้น
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const storedToken = getCookie('accessToken');
      const storedAdmin = getCookie('admin');

      if (storedToken && storedAdmin) {
        setAccessToken(storedToken);
        setAdmin(JSON.parse(storedAdmin));
      } else {
        // ถ้าไม่มี token ใน cookie ลอง refresh token
        await refreshAccessToken();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {

      if (!loginFilter(username, password)) return
      
      const res = await axios.post(`${API_URL}/api/admin/auth/login/`, { username, password });

      const newAccessToken = res.data.accessToken;
      const newAdmin = res.data.admin;
      const refreshToken = res.data.refreshToken;

      setAccessToken(newAccessToken);
      setAdmin(newAdmin);

      // เก็บ token และ admin ใน cookie
      setCookie('accessToken', newAccessToken, 1); // เก็บ 1 วัน
      setCookie('admin', JSON.stringify(newAdmin), 1);
      setCookie('refreshToken', refreshToken, 7); // เก็บ refresh token 7 วัน

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.data || error.message);
      }
      return false;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = getCookie('refreshToken');
      if (!refreshToken) {
        console.log('No refresh token available');
        return false;
      }

      const res = await axios.post(`${API_URL}/api/auth/refresh`, { refreshToken });

      const newAccessToken = res.data.accessToken;
      setAccessToken(newAccessToken);
      setCookie('accessToken', newAccessToken, 1); // อัพเดท access token ใน cookie

      // ถ้ามี admin ใน cookie ให้โหลดมาใหม่
      const storedAdmin = getCookie('admin');
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }

      console.log('Token refreshed successfully:', newAccessToken);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to refresh token:', error.response?.data || error.message);
      }
      setAccessToken(null);
      setAdmin(null);
      deleteCookie('accessToken');
      deleteCookie('admin');
      deleteCookie('refreshToken');
      return false;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = getCookie('refreshToken');
      if (refreshToken) {
        await axios.post(`${API_URL}/api/auth/logout`, { refreshToken });
      }

      setAccessToken(null);
      setAdmin(null);
      deleteCookie('accessToken');
      deleteCookie('admin');
      deleteCookie('refreshToken');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Logout failed:', error.response?.data || error.message);
      }
    }
  };

  return { accessToken, admin, isLoading, login, refreshAccessToken, logout };
};