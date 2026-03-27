import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Role } from "./types";
import { ProtectedRoute } from "./hooks/Protected";
import { AuthProvider } from "./hooks/Authcontext";
import { WaiterLoading } from "./components/Loading";
import { ToastProvider } from "./context/ToastContext";

// Lazy Load Pages
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const AdminPage = lazy(() =>
  import("./Pages/AdminPage").then((module) => ({ default: module.AdminPage })),
);
const WaiterPage = lazy(() =>
  import("./Pages/WaiterPage").then((module) => ({
    default: module.WaiterPage,
  })),
);
const KitchenPage = lazy(() =>
  import("./Pages/KitchenPage").then((module) => ({
    default: module.KitchenPage,
  })),
);
const LandingPage = lazy(() =>
  import("./Pages/LandingPage").then((module) => ({
    default: module.LandingPage,
  })),
);
const SignupPage = lazy(() =>
  import("./Pages/SignupPage").then((module) => ({
    default: module.SignupPage,
  })),
);

function App() {
  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<WaiterLoading />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
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
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}

export default App;
