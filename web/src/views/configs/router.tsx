import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterPathType } from "../../utils/types/router-path-type";
import { AuthProvider } from "@/hooks/auth/use-auth";


export function Router() {
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={ RouterPathType.LOGIN.path } element={ <RouterPathType.LOGIN.page/> }/>
                    <Route path={ RouterPathType.DASHBOARD.path } element={ <RouterPathType.DASHBOARD.page/> }/>
                    <Route path={ RouterPathType.USER.path } element={ <RouterPathType.USER.page/> }/>
                    <Route path={ RouterPathType.TRIGGER.path } element={ <RouterPathType.TRIGGER.page/> }/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}