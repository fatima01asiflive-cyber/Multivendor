import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Loginpage.jsx";
import SignupPage from "./pages/SignupPage.jsx"; // 1. Import your signup page!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* When you go to /login, show the Login component */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. Registered Signup route */}
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Home route */}
        <Route path="/" element={<h1>Welcome Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;