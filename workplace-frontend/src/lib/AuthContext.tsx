import React, { createContext, ReactNode, useContext, useState } from 'react'


type AuthContextType = {
    isAuthenticated: boolean,
    setIsAuthenticated: (value: boolean) => void,
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}