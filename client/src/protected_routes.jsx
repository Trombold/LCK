import { Navigate,Outlet } from "react-router-dom"
import { useAuth } from "./contexts/auth_context"

export default function ProtectedRoutes() {
  const { isAuthenticated,loading } = useAuth()

  if (loading) return <div>Cargando...</div>

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace/>  
  }
  
  return (
    <Outlet />
  )
}
