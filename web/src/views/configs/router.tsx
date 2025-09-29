import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterPathType } from "../../utils/types/router-path-type";
import { AuthProvider } from "@/hooks/auth/use-auth";
import { PrivateRoute } from "@/components/auth/privateRoute";


export function Router() {

    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Login fora do layout */}
                    <Route path={ RouterPathType.LOGIN.path } element={ <RouterPathType.LOGIN.page/> }/>

                    <Route path={ RouterPathType.MAIN_LAYOUT.path } element={ <RouterPathType.MAIN_LAYOUT.page/> }>
                        <Route path={ RouterPathType.USER.path } element={ <RouterPathType.USER.page/> }/>
                        <Route path={ RouterPathType.TRIGGER.path } element={ <RouterPathType.TRIGGER.page/> }/>
                        <Route path={ RouterPathType.TRIGGER_REGISTER.path } element={ <RouterPathType.TRIGGER_REGISTER.page/> }/>
                        <Route path={ RouterPathType.MEMORIES.path } element={ <RouterPathType.MEMORIES.page/> }/>
                        <Route path={ RouterPathType.SNACK.path } element={ <RouterPathType.SNACK.page/> }/>
                        <Route path={ RouterPathType.SNACK_REGISTER.path } element={ <RouterPathType.SNACK_REGISTER.page/> }/>
                        <Route path={ RouterPathType.USER_MANAGERS.path } element={ <PrivateRoute requireAdmin={true}><RouterPathType.USER_MANAGERS.page/></PrivateRoute>  }/>
                    </Route>

                    <Route path={ RouterPathType.UNAUTHORIZED.path } element={ <RouterPathType.UNAUTHORIZED.page/> }/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
