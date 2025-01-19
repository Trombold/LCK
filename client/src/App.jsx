import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./components/layout";
import LandingPage from "./pages/landing_page";
import AboutPage from "./pages/about_page";
import NoMatchPage from "./pages/no_match_page";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import { AuthProvider } from "./contexts/auth_context";
import KartPage from "./pages/karts_page";
import ProtectedRoutes from "./protected_routes";
import KartFormPage from "./pages/kart_form_page";
import ValidatesPage from "./pages/validates_page";
import ManageValidatesPage from "./pages/manage_validates_page";
import ManageValidateFormPage from "./pages/manage_validates_form_page";
import InscriptionsPage from "./pages/inscriptions_page";
import ResultsPage from "./pages/results_page";
import ManageResultsFormPage from "./pages/manage_results_form_page";
import ManageResultsPage from "./pages/manage_results";
import ManageChampionshipPage from "./pages/manage_championhsip_page";
import ManageChampionshipFormPage from "./pages/manage_championship_form_page";
import ManageTransponders from "./pages/manage_transponders";
import ProfilePage from "./pages/profile_page";
import ChangePasswordPage from "./pages/change_password_page";
import ForgotPasswordPage from "./pages/forgot_password_page";
import RoleProtectedRoute from "./role_protected_route";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/change-password/:_id"
              element={<ChangePasswordPage />}
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route
                path="/karts"
                element={
                  <RoleProtectedRoute
                    roles={["admin", "pilot"]}
                    element={<KartPage />}
                  />
                }
              />
              <Route
                path="/karts/new"
                element={
                  <RoleProtectedRoute
                    roles={["admin", "pilot"]}
                    element={<KartFormPage />}
                  />
                }
              />
              <Route
                path="/karts/:id"
                element={
                  <RoleProtectedRoute
                    roles={["admin", "pilot"]}
                    element={<KartFormPage />}
                  />
                }
              />
              <Route
                path="/manage/validates"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<ManageValidatesPage />}
                  />
                }
              />
              <Route
                path="/manage/validates/new"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<ManageValidateFormPage />}
                  />
                }
              />
              <Route
                path="/manage/validates/:id"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<ManageValidateFormPage />}
                  />
                }
              />
              <Route
                path="/manage/championship"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<ManageChampionshipPage />}
                  />
                }
              />
              <Route
                path="/manage/championship/new"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<ManageChampionshipFormPage />}
                  />
                }
              />
              <Route
                path="/manage/championship/:id"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<ManageChampionshipFormPage />}
                  />
                }
              />
              <Route
                path="/validates"
                element={
                  <RoleProtectedRoute
                    roles={["admin", "pilot"]}
                    element={<ValidatesPage />}
                  />
                }
              />
              <Route
                path="/manage/inscriptions"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<InscriptionsPage />}
                  />
                }
              />
              <Route
                path="/results"
                element={
                  <RoleProtectedRoute
                    roles={["admin", "pilot"]}
                    element={<ResultsPage />}
                  />
                }
              />
              <Route
                path="/manage/results"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<ManageResultsPage />}
                  />
                }
              />
              <Route
                path="/manage/results/new"
                element={
                  <RoleProtectedRoute
                    roles={["admin"]}
                    element={<ManageResultsFormPage />}
                  />
                }
              />
              <Route
                path="/manage/transponders"
                element={
                  <RoleProtectedRoute
                    roles={["admin", "system"]}
                    element={<ManageTransponders />}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <RoleProtectedRoute
                    roles={["admin", "pilot", "system"]}
                    element={<ProfilePage />}
                  />
                }
              />
              <Route
                path="/change-password"
                element={
                  <RoleProtectedRoute
                    roles={["admin", "pilot", "system"]}
                    element={<ChangePasswordPage />}
                  />
                }
              />
              <Route path="/not-authorized" element={<NoMatchPage />} />
              <Route path="*" element={<NoMatchPage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
