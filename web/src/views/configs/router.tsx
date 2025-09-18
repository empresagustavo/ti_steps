import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterPathType } from "../../utils/types/router-path-type";
import { AuthProvider } from "@/hooks/auth/use-auth";


export function Router() {
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Login fora do layout */}
                    <Route path={ RouterPathType.LOGIN.path } element={ <RouterPathType.LOGIN.page/> }/>

                    {/* Layput com rotas aninhadas */}
                    <Route path={ RouterPathType.MAIN_LAYOUT.path } element={ <RouterPathType.MAIN_LAYOUT.page/> }>
                        <Route path={ RouterPathType.USER.path } element={ <RouterPathType.USER.page/> }/>
                        <Route path={ RouterPathType.TRIGGER.path } element={ <RouterPathType.TRIGGER.page/> }/>
                        <Route path={ RouterPathType.TRIGGER_REGISTER.path } element={ <RouterPathType.TRIGGER_REGISTER.page/> }/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
