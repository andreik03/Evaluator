import React, { useState, useEffect } from 'react';
import axiosInstance from '../../shared/services/axios'
import { useHistory } from 'react-router-dom';

export default function LogOutPage() {
    const history = useHistory();

    useEffect(() => {
        const response = axiosInstance.post('accounts/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        history.push('/login');
    });
    return <div>Logout</div>;
}