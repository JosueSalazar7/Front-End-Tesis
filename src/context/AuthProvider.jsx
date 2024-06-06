import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const perfil = async (token) => {
        try {
            // USAR ENDPOINT DEL BACK
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/perfil`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setAuth(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };
    const login = async (token) => {
        perfil(token);
        setAuth({ ...auth, token });
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            login(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
