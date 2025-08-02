import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import DocumentView from "../pages/DocumentView";
import Documents from "../pages/Documents";
import SignUp from "../pages/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/documentView" element={<DocumentView />} />
      <Route path="/documents" element={<Documents />} />
    </Routes>
  );
}
