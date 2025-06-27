import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import { AdminPage } from "./Pages/AdminDashboard"
import { WaiterPage } from "./Pages/WaiterPage"
import { Role } from "./Pages/LoginPage"
import { ProtectedRoute } from "./hooks/Protected"
import { KitchenPage } from "./Pages/KitchenPage"
import { AuthProvider } from "./hooks/Authcontext"
import {LandingPage} from "./Pages/LandingPage"
import { SignupPage } from "./Pages/SignupPage"

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role={Role.ADMIN}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/waiter"
              element={
                <ProtectedRoute role={Role.WAITER}>
                  <WaiterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/kitchen"
              element={
                <ProtectedRoute role={Role.KITCHEN}>
                  <KitchenPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider >
    </>
  )
}

export default App
