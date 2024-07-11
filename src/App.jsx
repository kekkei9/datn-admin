import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/reset.css";
import "./assets/styles/responsive.css";
import "./assets/styles/main.css";
import { AuthProvider } from "./contexts/AuthContext";
import { fetcher } from "./services/backend/axiosClient";
import { SWRConfig } from "swr";

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher,
      }}
    >
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/sign-up" exact element={<SignUp />} />
            <Route path="/sign-in" exact element={<SignIn />} />
            <Route element={<Main />}>
              <Route exact path="/dashboard" element={<Home />} />
              <Route exact path="/tables" element={<Tables />} />
              <Route exact path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </Routes>
        </AuthProvider>
      </div>
    </SWRConfig>
  );
}

export default App;
