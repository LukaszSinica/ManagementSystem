import { apiClient } from '@/api/ApiClient';
import { executeJwtAuthenticationService } from '@/api/AuthenticationApiService';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type AuthContextType = {
    isAuthenticated: boolean,
    login: (username: string, password: string) => Promise<boolean>,
    logout: () => void,
    username: string,
    token: string,
    authority: string[],
    hasRole: (role: string) => boolean,
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState<string>("")

    const [token, setToken] = useState<string>("")
    const [authority, setAuthority] = useState<string[]>([])

    const hasRole = (role: string) => authority.includes(role);

    const login = async (username: string, password: string) => {    
        try {
            const response = await executeJwtAuthenticationService(username, password)
            if(response.status==200){
                
                const jwtToken = 'Bearer ' + response.data.token
                
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)
                setAuthority(response.data.authority)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }

    };

    const logout = () => {
        setAuthenticated(false)
        setToken("")
        setUsername("")
        setAuthority([]);
    };

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token, authority, hasRole}  }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};