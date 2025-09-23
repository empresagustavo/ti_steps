import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/auth/use-auth"
import { RouterPathType } from "@/utils/types/router-path-type"

interface PrivateRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function PrivateRoute({ children, requireAdmin = false }: PrivateRouteProps) {
    
    const { isAdmin, userData } = useAuth()

    // não está logado > vai pro login
    if (!userData) return <Navigate to="/login" replace />

    // está logado mas não é admin > vai pra home (ou página de sem autorização - não configurada ainda)
    if (!isAdmin && requireAdmin) return <Navigate to={RouterPathType.UNAUTHORIZED.path} replace/> 

    return <>{children}</>
}
