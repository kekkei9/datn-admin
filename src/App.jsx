import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/sign-in" exact element={<SignIn />} />
        <Route element={<Main />}>
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/tables" element={<Tables />} />
          <Route exact path="/billing" element={<Billing />} />
          <Route exact path="/rtl" element={<Rtl />} />
          <Route exact path="/profile" element={<Profile />} />
          {/* <Redirect from="*" to="/dashboard" /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
