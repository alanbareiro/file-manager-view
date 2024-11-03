// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verifica si hay un usuario en localStorage al cargar la aplicación
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = async (email, password) => {
        console.log("Login()");
        console.log({email, password});
        
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        const userData = response.data.user; // Suponiendo que el backend devuelve el usuario
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Guarda el usuario en localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Elimina el usuario de localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}      
        </AuthContext.Provider>
    );
};

