import { RouterPathType } from "@/views/configs/router-path-type";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


type AuthContextValue = {
    isAutenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const navigate = useNavigate();
    const [isAutenticated, setIsAutenticated] = useState<boolean>(false);


    const login = (token: string) => {

        if(!token){
            
            navigate({ pathname: RouterPathType.LOGIN.path });
            setIsAutenticated(false);
            return;
        }
       
        navigate({ pathname: RouterPathType.USER.path });
        setIsAutenticated(true);
    };

    const logout = () => {
        
        setIsAutenticated(false);
        navigate({ pathname: RouterPathType.LOGIN.path });
    };

    const value: AuthContextValue = {
        isAutenticated: isAutenticated,
        login,
        logout,
    };

    console.log(value);

    return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
}

export function useAuth(){

    const context = useContext(AuthContext);
    if(!context){
        throw new Error("'useAuth' só pode ser usando dentro de 'AuthProvider'.");
    }

    return context;
}