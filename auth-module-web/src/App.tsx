import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/signIn/signIn";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/signUp";
import PrivateRoutes from "./components/PrivateRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="container mx-auto px-4 App">
      <BrowserRouter>
        {
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </AuthProvider>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
