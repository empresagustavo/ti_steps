import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterPathType } from "./router-path-type";
import { AuthProvider } from "@/hooks/auth";


export function Router() {
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={ RouterPathType.USER.path } element={ <RouterPathType.USER.page/> }/>
                    <Route path={ RouterPathType.LOGIN.path } element={ <RouterPathType.LOGIN.page/> }/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}