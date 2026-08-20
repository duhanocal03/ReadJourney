import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import SharedLayout from "./pages/SharedLayout/SharedLayout";
import Recommended from "./pages/Recommended/Recommended";
import Library from "./pages/Library/Library";
import Reading from "./pages/Reading/Reading";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />

      <Route
        path="/register"
        element={
          <RestrictedRoute>
            <Register />
          </RestrictedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute>
            <Login />
          </RestrictedRoute>
        }
      />

      <Route
        element={
          <PrivateRoute>
            <SharedLayout />
          </PrivateRoute>
        }
      >
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/library" element={<Library />} />
        <Route path="/reading" element={<Reading />} />
      </Route>
    </Routes>
  );
}

export default App;