'use client';

import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout());
    return router.push('sign-in'); // Redirect to login page after logout
  }, [dispatch, router]);

  return <div>Logging out...</div>;
};

export default Logout;
