import "./App.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Company_Profile } from "./pages/Company_Profile";
import Overview from "./components/company_profile/Overview";
import { Address } from "./components/company_profile/Address";
import router from "./routes/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
export default App;
