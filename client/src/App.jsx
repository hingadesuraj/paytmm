import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem('token');
  return (
    <div className=" ">
      <BrowserRouter>
        {/* <h1>Hello from paytm</h1> */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {token && <Route path="/dashboard" element={<Dashboard />} /> }
          <Route path="/send" element={<SendMoney />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
