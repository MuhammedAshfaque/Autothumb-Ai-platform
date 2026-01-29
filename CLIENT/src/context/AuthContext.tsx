import { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../assets/assets.ts";
import api from "../configs/api.ts";
import toast from "react-hot-toast";

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    login: (user: {email: string, password: string})=> Promise<void>;
    signUp: (user: {name: string, email: string, password: string})=> Promise<void>;
    logout: ()=> Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    login: async () => {},
    signUp: async () => {},
    logout: async () => {}, 
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const signUp = async ({name, email, password}: {name: string, email: string, password: string}) => {
        // Implementation for sign up
        try {
            const {data} = await api.post('/api/auth/register', {name, email, password});
            if(data.user){
                setUser(data.user as IUser);
                setIsLoggedIn(true);
            }
            toast.success(data.message);
        } catch (error) {
            console.error("Sign Up Error:", error);
            toast.error("Sign Up Failed. Please try again.");
        }
    };

    const login = async ({email, password}: {email: string, password: string}) => {
        // Implementation for login
        try {
            const {data} = await api.post('/api/auth/login', {email, password});
            if(data.user){
                setUser(data.user as IUser);
                setIsLoggedIn(true);
            }
            toast.success(data.message);
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Login Failed. Please check your credentials and try again.");
        }
    };

    const logout = async () => {
        // Implementation for logout
        try {
            const {data} = await api.post('/api/auth/logout');
            setUser(null);
            setIsLoggedIn(false);
            toast.success(data.message);
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Logout Failed. Please try again.");
        }
    };

    const fetchUser = async () => {
        // Implementation for fetching user data
        try {
            const {data} = await api.get('/api/auth/verify'); 
            if(data.user){ 
                setUser(data.user as IUser);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Fetch User Error:", error);
        }
    };

    useEffect(() => {
      (async () => {
        await fetchUser();
      })();
    }, [])
    

    const value = {
        user, setUser,
        isLoggedIn, setIsLoggedIn,
        login, signUp, logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
