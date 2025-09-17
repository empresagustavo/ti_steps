import type { UserAuthModel, UserModel } from "@/models/user/user-model";
import { CacheKeyType } from "@/utils/types/cache-key-type";
import { RouterPathType } from "@/utils/types/router-path-type";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type AuthContextValue = {
    isAutenticated: boolean;
    login: (userData: UserAuthModel) => void;
    logout: () => void;
    userData?: UserModel;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const setCacheUser = (userData: UserAuthModel): UserModel => {

        const json = JSON.stringify(userData);
        localStorage.setItem(CacheKeyType.USER_AUTH, json);

        return JSON.parse(json) as UserModel;
    };
    const getCacheUser = (): UserModel | undefined => {

        const json = localStorage.getItem(CacheKeyType.USER_AUTH);
        if (!json) return undefined;

        return JSON.parse(json) as UserModel;
    };
    const removeCacheUser = (): void => {

        const json = localStorage.getItem(CacheKeyType.USER_AUTH);
        if (!json) return undefined;

        localStorage.removeItem(CacheKeyType.USER_AUTH);
    };

    const navigate = useNavigate();
    const [isAutenticated, setIsAutenticated] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserModel | undefined>(getCacheUser());

    useEffect(() => {
        const user = getCacheUser();
        if(!user) {
            navigate({ pathname: RouterPathType.LOGIN.path });
            return;
        }

        setUserData(user);
        setIsAutenticated(true);

    }, [isAutenticated]);



    const login = (userData: UserAuthModel) => {
        if(!userData?.token){
            //navigate({ pathname: RouterPathType.LOGIN.path });
            setIsAutenticated(false);
            console.log("Não logou!", userData)
            return;
        }

        setCacheUser(userData);
        setUserData(userData)

        console.log("Logou!", userData)

        navigate({ pathname: RouterPathType.DASHBOARD.path });
        setIsAutenticated(true);
    };


    const logout = () => {
        removeCacheUser();
        setIsAutenticated(false);
        setUserData(undefined);
        navigate({ pathname: RouterPathType.LOGIN.path });
    };


    


    const value: AuthContextValue = {
        isAutenticated,
        login,
        logout,
        userData,
    };

    return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("'useAuth' só pode ser usando dentro de 'AuthProvider'.");
    }
    return context;
}